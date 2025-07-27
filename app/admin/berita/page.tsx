'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Berita, SearchBerita } from '@/types/Berita'

export default function AdminBeritaPage() {
  const [berita, setBerita] = useState<Berita[]>([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState<SearchBerita[]>([])

  useEffect(() => {
    fetchBerita()
  }, [])

  const fetchBerita = async () => {
    const { data, error } = await supabase
      .from('berita')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setBerita(data)
      setFiltered(data)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return

    const { error } = await supabase.from('berita').delete().eq('id', id)
    if (!error) {
      alert('Berhasil dihapus.')
      fetchBerita()
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase()
    setSearch(keyword)
    setFiltered(
      berita.filter((item) =>
        [item.id, item.judul, item.slug, item.created_at]
          .some(field => String(field).toLowerCase().includes(keyword))
      )
    )
  }

  return (
    <div className="max-w-5xl p-4 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">📃 Daftar Berita</h1>
        <Link href="/admin/berita/add" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          + Tambah
        </Link>
      </div>

      <input
        type="text"
        placeholder="Cari ID / Judul / Slug / Tanggal"
        className="w-full p-2 mb-4 border rounded"
        value={search}
        onChange={handleSearch}
      />

      <div className="overflow-auto">
        <table className="w-full text-sm border table-auto">
          <thead className="text-left bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Judul</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Dibuat</th>
              <th className="p-2 text-center border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">{item.judul}</td>
                <td className="p-2 border">{item.slug}</td>
                <td className="p-2 border">{new Date(item.created_at).toLocaleString()}</td>
                <td className="p-2 space-x-2 text-center border">
                  <Link
                    href={`/admin/berita/edit/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
