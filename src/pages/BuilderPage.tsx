import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useCVStore } from '../store/cvStore'
import { useAutosave } from '../hooks/useAutosave'
import { ArrowLeft, Menu, X, Check, Zap, Loader2 } from 'lucide-react'
import BuilderSidebar from '../components/builder/BuilderSidebar'
import PersonalSection from '../components/builder/sections/PersonalSection'
import SummarySection from '../components/builder/sections/SummarySection'
import ExperienceSection from '../components/builder/sections/ExperienceSection'
import EducationSection from '../components/builder/sections/EducationSection'
import SkillsSection from '../components/builder/sections/SkillsSection'
import ProjectsSection from '../components/builder/sections/ProjectsSection'
import CertificationsSection from '../components/builder/sections/CertificationsSection'
import LanguagesSection from '../components/builder/sections/LanguagesSection'
import AwardsSection from '../components/builder/sections/AwardsSection'
import CustomSection from '../components/builder/sections/CustomSection'
import CVSettingsSection from '../components/builder/sections/CVSettingsSection'
import LivePreview from '../components/LivePreview'
import ATSScoreCard from '../components/ATSScoreCard'
import DownloadMenu from '../components/DownloadMenu'
import { autoOptimizeCV } from '../lib/api'
import { toast } from 'react-hot-toast'

export default function BuilderPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { currentCV, loadCV, createCV, updateCV, activeSection, atsResult, jobDescription, setJobDescription, recalculateATS } = useCVStore()
  useAutosave()

  const [activeTab, setActiveTab] = useState<'preview' | 'ats'>('preview')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)

  useEffect(() => {
    const id = params.get('id')
    if (id) {
      loadCV(id)
    } else if (!currentCV) {
      createCV()
    }
  }, [params])

  if (!currentCV) return <div className="p-8 text-center text-white">Loading...</div>

  const handleAutoOptimize = async () => {
    if (!currentCV) return
    setIsOptimizing(true)
    const toastId = toast.loading('⚡ Auto-optimizing CV with AI for maximum ATS score...')
    try {
      const optimized = await autoOptimizeCV(currentCV, jobDescription)
      updateCV((cv) => {
        Object.assign(cv, optimized)
      })
      recalculateATS()
      toast.success('🎉 CV successfully optimized! ATS score boosted!', { id: toastId, duration: 4000 })
    } catch (e: any) {
      console.error('Auto-optimize error:', e)
      toast.error(e.response?.data?.error || e.message || 'Auto-optimization failed. Please try again.', {
        id: toastId,
        duration: 5000
      })
    } finally {
      setIsOptimizing(false)
    }
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'personal': return <PersonalSection />
      case 'summary': return <SummarySection />
      case 'experience': return <ExperienceSection />
      case 'education': return <EducationSection />
      case 'skills': return <SkillsSection />
      case 'projects': return <ProjectsSection />
      case 'certifications': return <CertificationsSection />
      case 'languages': return <LanguagesSection />
      case 'awards': return <AwardsSection />
      case 'custom': return <CustomSection />
      case 'settings': return <CVSettingsSection />
      default: return <PersonalSection />
    }
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-gray-950">
      {/* Top Header Bar */}
      <div className="h-14 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white" title="Back to Dashboard">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <input 
            value={currentCV.name} 
            onChange={e => updateCV(cv => { cv.name = e.target.value })}
            className="bg-transparent text-white font-medium focus:outline-none focus:border-b border-gray-600 hover:border-b placeholder-gray-500 w-48 truncate"
            title="Click to rename CV"
          />
          <span className="hidden md:flex text-xs text-green-400 items-center gap-1">
            <Check className="w-3 h-3" /> Saved
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* 1-Click Auto Optimize Button */}
          <button
            onClick={handleAutoOptimize}
            disabled={isOptimizing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-white shadow-md shadow-orange-950/40 transition-all cursor-pointer disabled:opacity-50"
            title="1-Click Auto Optimize: Rewrite summary, strengthen action verbs & metrics, organize skills to maximize ATS score"
          >
            {isOptimizing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isOptimizing ? 'Optimizing...' : '⚡ Auto-Optimize (100 ATS)'}</span>
            <span className="sm:hidden">{isOptimizing ? '...' : '⚡ Optimize'}</span>
          </button>

          <DownloadMenu />

          <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        <div className={`absolute md:static inset-y-0 left-0 w-64 z-30 transition-transform ${mobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <BuilderSidebar />
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-950 border-r border-gray-800" onClick={() => { if(mobileMenu) setMobileMenu(false) }}>
          {renderSection()}
        </div>

        <div className="hidden lg:flex flex-col w-[440px] bg-gray-900 border-l border-gray-800">
          <div className="flex border-b border-gray-800 bg-gray-950">
            <button 
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'preview' ? 'border-blue-500 text-blue-400 bg-gray-900' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('preview')}
            >
              Live Preview
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'ats' ? 'border-blue-500 text-blue-400 bg-gray-900' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('ats')}
            >
              <span>ATS Score</span>
              {atsResult && (
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  atsResult.total >= 80 ? 'bg-green-900/60 text-green-400' : atsResult.total >= 50 ? 'bg-amber-900/60 text-amber-400' : 'bg-red-900/60 text-red-400'
                }`}>
                  {atsResult.total}
                </span>
              )}
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            {activeTab === 'preview' ? (
              <LivePreview cvData={currentCV} />
            ) : (
              <div className="p-6 h-full overflow-y-auto space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target Job Description (Optional)</label>
                  <textarea 
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                    placeholder="Paste job description here to check keyword match and tailor auto-optimization..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 h-28 resize-none font-sans"
                  />
                </div>
                <ATSScoreCard result={atsResult} onAutoOptimize={handleAutoOptimize} isOptimizing={isOptimizing} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}