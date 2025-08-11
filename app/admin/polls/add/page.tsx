'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import HeaderContent from '@/components/header_content';

export default function FormTambahPolling() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<string[]>(['']);
  const [type, setType] = useState('single');
  const [expiredAt, setExpireAt] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();
    const link_code = Math.random().toString(36).substring(2, 8).toUpperCase();
    await supabase.from('polls').insert({ title, description, options, type, link_code });
    router.push('/admin/polls');
  }

  return (
    <>
      <HeaderContent
        h1="🗳️ Polling Baru"
        p="Buat polling baru untuk warga Beringin 14."
      />
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="max-w-md p-6 mx-auto space-y-4 bg-white rounded shadow">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Judul Polling"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Deskripsi Polling"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
          <input type="datetime-local"
            value={expiredAt}
            onChange={e => setExpireAt(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          >
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
          </select>
          {options.map((opt, i) => (
            <input
              key={i}
              value={opt}
              onChange={e => {
                const newOpts = [...options];
                newOpts[i] = e.target.value;
                setOptions(newOpts);
              }}
              placeholder={`Opsi ${i + 1}`}
              className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:ring"
            />
          ))}
          <button
            type="button"
            onClick={() => setOptions([...options, ''])}
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            + Tambah Opsi
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Simpan Polling
          </button>
        </form>
      </div>
    </>
  );
}