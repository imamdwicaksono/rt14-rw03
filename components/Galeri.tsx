"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import InfiniteScroll from "react-infinite-scroll-component";
import { Dialog } from "@/components/ui/Dialog"; // Removed DialogContent import
import { DialogContent } from "@/components/ui/DialogContent"; // Added import from the correct module
import { Button } from "@/components/ui/Button";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface GaleriRow {
  id: number;
  url: string;
  keterangan: string | null;
}

interface GaleriProps {
  search: string;
}

export default function Galeri({ search }: GaleriProps) {
  const [files, setFiles] = useState<GaleriRow[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selected, setSelected] = useState<GaleriRow | null>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const pageSize = 6;

  const fetchData = async (reset = false) => {
    const from = reset ? 0 : page * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("galeri")
      .select("*")
      .filter("index", "ilike", `%${search}%`)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error(error);
      return;
    }

    if (reset) {
      setFiles(data);
    } else {
      setFiles((prev) => [...prev, ...data]);
    }

    if (data.length < pageSize) setHasMore(false);
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    fetchData();
  };

  return (
    <div className="w-full">
      {isMobile ? (
        // 📱 Mobile → Infinite Scroll
        <InfiniteScroll
          dataLength={files.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={<p className="text-center">Loading...</p>}
          endMessage={<p className="text-center">No more files</p>}
        >
          <div className="grid grid-cols-1 gap-2 p-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="cursor-pointer"
                onClick={() => setSelected(file)}
              >
                {file.url && /\.(mp4|mov|webm)$/i.test(file.url) ? (
                <video
                    src={file.url}
                    className="rounded-lg shadow"
                    controls
                    autoPlay
                />
                ) : (
                <img
                    src={file.url || "/placeholder.jpg"}
                    alt={file.keterangan ?? ""}
                    className="rounded-lg shadow"
                />
                )}
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        // 💻 Web → Pagination
        <div>
          <div className="grid grid-cols-3 gap-4 p-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="cursor-pointer"
                onClick={() => setSelected(file)}
              >
                {file.url.match(/\.(mp4|mov|webm)$/i) ? (
                  <video
                    src={file.url}
                    controls
                    preload="metadata"
                    className="rounded-lg shadow"
                  />
                ) : (
                  <img
                    src={file.url}
                    alt={file.keterangan ?? ""}
                    className="rounded-lg shadow"
                  />
                )}
              </div>
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center my-4">
              <Button onClick={handleLoadMore}>Load More</Button>
            </div>
          )}
        </div>
      )}

      {/* 🔍 Zoom Modal */}
      {/* Dialog */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelected(null)} // klik overlay untuk tutup
        >
          <div
            className="relative max-h-[80vh] max-w-[90vw] rounded-lg"
            onClick={(e) => e.stopPropagation()} // klik di dalam modal tidak menutup
          >
            {selected.url.match(/\.(mp4|mov|webm)$/i) ? (
              <video
                src={selected.url}
                controls
                preload="metadata"
                className="max-h-[80vh] max-w-full rounded-lg"
              />
            ) : (
              <img
                src={selected.url}
                alt={selected.keterangan ?? ""}
                className="max-h-[80vh] max-w-full rounded-lg"
              />
            )}
            <button
              className="absolute flex items-center justify-center w-8 h-8 text-white bg-black bg-opacity-50 rounded-full top-2 right-2"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
