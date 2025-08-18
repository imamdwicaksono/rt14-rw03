"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { listAllFiles } from "@/lib/supabase-utils";

export function useSupabaseFiles(bucket: string, folder: string = "", limit: number = 100) {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const paths = await listAllFiles("berita", "17agustus2025");
      console.log("Semua file ditemukan:", paths);

      const urls = paths.map(p => {
        const { data } = supabase.storage.from("berita").getPublicUrl(p);
        return { name: p, url: data.publicUrl };
      });

      setFiles(urls);
    };
    load();
  }, []);
  
  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(bucket+"/"+folder, { limit });

      const fileList = data ? data.map(file => {
        const { data: { publicUrl } } = supabase
          .storage
          .from(bucket)
          .getPublicUrl(`${folder ? folder + "/" : ""}${file.name}`);

        return { name: file.name, url: publicUrl };
      }) : [];

      setFiles(fileList || []);
      setLoading(false);
    };

    loadFiles();
  }, [bucket, folder, limit]);

  return { files, loading };
}
