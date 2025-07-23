import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderBar from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// File: app/layout.tsx



export const metadata = {
  title: 'RT 14 RW 03 Keroncong Permai',
  description: 'Website resmi warga RT 14 RW 03 Kelurahan Keroncong, Jatiuwung, Kota Tangerang.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
      </head>
      <body className="bg-[#D3D3D3] text-gray-900">
        <HeaderBar />
        <main className="min-h-screen max-w-4xl mx-auto py-6 px-4">{children}</main>
        <footer className="bg-white text-center py-4 text-xs text-gray-500">
          © {new Date().getFullYear()} RT 14 RW 03 Keroncong Permai
        </footer>
      </body>
    </html>
  )
}
