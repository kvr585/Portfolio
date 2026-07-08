import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/lib/constants/site";
import { AppProviders } from "@/components/providers/app-providers";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/command-palette/command-palette";
import { MobileCommandButton } from "@/components/layout/mobile-command-button";
import { JsonLd } from "@/components/shared/json-ld";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Cybersecurity Engineer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.about,
  keywords: [
    "cybersecurity",
    "SOC analyst",
    "penetration testing",
    "security tools",
    "Python",
    "Veera Bhadhra Rao",
    "offensive security",
    "security operations",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.thesis,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.thesis,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} noise antialiased`}
      >
        <JsonLd />
        <a
          href="#operator-profile"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <LenisProvider>
          <AppProviders>
            <Navbar />
            <ScrollProgress />
            <main>{children}</main>
            <Footer />
            <CommandPalette />
            <MobileCommandButton />
          </AppProviders>
        </LenisProvider>
      </body>
    </html>
  );
}
