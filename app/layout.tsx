import type { Metadata } from "next";
import { Geist, Geist_Mono, Shadows_Into_Light } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shadowsIntoLight = Shadows_Into_Light({
  variable: "--font-handwritten",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todos mis libros",
  description: "Una página para mí, para todos mis libros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${shadowsIntoLight.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
