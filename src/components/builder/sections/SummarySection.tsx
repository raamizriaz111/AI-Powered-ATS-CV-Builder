import { useCVStore } from '../../../store/cvStore'
import AIPanel from '../../AIPanel'

export default function SummarySection() {
  const { currentCV, updateCV, jobDescription } = useCVStore()
  if (!currentCV) return null

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Professional Summary</h2>
      
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-sm text-gray-300">
        <strong className="text-white">Tip:</strong> Keep it between 2-4 sentences. Highlight your core value proposition and most relevant achievements.
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          value={currentCV.summary}
          onChange={(e) => updateCV(cv => { cv.summary = e.target.value })}
          rows={6}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Experienced software engineer with 5+ years..."
        />
        <div className="text-xs text-gray-500 text-right">
          {currentCV.summary.length}/400 characters
        </div>
      </div>

      <AIPanel 
        section="summary" 
        content={currentCV.summary} 
        context={jobDescription}
        onApply={(text) => updateCV(cv => { cv.summary = text })}
      />
    </div>
  )
}