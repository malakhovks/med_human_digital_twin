import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Інтерактивні аватари — Trulience та ElevenLabs",
  description:
    "Познайомтеся з інтерактивними аватарами, створеними Trulience та ElevenLabs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
