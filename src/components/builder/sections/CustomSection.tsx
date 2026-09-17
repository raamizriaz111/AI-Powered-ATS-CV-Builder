import { useCVStore } from '../../../store/cvStore'
import { generateId } from '../../../lib/utils'
import { Trash2, Plus } from 'lucide-react'

export default function CustomSection() {
  const { currentCV, updateCV } = useCVStore()
  if (!currentCV) return null

  const addSec = () => updateCV(cv => cv.customSections.push({ id: generateId(), title: 'New Section', entries: [] }))

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Custom Sections</h2>
      <div className="space-y-6">
        {currentCV.customSections.map((sec, index) => (
          <div key={sec.id} className="border border-gray-800 bg-gray-900 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <input className="bg-transparent text-lg font-bold text-white border-b border-transparent hover:border-gray-700 focus:border-blue-500 outline-none" value={sec.title} onChange={e => updateCV(cv => { cv.customSections[index].title = e.target.value })} />
              <button onClick={() => updateCV(cv => { cv.customSections.splice(index, 1) })} className="text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
            </div>
            
            <div className="space-y-2">
              {sec.entries.map((entry, eIndex) => (
                <div key={entry.id} className="flex gap-2">
                  <textarea className="flex-1 px-3 py-2 bg-gray-800 rounded text-sm text-white" rows={2} value={entry.text} onChange={e => updateCV(cv => { cv.customSections[index].entries[eIndex].text = e.target.value })} />
                  <button onClick={() => updateCV(cv => { cv.customSections[index].entries.splice(eIndex, 1) })} className="text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={() => updateCV(cv => { cv.customSections[index].entries.push({ id: generateId(), text: '' }) })} className="text-sm text-blue-400 flex items-center gap-1"><Plus className="w-4 h-4"/> Add Entry</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addSec} className="w-full py-3 border border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 flex justify-center items-center gap-2">
        <Plus className="w-5 h-5" /> Add Custom Section
      </button>
    </div>
  )
}