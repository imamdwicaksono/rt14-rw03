import ImageCard from './ImageCard'

interface Photo {
  src: string
  title: string
}

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {photos.map((photo, index) => (
        <ImageCard key={index} src={photo.src} title={photo.title} />
      ))}
    </div>
  )
}
