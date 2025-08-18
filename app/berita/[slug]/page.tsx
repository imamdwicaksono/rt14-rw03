// File: app/berita/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import HeaderContent from '@/components/header_content'
import ShareButtons from '@/components/ShareButtons'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import GalleryGrid from '@/components/galeri/GalleryGrid'
import Galeri from '@/components/Galeri'
import { text } from 'stream/consumers'


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
  const [formattedDate, setFormattedDate] = useState('')
  const PdfViewer = dynamic(() => import('@/components/PdfViewer'), { ssr: false })

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

  useEffect(() => {
    if (berita?.created_at) {
      const date = new Date(berita.created_at)
      setFormattedDate(date.toLocaleDateString('id-ID'))
    }
  }, [berita])

  function extractPdfUrl(text: string): string | null {
    const pdfRegex = /(https?:\/\/[^\s]+\.pdf)/gi;
    const matches = text.match(pdfRegex);
    return matches ? matches[0] : null;
  }

  function extractGaleri(text: string): string {
    // regex untuk directive galeri.load={folder}
    const folderRegex = /galeri\.load\s*=\s*{([^}]+)}/i;
    console.log('Extracting Galeri Folder from:', text);
    const folderMatch = text.match(folderRegex);
    if (folderMatch) {
      const folderName = folderMatch[1].trim();
      console.log('Extracted Galeri Folder:', folderName);


      return folderName;
    }

    return "";
  }

  if (!berita) return <div className="text-center">Loading...</div>


  const loadGaleri = () => {
    const galeriFolder = extractGaleri(berita.isi);
    console.log('Extracted Galeri Folder:', galeriFolder);
    return galeriFolder ? (
      <div className="mt-6">
        <Galeri search={galeriFolder} />
      </div>
    ) : null;
  };

  const loadPdf = () => {
    const pdfUrl = extractPdfUrl(berita.isi);
    console.log('Extracted PDF URL:', pdfUrl);
    return pdfUrl ? (
      <div className="mt-6">
        <PdfViewer fileUrl={pdfUrl} />
      </div>
    ) : null;
  }

  const loadDefault = () => {
    return (
      <div className="mt-6">
        <p
          className="text-base leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: berita.isi }}
        />
      </div>
    );
  };

  const loadContent = () => {
    if (loadPdf()) {
      return loadPdf();
    }
    if (loadGaleri()) {
      return loadGaleri();
    }

    loadDefault();
  };

  return (
    <>
      <Head>
        <title>{berita.judul}</title>
        <meta property="og:title" content={berita.judul} />
        <meta property="og:description" content={berita.slug} />
      <meta property="og:image" content={berita.gambar_url} />
      <meta property="og:url" content={`https://rt14.keroncongpermai.com/berita/${berita.slug}`} />
    </Head>
    <div className="mx-auto max-full">
        <HeaderContent
          h1="📢 Detail Berita & Kegiatan Warga"
          p="Detail Berita-berita dan kegiatan terbaru warga Beringin 14." />
        <div className="p-4 bg-white shadow rounded-xl">
          <h1 className="mb-2 text-2xl font-bold">{berita.judul}</h1>
          <p className="mb-3 text-sm text-gray-500">
            {formattedDate}
          </p>
          <ShareButtons title={berita.judul} />
          {berita.gambar_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={berita.gambar_url}
              alt={berita.judul}
              className="object-cover w-full mb-4 rounded-md" />
          )}

          {/* Extract PDF URL before rendering */}
          {loadContent()}
        </div>
      </div>
    </>
  )
}
