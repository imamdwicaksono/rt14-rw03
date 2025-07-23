'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const router = useRouter()
  const [judul, setJudul] = useState('')
  const [isi, setIsi] = useState('')
  const [gambar, setGambar] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/admin/login')
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let gambar_url = ''
    if (gambar) {
      const fileExt = gambar.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from('berita')
        .upload(fileName, gambar)

      if (error) return alert('Upload gambar gagal')

      const { data: urlData } = supabase.storage.from('berita').getPublicUrl(fileName)
      gambar_url = urlData.publicUrl
    }

    const { error } = await supabase.from('berita').insert({ judul, isi, gambar_url })

    if (error) alert('Gagal simpan berita')
    else {
      setJudul('')
      setIsi('')
      setGambar(null)
      alert('Berhasil upload berita')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📤 Upload Berita</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Judul"
          className="w-full p-2 border rounded"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
        />
        <textarea
          placeholder="Isi berita"
          className="w-full p-2 border rounded"
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          rows={5}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setGambar(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {loading ? 'Mengirim...' : 'Upload'}
        </button>
      </form>
    </div>
  )
}
