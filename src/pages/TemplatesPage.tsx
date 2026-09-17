import { TEMPLATES } from '../templates'
import { useNavigate } from 'react-router-dom'
import { useCVStore } from '../store/cvStore'
import { createEmptyCV } from '../lib/cvDefaults'
import { Check, Sparkles, ArrowRight } from 'lucide-react'

export default function TemplatesPage() {
  const navigate = useNavigate()
  const { currentCV, updateCV, createCV } = useCVStore()

  const sampleCV = createEmptyCV()
  sampleCV.personal.name = 'Alex Morgan'
  sampleCV.personal.title = 'Senior Software Engineer'
  sampleCV.personal.email = 'alex.morgan@example.com'
  sampleCV.personal.phone = '+1 (555) 234-5678'
  sampleCV.personal.location = 'San Francisco, CA'
  sampleCV.personal.linkedin = 'linkedin.com/in/alexmorgan'
  sampleCV.personal.github = 'github.com/alexmorgan'
  sampleCV.summary =
    'Results-driven Senior Software Engineer with 6+ years of experience designing scalable distributed systems and cloud architectures. Proficient in TypeScript, Python, React, and AWS.'
  sampleCV.experience = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechFlow Systems',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected high-throughput microservices handling 25M+ daily requests with 99.99% uptime.',
        'Spearheaded migration to Kubernetes on AWS, cutting infrastructure costs by 32%.'
      ]
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'DataCorp Labs',
      location: 'Austin, TX',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      bullets: [
        'Built real-time analytics dashboard in React and Node.js serving 40,000 active users.',
        'Optimized PostgreSQL query execution reducing dashboard load time from 4.2s to 0.8s.'
      ]
    }
  ]
  sampleCV.education = [
    {
      id: 'e1',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      institution: 'University of California, Berkeley',
      startDate: '2014',
      endDate: '2018',
      gpa: '3.8',
      honors: "Dean's Honors List"
    }
  ]
  sampleCV.skills = [
    { id: 's1', name: 'Languages', skills: ['TypeScript', 'Python', 'Go', 'SQL'] },
    { id: 's2', name: 'Frameworks', skills: ['React', 'Node.js', 'FastAPI', 'Next.js'] },
    { id: 's3', name: 'Cloud & Tools', skills: ['AWS', 'Docker', 'Kubernetes', 'PostgreSQL'] }
  ]
  sampleCV.projects = [
    {
      id: 'p1',
      name: 'CloudScale Monitoring Engine',
      description: 'Distributed latency monitoring engine with real-time alerting.',
      technologies: ['Go', 'Prometheus', 'Grafana', 'Docker'],
      link: 'cloudscale.dev',
      github: 'github.com/alexmorgan/cloudscale',
      startDate: '',
      endDate: ''
    }
  ]

  const handleSelectTemplate = (templateId: string) => {
    if (currentCV) {
      updateCV((cv) => {
        cv.settings.template = templateId
      })
    } else {
      createCV()
      updateCV((cv) => {
        cv.settings.template = templateId
      })
    }
    navigate('/builder')
  }

  const activeTemplateId = currentCV?.settings.template || 'classic-ats'

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/40 text-blue-400 border border-blue-800/50 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          ATS-Optimized Resumes
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-4">Professional Resume Templates</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base">
          All templates are designed for maximum recruiter readability and ATS parsers. Switch anytime inside the builder with zero data loss.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEMPLATES.map((t) => {
          const isSelected = activeTemplateId === t.id
          return (
            <div
              key={t.id}
              className={`bg-gray-900 border rounded-2xl overflow-hidden transition-all duration-200 flex flex-col group hover:shadow-2xl hover:shadow-blue-900/20 ${
                isSelected ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-gray-800 hover:border-gray-600'
              }`}
            >
              {/* Visual Preview Box */}
              <div className="h-72 bg-gray-950 overflow-hidden relative border-b border-gray-800 flex justify-center items-start pt-3">
                <div
                  className="bg-white shadow-xl origin-top transition-transform duration-200 group-hover:scale-[0.43]"
                  style={{
                    width: '210mm',
                    minHeight: '297mm',
                    transform: 'scale(0.38)',
                    pointerEvents: 'none'
                  }}
                >
                  <t.component cv={{ ...sampleCV, settings: { ...sampleCV.settings, template: t.id } }} />
                </div>

                {isSelected && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Check className="w-3.5 h-3.5" /> Active
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{t.name}</h3>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      t.atsScore >= 95
                        ? 'bg-green-900/40 text-green-400 border border-green-800/60'
                        : 'bg-blue-900/40 text-blue-400 border border-blue-800/60'
                    }`}
                  >
                    ATS {t.atsScore}/100
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-6">{t.description}</p>
                <button
                  onClick={() => handleSelectTemplate(t.id)}
                  className={`mt-auto w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white'
                  }`}
                >
                  <span>{isSelected ? 'Continue in Builder' : 'Use This Template'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}