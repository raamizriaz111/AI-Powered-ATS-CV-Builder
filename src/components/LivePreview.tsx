import { useState, useEffect } from 'react'
import { CVData } from '../types/cv'
import { getTemplate, TEMPLATES } from '../templates'
import { useCVStore } from '../store/cvStore'
import { Printer, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'

interface Props {
  cvData: CVData
}

export default function LivePreview({ cvData }: Props) {
  const { updateCV } = useCVStore()
  
  // Calculate best initial zoom based on viewport width
  const getInitialZoom = () => {
    if (typeof window === 'undefined') return 0.55
    const width = window.innerWidth
    if (width < 450) return 0.40
    if (width < 768) return 0.46
    return 0.55
  }

  const [zoom, setZoom] = useState<number>(getInitialZoom())

  useEffect(() => {
    const handleResize = () => {
      // Auto-fit zoom if screen changed
      if (window.innerWidth < 450 && zoom > 0.45) {
        setZoom(0.40)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [zoom])

  const activeTemplateId = cvData.settings.template || 'classic-ats'
  const templateConfig = getTemplate(activeTemplateId)
  const TemplateComponent = templateConfig.component

  return (
    <div className="flex flex-col h-full bg-gray-900 overflow-hidden">
      {/* Top Controls: Template Switcher & Zoom */}
      <div className="p-2 sm:p-2.5 border-b border-gray-800 bg-gray-950 flex flex-col gap-2 shrink-0 no-print">
        {/* Template Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider pl-1 pr-1 shrink-0">
            Template:
          </span>
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => updateCV((cv) => { cv.settings.template = t.id })}
              className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-all font-medium shrink-0 ${
                activeTemplateId === t.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Toolbar: Zoom & Print */}
        <div className="flex justify-between items-center pt-1 border-t border-gray-800/60 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoom((z) => Math.max(0.25, +(z - 0.05).toFixed(2)))}
              className="p-1 hover:bg-gray-800 hover:text-white rounded transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 font-mono text-[11px]">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(1.2, +(z + 0.05).toFixed(2)))}
              className="p-1 hover:bg-gray-800 hover:text-white rounded transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(getInitialZoom())}
              className="p-1 hover:bg-gray-800 hover:text-white rounded transition ml-1"
              title="Fit to Screen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium">A4 Preview</span>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1 text-gray-300 hover:text-white px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded transition text-xs"
              title="Print / Save as PDF via Browser"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scaled A4 Preview Container */}
      <div className="flex-1 overflow-auto p-2 sm:p-4 flex justify-center items-start bg-gray-950/40 print:p-0 print:bg-white print:overflow-visible">
        <div
          id="cv-page-print-container"
          className="cv-print-container bg-white shadow-2xl origin-top transition-transform duration-150 shrink-0"
          style={{
            width: '210mm',
            minHeight: '297mm',
            transform: `scale(${zoom})`,
            marginBottom: `calc((297mm * ${zoom} - 297mm))`
          }}
        >
          <TemplateComponent cv={cvData} />
        </div>
      </div>
    </div>
  )
}
