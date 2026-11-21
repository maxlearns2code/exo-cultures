import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EXO-CULTURES | Intergalactic Worlds Expo 2026",
  description:
    "Group Pavilion showcasing 4 speculative extraterrestrial civilizations at the Intergalactic Worlds Expo, Hyper Island Campus, Week 51, 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black select-none overflow-hidden">
        {children}
      </body>
    </html>
  );
}
