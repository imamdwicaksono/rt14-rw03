"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {KategoriPengaduan } from "@/types/Pengaduan";
import HeaderContent from "@/components/header_content";



export default function PengaduanForm() {
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    kontak: "",
    kategori: "",
    isi: "",
    status: 1,
  });

  const [kategoriList, setKategoriList] = useState<KategoriPengaduan[]>([]);

  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchKategori = async () => {
    const { data, error } = await supabase.from("kategori_pengaduan").select("*");
    if (data) {
        setKategoriList(data);
    } else {
        console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nama || !form.alamat || !form.kontak || !form.kategori || !form.isi) {
      alert("Semua field harus diisi!");
      return;
    }

    const { data, error } = await supabase.from("pengaduan").insert([
      {
        ...form,
        status: 1,
      },
    ]);

    if (!error) {
      setSuccess(true);
      setForm({
        nama: "",
        alamat: "",
        kontak: "",
        kategori: "",
        status: 1,
        isi: "",
      });
    }
  };

  useEffect(() => { 
    fetchKategori();
  }, []);

  return (
    <div className="max-w-full mx-auto">
      <HeaderContent
          h1="📮 Formulir Pengaduan"
          p="Silakan isi formulir berikut untuk mengajukan pengaduan."
        />

      {success && (
        <div className="p-2 mb-4 text-green-800 bg-green-100 rounded">
          Pengaduan berhasil dikirim. jika ada pertanyaan, silakan hubungi pengurus RT/RW setempat.
          status pengaduan akan diperbarui melalui WhatsApp.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nama"
          placeholder="Nama Lengkap"
          value={form.nama}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="alamat"
          placeholder="Alamat / Blok"
          value={form.alamat}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="kontak"
          placeholder="No. WA / Telepon"
          value={form.kontak}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Pilih Kategori --</option>
          {kategoriList.map((kategori) => (
            <option key={kategori.id} value={kategori.id}>
              {kategori.nama}
            </option>
          ))}
        </select>
        <textarea
          name="isi"
          placeholder="Isi Pengaduan"
          value={form.isi}
          onChange={handleChange}
          rows={5}
          className="w-full p-2 border rounded"
          required
        ></textarea>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Kirim Pengaduan
        </button>
      </form>
    </div>
  );
}
