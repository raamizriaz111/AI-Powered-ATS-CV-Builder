import { useState } from 'react'
import { Sparkles, Check, X } from 'lucide-react'
import { optimizeSection } from '../lib/api'

interface Props {
  section: string
  content: string
  context?: string
  onApply: (improved: string) => void
}

export default function AIPanel({ section, content, context, onApply }: Props) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleImprove = async () => {
    if (!content.trim()) return
    setLoading(true)
    try {
      const improved = await optimizeSection(section, content, context || '')
      setResult(improved)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="mt-4 rounded-lg border border-emerald-900 bg-emerald-950/20 overflow-hidden">
        <div className="p-3 border-b border-emerald-900 flex justify-between items-center bg-emerald-900/10">
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI Suggestion</span>
        </div>
        <div className="p-4 grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 rounded bg-gray-900/50 text-gray-400 line-through decoration-red-500/50">{content}</div>
          <div className="p-3 rounded bg-emerald-900/20 text-emerald-200">{result}</div>
        </div>
        <div className="p-3 border-t border-emerald-900 bg-emerald-900/10 flex justify-end gap-2">
          <button onClick={() => setResult('')} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white flex items-center gap-1"><X className="w-3 h-3" /> Dismiss</button>
          <button onClick={() => { onApply(result); setResult('') }} className="px-3 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white rounded flex items-center gap-1"><Check className="w-3 h-3" /> Apply</button>
        </div>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handleImprove}
      disabled={loading || !content.trim()}
      className="mt-3 flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:hover:text-blue-400 transition-colors"
    >
      <Sparkles className={`w-4 h-4 ${loading ? 'animate-pulse' : ''}`} />
      {loading ? 'Analyzing...' : '✨ Improve with AI'}
    </button>
  )
}