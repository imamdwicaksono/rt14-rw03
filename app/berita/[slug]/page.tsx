// File: app/berita/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import HeaderContent from '@/components/header_content'

type Berita = {
  id: number
  judul: string
  isi: string
  gambar_url: string
  created_at: string
}

export default function BeritaDetailPage() {
  const { slug } = useParams()
  const [berita, setBerita] = useState<Berita | null>(null)

  useEffect(() => {
    const fetchBerita = async () => {
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .eq('slug', slug)
        .single()

      if (!error && data) {
        setBerita(data)
      }
    }

    if (slug) fetchBerita()
  }, [slug])

  if (!berita) return <div className="p-6 text-center">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <HeaderContent
              h1="📢 Detail Berita & Kegiatan Warga"
              p="Detail Berita-berita dan kegiatan terbaru warga Beringin 14."
            />  
      <div className="bg-white p-4 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-2">{berita.judul}</h1>
        <p className="text-sm text-gray-500 mb-3">
          {new Date(berita.created_at).toLocaleDateString('id-ID')}
        </p>
        {berita.gambar_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={berita.gambar_url}
            alt={berita.judul}
            className="rounded-md mb-4 w-full max-h-[400px] object-cover"
          />
        )}
        <p className="text-base leading-relaxed whitespace-pre-line">
          {berita.isi}
        </p>
      </div>
    </div>
  )
}
