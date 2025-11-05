import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { abcRepro, abcReproMono } from './fonts/fonts';
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simli App (ElevenLabs)",
  description: "Стартовий застосунок create-simli-app (ElevenLabs)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${abcReproMono.variable} ${abcRepro.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
