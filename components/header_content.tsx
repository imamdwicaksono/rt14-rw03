

export default function HeaderContent({h1, p}: {h1: string, p: string}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center mb-4">
        <div className="flex justify-center items-center gap-3">
            <div>
            <h1 className="text-2xl font-bold">{h1}</h1>
            <p className="text-sm text-gray-600">{p}</p>
            </div>
        </div>
    </div>
  )
}