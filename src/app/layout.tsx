import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://rohitacharya.dev"),
  title: "Rohit Acharya — Civil Engineer · AI & Computational Methods for Structures",
  description:
    "Civil engineer working at the intersection of AI, computation, and structural engineering. Construction-AI at CloudFactory, composites researcher, builder of shipped engineering tools. NIT Rourkela.",
  keywords: [
    "Rohit Acharya",
    "Civil Engineer",
    "Structural Engineer",
    "AI Construction",
    "CloudFactory",
    "Buildots",
    "Computational Methods",
    "FG-GRC",
    "Composite Plates",
    "NIT Rourkela",
    "Nepal",
    "Researcher",
    "BIM",
    "Computer Vision",
  ],
  authors: [{ name: "Rohit Acharya" }],
  creator: "Rohit Acharya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rohitacharya.dev",
    title: "Rohit Acharya — Civil Engineer · AI & Computational Methods for Structures",
    description:
      "Civil engineer working at the intersection of AI, computation, and structural engineering. Construction-AI at CloudFactory, composites researcher, builder of shipped engineering tools. NIT Rourkela.",
    siteName: "Rohit Acharya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Acharya — Civil Engineer · AI & Computational Methods for Structures",
    description:
      "Civil engineer working at the intersection of AI, computation, and structural engineering. Construction-AI at CloudFactory, composites researcher, builder of shipped tools.",
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[var(--bg-page)] text-[var(--text-primary)] font-sans antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          <CommandPaletteProvider />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
