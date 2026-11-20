import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EXO-CULTURES | 4 Alien Civilizations Arcade Exhibition",
  description:
    "Interactive Web Arcade Platform for Raspberry Pi 400 + 8BitDo Arcade Stick + 14\" CRT Monitor showcasing 4 alien cultures.",
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
