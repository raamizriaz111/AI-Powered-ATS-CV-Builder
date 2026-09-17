import { ATSResult } from '../types/cv'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { AlertCircle, CheckCircle, Info, Zap, Loader2 } from 'lucide-react'

interface Props {
  result: ATSResult | null
  compact?: boolean
  onAutoOptimize?: () => void
  isOptimizing?: boolean
}

export default function ATSScoreCard({ result, compact, onAutoOptimize, isOptimizing }: Props) {
  if (!result) return <div className="text-gray-500 text-sm">No ATS data available</div>

  const color = result.total < 40 ? '#ef4444' : result.total < 75 ? '#f59e0b' : '#22c55e'

  if (compact) {
    return (
      <div className="w-12 h-12 flex-shrink-0">
        <CircularProgressbar
          value={result.total}
          text={`${result.total}`}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: '#374151',
            textSize: '32px'
          })}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Circle Gauge */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 mb-3">
          <CircularProgressbar
            value={result.total}
            text={`${result.total}/100`}
            styles={buildStyles({
              pathColor: color,
              textColor: 'white',
              trailColor: '#1f2937',
              textSize: '18px'
            })}
          />
        </div>
        <h3 className="text-lg font-bold text-white">ATS Compatibility Score</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          {result.total >= 90
            ? '🔥 Excellent! Your resume is primed for top ATS rankings.'
            : result.total >= 70
            ? '👍 Good! Minor tweaks can push you to 100/100.'
            : '⚠️ Needs attention to pass automated screening.'}
        </p>
      </div>

      {/* 1-Click Auto Optimize Banner in ATS Score Panel */}
      {onAutoOptimize && (
        <div className="bg-gradient-to-r from-amber-950/40 via-orange-950/30 to-amber-950/40 border border-amber-800/60 rounded-xl p-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-sm">
            <Zap className="w-4 h-4" />
            <span>Maximize Your ATS Score</span>
          </div>
          <p className="text-xs text-gray-300">
            Let Gemini AI rewrite your summary, add high-impact metrics to your bullets, and organize skills into ATS-friendly categories.
          </p>
          <button
            onClick={onAutoOptimize}
            disabled={isOptimizing}
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-950/40 transition-all cursor-pointer disabled:opacity-50"
          >
            {isOptimizing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            <span>{isOptimizing ? 'Optimizing CV with AI...' : '⚡ Auto-Optimize to 100/100 ATS Score'}</span>
          </button>
        </div>
      )}

      {/* Category Breakdown */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Category Breakdown</h4>
        {result.categories.map((cat) => (
          <div key={cat.name} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300 font-medium">{cat.name}</span>
              <span className="text-gray-400 font-mono">
                {cat.score}/{cat.maxScore}
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${(cat.score / cat.maxScore) * 100}%`,
                  backgroundColor: cat.score === cat.maxScore ? '#22c55e' : cat.score >= cat.maxScore * 0.7 ? '#3b82f6' : '#f59e0b'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Issues / Opportunities */}
      {result.issues.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Optimization Suggestions</h4>
          <div className="space-y-2">
            {result.issues
              .sort((a, b) => (a.severity === 'critical' ? -1 : 1))
              .map((issue) => (
                <div
                  key={issue.id}
                  className={`p-3 rounded-lg border text-xs flex gap-2.5 ${
                    issue.severity === 'critical'
                      ? 'bg-red-950/20 border-red-900/50'
                      : issue.severity === 'warning'
                      ? 'bg-amber-950/20 border-amber-900/50'
                      : 'bg-blue-950/20 border-blue-900/50'
                  }`}
                >
                  {issue.severity === 'critical' ? (
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  ) : issue.severity === 'warning' ? (
                    <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-gray-200 font-medium">{issue.message}</p>
                    <p className="text-gray-400 mt-0.5">{issue.fix}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <p className="text-[11px] text-gray-500 italic text-center pt-2">
        Disclaimer: This score estimates compliance with standard ATS rules. Results may vary by applicant tracking system.
      </p>
    </div>
  )
}