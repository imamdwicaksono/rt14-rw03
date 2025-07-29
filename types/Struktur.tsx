export type Struktur = {
  id: number
  nama: string
  foto: string
  jabatan_id: number
  jabatan: {
    nama_jabatan: string
    status: boolean
    parent_id: number | null
    id: number
  }
  children?: Struktur[]
}