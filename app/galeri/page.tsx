'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import HeaderContent from '@/components/header_content'

type Galeri = {
  id: number
  judul: string
  deskripsi: string
  gambar_url: string
  created_at: string
  slug: string
}

export default function GaleriPage() {
  const [galeriList, setGaleriList] = useState<Galeri[]>([])

  useEffect(() => {
    const fetchGaleri = async () => {
      const { data, error } = await supabase
        .from('galeri')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setGaleriList(data)
      }
    }

    fetchGaleri()
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <HeaderContent
        h1="📢 Berita & Kegiatan Warga"
        p="Berita-berita dan kegiatan terbaru warga Beringin 14."
      />
      <div className="space-y-6">
        {galeriList.map((item) => (
          <div key={item.id} className="p-4 bg-white shadow rounded-xl" onClick={() => window.location.href = `/galeri/${item.slug}`}>
            <h2 className="text-xl font-semibold">{item.judul}</h2>
            <p className="mb-2 text-sm text-gray-500">
              {new Date(item.created_at).toLocaleDateString('id-ID')}
            </p>
            {item.gambar_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.gambar_url}
                alt={item.judul}
                className="object-cover mb-3 rounded-md max-h-64"
              />
            )}
            <div className="mt-3 text-right">
              <a
                href={`/galeri/${item.slug}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Lihat selengkapnya →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
