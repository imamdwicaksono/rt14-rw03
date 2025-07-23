'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import HeaderContent from '@/components/header_content'

type Berita = {
  id: number
  judul: string
  isi: string
  gambar_url: string
  created_at: string
  slug: string
}

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([])

  useEffect(() => {
    const fetchBerita = async () => {
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setBeritaList(data)
      }
    }

    fetchBerita()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <HeaderContent
        h1="📢 Berita & Kegiatan Warga"
        p="Berita-berita dan kegiatan terbaru warga Beringin 14."
      />
      <div className="space-y-6">
        {beritaList.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow p-4" onClick={() => window.location.href = `/berita/${item.slug}`}>
            <h2 className="text-xl font-semibold">{item.judul}</h2>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(item.created_at).toLocaleDateString('id-ID')}
            </p>
            {item.gambar_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.gambar_url}
                alt={item.judul}
                className="rounded-md mb-3 max-h-64 object-cover"
              />
            )}
            <p className="line-clamp-3">{item.isi}</p>
            <div className="text-right mt-3">
              <a
                href={`/berita/${item.slug}`}
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
