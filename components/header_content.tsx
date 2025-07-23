
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function HeaderContent({h1, p}: {h1: string, p: string}) {
    const pathname = usePathname()

    return (
        
        <div className="bg-white p-4 rounded-xl shadow text-center mb-4">
            {pathname.startsWith('/admin') ? (
                <div className="bg-gray-800 text-white p-4 rounded-xl shadow text-center">
                <h1 className="text-xl font-bold">🛠️ Admin Panel</h1>
                </div>
            ) : (
                <div className="flex justify-center items-center gap-3">
                    {/* <Image src="/icon.png" alt="Icon" width={48} height={48} className="rounded-full" /> */}
                </div>
            )}
            
            <div className="flex justify-center items-center gap-3">
                <div>
                <h1 className="text-2xl font-bold">{h1}</h1>
                <p className="text-sm text-gray-600">{p}</p>
                </div>
            </div>
        </div>
    )
}