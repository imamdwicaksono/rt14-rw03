// File: app/page.tsx

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const slides = [
  {
    src: '/carousel1.jpg',
    alt: 'Kegiatan Posyandu',
    title: 'Posyandu Balita & Lansia',
  },
  {
    src: '/carousel2.jpg',
    alt: 'Kerja Bakti',
    title: 'Kerja Bakti Warga Mingguan',
  },
  {
    src: '/carousel3.jpg',
    alt: 'Musyawarah Warga',
    title: 'Musyawarah Pengadaan Sarana',
  },
]

export default function HomePage() {
  const [, setIndex] = useState(0)
  const pathname = usePathname()

  useEffect(() => {

    handlerIsLogin()

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlerIsLogin = async () => {
    // Check if the current path starts with '/admin'
    if (await supabase.auth.getSession()) {
      return true
    }
    return pathname.startsWith('/admin')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      {pathname.startsWith('/admin') ? (
        <div className="p-4 text-center text-white bg-gray-800 shadow rounded-xl">
          <h1 className="text-xl font-bold">🛠️ Admin Panel</h1>
        </div>
      ) : (
        <div className="p-4 text-center bg-white shadow rounded-xl">
          <div className="flex items-center justify-center gap-3">
            <Image src="/icon.png" alt="Icon" width={48} height={48} className="rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">Beringin 14</h1>
              <p className="text-sm text-gray-600">RT 14 RW 03 Keroncong Permai</p>
            </div>
          </div>
        </div>
      )}

      {/* Carousel */}
      {/* <div className="overflow-hidden shadow-md rounded-xl">
        <Image
          src={slides[index].src}
          alt={slides[index].alt}
          width={1000}
          height={500}
          className="w-full object-cover h-[250px] sm:h-[400px]"
        />
        <div className="p-4 bg-white">
          <h2 className="text-xl font-semibold text-center">{slides[index].title}</h2>
        </div>
      </div> */}

      {/* Links */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/berita" className="p-4 bg-white shadow rounded-xl hover:bg-gray-100">
          <h3 className="text-lg font-bold">📢 Setting Berita & Kegiatan</h3>
          <p className="text-sm text-gray-600">Informasi terbaru seputar kegiatan warga.</p>
        </Link>

        <Link href="/admin/galeri" className="p-4 bg-white shadow rounded-xl hover:bg-gray-100">
          <h3 className="text-lg font-bold">🖼️ Setting Galeri Foto</h3>
          <p className="text-sm text-gray-600">Dokumentasi foto kegiatan RT.</p>
        </Link>

        <Link href="/admin/struktur" className="p-4 bg-white shadow rounded-xl hover:bg-gray-100">
          <h3 className="text-lg font-bold">👥 Setting Struktur Organisasi</h3>
          <p className="text-sm text-gray-600">Pengurus RT hingga Kelurahan.</p>
        </Link>

        <Link href="/admin/pengaduan" className="p-4 bg-white shadow rounded-xl hover:bg-gray-100">
          <h3 className="text-lg font-bold">📮 Setting Pengaduan Warga</h3>
          <p className="text-sm text-gray-600">Sampaikan keluhan atau laporan Anda.</p>
        </Link>

        <Link href="/admin/polling" className="p-4 bg-white shadow rounded-xl hover:bg-gray-100">
          <h3 className="text-lg font-bold">📊 Setting Polling Musyawarah</h3>
          <p className="text-sm text-gray-600">Ikut serta dalam pengambilan keputusan.</p>
        </Link>
      </div>
    </div>
  )
}
