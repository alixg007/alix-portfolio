"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { islands } from "@/content/profile";
import {
  MOUND_FLATNESS,
  MOUND_RADIUS,
  WORLD_LIMIT,
  baseHeight,
  groundHeight,
  islandCenters,
  nearestIsland,
  seededRandom,
} from "@/lib/soulTerrain";

/** Ce que l'interface (boutons HTML) peut demander au monde 3D. */
export type WorldControls = {
  travelTo: (index: number) => void;
};

type Nav = {
  position: THREE.Vector3;
  heading: number; // direction du regard, en radians (0 = vers les îlots du fond)
  target: THREE.Vector3 | null; // point vers lequel la petite âme glisse
  keys: { forward: boolean; back: boolean; left: boolean; right: boolean };
};

type Props = {
  controlsRef: RefObject<WorldControls | null>;
  onNearChange: (index: number | null) => void;
  reduceMotion: boolean;
};

const COLORS = {
  skyTop: "#8b78d8",
  skyHorizon: "#f3b6da",
  skyBottom: "#a9c0f2",
  fog: "#c9b6ec",
  groundLow: "#4f6fd2",
  groundHigh: "#94b6f3",
  hill: "#6f8ae0",
  mound: "#a9c3f5",
  cypress: "#5a4bb0",
  soul: "#f4f8ff",
  sculpture: "#f6dcb5",
  sculptureGlow: "#f2c48f",
};

// Touches physiques : ZQSD sur clavier français, WASD sur clavier anglais, et les flèches
const KEYMAP: Record<string, keyof Nav["keys"]> = {
  ArrowUp: "forward",
  KeyW: "forward",
  ArrowDown: "back",
  KeyS: "back",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
};

/** Point d'arrêt devant un îlot, côté centre, pour voir la sculpture de face. */
function islandStop(index: number) {
  const c = islandCenters[index];
  const k = 1 - (MOUND_RADIUS + 3) / Math.hypot(c.x, c.z);
  return new THREE.Vector3(c.x * k, 0, c.z * k);
}

function angleDiff(a: number, b: number) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

/** Positions éparpillées en anneau, en évitant le centre et les îlots. */
function scatter(seed: number, count: number, rMin: number, rMax: number) {
  const rand = seededRandom(seed);
  const points: { x: number; z: number; r: number }[] = [];
  while (points.length < count) {
    const a = rand() * Math.PI * 2;
    const d = rMin + rand() * (rMax - rMin);
    const x = Math.cos(a) * d;
    const z = Math.sin(a) * d;
    const nearIsland = islandCenters.some((c) => Math.hypot(x - c.x, z - c.z) < MOUND_RADIUS + 4);
    if (!nearIsland) points.push({ x, z, r: rand() });
  }
  return points;
}

/* ─────────────── Ciel ─────────────── */

function Sky() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          top: { value: new THREE.Color(COLORS.skyTop) },
          horizon: { value: new THREE.Color(COLORS.skyHorizon) },
          bottom: { value: new THREE.Color(COLORS.skyBottom) },
        },
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 top;
          uniform vec3 horizon;
          uniform vec3 bottom;
          varying vec3 vDir;
          void main() {
            float h = vDir.y;
            vec3 color = h > 0.0
              ? mix(horizon, top, smoothstep(0.0, 0.45, h))
              : mix(horizon, bottom, smoothstep(0.0, 0.15, -h));
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    [],
  );

  return (
    <mesh material={material} renderOrder={-1}>
      <sphereGeometry args={[300, 32, 16]} />
    </mesh>
  );
}

/* ─────────────── Sol ─────────────── */

function Ground({ onPick }: { onPick: (point: THREE.Vector3) => void }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(400, 400, 160, 160);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const low = new THREE.Color(COLORS.groundLow);
    const high = new THREE.Color(COLORS.groundHigh);
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const h = baseHeight(pos.getX(i), pos.getZ(i));
      pos.setY(i, h);
      c.copy(low).lerp(high, THREE.MathUtils.clamp((h + 2.5) / 5, 0, 1));
      c.toArray(colors, i * 3);
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  function handleClick(e: ThreeEvent<MouseEvent>) {
    if (e.delta > 8) return; // c'était un glissé pour regarder autour, pas un clic
    e.stopPropagation();
    onPick(e.point.clone());
  }

  return (
    <mesh geometry={geometry} onClick={handleClick}>
      <meshStandardMaterial vertexColors roughness={1} />
    </mesh>
  );
}

/* ─────────────── Décor : collines, cyprès, âmes ─────────────── */

