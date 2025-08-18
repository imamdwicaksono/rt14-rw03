/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useSupabaseGaleri(limit: number = 10, page: number = 0) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const from = page * limit;
      const to = from + limit - 1;

      const { data: rows, error } = await supabase
        .from("galeri")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, to);

      if (!error && rows) {
        if (page === 0) {
          setData(rows);
        } else {
          setData(prev => [...prev, ...rows]);
        }
        setHasMore(rows.length === limit);
      }

      setLoading(false);
    }

    load();
  }, [limit, page]);

  return { data, loading, hasMore };
}
