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
        .eq('status', true)

      if (!error && data) {
        setBeritaList(data)
      }
    }

    fetchBerita()
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <HeaderContent
        h1="📢 Berita & Kegiatan Warga"
        p="Berita-berita dan kegiatan terbaru warga Beringin 14."
      />
      <div className="space-y-6">
        {beritaList.map((item) => (
          <div key={item.id} className="p-4 bg-white shadow rounded-xl" onClick={() => window.location.href = `/berita/${item.slug}`}>
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
            <p className="line-clamp-3" dangerouslySetInnerHTML={{ __html: item.isi }} />

            <div className="mt-3 text-right">
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
