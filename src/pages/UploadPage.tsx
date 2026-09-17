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
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Upload Existing CV</h1>
        <p className="text-gray-400">
          We'll parse your PDF, DOCX, or text and accurately extract your data into the ATS builder.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-xl bg-gray-900 p-1 border border-gray-800">
          <button
            onClick={() => setMode('file')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'file'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileUp className="w-4 h-4" />
            Upload File (PDF / DOCX)
          </button>
          <button
            onClick={() => setMode('text')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'text'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Paste Text
          </button>
        </div>
      </div>

      {mode === 'file' ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
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
              <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
              <p className="text-white font-medium text-lg">{file.name}</p>
              <p className="text-gray-400 mt-2 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FileUp className="w-12 h-12 text-gray-500 mb-4" />
              <p className="text-white font-medium text-lg mb-2">Drag & drop your file here</p>
              <p className="text-gray-400 text-sm">Supported formats: PDF, DOCX, DOC (Max 15MB)</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Paste your complete CV text below
          </label>
          <textarea
            rows={12}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
            placeholder="Paste your CV content here (Name, Contact, Experience, Education, Skills, Projects...)"
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
        </div>
      )}

      {(file || (mode === 'text' && rawText.trim().length > 0)) && (
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => {
              setFile(null)
              setRawText('')
            }}
            className="px-6 py-2 rounded-lg font-medium text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg shadow-blue-900/30"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <File className="w-5 h-5" />}
            {loading ? 'Analyzing & Extracting with AI...' : 'Extract Data & Open Builder'}
          </button>
        </div>
      )}
    </div>
  )
}