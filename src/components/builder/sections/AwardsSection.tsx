import { useCVStore } from '../../../store/cvStore'
import { generateId } from '../../../lib/utils'
import { ChevronDown, ChevronUp, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'

export default function AwardsSection() {
  const { currentCV, updateCV } = useCVStore()
  const [openId, setOpenId] = useState<string | null>(null)
  
  if (!currentCV) return null

  const addAward = () => {
    const id = generateId()
    updateCV(cv => cv.awards.push({ id, title: '', issuer: '', date: '', description: '' }))
    setOpenId(id)
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Awards</h2>
      <div className="space-y-4">
        {currentCV.awards.map((award, index) => (
          <div key={award.id} className="border border-gray-800 bg-gray-900 rounded-lg overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/50"
              onClick={() => setOpenId(openId === award.id ? null : award.id)}
            >
              <h4 className="font-medium text-white">{award.title || '(New Award)'}</h4>
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); updateCV(cv => { cv.awards.splice(index, 1) }) }} className="p-1 text-gray-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
                {openId === award.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </div>
            
            {openId === award.id && (
              <div className="p-4 border-t border-gray-800 space-y-4 bg-gray-950/50 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 col-span-2"><label className="text-xs text-gray-400">Title</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={award.title} onChange={e => updateCV(cv => { cv.awards[index].title = e.target.value })} /></div>
                <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Issuer</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={award.issuer} onChange={e => updateCV(cv => { cv.awards[index].issuer = e.target.value })} /></div>
                <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Date</label><input type="text" placeholder="YYYY-MM or Year" className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={award.date || ''} onChange={e => updateCV(cv => { cv.awards[index].date = e.target.value })} /></div>
                <div className="flex flex-col gap-1.5 col-span-2"><label className="text-xs text-gray-400">Description</label><textarea className="px-3 py-2 bg-gray-800 rounded text-sm text-white" rows={2} value={award.description} onChange={e => updateCV(cv => { cv.awards[index].description = e.target.value })} /></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={addAward} className="w-full py-3 border border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 flex justify-center items-center gap-2">
        <Plus className="w-5 h-5" /> Add Award
      </button>
    </div>
  )
}