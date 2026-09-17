import { useCVStore } from '../../../store/cvStore'
import { generateId } from '../../../lib/utils'
import { ChevronDown, ChevronUp, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'

export default function EducationSection() {
  const { currentCV, updateCV } = useCVStore()
  const [openId, setOpenId] = useState<string | null>(null)
  
  if (!currentCV) return null

  const addEdu = () => {
    const id = generateId()
    updateCV(cv => cv.education.push({ id, institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', honors: '' }))
    setOpenId(id)
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Education</h2>
      <div className="space-y-4">
        {currentCV.education.map((edu, index) => (
          <div key={edu.id} className="border border-gray-800 bg-gray-900 rounded-lg overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/50"
              onClick={() => setOpenId(openId === edu.id ? null : edu.id)}
            >
              <div>
                <h4 className="font-medium text-white">{edu.degree || '(Not specified)'} {edu.institution && `at ${edu.institution}`}</h4>
                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); updateCV(cv => { cv.education.splice(index, 1) }) }} className="p-1 text-gray-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
                {openId === edu.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </div>
            
            {openId === edu.id && (
              <div className="p-4 border-t border-gray-800 space-y-4 bg-gray-950/50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Institution</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={edu.institution} onChange={e => updateCV(cv => { cv.education[index].institution = e.target.value })} /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Degree</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={edu.degree} onChange={e => updateCV(cv => { cv.education[index].degree = e.target.value })} /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Field of Study</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={edu.field} onChange={e => updateCV(cv => { cv.education[index].field = e.target.value })} /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">GPA (Optional)</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={edu.gpa} onChange={e => updateCV(cv => { cv.education[index].gpa = e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4 items-end">
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Start Year</label><input type="text" placeholder="2018" className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={edu.startDate} onChange={e => updateCV(cv => { cv.education[index].startDate = e.target.value })} /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">End Year (or Expected)</label><input type="text" placeholder="2022" className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={edu.endDate} onChange={e => updateCV(cv => { cv.education[index].endDate = e.target.value })} /></div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400">Honors / Awards</label>
                  <textarea className="px-3 py-2 bg-gray-800 rounded text-sm text-white" rows={2} value={edu.honors} onChange={e => updateCV(cv => { cv.education[index].honors = e.target.value })} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={addEdu} className="w-full py-3 border border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 flex justify-center items-center gap-2">
        <Plus className="w-5 h-5" /> Add Education
      </button>
    </div>
  )
}