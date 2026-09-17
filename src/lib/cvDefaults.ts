import { CVData } from '../types/cv'
import { generateId } from './utils'
export function createEmptyCV(): CVData {
  return {
    id: generateId(), name: 'My CV',
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    personal: { name: '', title: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '' },
    summary: '', experience: [], education: [], skills: [], projects: [],
    certifications: [], languages: [], awards: [], customSections: [],
    settings: { template: 'classic-ats', font: 'Times New Roman', fontSize: 11, headingSize: 14, lineSpacing: 1.15, margins: 0.6, accentColor: '#2563eb' }
  }
}
