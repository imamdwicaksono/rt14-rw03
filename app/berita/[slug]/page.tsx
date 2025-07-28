// File: app/berita/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import HeaderContent from '@/components/header_content'
import ShareButtons from '@/components/ShareButtons'
import Head from 'next/head'

type Berita = {
  id: number
  judul: string
  isi: string
  slug: string
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
        .eq('status', true)
        .single()

      if (!error && data) {
        setBerita(data)
      }
    }

    if (slug) fetchBerita()
  }, [slug])

  if (!berita) return <div className="text-center">Loading...</div>

  return (
    <>
      <Head>
        <title>{berita.judul}</title>
        <meta property="og:title" content={berita.judul} />
        <meta property="og:description" content={berita.slug} />
      <meta property="og:image" content={berita.gambar_url} />
      <meta property="og:url" content={`https://rt14.keroncongpermai.com/berita/${berita.slug}`} />
    </Head>
    <div className="max-w-3xl mx-auto">
        <HeaderContent
          h1="📢 Detail Berita & Kegiatan Warga"
          p="Detail Berita-berita dan kegiatan terbaru warga Beringin 14." />
        <div className="p-4 bg-white shadow rounded-xl">
          <h1 className="mb-2 text-2xl font-bold">{berita.judul}</h1>
          <p className="mb-3 text-sm text-gray-500">
            {new Date(berita.created_at).toLocaleDateString('id-ID')}
          </p>
          <ShareButtons title={berita.judul} />
          {berita.gambar_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={berita.gambar_url}
              alt={berita.judul}
              className="object-cover w-full mb-4 rounded-md" />
          )}
          <p className="text-base leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: berita.isi }} />
        </div>
      </div>
    </>
  )
}
