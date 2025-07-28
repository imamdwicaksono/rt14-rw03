export type Struktur = {
  id: number
  nama: string
  foto: string
  jabatan?: {
    nama_jabatan: string
    status: boolean
  }
}