function useInstances(
  ref: RefObject<THREE.InstancedMesh | null>,
  items: { x: number; y: number; z: number; sx: number; sy: number; sz: number }[],
) {
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    items.forEach((it, i) => {
      dummy.position.set(it.x, it.y, it.z);
      dummy.scale.set(it.sx, it.sy, it.sz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [ref, items]);
}

function Hills() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(
    () =>
      scatter(11, 45, 22, 130).map(({ x, z, r }) => {
        const size = 4 + r * 7;
        return { x, y: baseHeight(x, z) - size * 0.1, z, sx: size, sy: size * 0.45, sz: size };
      }),
    [],
  );
  useInstances(ref, items);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]}>
      <sphereGeometry args={[1, 24, 16]} />
      <meshStandardMaterial color={COLORS.hill} roughness={1} />
    </instancedMesh>
  );
}

function Cypresses() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(
    () =>
      scatter(23, 70, 30, 120).map(({ x, z, r }) => {
        const height = 3.5 + r * 4;
        return { x, y: baseHeight(x, z) + height * 0.8, z, sx: 0.55, sy: height, sz: 0.55 };
      }),
    [],
  );
  useInstances(ref, items);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial color={COLORS.cypress} roughness={0.9} />
    </instancedMesh>
  );
}

/** Les centaines de petites âmes qui flottent au ras du sol. */
function Souls({ reduceMotion }: { reduceMotion: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const souls = useMemo(
    () =>
      scatter(37, 420, 6, 95).map(({ x, z, r }) => ({
        x,
        z,
        y: groundHeight(x, z) + 0.45 + r * 0.6,
        phase: r * Math.PI * 2,
        size: 0.18 + r * 0.16,
      })),
    [],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh || (reduceMotion && mesh.userData.placed)) return;
    const t = reduceMotion ? 0 : clock.elapsedTime;
    souls.forEach((s, i) => {
      dummy.position.set(s.x, s.y + Math.sin(t * 1.2 + s.phase) * 0.25, s.z);
      dummy.scale.setScalar(s.size);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.userData.placed = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, souls.length]}>
      <sphereGeometry args={[1, 12, 10]} />
      <meshBasicMaterial color={COLORS.soul} toneMapped={false} />
    </instancedMesh>
  );
}

/** Petits points lumineux qui tracent un chemin du centre vers chaque îlot. */
function Paths() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(() => {
    const dots: { x: number; y: number; z: number; sx: number; sy: number; sz: number }[] = [];
    islandCenters.forEach((_, i) => {
      const end = islandStop(i);
      const steps = Math.floor(end.length() / 2.2);
      for (let s = 2; s <= steps; s++) {
        const x = (end.x * s) / steps;
        const z = (end.z * s) / steps;
        dots.push({ x, y: groundHeight(x, z) + 0.08, z, sx: 0.22, sy: 0.08, sz: 0.22 });
      }
    });
    return dots;
  }, []);
  useInstances(ref, items);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]}>
      <sphereGeometry args={[1, 8, 6]} />
      <meshBasicMaterial color={COLORS.sculpture} toneMapped={false} />
    </instancedMesh>
  );
}

/* ─────────────── Îlots et sculptures ─────────────── */

function sculptureGeometry(kind: number): THREE.BufferGeometry {
  const tube = (points: THREE.Vector3[]) =>
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 160, 0.38, 12, false);

  switch (kind) {
    case 0: {
      // Coquille en spirale, debout
      const pts: THREE.Vector3[] = [];
      for (let t = 4 * Math.PI; t >= 0; t -= 0.15) {
        const r = 0.2 * Math.exp(0.19 * t);
        pts.push(new THREE.Vector3(r * Math.cos(t), 2.9 + r * Math.sin(t), 0));
      }
      pts.unshift(new THREE.Vector3(pts[0].x, 0, 0));
      return tube(pts);
    }
    case 1: {
      // Col de cygne
      return tube(
        [
          [0, 0],
          [0, 1.6],
          [0.2, 3.1],
          [0.8, 4.4],
          [1.8, 5],
          [2.6, 4.5],
          [2.7, 3.5],
          [2.1, 2.9],
        ].map(([x, y]) => new THREE.Vector3(x - 1, y, 0)),
      );
    }
    case 2: {
      // Hélice qui s'élève en se resserrant
      const pts: THREE.Vector3[] = [];
      for (let t = 0; t <= 6 * Math.PI; t += 0.2) {
        const r = 1.4 * (1 - t / 24);
        pts.push(new THREE.Vector3(r * Math.cos(t), t * 0.3, r * Math.sin(t)));
      }
      return tube(pts);
    }
    case 3:
      // Nœud
      return new THREE.TorusKnotGeometry(1.5, 0.34, 180, 14, 2, 3).translate(0, 3.2, 0);
    default:
      // Portail : on passe à travers pour me contacter
      return new THREE.TorusGeometry(2.6, 0.36, 16, 72).translate(0, 2.9, 0);
  }
}

