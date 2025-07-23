// File: app/admin/layout.tsx
import Link from 'next/link'
import './admin.css' // optional: styling khusus admin

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h1 className="text-xl font-bold mb-6">🛠️ Admin Panel</h1>
        <nav className="space-y-2">
          <Link href="/admin" className="hover:underline">Dashboard</Link>
          <Link href="/admin/berita" className="hover:underline">Kelola Berita</Link>
          <Link href="/admin/galeri" className="hover:underline">Kelola Galeri</Link>
          <Link href="/admin/pengaduan" className="hover:underline">Pengaduan</Link>
          <Link href="/admin/polling" className="hover:underline">Polling</Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-700 text-sm">
          <Link href="/admin/auth" className="hover:underline">Logout</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {children}
      </main>
    </div>
  )
}
