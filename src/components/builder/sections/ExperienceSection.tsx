import { useCVStore } from '../../../store/cvStore'
import { generateId } from '../../../lib/utils'
import { ChevronDown, ChevronUp, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'

export default function ExperienceSection() {
  const { currentCV, updateCV } = useCVStore()
  const [openId, setOpenId] = useState<string | null>(null)
  
  if (!currentCV) return null

  const addExp = () => {
    const id = generateId()
    updateCV(cv => cv.experience.push({ id, company: '', title: '', location: '', startDate: '', endDate: '', current: false, bullets: [''] }))
    setOpenId(id)
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Work Experience</h2>
      <div className="space-y-4">
        {currentCV.experience.map((exp, index) => (
          <div key={exp.id} className="border border-gray-800 bg-gray-900 rounded-lg overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/50"
              onClick={() => setOpenId(openId === exp.id ? null : exp.id)}
            >
              <div>
                <h4 className="font-medium text-white">{exp.title || '(Not specified)'} {exp.company && `at ${exp.company}`}</h4>
                <p className="text-xs text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); updateCV(cv => { cv.experience.splice(index, 1) }) }} className="p-1 text-gray-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
                {openId === exp.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </div>
            
            {openId === exp.id && (
              <div className="p-4 border-t border-gray-800 space-y-4 bg-gray-950/50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Company</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={exp.company} onChange={e => updateCV(cv => { cv.experience[index].company = e.target.value })} /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Job Title</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={exp.title} onChange={e => updateCV(cv => { cv.experience[index].title = e.target.value })} /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Location</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={exp.location} onChange={e => updateCV(cv => { cv.experience[index].location = e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-end">
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Start Date</label><input type="text" placeholder="YYYY-MM or Year" className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={exp.startDate || ''} onChange={e => updateCV(cv => { cv.experience[index].startDate = e.target.value })} /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">End Date</label><input type="text" placeholder={exp.current ? 'Present' : 'YYYY-MM or Year'} disabled={exp.current} className="px-3 py-2 bg-gray-800 rounded text-sm text-white disabled:opacity-50" value={exp.current ? 'Present' : (exp.endDate || '')} onChange={e => updateCV(cv => { cv.experience[index].endDate = e.target.value })} /></div>
                  <div className="flex items-center gap-2 pb-2"><input type="checkbox" checked={exp.current} onChange={e => updateCV(cv => { cv.experience[index].current = e.target.checked; if(e.target.checked) cv.experience[index].endDate = '' })} id={`current-${exp.id}`} /><label htmlFor={`current-${exp.id}`} className="text-sm text-gray-300">Currently working</label></div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">Bullet Points</label>
                  {exp.bullets.map((bullet, bIndex) => (
                    <div key={bIndex} className="flex gap-2">
                      <textarea className="flex-1 px-3 py-2 bg-gray-800 rounded text-sm text-white" rows={2} value={bullet} onChange={e => updateCV(cv => { cv.experience[index].bullets[bIndex] = e.target.value })} />
                      <button onClick={() => updateCV(cv => { cv.experience[index].bullets.splice(bIndex, 1) })} className="text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <button onClick={() => updateCV(cv => { cv.experience[index].bullets.push('') })} className="text-sm text-blue-400 flex items-center gap-1"><Plus className="w-4 h-4"/> Add Bullet</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={addExp} className="w-full py-3 border border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 flex justify-center items-center gap-2">
        <Plus className="w-5 h-5" /> Add Experience
      </button>
    </div>
  )
}