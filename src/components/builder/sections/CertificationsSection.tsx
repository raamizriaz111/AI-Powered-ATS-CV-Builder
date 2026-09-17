import { useCVStore } from '../../../store/cvStore'
import { generateId } from '../../../lib/utils'
import { ChevronDown, ChevronUp, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'

export default function CertificationsSection() {
  const { currentCV, updateCV } = useCVStore()
  const [openId, setOpenId] = useState<string | null>(null)
  
  if (!currentCV) return null

  const addCert = () => {
    const id = generateId()
    updateCV(cv => cv.certifications.push({ id, name: '', issuer: '', date: '', expiryDate: '', credentialId: '', url: '' }))
    setOpenId(id)
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Certifications</h2>
      <div className="space-y-4">
        {currentCV.certifications.map((cert, index) => (
          <div key={cert.id} className="border border-gray-800 bg-gray-900 rounded-lg overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/50"
              onClick={() => setOpenId(openId === cert.id ? null : cert.id)}
            >
              <h4 className="font-medium text-white">{cert.name || '(New Certification)'}</h4>
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); updateCV(cv => { cv.certifications.splice(index, 1) }) }} className="p-1 text-gray-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
                {openId === cert.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </div>
            
            {openId === cert.id && (
              <div className="p-4 border-t border-gray-800 space-y-4 bg-gray-950/50 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Name</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={cert.name} onChange={e => updateCV(cv => { cv.certifications[index].name = e.target.value })} /></div>
                <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Issuer</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={cert.issuer} onChange={e => updateCV(cv => { cv.certifications[index].issuer = e.target.value })} /></div>
                <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Issue Date</label><input type="text" placeholder="YYYY-MM or Year" className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={cert.date || ''} onChange={e => updateCV(cv => { cv.certifications[index].date = e.target.value })} /></div>
                <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Expiry Date</label><input type="text" placeholder="YYYY-MM or Year" className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={cert.expiryDate || ''} onChange={e => updateCV(cv => { cv.certifications[index].expiryDate = e.target.value })} /></div>
                <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Credential ID</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={cert.credentialId} onChange={e => updateCV(cv => { cv.certifications[index].credentialId = e.target.value })} /></div>
                <div className="flex flex-col gap-1.5"><label className="text-xs text-gray-400">Credential URL</label><input className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={cert.url} onChange={e => updateCV(cv => { cv.certifications[index].url = e.target.value })} /></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={addCert} className="w-full py-3 border border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 flex justify-center items-center gap-2">
        <Plus className="w-5 h-5" /> Add Certification
      </button>
    </div>
  )
}