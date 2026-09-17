import { useCVStore } from '../../../store/cvStore'
import { generateId } from '../../../lib/utils'
import { Trash2, Plus } from 'lucide-react'

export default function LanguagesSection() {
  const { currentCV, updateCV } = useCVStore()
  if (!currentCV) return null

  const proficiencies = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'] as const

  const addLang = () => {
    updateCV(cv => cv.languages.push({ id: generateId(), name: '', proficiency: 'Intermediate' }))
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Languages</h2>
      <div className="space-y-4">
        {currentCV.languages.map((lang, index) => (
          <div key={lang.id} className="flex gap-4 items-end">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-xs text-gray-400">Language</label>
              <input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={lang.name} onChange={e => updateCV(cv => { cv.languages[index].name = e.target.value })} placeholder="e.g. English" />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-xs text-gray-400">Proficiency</label>
              <select className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={lang.proficiency} onChange={e => updateCV(cv => { cv.languages[index].proficiency = e.target.value as any })}>
                {proficiencies.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <button onClick={() => updateCV(cv => { cv.languages.splice(index, 1) })} className="p-2 mb-0.5 text-gray-500 hover:text-red-400 bg-gray-800 rounded"><Trash2 className="w-5 h-5" /></button>
          </div>
        ))}
      </div>
      <button onClick={addLang} className="w-full py-3 border border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 flex justify-center items-center gap-2">
        <Plus className="w-5 h-5" /> Add Language
      </button>
    </div>
  )
}