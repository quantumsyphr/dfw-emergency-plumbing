import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import { FloatingCallButton } from "@/components/floating-call-button";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FastFlow Plumbing | 24/7 Emergency Plumbing Services",
    template: "%s | FastFlow Plumbing",
  },
  description:
    "24/7 emergency plumbing services across the DFW metroplex. Fast 30-minute response for burst pipes, drain cleaning, leak detection, and more. Call now!",
  metadataBase: new URL("https://fastflowplumbing.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FastFlow Plumbing",
    title: "FastFlow Plumbing | 24/7 Emergency Plumbing Services",
    description:
      "24/7 emergency plumbing services across the DFW metroplex. Fast 30-minute response for burst pipes, drain cleaning, leak detection, and more. Call now!",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastFlow Plumbing | 24/7 Emergency Plumbing Services",
    description:
      "24/7 emergency plumbing services across the DFW metroplex. Fast 30-minute response for burst pipes, drain cleaning, leak detection, and more. Call now!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <StickyHeader />
        <main className="pt-16">{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  );
}
