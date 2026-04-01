import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swatch — Find Your Colors",
  description:
    "Upload an image, get a color palette matched to paint brands and Pantone codes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream font-sans text-navy">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="py-6 text-center text-xs text-stone-400">
          <p>Colors are digital approximations. Actual paint colors may vary. Pantone codes are nearest-match estimates.</p>
        </footer>
      </body>
    </html>
  );
}
