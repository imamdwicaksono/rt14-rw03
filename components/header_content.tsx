
import { usePathname } from 'next/navigation'

export default function HeaderContent({h1, p}: {h1: string, p: string}) {
    const pathname = usePathname()

    return (
        
        <div className="p-4 mb-4 text-center bg-white shadow rounded-xl">
            {pathname.startsWith('/admin') ? (
                <div className="p-4 text-center text-white bg-gray-800 shadow rounded-xl">
                <h1 className="text-xl font-bold">🛠️ Admin Panel</h1>
                </div>
            ) : (
                <div className="flex items-center justify-center gap-3">
                    
                </div>
            )}
            
            <div className="flex items-center justify-center gap-3">
                <div>
                <h1 className="text-2xl font-bold">{h1}</h1>
                <p className="text-sm text-gray-600">{p}</p>
                </div>
            </div>
        </div>
    )
}