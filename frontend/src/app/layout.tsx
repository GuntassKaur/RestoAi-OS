import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });

export const metadata: Metadata = {
  title: "DinevaAI OS | Next-Gen Restaurant Intelligence",
  description: "The intelligent operating system for modern hospitality. Automate orders, analytics, inventory, and staff management with AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased bg-[#070b14] text-white`}>
        {children}
      </body>
    </html>
  );
}
