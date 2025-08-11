'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import HeaderContent from '@/components/header_content';
import Link from 'next/link';

export default function FormVote() {
  const { link_code } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [poll, setPoll] = useState<any>(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    supabase
      .from('polls')
      .select('*')
      .eq('link_code', link_code)
      .eq('is_active', true)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          if (data.expired_at != null) {
            const expired = new Date(data.expired_at).getTime();
            const now = Date.now();
            if (expired > now + 1000) { // expired at least 1 second after now
              setPoll(data);
            } else {
              setPoll(null);
            }
          } else {
            setPoll(data);
          }
        } else {
          setPoll(null);
        }
      });
  }, [link_code]);

  async function handleVote() {
    const user_token = crypto.randomUUID();
    await supabase.from('votes').insert({ poll_id: poll.id, user_token, answer: JSON.stringify(answer) });
    alert('Terima kasih sudah voting!');
  }

  if (poll == null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-md p-6 text-center bg-white shadow-lg rounded-xl">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">Polling tidak ada atau belum aktif.</h2>
          <p className="text-gray-500">Silakan cek kembali link polling Anda.</p>
          <Link href="/polling" className="text-blue-500 hover:underline">Kembali ke halaman utama polling</Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <HeaderContent
      h1={`🗳️ ${poll.title}`}
      p={poll.description}
      />
      <div className="flex flex-col gap-3 p-4 mx-auto my-4 mt-6 bg-white rounded-lg shadow-md">
        {poll.options.length === 0 && <div className="p-4 text-center text-gray-500">Tidak ada opsi</div>}
        {poll.options.map((opt: string, i: number) => (
          <label
          key={i}
          className="flex items-center gap-2 p-3 transition border rounded-lg cursor-pointer hover:bg-gray-100"
          >
          <input
            type="radio"
            name="vote"
            value={opt}
            onChange={e => setAnswer(e.target.value)}
            className="accent-blue-600"
            checked={answer === opt}
          />
          <span className="text-base">{opt}</span>
          </label>
        ))}
      </div>
      <button
      onClick={handleVote}
      disabled={!answer}
      className="w-full px-4 py-2 font-semibold text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
      Vote
      </button>
    </div>
  );
}