import type { Metadata, Viewport } from "next";
// Polices auto-hébergées (aucun appel à Google, plus rapide et RGPD-friendly).
// Inter pour le texte (lisible, proche de l'univers LinkedIn),
// Fraunces pour les titres (chaleureux, un peu onirique).
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alix Gruel — Communication & gestion de projet",
  description:
    "Portfolio d'Alix Gruel : communication interne, conduite du changement, IA générative appliquée à la communication et stratégie marketing.",
  openGraph: {
    title: "Alix Gruel — Portfolio",
    description: "Creusez sous la surface de mon profil LinkedIn.",
    images: ["/images/alix.jpg"],
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5efe6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-card"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
