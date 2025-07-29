'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function HeaderBar() {
  const [open, setOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [, setUser] = useState<import('@supabase/supabase-js').User | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const handlerLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/auth')
    setOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setIsLogin(true)
        setUser(session.user)
      } else {
        setIsLogin(false)
        setUser(null)
      }
    }
    checkSession()
  }, [])

  return (
    <nav className={`
      z-50 transition-all duration-300 ease-in-out bg-white
      ${isScrolled ? 'fixed top-0 left-0 w-full shadow-md backdrop-blur-sm' : 'relative'}
    `}>
      <div className="w-[90%] mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/icon/beringin14_icon.png" alt="Icon" width={48} height={48} className="rounded-full" />
          <div>
            <h1 className="text-2xl font-bold">Beringin 14</h1>
            <p className="text-sm text-gray-600">RT 14 RW 03 Keroncong Permai</p>
          </div>
        </div>

        {/* Desktop menu */}
        {pathname.startsWith('/admin') ? (
          <div className="hidden space-x-4 text-sm md:flex">
            <Link href="/admin">Admin Panel</Link>
            <Link href="/admin/berita">Berita & Kegiatan</Link>
            <Link href="/admin/galeri">Galeri Foto</Link>
            <Link href="/admin/struktur">Struktur Organisasi</Link>
            <Link href="/admin/pengaduan">Pengaduan Warga</Link>
            <Link href="/admin/polling">Polling Musyawarah</Link>
            {isLogin && (
              <button
                onClick={handlerLogout}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        ) : (
          <div className="hidden space-x-4 text-sm md:flex">
            <Link href="/">Beranda</Link>
            <Link href="/berita">Berita</Link>
            <span className="text-gray-400 cursor-not-allowed">(Coming Soon) Galeri</span>
            <Link href="/struktur">Struktur</Link>
            <span className="text-gray-400 cursor-not-allowed">(Coming Soon) Pengaduan</span>
            <span className="text-gray-400 cursor-not-allowed">(Coming Soon) Polling</span>
          </div>
        )}

        {/* Burger button */}
        <button
          className="flex flex-col items-center justify-center w-8 h-8 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-black mb-1 transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black mb-1 transition-all ${open ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="px-4 pb-4 bg-white shadow-md md:hidden">
          <div className="flex flex-col space-y-2 text-sm">
            {pathname.startsWith('/admin') ? (
              <>
                <Link href="/admin" onClick={() => setOpen(false)}>Admin Panel</Link>
                <Link href="/admin/berita" onClick={() => setOpen(false)}>Berita & Kegiatan</Link>
                <Link href="/admin/galeri" onClick={() => setOpen(false)}>Galeri Foto</Link>
                <Link href="/admin/struktur" onClick={() => setOpen(false)}>Struktur Organisasi</Link>
                <Link href="/admin/pengaduan" onClick={() => setOpen(false)}>Pengaduan Warga</Link>
                <Link href="/admin/polling" onClick={() => setOpen(false)}>Polling Musyawarah</Link>
                {isLogin && (
                  <button
                    onClick={handlerLogout}
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                )}
              </>
            ) : (
              <>
                <Link href="/" onClick={() => setOpen(false)}>Beranda</Link>
                <Link href="/berita" onClick={() => setOpen(false)}>Berita</Link>
                <span className="text-gray-400 cursor-not-allowed">(Coming Soon) Galeri</span>
                <Link href="/struktur" onClick={() => setOpen(false)}>Struktur</Link>
                <span className="text-gray-400 cursor-not-allowed">(Coming Soon) Pengaduan</span>
                <span className="text-gray-400 cursor-not-allowed">(Coming Soon) Polling</span>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
