import { useState } from 'react'
import { Download, FileText, File, Loader2 } from 'lucide-react'
import { useCVStore } from '../store/cvStore'
import { generatePDF, generateDOCX } from '../lib/api'
import { generateClientPDF } from '../lib/pdfClientExport'
import { toast } from 'react-hot-toast'

export default function DownloadMenu() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<'pdf' | 'docx' | null>(null)
  const cv = useCVStore(state => state.currentCV)

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDownload = async (type: 'pdf' | 'docx') => {
    if (!cv) return
    setLoading(type)
    const toastId = toast.loading(`Generating your ${type.toUpperCase()}...`)

    try {
      if (type === 'pdf') {
        // Try server-side generation first
        try {
          const blob = await generatePDF(cv)
          downloadBlob(blob, `${(cv.personal?.name || 'CV').replace(/\s+/g, '_')}_CV.pdf`)
          toast.success('Downloaded PDF successfully!', { id: toastId })
          setOpen(false)
          return
        } catch (serverErr) {
          console.warn('Server PDF generation unavailable, using client-side engine...', serverErr)
        }

        // Seamless high-fidelity client-side PDF export fallback
        await generateClientPDF(cv)
        toast.success('Downloaded PDF successfully!', { id: toastId })
        setOpen(false)
      } else {
        // DOCX download
        const blob = await generateDOCX(cv)
        downloadBlob(blob, `${(cv.personal?.name || 'CV').replace(/\s+/g, '_')}_CV.docx`)
        toast.success('Downloaded DOCX successfully!', { id: toastId })
        setOpen(false)
      }
    } catch (e: any) {
      console.error('Download error:', e)
      // Ultimate fallback for PDF: trigger browser print
      if (type === 'pdf') {
        toast.error('Direct download failed. Opening print dialog...', { id: toastId })
        window.print()
      } else {
        toast.error(`Failed to generate ${type.toUpperCase()}`, { id: toastId })
      }
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-md shadow-blue-900/20"
      >
        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span>Export</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-52 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => handleDownload('pdf')} 
              disabled={!!loading}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-xs sm:text-sm text-gray-200 hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-2.5">
                <File className="w-4 h-4 text-red-400" />
                <div>
                  <div className="font-medium">Download PDF</div>
                  <div className="text-[11px] text-gray-400">ATS-Optimized A4</div>
                </div>
              </div>
              {loading === 'pdf' && <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />}
            </button>

            <button 
              onClick={() => handleDownload('docx')} 
              disabled={!!loading}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-xs sm:text-sm text-gray-200 hover:bg-gray-800 hover:text-white border-t border-gray-800 transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="font-medium">Download DOCX</div>
                  <div className="text-[11px] text-gray-400">Editable Word format</div>
                </div>
              </div>
              {loading === 'docx' && <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
