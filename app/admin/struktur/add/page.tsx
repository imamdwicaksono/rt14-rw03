// 'use client'

// import { useEffect, useState } from 'react'
// import Image from 'next/image'
// import { supabase } from '@/lib/supabase'
// import { v4 as uuidv4 } from 'uuid'
// import { Struktur } from '@/types/Struktur'

// export default function AdminStrukturPage() {
//   const [struktur, setStruktur] = useState<Struktur[]>([])
//   const [form, setForm] = useState({ nama: '', jabatan: '', foto: null as File | null })
//   const [loading, setLoading] = useState(false)

//   const fetchStruktur = async () => {
//     const { data, error } = await supabase.from('struktur_rt').select('*').order('id')
//     if (!error) setStruktur(data || [])
//   }

//   useEffect(() => {
//     fetchStruktur()
//   }, [])

//   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setForm((prev) => ({ ...prev, foto: e.target.files![0] }))
//     }
//   }

//   const handleSubmit = async () => {
//     setLoading(true)
//     let foto_url = ''
//     if (form.foto) {
//       const fileExt = form.foto.name.split('.').pop()
//       const fileName = `${uuidv4()}.${fileExt}`
//       const { data, error } = await supabase.storage.from('struktur').upload(fileName, form.foto)
//       if (error) {
//         console.error('Upload gagal:', error)
//       } else {
//         foto_url = `https://<PROJECT_ID>.supabase.co/storage/v1/object/public/struktur/${fileName}`
//       }
//     }

//     const { error: insertError } = await supabase.from('struktur_rt').insert({
//       nama: form.nama,
//       jabatan: form.jabatan.nama_jabatan,
//       foto_url,
//     })
//     if (!insertError) {
//       setForm({ nama: '', jabatan: '', foto: null })
//       fetchStruktur()
//     }
//     setLoading(false)
//   }

//   const handleDelete = async (id: number) => {
//     await supabase.from('struktur_organisasi').delete().eq('id', id)
//     fetchStruktur()
//   }

//   return (
//     <div className="max-w-3xl px-4 py-8 mx-auto">
//       <h1 className="mb-4 text-xl font-bold">Manajemen Struktur Organisasi</h1>

//       <div className="mb-6 space-y-2">
//         <input
//           type="text"
//           name="nama"
//           placeholder="Nama"
//           value={form.nama}
//           onChange={handleInput}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <input
//           type="text"
//           name="jabatan"
//           placeholder="Jabatan"
//           value={form.jabatan}
//           onChange={handleInput}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFile}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
//         >
//           {loading ? 'Menyimpan...' : 'Tambah'}</button>
//       </div>

//       <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
//         {struktur.map((item) => (
//           <div key={item.id} className="p-3 text-center bg-white border rounded shadow">
//             {item.foto_url && (
//               <Image
//                 src={item.foto_url}
//                 alt={item.nama}
//                 width={100}
//                 height={100}
//                 className="object-cover mx-auto rounded-full"
//               />
//             )}
//             <h2 className="mt-2 font-semibold">{item.nama}</h2>
//             <p className="text-sm text-gray-500">{item.jabatan}</p>
//             <button
//               onClick={() => handleDelete(item.id)}
//               className="mt-2 text-sm text-red-500 hover:underline"
//             >Hapus</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