function Island({ index, onSelect }: { index: number; onSelect: (i: number) => void }) {
  const c = islandCenters[index];
  const top = c.y + MOUND_RADIUS * MOUND_FLATNESS;
  const geometry = useMemo(() => sculptureGeometry(index), [index]);
  const facing = Math.atan2(-c.x, -c.z); // la sculpture regarde le centre

  function select(e: ThreeEvent<MouseEvent>) {
    if (e.delta > 8) return;
    e.stopPropagation();
    onSelect(index);
  }

  return (
    <group>
      <mesh position={[c.x, c.y, c.z]} scale={[1, MOUND_FLATNESS, 1]} onClick={select}>
        <sphereGeometry args={[MOUND_RADIUS, 48, 24]} />
        <meshStandardMaterial color={COLORS.mound} roughness={0.95} />
      </mesh>

      <mesh geometry={geometry} position={[c.x, top - 0.3, c.z]} rotation={[0, facing, 0]} onClick={select}>
        <meshStandardMaterial
          color={COLORS.sculpture}
          emissive={COLORS.sculptureGlow}
          emissiveIntensity={0.35}
          roughness={0.55}
        />
      </mesh>

    </group>
  );
}

/** Hauteur où flotte le nom de chaque îlot. */
function labelPoint(index: number) {
  const c = islandCenters[index];
  return new THREE.Vector3(c.x, c.y + MOUND_RADIUS * MOUND_FLATNESS + 7, c.z);
}

/** Fait suivre aux noms des îlots (boutons HTML) leur position à l'écran. */
function LabelTracker({ labelsRef }: { labelsRef: RefObject<(HTMLButtonElement | null)[]> }) {
  const pointsRef = useRef(islandCenters.map((_, i) => labelPoint(i)));
  const projectedRef = useRef(new THREE.Vector3());

  useFrame(({ camera, size }) => {
    const v = projectedRef.current;
    pointsRef.current.forEach((point, i) => {
      const label = labelsRef.current[i];
      if (!label) return;
      v.copy(point).project(camera);
      const visible = v.z < 1 && Math.abs(v.x) < 1.2 && Math.abs(v.y) < 1.2;
      label.style.visibility = visible ? "visible" : "hidden";
      label.style.transform = `translate(-50%, -50%) translate(${((v.x + 1) / 2) * size.width}px, ${((1 - v.y) / 2) * size.height}px)`;
    });
  });

  return null;
}

/* ─────────────── La petite âme du visiteur + caméra ─────────────── */

