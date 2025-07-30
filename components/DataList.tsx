import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import HeaderContent from "./header_content";

type Column = {
  key: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: any, row: any) => React.ReactNode;
};

type DataListProps = {
  title?: string;
  subtitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchData: (page: number, size: number) => Promise<any[]>;
  columns: Column[];
  pageSize?: number;
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function DataList({
  title,
  subtitle,
  fetchData,
  columns,
  pageSize = 10,
}: DataListProps) {
  const isMobile = useIsMobile();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    const newData = await fetchData(page, pageSize);
    if (newData.length > 0) {
      setData((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className="max-w-6xl p-4 mx-auto">
      {title && <HeaderContent
              h1={title}
              p={subtitle || ""}
            />}

      {isMobile ? (
        <InfiniteScroll
          dataLength={data.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<p className="text-center">Memuat...</p>}
          endMessage={<p className="text-center text-gray-500">Semua data ditampilkan.</p>}
        >
          {data.map((row, idx) => (
            <div key={idx} className="p-4 mb-3 bg-white border rounded shadow">
              {columns.map((col) => (
                <div key={col.key} className="mb-1">
                  <strong>{col.label}: </strong>
                  <span>
                    {col.format ? col.format(row[col.key], row) : row[col.key]}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white border">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="p-2 text-left border">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {columns.map((col) => (
                    <td key={col.key} className="p-2 border">
                      {col.format ? col.format(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {hasMore && (
            <div className="mt-4 text-center">
              <button
                onClick={loadMore}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Muat Lebih Banyak
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
