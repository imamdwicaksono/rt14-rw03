"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'

export default function HeaderBar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex justify-center items-center gap-3">
                    <Image src="/icon/beringin14_icon.png" alt="Icon" width={48} height={48} className="rounded-full" />
                    <div>
                        <h1 className="text-2xl font-bold">Beringin 14</h1>
                        <p className="text-sm text-gray-600">RT 14 RW 03 Keroncong Permai</p>
                    </div>
                </div>
                {/* Desktop menu */}
                <div className="hidden md:flex space-x-4 text-sm">
                    <Link href="/">Beranda</Link>
                    <Link href="/berita">Berita</Link>
                    <Link href="/galeri">Galeri</Link>
                    <Link href="/struktur">Struktur</Link>
                    <Link href="/pengaduan">Pengaduan</Link>
                    <Link href="/polling">Polling</Link>
                </div>
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
            )}
        </nav>
    );
}
