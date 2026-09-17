import { useCVStore } from '../../store/cvStore'
import { User, FileText, Briefcase, GraduationCap, Code, FolderGit2, Award, Globe, Trophy, Plus, Settings } from 'lucide-react'

const navItems = [
  { id: 'personal', label: 'Personal Info', icon: User, check: (c: any) => c.personal.name || c.personal.email },
  { id: 'summary', label: 'Summary', icon: FileText, check: (c: any) => c.summary.length > 0 },
  { id: 'experience', label: 'Experience', icon: Briefcase, check: (c: any) => c.experience.length > 0 },
  { id: 'education', label: 'Education', icon: GraduationCap, check: (c: any) => c.education.length > 0 },
  { id: 'skills', label: 'Skills', icon: Code, check: (c: any) => c.skills.length > 0 },
  { id: 'projects', label: 'Projects', icon: FolderGit2, check: (c: any) => c.projects.length > 0 },
  { id: 'certifications', label: 'Certifications', icon: Award, check: (c: any) => c.certifications.length > 0 },
  { id: 'languages', label: 'Languages', icon: Globe, check: (c: any) => c.languages.length > 0 },
  { id: 'awards', label: 'Awards', icon: Trophy, check: (c: any) => c.awards.length > 0 },
  { id: 'custom', label: 'Custom', icon: Plus, check: (c: any) => c.customSections.length > 0 },
  { id: 'settings', label: 'Settings', icon: Settings, check: () => true },
]

export default function BuilderSidebar() {
  const { activeSection, setActiveSection, currentCV } = useCVStore()

  if (!currentCV) return null

  return (
    <div className="w-full bg-gray-900 border-r border-gray-800 overflow-y-auto">
      <div className="p-4 flex flex-col gap-1">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          const isComplete = item.check(currentCV)
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {isComplete && <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-green-500'}`} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}