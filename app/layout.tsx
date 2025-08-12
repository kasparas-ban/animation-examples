"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import gsap from "gsap";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

gsap.registerPlugin(CustomEase, useGSAP);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
