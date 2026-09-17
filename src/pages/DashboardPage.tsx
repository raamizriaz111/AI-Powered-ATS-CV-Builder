import { useCVStore } from '../store/cvStore'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Upload, Copy, Trash2, Edit } from 'lucide-react'
import ATSScoreCard from '../components/ATSScoreCard'
import { calculateATS } from '../lib/atsEngine'

export default function DashboardPage() {
  const { cvList, createCV, duplicateCV, deleteCV, loadCV } = useCVStore()
  const navigate = useNavigate()

  const handleCreate = () => {
    createCV()
    navigate('/builder')
  }

  const handleEdit = (id: string) => {
    loadCV(id)
    navigate(`/builder?id=${id}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-6 sm:mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">My CVs</h1>
          <p className="text-gray-400 text-sm mt-1">Total: {cvList.length}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/upload" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium">
            <Upload className="w-4 h-4" /> Upload CV
          </Link>
          <button onClick={handleCreate} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium shadow-md shadow-blue-900/30">
            <Plus className="w-4 h-4" /> Create New CV
          </button>
        </div>
      </div>

      {cvList.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-gray-900 border border-gray-800 rounded-xl px-4">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileTextIcon className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-white mb-2">No CVs yet</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">Create your first CV or upload an existing one to get started.</p>
          <button onClick={handleCreate} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
            Create CV
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cvList.map(cv => {
            const result = calculateATS(cv, '')
            return (
              <div key={cv.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col gap-4 group hover:border-gray-700 transition-colors">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white text-base sm:text-lg truncate" title={cv.name}>{cv.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Edited {new Date(cv.updatedAt).toLocaleDateString()}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-gray-800 text-[11px] text-gray-300 rounded border border-gray-700/50">{cv.settings.template}</span>
                  </div>
                  <ATSScoreCard result={result} compact />
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-auto pt-3 border-t border-gray-800">
                  <button onClick={() => handleEdit(cv.id)} className="flex justify-center items-center gap-1.5 py-2 text-xs text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors"><Edit className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => duplicateCV(cv.id)} className="flex justify-center items-center gap-1.5 py-2 text-xs text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors"><Copy className="w-3.5 h-3.5" /> Copy</button>
                  <button onClick={() => { if(confirm('Delete this CV?')) deleteCV(cv.id) }} className="flex justify-center items-center gap-1.5 py-2 text-xs text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded transition-colors"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function FileTextIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
}
