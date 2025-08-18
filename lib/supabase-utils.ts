"use client";

import { supabase } from "@/lib/supabase";

/**
 * Ambil semua file di bucket (rekursif, deep list)
 */
export async function listAllFiles(bucket: string, path: string = ""): Promise<string[]> {
  let allFiles: string[] = [];

  // ambil daftar file/folder di path
  const { data, error } = await supabase.storage.from(bucket).list(path, {
    limit: 1000,
  });

  

  if (error) {
    console.error("Error list:", error);
    return allFiles;
  }

  if (!data) return allFiles;

  for (const item of data) {
    if (item.id) {
      // ini file
      const fullPath = path ? `${path}/${item.name}` : item.name;
      allFiles.push(fullPath);
    } else {
      // ini folder → scan rekursif
      const subPath = path ? `${path}/${item.name}` : item.name;
      const subFiles = await listAllFiles(bucket, subPath);
      allFiles = allFiles.concat(subFiles);
    }
  }

  return allFiles;
}
