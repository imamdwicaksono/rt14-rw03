"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Pengaduan } from "@/types/Pengaduan";
import DataList from "@/components/DataList";




export default function AdminPengaduan() {
  const [dataPengaduan, setDataPengaduan] = useState<Pengaduan[]>([]);

  useEffect(() => {
    // Fetch first page with default size on mount
    // fetchPengaduan(1, 10).then((result) => {
    //   setDataPengaduan(result);
    // });
  }, []);

  const fetchPengaduan = async (page: number, size: number): Promise<Pengaduan[]> => {
    const from = (page - 1) * size;
    const to = from + size - 1;
    const { data, error } = await supabase
      .from("pengaduan")
      .select(`
        *,
        kategori_pengaduan (
          id,
          nama
        ),
        status_pengaduan (
          id,
          nama
        )
      `)
      .order("created_at", { ascending: false })
      .range(from, to);

      console.log(`Fetched data: ${page} - ${size}`, data);
    return data ?? [];
  };

  return (
    <DataList
        title="📮 Daftar Pengaduan Warga"
        subtitle="Daftar pengaduan yang telah diajukan oleh warga Beringin 14."
        fetchData={fetchPengaduan}
        columns={[
            { key: "nama", label: "Nama" },
            { key: "alamat", label: "Alamat" },
            { key: "kontak", label: "Kontak" },
            {
              key: "kategori_pengaduan",
              label: "Kategori",
              format: (value) => value?.nama || "-",
            },
            { key: "isi", label: "Isi" },
            {
              key: "status_pengaduan",
              label: "Status",
              format: (value) => value?.nama || "-",
            },
            {
            key: "created_at",
            label: "Waktu",
            format: (v) => new Date(v).toLocaleString(),
            },
        ]}
        />
  );
}
