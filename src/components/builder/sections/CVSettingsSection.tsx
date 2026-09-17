import { useCVStore } from '../../../store/cvStore'
import { TEMPLATES } from '../../../templates'
import { AlertCircle } from 'lucide-react'

export default function CVSettingsSection() {
  const { currentCV, updateCV } = useCVStore()
  if (!currentCV) return null

  const s = currentCV.settings
  const activeTemplate = TEMPLATES.find(t => t.id === s.template)

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Document Settings</h2>
      
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-300">Template</label>
        <div className="grid grid-cols-2 gap-3">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => updateCV(cv => { cv.settings.template = t.id })}
              className={`p-3 rounded border text-left flex flex-col gap-1 transition-colors ${s.template === t.id ? 'bg-blue-900/30 border-blue-500' : 'bg-gray-800 border-gray-700 hover:border-gray-500'}`}
            >
              <span className="font-medium text-white">{t.name}</span>
              <span className="text-xs text-gray-400">{t.description}</span>
            </button>
          ))}
        </div>
        {activeTemplate?.accentWarning && (
          <div className="flex gap-2 items-center text-xs text-amber-500 bg-amber-950/30 p-2 rounded">
            <AlertCircle className="w-4 h-4" /> This template may not parse well in strict ATS systems.
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400">Font Family</label>
          <select className="px-3 py-2 bg-gray-800 rounded text-sm text-white" value={s.font} onChange={e => updateCV(cv => { cv.settings.font = e.target.value })}>
            {['Times New Roman', 'Arial', 'Georgia', 'Helvetica', 'Calibri', 'Garamond'].map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400">Accent Color</label>
          <div className="flex gap-2">
            {['#000000', '#2563eb', '#16a34a', '#dc2626', '#9333ea', '#0d9488'].map(c => (
              <button key={c} onClick={() => updateCV(cv => { cv.settings.accentColor = c })} className={`w-8 h-8 rounded-full border-2 ${s.accentColor === c ? 'border-white' : 'border-transparent'}`} style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between"><label className="text-sm text-gray-400">Font Size ({s.fontSize}pt)</label></div>
          <input type="range" min="9" max="14" step="0.5" value={s.fontSize} onChange={e => updateCV(cv => { cv.settings.fontSize = parseFloat(e.target.value) })} className="w-full" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between"><label className="text-sm text-gray-400">Line Spacing ({s.lineSpacing})</label></div>
          <input type="range" min="1" max="2" step="0.05" value={s.lineSpacing} onChange={e => updateCV(cv => { cv.settings.lineSpacing = parseFloat(e.target.value) })} className="w-full" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between"><label className="text-sm text-gray-400">Margins ({s.margins}in)</label></div>
          <input type="range" min="0.4" max="1.5" step="0.1" value={s.margins} onChange={e => updateCV(cv => { cv.settings.margins = parseFloat(e.target.value) })} className="w-full" />
        </div>
      </div>
    </div>
  )
}