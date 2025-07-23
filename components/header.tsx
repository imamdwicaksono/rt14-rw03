"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'

export default function HeaderBar() {
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState<import('@supabase/supabase-js').User | null>(null);
    const router = useRouter();

    const pathname = usePathname();

    const handlerLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/auth') // redirect ke halaman login admin
        setOpen(false); // tutup menu jika sedang terbuka
    }

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsLogin(true);
                setUser(session.user);
            } else {
                setIsLogin(false);
                setUser(null);
            }
        }
        checkSession();
    }, []);

    return (
        <nav className="bg-white shadow-md">
            <div className="w-[90%] mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex justify-center items-center gap-3">
                    <Image src="/icon/beringin14_icon.png" alt="Icon" width={48} height={48} className="rounded-full" />
                    <div>
                        <h1 className="text-2xl font-bold">Beringin 14</h1>
                        <p className="text-sm text-gray-600">RT 14 RW 03 Keroncong Permai</p>
                    </div>
                </div>
                {/* Desktop menu */}
                {pathname.startsWith('/admin') ? (
                    <div className="hidden md:flex space-x-4 text-sm">
                        <Link href="/admin">Admin Panel</Link>
                        <Link href="/admin/berita">Berita & Kegiatan</Link>
                        <Link href="/admin/galeri">Galeri Foto</Link>
                        <Link href="/admin/struktur">Struktur Organisasi</Link>
                        <Link href="/admin/pengaduan">Pengaduan Warga</Link>
                        <Link href="/admin/polling">Polling Musyawarah</Link>
                        {isLogin && (
                            <button
                                onClick={handlerLogout}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="hidden md:flex space-x-4 text-sm">
                        <Link href="/">Beranda</Link>
                        <Link href="/berita">Berita</Link>
                        <Link href="/galeri">Galeri</Link>
                        <Link href="/struktur">Struktur</Link>
                        <Link href="/pengaduan">Pengaduan</Link>
                        <Link href="/polling">Polling</Link>
                    </div>
                )}
                {/* Burger button */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8"
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
                pathname.startsWith('/admin') ? (
                    <div className="md:hidden px-4 pb-4">
                        <div className="flex flex-col space-y-2 text-sm">
                            <Link href="/admin" onClick={() => setOpen(false)}>Admin Panel</Link>
                            <Link href="/admin/berita" onClick={() => setOpen(false)}>Berita & Kegiatan</Link>
                            <Link href="/admin/galeri" onClick={() => setOpen(false)}>Galeri Foto</Link>
                            <Link href="/admin/struktur" onClick={() => setOpen(false)}>Struktur Organisasi</Link>
                            <Link href="/admin/pengaduan" onClick={() => setOpen(false)}>Pengaduan Warga</Link>
                            <Link href="/admin/polling" onClick={() => setOpen(false)}>Polling Musyawarah</Link>
                            
                            {isLogin && (
                                <button
                                    onClick={handlerLogout}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="md:hidden px-4 pb-4">
                        <div className="flex flex-col space-y-2 text-sm">
                            <Link href="/" onClick={() => setOpen(false)}>Beranda</Link>
                            <Link href="/berita" onClick={() => setOpen(false)}>Berita</Link>
                            <Link href="/galeri" onClick={() => setOpen(false)}>Galeri</Link>
                            <Link href="/struktur" onClick={() => setOpen(false)}>Struktur</Link>
                            <Link href="/pengaduan" onClick={() => setOpen(false)}>Pengaduan</Link>
                            <Link href="/polling" onClick={() => setOpen(false)}>Polling</Link>
                        </div>
                    </div>
                )
            )}
        </nav>
    );
}
