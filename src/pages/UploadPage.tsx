import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadCV, parseCVText } from '../lib/api'
import { useNavigate } from 'react-router-dom'
import { useCVStore } from '../store/cvStore'
import { FileUp, File, CheckCircle2, Loader2, FileText } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [rawText, setRawText] = useState('')
  const [mode, setMode] = useState<'file' | 'text'>('file')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { importCV } = useCVStore()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    maxFiles: 1
  })

  const handleUpload = async () => {
    setLoading(true)
    try {
      let data
      if (mode === 'file') {
        if (!file) {
          toast.error('Please select a file first')
          setLoading(false)
          return
        }
        data = await uploadCV(file)
      } else {
        if (!rawText.trim() || rawText.trim().length < 20) {
          toast.error('Please paste your CV text (at least 20 characters)')
          setLoading(false)
          return
        }
        data = await parseCVText(rawText)
      }

      if (!data) {
        throw new Error('No data received from CV parser')
      }

      importCV(data)
      toast.success('CV extracted and imported successfully!', { duration: 4000 })
      navigate('/builder')
    } catch (e: any) {
      const errorMsg =
        e.response?.data?.error ||
        e.message ||
        'Failed to parse and extract CV. Please ensure the document is readable.'
      toast.error(errorMsg, { duration: 6000 })
      console.error('Extraction error:', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-16">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Upload Existing CV</h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-lg mx-auto">
          We'll parse your PDF, DOCX, or pasted text and accurately extract your data into the ATS builder.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="flex w-full max-w-md rounded-xl bg-gray-900 p-1 border border-gray-800">
          <button
            onClick={() => setMode('file')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              mode === 'file'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Upload File</span>
          </button>
          <button
            onClick={() => setMode('text')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              mode === 'text'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Paste Text</span>
          </button>
        </div>
      </div>

      {mode === 'file' ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-900/10'
              : file
              ? 'border-green-500 bg-green-900/10'
              : 'border-gray-700 hover:border-gray-500 bg-gray-900'
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mb-3" />
              <p className="text-white font-medium text-base sm:text-lg break-all">{file.name}</p>
              <p className="text-gray-400 mt-1 text-xs sm:text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FileUp className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mb-3" />
              <p className="text-white font-medium text-base sm:text-lg mb-1">Upload or Drag & Drop CV</p>
              <p className="text-gray-400 text-xs sm:text-sm">Supported formats: PDF, DOCX, DOC (Max 15MB)</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
            Paste your complete CV text below
          </label>
          <textarea
            rows={10}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm font-mono resize-y"
            placeholder="Paste your CV content here (Name, Contact, Experience, Education, Skills, Projects...)"
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
        </div>
      )}

      {(file || (mode === 'text' && rawText.trim().length > 0)) && (
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => {
              setFile(null)
              setRawText('')
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium text-xs sm:text-sm text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 transition-colors order-2 sm:order-1"
          >
            Clear
          </button>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg shadow-blue-900/30 order-1 sm:order-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <File className="w-4 h-4" />}
            <span>{loading ? 'Analyzing with AI...' : 'Extract Data & Open Builder'}</span>
          </button>
        </div>
      )}
    </div>
  )
}
