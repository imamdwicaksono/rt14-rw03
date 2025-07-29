'use client'
import dynamic from 'next/dynamic'

const StrukturBaganPage = dynamic(() => import('@/components/StrukturBagan'), {
  ssr: false, // ⛔ Jangan render di server
})

export default function StrukturPage() {

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">Struktur Organisasi RT 14 RW 03</h1>

      <StrukturBaganPage />
    </div>
  )
}