function Player({
  navRef,
  onNearChange,
  reduceMotion,
}: {
  navRef: RefObject<Nav>;
  onNearChange: (index: number | null) => void;
  reduceMotion: boolean;
}) {
  const body = useRef<THREE.Group>(null);
  const intro = useRef(reduceMotion ? 1 : 0);
  const near = useRef<number | null>(null);
  const tempRef = useRef({ cam: new THREE.Vector3(), look: new THREE.Vector3() });

  useFrame(({ clock, camera }, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const n = navRef.current;
    const temp = tempRef.current;
    const p = n.position;

    if (n.keys.left) n.heading += 1.8 * dt;
    if (n.keys.right) n.heading -= 1.8 * dt;
    const fx = -Math.sin(n.heading);
    const fz = -Math.cos(n.heading);

    const move = Number(n.keys.forward) - Number(n.keys.back);
    if (move !== 0) {
      n.target = null;
      p.x += fx * move * 9 * dt;
      p.z += fz * move * 9 * dt;
    } else if (n.target) {
      const dx = n.target.x - p.x;
      const dz = n.target.z - p.z;
      const dist = Math.hypot(dx, dz);
      if (dist < 0.3) {
        n.target = null;
      } else {
        const step = Math.min(dist, 11 * dt);
        p.x += (dx / dist) * step;
        p.z += (dz / dist) * step;
        const desired = Math.atan2(-dx, -dz);
        n.heading += angleDiff(desired, n.heading) * Math.min(1, 2.5 * dt);
      }
    }

    // On reste dans le monde
    const r = Math.hypot(p.x, p.z);
    if (r > WORLD_LIMIT) {
      p.x *= WORLD_LIMIT / r;
      p.z *= WORLD_LIMIT / r;
    }

    const bob = reduceMotion ? 0 : Math.sin(clock.elapsedTime * 2) * 0.15;
    p.y = groundHeight(p.x, p.z) + 1.1 + bob;
    body.current?.position.copy(p);

    // Caméra derrière la petite âme ; à l'arrivée, elle descend du ciel
    intro.current = Math.min(1, intro.current + dt / 3);
    const ease = 1 - (1 - intro.current) ** 3;
    temp.cam.set(p.x - fx * 11, p.y + 4.5 + (1 - ease) * 45, p.z - fz * 11);
    temp.cam.y = Math.max(temp.cam.y, groundHeight(temp.cam.x, temp.cam.z) + 1.5);
    if (intro.current < 1) camera.position.copy(temp.cam);
    else camera.position.lerp(temp.cam, 1 - Math.exp(-5 * dt));
    temp.look.set(p.x + fx * 5, p.y + 0.5, p.z + fz * 5);
    camera.lookAt(temp.look);

    const nearest = nearestIsland(p.x, p.z);
    if (nearest !== near.current) {
      near.current = nearest;
      onNearChange(nearest);
    }
  });

  return (
    <group ref={body}>
      <mesh>
        <sphereGeometry args={[0.5, 24, 16]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <mesh scale={1.9}>
        <sphereGeometry args={[0.5, 24, 16]} />
        <meshBasicMaterial color="#fff2fb" transparent opacity={0.22} depthWrite={false} toneMapped={false} />
      </mesh>
      <pointLight color="#ffe9f6" intensity={8} distance={12} decay={1.5} />
    </group>
  );
}

/* ─────────────── Assemblage ─────────────── */

export default function SoulWorld({ controlsRef, onNearChange, reduceMotion }: Props) {
  const nav = useRef<Nav>({
    position: new THREE.Vector3(0, 0, 6),
    heading: 0,
    target: null,
    keys: { forward: false, back: false, left: false, right: false },
  });
  const drag = useRef<{ x: number; id: number } | null>(null);
  const labelsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Les boutons HTML (menu des îlots) peuvent envoyer la petite âme vers un îlot
  useEffect(() => {
    controlsRef.current = {
      travelTo: (i) => {
        nav.current.target = islandStop(i);
      },
    };
    return () => {
      controlsRef.current = null;
    };
  }, [controlsRef]);

  // Clavier
  useEffect(() => {
    function setKey(e: KeyboardEvent, pressed: boolean) {
      const key = KEYMAP[e.code];
      if (!key) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code.startsWith("Arrow")) e.preventDefault();
      nav.current.keys[key] = pressed;
    }
    const down = (e: KeyboardEvent) => setKey(e, true);
    const up = (e: KeyboardEvent) => setKey(e, false);
    const reset = () => {
      nav.current.keys = { forward: false, back: false, left: false, right: false };
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", reset);
    };
  }, []);

  const travel = (i: number) => controlsRef.current?.travelTo(i);

  return (
    <div
      className="absolute inset-0 touch-none select-none"
      // Glisser (souris ou doigt) pour tourner le regard
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, id: e.pointerId };
      }}
      onPointerMove={(e) => {
        if (!drag.current || drag.current.id !== e.pointerId) return;
        nav.current.heading -= (e.clientX - drag.current.x) * 0.006;
        drag.current.x = e.clientX;
      }}
      onPointerUp={() => {
        drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 55, near: 0.1, far: 400, position: [0, 50, 18] }}
        gl={{ antialias: true }}
        aria-label="Monde des âmes en 3D"
      >
        <fog attach="fog" args={[COLORS.fog, 25, 150]} />
        <hemisphereLight args={["#f6dcff", "#5b74c9", 1.4]} />
        <directionalLight position={[-30, 25, -60]} color="#ffd7ec" intensity={1.1} />

        <Sky />
        <Ground onPick={(point) => (nav.current.target = point)} />
        <Hills />
        <Cypresses />
        <Paths />
        <Souls reduceMotion={reduceMotion} />
        {!reduceMotion && (
          <Sparkles count={160} scale={[160, 10, 160]} position={[0, 5, 0]} size={5} speed={0.25} color="#fff4fb" />
        )}
        {islandCenters.map((_, i) => (
          <Island key={i} index={i} onSelect={travel} />
        ))}
        <Player navRef={nav} onNearChange={onNearChange} reduceMotion={reduceMotion} />
        <LabelTracker labelsRef={labelsRef} />
      </Canvas>

      {/* Noms des îlots, placés à l'écran par LabelTracker */}
      {islands.map((island, i) => (
        <button
          key={island.slug}
          ref={(el) => {
            labelsRef.current[i] = el;
          }}
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => travel(i)}
          style={{ visibility: "hidden" }}
          className="absolute left-0 top-0 z-20 whitespace-nowrap rounded-full bg-white/85 px-3 py-1 text-sm font-semibold text-soul-deep shadow-md backdrop-blur transition-colors hover:bg-white"
        >
          <span className="mr-1.5 text-soul-violet">{i + 1}</span>
          {island.shortTitle}
        </button>
      ))}
    </div>
  );
}
