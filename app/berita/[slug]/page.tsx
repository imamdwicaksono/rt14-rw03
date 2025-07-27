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

  if (!berita) return <div className="text-center">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto">
      <HeaderContent
              h1="📢 Detail Berita & Kegiatan Warga"
              p="Detail Berita-berita dan kegiatan terbaru warga Beringin 14."
            />  
      <div className="p-4 bg-white shadow rounded-xl">
        <h1 className="mb-2 text-2xl font-bold">{berita.judul}</h1>
        <p className="mb-3 text-sm text-gray-500">
          {new Date(berita.created_at).toLocaleDateString('id-ID')}
        </p>
        {berita.gambar_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={berita.gambar_url}
            alt={berita.judul}
            className="object-cover w-full mb-4 rounded-md"
          />
        )}
        <p className="text-base leading-relaxed whitespace-pre-line">
          {berita.isi}
        </p>
      </div>
    </div>
  )
}
