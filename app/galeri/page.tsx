"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Galeri from "@/components/Galeri";

interface GaleriItem {
  id: number;
  url: string;
  index: string;
  keterangan: string;
  created_at: string;
}

export default function GaleriPage() {
  const [galeri, setGaleri] = useState<GaleriItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);

  useEffect(() => {
    const loadGaleri = async () => {
      const { data, error } = await supabase
        .from("galeri")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setGaleri(data as GaleriItem[]);
    };

    loadGaleri();
  }, []);

  // daftar index unik
  const indexList = Array.from(new Set(galeri.map(f => f.index)));

  // file sesuai index terpilih
  const selectedFiles = selectedIndex
    ? galeri.filter(f => f.index === selectedIndex)
    : [];

  // fungsi ambil thumbnail random per index
  const getRandomThumbnail = (k: string) => {
    const files = galeri.filter(f => f.index === k && f.url);
    if (files.length === 0) return "/placeholder.jpg"; // fallback
    const randomIndex = Math.floor(Math.random() * files.length);
    return files[randomIndex].url;
  };

  return (
    <div className="p-4">
      {!selectedIndex ? (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Galeri</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {indexList.map(k => (
              <div
                key={k}
                className="transition bg-white rounded-lg shadow cursor-pointer hover:shadow-lg"
                onClick={() => setSelectedIndex(k)}
              >
                <div className="w-full h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={getRandomThumbnail(k)}
                    alt={k}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{galeri.find(f => f.index === k)?.keterangan}</h3>
                  <p className="text-sm text-gray-500">
                    {galeri.filter(f => f.index === k).length} file
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button
            className="mb-4 text-sm text-gray-600 underline"
            onClick={() => setSelectedIndex(null)}
          >
            ← Kembali
          </button>
          <h2 className="mb-2 text-xl font-semibold">{galeri.find(f => f.index === selectedIndex)?.keterangan}</h2>
          <Galeri search={selectedIndex} />
        </div>
      )}
    </div>
  );
}
