/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import HeaderContent from '@/components/header_content';

export default function IndexAdmin() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [polls, setPolls] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('polls').select('*').then(({ data }) => setPolls(data || []));
  }, []);

  function handleDelete(id: number) {
    supabase.from('polls').delete().eq('id', id).then(() => {
      setPolls(polls.filter(p => p.id !== id));
    });
  }

  function handleDuplicate(id: number) {
    const poll = polls.find(p => p.id === id);
    if (poll) {
      supabase.from('polls').insert({ ...poll, id: undefined }).then(({ data }) => {
        setPolls([...polls, data]);
      });
    }
  }

  function handleActivate(id: number) {
    supabase.from('polls').update({ is_active: true }).eq('id', id).then(() => {
      setPolls(polls.map(p => (p.id === id ? { ...p, is_active: true } : p)));
    });
  }

  function handleInActivate(id: number) {
    supabase.from('polls').update({ is_active: false }).eq('id', id).then(() => {
      setPolls(polls.map(p => (p.id === id ? { ...p, is_active: false } : p)));
    });
  }

  return (
    <div className="max-w-full mx-auto">
      <HeaderContent
        h1="Daftar Polling"
        p="Kelola polling yang telah dibuat."
      />
      <div className="hidden space-y-4 md:block">
        <Link href="/admin/polling/add">+ Tambah Polling</Link>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
          <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Judul</th>
          <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Tipe</th>
          <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Tanggal</th>
          <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Expired At</th>
          <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Active</th>
          <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Link</th>
          <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {polls.map((p: any) => (
          <tr key={p.id} className="transition hover:bg-gray-50">
            <td className="px-4 py-2">{p.title}</td>
            <td className="px-4 py-2">{p.type}</td>
            <td className="px-4 py-2">{new Date(p.created_at).toLocaleDateString()}</td>
            <td className="px-4 py-2">{p.expired_at ? new Date(p.expired_at).toLocaleDateString() : '-'}</td>
            <td className="px-4 py-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {p.is_active ? 'Ya' : 'Tidak'}
              </span>
            </td>
            <td className="px-4 py-2">
              <Link href={`/polling/${p.link_code}`} className="text-blue-600 underline break-all">{`/polling/${p.link_code}`}</Link>
            </td>
            <td className="px-4 py-2 space-x-2">
              <Link href={`/admin/polling/${p.id}`} className="px-2 py-1 text-xs text-blue-700 transition bg-blue-100 rounded hover:bg-blue-200">Detail</Link>
              <Link href={`/admin/polling/edit/${p.id}`} className="px-2 py-1 text-xs text-blue-700 transition bg-blue-100 rounded hover:bg-blue-200">Edit</Link>
                <button
                type="button"
                onClick={() => {
                  if (window.confirm('Yakin ingin menghapus polling ini?')) {
                  handleDelete(p.id);
                  }
                }}
                className="px-2 py-1 text-xs text-red-700 transition bg-red-100 rounded hover:bg-red-200"
                >
                Hapus
                </button>
                <button
                type="button"
                onClick={() => {
                  if (window.confirm('Duplikat polling ini?')) {
                  handleDuplicate(p.id);
                  }
                }}
                className="px-2 py-1 text-xs text-green-700 transition bg-green-100 rounded hover:bg-green-200"
                >
                Duplikat
                </button>
              {p.is_active ? (
                <button type="button" onClick={() => handleInActivate(p.id)} className="px-2 py-1 text-xs text-yellow-700 transition bg-yellow-100 rounded hover:bg-yellow-200">Nonaktifkan</button>
              ) : (
                <button type="button" onClick={() => handleActivate(p.id)} className="px-2 py-1 text-xs text-blue-700 transition bg-blue-100 rounded hover:bg-blue-200">Aktifkan</button>
              )}
            </td>
          </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile version */}
      <Link href="/admin/polling/add" className="inline-block w-full px-4 py-2 text-center text-white bg-blue-500 rounde md:hidden">+ Tambah Polling</Link>
      <div className="mt-6 bg-white md:hidden">
        {polls.map((p: any) => (
          <div key={p.id} className="flex flex-col gap-2 p-4 mb-4 border rounded">
            <div>
              <span className="font-semibold">Judul: </span>{p.title}
            </div>
            <div>
              <span className="font-semibold">Tipe: </span>{p.type}
            </div>
            <div>
              <span className="font-semibold">Tanggal: </span>{new Date(p.created_at).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Expired At: </span>
              {p.expired_at ? new Date(p.expired_at).toLocaleDateString() : '-'}
            </div>
            <div>
              <span className="font-semibold">Active: </span>
              {p.is_active ? 'Ya' : 'Tidak'}
            </div>
            <div>
              <span className="font-semibold">Link: </span>
              <Link href={`/polling/${p.link_code}`} className="text-blue-600 underline">{`/polling/${p.link_code}`}</Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link href={`/admin/polling/${p.id}`} className="text-blue-600 underline">Edit</Link>
                <button
                type="button"
                onClick={() => {
                  if (window.confirm('Yakin ingin menghapus polling ini?')) {
                  handleDelete(p.id);
                  }
                }}
                className="text-red-600 underline"
                >
                Hapus
                </button>
                <br />
              <button type="button" onClick={() => handleDuplicate(p.id)} className="text-green-600 underline">Duplikat</button><br></br>
              {p.is_active ? (
                <button type="button" onClick={() => handleInActivate(p.id)} className="text-yellow-600 underline">Nonaktifkan</button>
              ) : (
                <button type="button" onClick={() => handleActivate(p.id)} className="text-blue-600 underline">Aktifkan</button>
              )}
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}