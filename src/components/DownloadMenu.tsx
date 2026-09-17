import { useState } from 'react'
import { Download, FileText, File } from 'lucide-react'
import { useCVStore } from '../store/cvStore'
import { generatePDF, generateDOCX } from '../lib/api'
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
    try {
      const blob = type === 'pdf' ? await generatePDF(cv) : await generateDOCX(cv)
      downloadBlob(blob, `${cv.name}.${type}`)
      toast.success(`Downloaded ${type.toUpperCase()} successfully`)
      setOpen(false)
    } catch (e) {
      toast.error(`Failed to generate ${type.toUpperCase()}`)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <Download className="w-4 h-4" /> Export
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden">
            <button 
              onClick={() => handleDownload('pdf')} 
              disabled={!!loading}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-gray-200 hover:bg-gray-800 disabled:opacity-50"
            >
              <File className="w-4 h-4 text-red-400" />
              {loading === 'pdf' ? 'Generating...' : 'Download PDF'}
            </button>
            <button 
              onClick={() => handleDownload('docx')} 
              disabled={!!loading}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-gray-200 hover:bg-gray-800 border-t border-gray-800 disabled:opacity-50"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              {loading === 'docx' ? 'Generating...' : 'Download DOCX'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}