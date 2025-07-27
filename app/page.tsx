// File: app/page.tsx

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    src: '/header/carousel1.jpg',
    alt: 'hut ri ke 80',
    title: 'HUT RI ke 80',
  },
  // {
  //   src: '/header/carousel2.jpg',
  //   alt: 'Kerja Bakti',
  //   title: 'Kerja Bakti Warga Mingguan',
  // },
  // {
  //   src: '/header/carousel3.jpg',
  //   alt: 'Musyawarah Warga',
  //   title: 'Musyawarah Pengadaan Sarana',
  // },
]

export default function HomePage() {
  const [index, setIndex] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % slides.length)
  //   }, 10000)
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <div className="space-y-6">
      

     <div className="overflow-hidden shadow-md rounded-xl">
        <Image
          src={slides[index].src}
          alt={slides[index].alt}
          width={1000}
          height={500}
          className="w-full object-cover sm:h-[400px] md:h-[500px]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
          priority
        />
        <div className="p-3 bg-white sm:p-4">
          <h2 className="text-base font-semibold text-center sm:text-lg md:text-xl">
            {slides[index].title}
          </h2>
        </div>
      </div>


      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/berita" className="p-4 bg-white shadow rounded-xl hover:bg-gray-100">
          <h3 className="text-lg font-bold">📢 Berita & Kegiatan</h3>
          <p className="text-sm text-gray-600">Informasi terbaru seputar kegiatan warga.</p>
        </Link>

        <div className="p-4 bg-gray-100 shadow cursor-not-allowed rounded-xl opacity-60">
          <h3 className="text-lg font-bold">🖼️ Galeri Foto</h3>
          <p className="text-sm text-gray-600">(Coming Soon) Dokumentasi foto kegiatan RT.</p>
        </div>

        <div className="p-4 bg-gray-100 shadow cursor-not-allowed rounded-xl opacity-60">
          <h3 className="text-lg font-bold">👥 Struktur Organisasi</h3>
          <p className="text-sm text-gray-600">(Coming Soon) Pengurus RT hingga Kelurahan.</p>
        </div>

        <div className="p-4 bg-gray-100 shadow cursor-not-allowed rounded-xl opacity-60">
          <h3 className="text-lg font-bold">📮 Pengaduan Warga</h3>
          <p className="text-sm text-gray-600">(Coming Soon) Sampaikan keluhan atau laporan Anda.</p>
        </div>

        <div className="p-4 bg-gray-100 shadow cursor-not-allowed rounded-xl opacity-60">
          <h3 className="text-lg font-bold">📊 Polling Musyawarah</h3>
          <p className="text-sm text-gray-600">(Coming Soon) Ikut serta dalam pengambilan keputusan.</p>
        </div>
      </div>
    </div>
  )
}
