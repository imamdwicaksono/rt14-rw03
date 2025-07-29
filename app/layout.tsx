import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderBar from "@/components/header";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// File: app/layout.tsx



export const metadata: Metadata = {
  title: 'RT 14 RW 03 Keroncong Permai',
  description: 'Website resmi warga RT 14 RW 03 Kelurahan Keroncong, Jatiuwung, Kota Tangerang.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: 'image/png' },
      { url: '/favicon-32x32.png', sizes: 'image/png' },
      { url: '/favicon-192x192.png', sizes: 'image/png' },
      { url: '/favicon-512x512.png', sizes: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Beringin 14 - RT 14 RW 03',
    description: 'Informasi kegiatan, galeri dan pengaduan warga.',
    images: ['https://beringin14.vercel.app/og-cover.png'],
    url: 'https://beringin14.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-[#D3D3D3] text-gray-900 ">
        <HeaderBar />
        <main className="min-h-screen w-[90%] mx-auto pt-[30px] pb-[30px]">{children}</main>
        <footer className="py-4 text-xs text-center text-gray-500 bg-white">
          © {new Date().getFullYear()} RT 14 RW 03 Keroncong Permai
        </footer>
      </body>
      <Analytics />
    </html>
    
  )
}
