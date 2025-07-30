export type Pengaduan = {
  id: number;
  nama: string;
  alamat: string;
  kontak: string;
  kategori: string;
  isi: string;
  status: StatusPengaduan
  created_at: string;
};

export type StatusPengaduan = {
  id: number;
  nama: string;
};

export type KategoriPengaduan = {
    id: number;
    nama: string;
};