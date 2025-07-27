import Image from 'next/image'

export default function ImageCard({ src, title }: { src: string; title: string }) {
  return (
    <div className="overflow-hidden transition shadow-lg rounded-xl hover:shadow-xl">
      <Image
        src={src}
        alt={title}
        width={600}
        height={400}
        className="object-cover w-full h-60"
      />
      <div className="p-4 bg-white">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
    </div>
  )
}
