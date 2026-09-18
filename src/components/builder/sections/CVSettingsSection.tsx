import { useRef } from 'react'
import { useCVStore } from '../../../store/cvStore'
import { TEMPLATES } from '../../../templates'
import { AlertCircle, Pipette } from 'lucide-react'

const PRESET_COLORS = ['#000000', '#2563eb', '#16a34a', '#dc2626', '#9333ea', '#0d9488', '#ea580c', '#0891b2']

export default function CVSettingsSection() {
  const { currentCV, updateCV } = useCVStore()
  const colorInputRef = useRef<HTMLInputElement>(null)
  if (!currentCV) return null

  const s = currentCV.settings
  const activeTemplate = TEMPLATES.find(t => t.id === s.template)
  const isPreset = PRESET_COLORS.includes(s.accentColor)

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
          <div className="flex items-center gap-2 flex-wrap">
            {PRESET_COLORS.map(c => (
              <button
                key={c}
                onClick={() => updateCV(cv => { cv.settings.accentColor = c })}
                className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${s.accentColor === c ? 'border-white scale-110 ring-2 ring-white/30' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
            {/* Custom color picker */}
            <div className="relative" title="Pick custom color">
              <button
                onClick={() => colorInputRef.current?.click()}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 overflow-hidden ${!isPreset ? 'border-white scale-110 ring-2 ring-white/30' : 'border-dashed border-gray-500 hover:border-gray-300'}`}
                style={{ backgroundColor: !isPreset ? s.accentColor : 'transparent' }}
                title="Pick any custom color"
              >
                {isPreset && <Pipette className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              <input
                ref={colorInputRef}
                type="color"
                value={s.accentColor}
                onChange={e => updateCV(cv => { cv.settings.accentColor = e.target.value })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ width: '28px', height: '28px' }}
              />
            </div>
          </div>
          {!isPreset && (
            <span className="text-[11px] text-gray-500 font-mono">{s.accentColor}</span>
          )}
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