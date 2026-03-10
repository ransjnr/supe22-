import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LiveChat from "@/components/layout/LiveChat";
import FloatingHub from "@/components/hub/FloatingHub";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ransfordoppong.com"),
  title: {
    default: "Ransford Oppong — AI Engineer · Quantum ML · Physics-ML Researcher",
    template: "%s | Ransford Oppong",
  },
  description:
    "AI Software Engineer and Researcher specializing in Machine Learning, Quantum ML, and Physics-informed Neural Networks. Available for consulting, research collaborations, and speaking.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Quantum ML",
    "Physics-informed Neural Networks",
    "Research",
    "Consulting",
    "Deep Learning",
  ],
  authors: [{ name: "Ransford Oppong", url: "https://ransfordoppong.com" }],
  creator: "Ransford Oppong",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ransfordoppong.com",
    siteName: "Ransford Oppong",
    title: "Ransford Oppong — AI Engineer · Quantum ML · Physics-ML",
    description:
      "AI Software Engineer and Researcher specializing in Machine Learning, Quantum ML, and Physics-informed Neural Networks.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Ransford Oppong Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ransfordoppong",
    title: "Ransford Oppong — AI Engineer · Quantum ML · Physics-ML",
    description:
      "AI Software Engineer and Researcher specializing in Machine Learning, Quantum ML, and Physics-informed Neural Networks.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-background text-primary-text font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <LiveChat />
        <FloatingHub />
      </body>
    </html>
  );
}
