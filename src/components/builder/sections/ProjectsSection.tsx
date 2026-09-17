import { useCVStore } from '../../../store/cvStore'
import { generateId } from '../../../lib/utils'
import { ChevronDown, ChevronUp, Trash2, Plus, X } from 'lucide-react'
import { useState } from 'react'

export default function ProjectsSection() {
  const { currentCV, updateCV } = useCVStore()
  const [openId, setOpenId] = useState<string | null>(null)
  const [techInput, setTechInput] = useState<Record<string, string>>({})
  
  if (!currentCV) return null

  const addProject = () => {
    const id = generateId()
    updateCV(cv => cv.projects.push({ id, name: '', description: '', technologies: [], link: '', github: '', startDate: '', endDate: '' }))
    setOpenId(id)
  }

  const handleTechAdd = (e: React.KeyboardEvent<HTMLInputElement>, projId: string, index: number) => {
    if (e.key === 'Enter' && techInput[projId]?.trim()) {
      e.preventDefault()
      updateCV(cv => { cv.projects[index].technologies.push(techInput[projId].trim()) })
      setTechInput({ ...techInput, [projId]: '' })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Projects</h2>
      <div className="space-y-4">
        {currentCV.projects.map((proj, index) => (
          <div key={proj.id} className="border border-gray-800 bg-gray-900 rounded-lg overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/50"
              onClick={() => setOpenId(openId === proj.id ? null : proj.id)}
            >
              <h4 className="font-medium text-white">{proj.name || '(New Project)'}</h4>
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); updateCV(cv => { cv.projects.splice(index, 1) }) }} className="p-1 text-gray-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
                {openId === proj.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </div>
            
            {openId === proj.id && (
              <div className="p-4 border-t border-gray-800 space-y-4 bg-gray-950/50">
                <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Project Name</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={proj.name} onChange={e => updateCV(cv => { cv.projects[index].name = e.target.value })} /></div>
                <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Description</label><textarea className="px-3 py-2 bg-gray-800 rounded text-sm text-white" rows={3} value={proj.description} onChange={e => updateCV(cv => { cv.projects[index].description = e.target.value })} /></div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400">Technologies</label>
                  <div className="flex flex-wrap gap-2">
                    {proj.technologies.map((t, tIndex) => (
                      <span key={tIndex} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs flex items-center gap-1">
                        {t}
                        <button onClick={() => updateCV(cv => { cv.projects[index].technologies.splice(tIndex, 1) })} className="hover:text-red-400"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                    <input className="bg-transparent text-sm text-white outline-none placeholder-gray-600" placeholder="Type and press Enter" value={techInput[proj.id] || ''} onChange={e => setTechInput({ ...techInput, [proj.id]: e.target.value })} onKeyDown={e => handleTechAdd(e, proj.id, index)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Live URL</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={proj.link} onChange={e => updateCV(cv => { cv.projects[index].link = e.target.value })} /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">GitHub URL</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={proj.github} onChange={e => updateCV(cv => { cv.projects[index].github = e.target.value })} /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Start Date</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={proj.startDate} onChange={e => updateCV(cv => { cv.projects[index].startDate = e.target.value })} /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">End Date</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={proj.endDate} onChange={e => updateCV(cv => { cv.projects[index].endDate = e.target.value })} /></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={addProject} className="w-full py-3 border border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 flex justify-center items-center gap-2">
        <Plus className="w-5 h-5" /> Add Project
      </button>
    </div>
  )
}