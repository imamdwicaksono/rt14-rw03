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
    supabase
      .from('polls')
      .select('*')
      .eq('is_active', true)
      .gt('expired_at', new Date().toISOString())
      .then(({ data }) => {
        if (data) {
          // data is an array of polls
          const filtered = data.filter((poll: any) => {
            if (poll.expired_at != null) {
              const expired = new Date(poll.expired_at).getTime();
              const now = Date.now();
              return expired > now + 1000; // expired at least 1 second after now
            }
            return true;
          });
          setPolls(filtered);
        } else {
          setPolls([]);
        }
      });
  }, []);

  if (polls.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-md p-6 text-center bg-white shadow-lg rounded-xl">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">Polling tidak ada atau belum aktif.</h2>
          <p className="text-gray-500">Silakan cek kembali beberapa saat / atau refresh kembali.</p>
          <Link href="/" className="text-blue-500 hover:underline">Kembali ke halaman utama</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <HeaderContent
        h1="🗳️ Daftar Polling"
        p="List polling yang sedang aktif."
      />
      <div className="hidden space-y-4 md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr><th>Judul</th><th>Tipe</th><th>Tanggal</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {polls.map((p: any) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.type}</td>
                <td>{new Date(p.created_at).toLocaleDateString()}</td>
                <td>
                  <Link href={`/polling/${p.link_code}`} className="text-blue-600 underline">{`/polling/${p.link_code}`}</Link>
                </td>
                <td>
                  <Link href={`/admin/polls/${p.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile version */}
        <div className="mt-6 bg-white md:hidden">
        {polls.map((p: any) => (
          <div key={p.id} className="flex flex-col gap-2 p-4 border rounded">
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
          <span className="font-semibold">Link: </span>
          <Link href={`/polling/${p.link_code}`} className="text-blue-600 underline">{`/polling/${p.link_code}`}</Link>
        </div>
        <div>
          <Link href={`/admin/polling/${p.id}`} className="text-blue-600 underline">Edit</Link>
        </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}