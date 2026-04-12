import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import AIChatPanel from "@/components/AIChatPanel";
import { ToastProvider } from "@/components/Toaster";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: "RestoAI OS",
  description: "AI-powered Restaurant Operations Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans text-slate-100 antialiased selection:bg-blue-500/30`}>
        <ToastProvider>
          <Sidebar />
          <main className="md:ml-64 min-h-screen relative overflow-hidden">
            {children}
          </main>
          <AIChatPanel />
        </ToastProvider>
      </body>
    </html>
  );
}
