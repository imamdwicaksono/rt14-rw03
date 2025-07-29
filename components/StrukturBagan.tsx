'use client'

import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Tree, TreeNode } from 'react-organizational-chart'
import Image from 'next/image'
import * as htmlToImage from 'html-to-image'
import { Struktur } from '@/types/Struktur'

export default function StrukturBaganPage() {
  const [struktur, setStruktur] = useState<Struktur[]>()
  const treeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('struktur_rt')
        .select(`
          id,
          nama,
          foto,
          jabatan_id,
          jabatan:jabatan_id(
            nama_jabatan,
            status,
            parent_id
          )
        `)
        .order('id', { ascending: true })

      if (!error && data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedData = data.map((item: any) => ({
          ...item,
          jabatan: Array.isArray(item.jabatan) ? item.jabatan[0] : item.jabatan
        })) as Struktur[]

        setStruktur(mappedData)
      }
    }

    fetchData()
  }, [])

  const getJabatanColor = (nama: string | undefined) => {
    if (!nama) return 'bg-white text-gray-800'
    if (nama.includes('Ketua')) return 'bg-red-500 text-white'
    if (nama.includes('Wakil')) return 'bg-orange-400 text-white'
    if (nama.includes('Sekretaris')) return 'bg-blue-400 text-white'
    if (nama.includes('Bendahara')) return 'bg-green-500 text-white'
    return 'bg-gray-200 text-gray-800'
  }

  const renderNode = (person: Struktur) => {
    const jabatanColor = getJabatanColor(person.jabatan?.nama_jabatan)
    return (
      <div className={`flex flex-col items-center p-2 text-center border rounded shadow w-44 ${jabatanColor}`}>
        <Image
          src={person.foto || '/default-profile.png'}
          alt={person.nama}
          width={64}
          height={64}
          className="object-cover border border-white rounded-full"
        />
        <strong className="mt-2 text-sm">{person.nama}</strong>
        <span className="text-xs">{person.jabatan?.nama_jabatan}</span>
      </div>
    )
  }

  const renderTree = (parentId: number | null, visited = new Set<number>()) => {
    const children = struktur?.filter((item) => {
      return item.jabatan?.parent_id === parentId && !visited.has(item.id)
    })

    return children?.map((person) => {
      visited.add(person.id)
      return (
        <TreeNode label={renderNode(person)} key={person.id}>
          {renderTree(person.id, visited)}
        </TreeNode>
      )
    })
  }

  const handleDownload = async () => {
    if (!treeRef.current) return
    const blob = await htmlToImage.toPng(treeRef.current)
    const link = document.createElement('a')
    link.download = 'struktur-organisasi.png'
    link.href = blob
    link.click()
  }

  const pimpinan = struktur?.find((p) => p.jabatan?.parent_id === null) || null

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-center">Bagan Struktur Organisasi</h1>

      <div className="mb-4 text-center">
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={handleDownload}
        >
          📥 Download Gambar
        </button>
      </div>

      <div
        ref={treeRef}
        className="flex justify-center w-full overflow-visible min-w-[1000px] min-h-screen"
      >
        {pimpinan && (
          <Tree
            label={renderNode(pimpinan)}
            lineWidth="2px"
            lineColor="#999"
            lineBorderRadius="8px"
          >
            {renderTree(pimpinan.jabatan_id, new Set([pimpinan.id]))}
          </Tree>
        )}
      </div>
    </div>
  )
}
