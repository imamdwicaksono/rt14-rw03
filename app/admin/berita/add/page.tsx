'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

// Lazy-load ReactQuill (biar support SSR)
import TiptapEditor from '@/components/TiptapEditor'

export default function AddBeritaPage() {
    const router = useRouter()
    const [judul, setJudul] = useState('')
    const [slug, setSlug] = useState('')
    const [isi, setIsi] = useState('')
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const uploadImage = async (file: File): Promise<string | null> => {
        const filename = `${uuidv4()}-${file.name.replace(/\s/g, '_')}`
        const { data, error } = await supabase.storage
        .from('berita')
        .upload(filename, file)

        if (error) {
        console.error('Upload error:', error)
        return null
        }

        const { data: publicUrl } = supabase
        .storage
        .from('berita')
        .getPublicUrl(filename)

        return publicUrl.publicUrl
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        let gambar_url: string | null = null
        if (selectedImage) {
            if (typeof selectedImage === 'string') {
                gambar_url = selectedImage
            } else {
                // TODO: Upload the file to storage and get the URL, then assign to gambar_url
                // For now, just skip updating gambar_url if it's a File
                const uploaded = await uploadImage(selectedImage)
                if (!uploaded) {
                    alert('Gagal upload gambar')
                    setLoading(false)
                    return
                }
                gambar_url = uploaded
            }
        }

        const { error } = await supabase.from('berita').insert({ judul, slug, isi, gambar_url })
        if (!error) {
            alert('Berhasil menambahkan berita')
            router.push('/admin/berita')
        } else {
            alert('Gagal menambahkan berita')
        }

        setLoading(false)
    }

    return (
        <div className="max-w-4xl p-4 mx-auto space-y-4">
        <h1 className="text-xl font-bold">📝 Tambah Berita</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block font-semibold">Judul</label>
            <input
                type="text"
                className="w-full p-2 border rounded"
                value={judul}
                onChange={(e) => {
                setJudul(e.target.value)
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))
                }}
                required
            />
            </div>

            <div>
            <label className="block font-semibold">Konten</label>
            <TiptapEditor content={isi} onChange={setIsi} />
            </div>

            <div>
                <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                className="w-full p-2 border rounded"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                    setSelectedImage(e.target.files[0])
                    } else {
                    setSelectedImage(null)
                    }
                }}
                />

                {/* Render preview image if available */}
                {selectedImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="mt-2 rounded max-h-48"
                />
                )}
            </div>

            <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
            Simpan
            </button>
        </form>
        </div>
    )
}
