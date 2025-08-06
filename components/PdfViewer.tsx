'use client'

import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.3.31/build/pdf.worker.mjs`

export default function PdfViewer({ fileUrl }: { fileUrl: string }) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [windowWidth, setWindowWidth] = useState(800)
  const [showControls, setShowControls] = useState(false)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const goToPrevPage = () => setPageNumber(p => Math.max(p - 1, 1))
  const goToNextPage = () => setPageNumber(p => (numPages ? Math.min(p + 1, numPages) : p))

  const handleInteraction = () => {
    setShowControls(true)
    // Clear existing timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }
    // Set timer to auto-hide after 3 seconds
    idleTimerRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div
        className="relative"
        onClick={handleInteraction}
        onMouseMove={handleInteraction}
        onTouchStart={handleInteraction}
      >
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            width={windowWidth < 768 ? windowWidth - 40 : 600}
          />
        </Document>

        {/* Prev Button */}
        {showControls && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevPage()
              handleInteraction()
            }}
            disabled={pageNumber <= 1}
            className="absolute z-10 p-3 text-white -translate-y-1/2 bg-gray-800 rounded-full shadow-md left-2 top-1/2 hover:bg-gray-700 disabled:opacity-30"
          >
            ◀
          </button>
        )}

        {/* Next Button */}
        {showControls && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNextPage()
              handleInteraction()
            }}
            disabled={pageNumber >= (numPages || 0)}
            className="absolute z-10 p-3 text-white -translate-y-1/2 bg-gray-800 rounded-full shadow-md right-2 top-1/2 hover:bg-gray-700 disabled:opacity-30"
          >
            ▶
          </button>
        )}
      </div>

      {/* Page Info */}
      <div className="mt-4 text-sm text-gray-600">
        Page {pageNumber} of {numPages}
      </div>
    </div>
  )
}
