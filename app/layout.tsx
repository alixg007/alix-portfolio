import type { Metadata, Viewport } from "next";
// Le texte utilise la police système, comme LinkedIn (voir --font-sans dans globals.css).
// Fraunces, auto-hébergée, reste pour les titres des profondeurs (chaleureuse, un peu onirique).
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
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-li-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
