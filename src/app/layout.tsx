import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CommandPaletteProvider from "@/components/ui/CommandPaletteProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rohitacharya.dev"),
  title: "Rohit Acharya, Civil Engineer · Construction Analytics & Project Controls",
  description:
    "Civil engineer working on construction progress monitoring, project controls and production planning. Construction Analyst at CloudFactory. Composite-plate research at NIT Rourkela. Builder of deployed engineering tools.",
  keywords: [
    "Rohit Acharya",
    "Civil Engineer",
    "Construction Engineering and Management",
    "Construction Analytics",
    "Project Controls",
    "Production Planning and Control",
    "Line of Balance",
    "Delay Forecasting",
    "Construction Progress Monitoring",
    "BIM",
    "Reality Capture",
    "CloudFactory",
    "Computational Methods",
    "FG-GRC",
    "Composite Plates",
    "NIT Rourkela",
    "Nepal",
    "Researcher",
  ],
  authors: [{ name: "Rohit Acharya" }],
  creator: "Rohit Acharya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rohitacharya.dev",
    title: "Rohit Acharya, Civil Engineer · Construction Analytics & Project Controls",
    description:
      "Civil engineer working on construction progress monitoring, project controls and production planning. Construction Analyst at CloudFactory. Composite-plate research at NIT Rourkela. Builder of deployed engineering tools.",
    siteName: "Rohit Acharya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Acharya, Civil Engineer · Construction Analytics & Project Controls",
    description:
      "Civil engineer working on construction progress monitoring, project controls and production planning. Construction Analyst at CloudFactory. Composite-plate research at NIT Rourkela. Builder of deployed engineering tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}>
      <body className="bg-[var(--bg-page)] text-[var(--text-primary)] font-sans antialiased">
        <SmoothScrollProvider>
          <CommandPaletteProvider />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
