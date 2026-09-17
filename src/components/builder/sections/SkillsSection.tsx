import { useCVStore } from '../../../store/cvStore'
import { generateId } from '../../../lib/utils'
import { X, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function SkillsSection() {
  const { currentCV, updateCV } = useCVStore()
  const [newSkillInput, setNewSkillInput] = useState<Record<string, string>>({})
  
  if (!currentCV) return null

  const addCategory = () => {
    updateCV(cv => cv.skills.push({ id: generateId(), name: 'New Category', skills: [] }))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, catId: string, index: number) => {
    if (e.key === 'Enter' && newSkillInput[catId]?.trim()) {
      e.preventDefault()
      updateCV(cv => { cv.skills[index].skills.push(newSkillInput[catId].trim()) })
      setNewSkillInput({ ...newSkillInput, [catId]: '' })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Skills</h2>
      <div className="space-y-6">
        {currentCV.skills.map((cat, index) => (
          <div key={cat.id} className="border border-gray-800 bg-gray-900 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center gap-4">
              <input 
                className="bg-transparent text-lg font-medium text-white border-b border-transparent hover:border-gray-700 focus:border-blue-500 focus:outline-none" 
                value={cat.name} 
                onChange={e => updateCV(cv => { cv.skills[index].name = e.target.value })} 
              />
              <button onClick={() => updateCV(cv => { cv.skills.splice(index, 1) })} className="text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, sIndex) => (
                <div key={sIndex} className="flex items-center gap-1 bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {skill}
                  <button onClick={() => updateCV(cv => { cv.skills[index].skills.splice(sIndex, 1) })} className="hover:text-white"><X className="w-3 h-3" /></button>
                </div>
              ))}
              <input
                className="bg-gray-800 text-sm text-white px-3 py-1 rounded-full outline-none w-32 focus:ring-1 focus:ring-blue-500"
                placeholder="Add skill..."
                value={newSkillInput[cat.id] || ''}
                onChange={e => setNewSkillInput({ ...newSkillInput, [cat.id]: e.target.value })}
                onKeyDown={e => handleKeyDown(e, cat.id, index)}
              />
            </div>
          </div>
        ))}
      </div>
      <button onClick={addCategory} className="w-full py-3 border border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 flex justify-center items-center gap-2">
        <Plus className="w-5 h-5" /> Add Category
      </button>
    </div>
  )
}