import ClassicATS from './ClassicATS'
import Modern from './Modern'
import Minimal from './Minimal'
import Executive from './Executive'
import Technical from './Technical'
import Academic from './Academic'
import { CVData } from '../types/cv'
import React from 'react'

export interface TemplateConfig {
  id: string
  name: string
  description: string
  atsScore: number
  accentWarning: boolean
  component: React.FC<{ cv: CVData }>
}

export const TEMPLATES: TemplateConfig[] = [
  { id: 'classic-ats', name: 'Classic ATS', description: 'Maximum ATS compatibility', atsScore: 100, accentWarning: false, component: ClassicATS },
  { id: 'modern', name: 'Modern', description: 'Two-column with color accent', atsScore: 85, accentWarning: true, component: Modern },
  { id: 'minimal', name: 'Minimal', description: 'Clean whitespace design', atsScore: 90, accentWarning: false, component: Minimal },
  { id: 'executive', name: 'Executive', description: 'Formal corporate style', atsScore: 88, accentWarning: false, component: Executive },
  { id: 'technical', name: 'Technical', description: 'Developer-focused layout', atsScore: 82, accentWarning: true, component: Technical },
  { id: 'academic', name: 'Academic', description: 'Research and academia', atsScore: 87, accentWarning: false, component: Academic },
]

export function getTemplate(id: string): TemplateConfig {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0]
}