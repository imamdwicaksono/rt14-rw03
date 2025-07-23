'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function UploadBeritaPage() {
  const router = useRouter()
  const [judul, setJudul] = useState('')
  const [konten, setKonten] = useState('')
  const [gambar, setGambar] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    let gambar_url = ''

    if (gambar) {
      const ext = gambar.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('berita')
        .upload(fileName, gambar)

      if (uploadError) {
        setError(`Upload gagal: ${uploadError.message}`)
        setLoading(false)
        return
      }

      const { data } = supabase.storage.from('berita').getPublicUrl(fileName)
      gambar_url = data.publicUrl
    }

    const { error: insertError } = await supabase
      .from('berita')
      .insert([{ judul, konten, gambar_url }])

    if (insertError) {
      setError(`Gagal simpan data: ${insertError.message}`)
    } else {
      router.push('/berita')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Upload Berita Baru</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Judul berita"
          className="w-full border p-2 rounded"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
        />
        <textarea
          placeholder="Konten berita"
          className="w-full border p-2 rounded"
          rows={6}
          value={konten}
          onChange={(e) => setKonten(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setGambar(e.target.files?.[0] ?? null)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Mengunggah...' : 'Upload Berita'}
        </button>
      </form>
    </div>
  )
}
