'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Struktur } from '@/types/Struktur'

export default function StrukturPage() {
  const [struktur, setStruktur] = useState<Struktur[]>([])

  useEffect(() => {
    const fetchStruktur = async () => {
      const { data, error } = await supabase
        .from('struktur_rt')
        .select(`
          id,
          nama,
          foto,
          jabatan:jabatan_id (
            nama_jabatan,
            status
          )
        `)
        .order('id', { ascending: true })

      if (!error && data) {
        setStruktur(
          data.map((item: { id: number; nama: string; foto: string; jabatan: { nama_jabatan: string; status: boolean; }[] }) => ({
            id: item.id,
            nama: item.nama,
            foto: item.foto,
            jabatan: Array.isArray(item.jabatan) ? {
              nama_jabatan: item.jabatan[0]?.nama_jabatan ?? '',
              status: !!item.jabatan[0]?.status
            } : {
              nama_jabatan: '',
              status: false
            }
          }))
        )
      }
    }

    fetchStruktur()
  }, [])

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">Struktur Organisasi RT 14 RW 03</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {struktur.map((item) => (
          <div key={item.id} className="p-4 overflow-hidden text-center bg-white rounded-lg shadow-md">
            <div className="flex justify-center">
              <Image
                src={item.foto}
                alt={item.nama}
                width={120}
                height={120}
                className="object-cover rounded-full"
              />
            </div>
            <h2 className="mt-4 text-lg font-semibold">{item.nama}</h2>
            <p className="text-sm text-gray-600">{item.jabatan?.nama_jabatan}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
