// File: app/page.tsx

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    src: '/header/carousel1.jpg',
    alt: 'Kegiatan Posyandu',
    title: 'Posyandu Balita & Lansia',
  },
  {
    src: '/header/carousel2.jpg',
    alt: 'Kerja Bakti',
    title: 'Kerja Bakti Warga Mingguan',
  },
  {
    src: '/header/carousel3.jpg',
    alt: 'Musyawarah Warga',
    title: 'Musyawarah Pengadaan Sarana',
  },
]

export default function HomePage() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      

      <div className="rounded-xl overflow-hidden shadow-md">
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/berita" className="rounded-xl bg-white shadow p-4 hover:bg-gray-100">
          <h3 className="text-lg font-bold">📢 Berita & Kegiatan</h3>
          <p className="text-sm text-gray-600">Informasi terbaru seputar kegiatan warga.</p>
        </Link>

        <Link href="/galeri" className="rounded-xl bg-white shadow p-4 hover:bg-gray-100">
          <h3 className="text-lg font-bold">🖼️ Galeri Foto</h3>
          <p className="text-sm text-gray-600">Dokumentasi foto kegiatan RT.</p>
        </Link>

        <Link href="/struktur" className="rounded-xl bg-white shadow p-4 hover:bg-gray-100">
          <h3 className="text-lg font-bold">👥 Struktur Organisasi</h3>
          <p className="text-sm text-gray-600">Pengurus RT hingga Kelurahan.</p>
        </Link>

        <Link href="/pengaduan" className="rounded-xl bg-white shadow p-4 hover:bg-gray-100">
          <h3 className="text-lg font-bold">📮 Pengaduan Warga</h3>
          <p className="text-sm text-gray-600">Sampaikan keluhan atau laporan Anda.</p>
        </Link>

        <Link href="/polling" className="rounded-xl bg-white shadow p-4 hover:bg-gray-100">
          <h3 className="text-lg font-bold">📊 Polling Musyawarah</h3>
          <p className="text-sm text-gray-600">Ikut serta dalam pengambilan keputusan.</p>
        </Link>
      </div>
    </div>
  )
}
