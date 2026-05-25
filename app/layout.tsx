import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZeroShortcuts",
  description: "Your smart weekly workout planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full bg-[#0d0d0d] text-[#f0f0f0]">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 pt-20 pb-12">
          {children}
        </main>
      </body>
    </html>
  );
}
