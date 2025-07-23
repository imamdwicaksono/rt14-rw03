'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface User {
  id: string
  email: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? ''
        })
      } else {
        setUser(null)
      }
    })
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">🛠️ Dashboard Admin</h1>
      <p className="text-sm text-gray-600 mb-6">Selamat datang kembali {user?.email}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white shadow p-4">
          <h2 className="text-lg font-semibold">📝 Tambah Berita</h2>
          <p className="text-sm text-gray-500">Kelola berita dan informasi kegiatan RT.</p>
        </div>
        <div className="rounded-xl bg-white shadow p-4">
          <h2 className="text-lg font-semibold">🖼️ Galeri</h2>
          <p className="text-sm text-gray-500">Upload dan edit foto kegiatan warga.</p>
        </div>
        <div className="rounded-xl bg-white shadow p-4">
          <h2 className="text-lg font-semibold">👥 Struktur</h2>
          <p className="text-sm text-gray-500">Perbaharui struktur organisasi RT.</p>
        </div>
        <div className="rounded-xl bg-white shadow p-4">
          <h2 className="text-lg font-semibold">📮 Pengaduan</h2>
          <p className="text-sm text-gray-500">Cek laporan/pengaduan dari warga.</p>
        </div>
      </div>
    </div>
  )
}
