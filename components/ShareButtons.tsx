'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ShareButtons({ title }: { title: string }) {
  const pathname = usePathname()
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.origin + pathname)
  }, [pathname])

  const encodedTitle = encodeURIComponent(title)
  const encodedURL = encodeURIComponent(url)

  return (
    <div className="flex flex-wrap gap-2 p-2 mt-4">
      <button
        onClick={() => {
          navigator.clipboard.writeText(url)
          alert('Link disalin!')
        }}
        className="px-3 py-1 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
      >
        📋 Salin Link
      </button>

      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedURL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
      >
        🟢 WhatsApp
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        📘 Facebook
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 text-sm text-white rounded bg-sky-500 hover:bg-sky-600"
      >
        🐦 Twitter
      </a>
    </div>
  )
}
