import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CVData, ATSResult } from '../types/cv'
import { createEmptyCV } from '../lib/cvDefaults'
import { calculateATS } from '../lib/atsEngine'
import { generateId } from '../lib/utils'

interface CVStore {
  cvList: CVData[]
  currentCV: CVData | null
  activeSection: string
  jobDescription: string
  atsResult: ATSResult | null
  createCV: () => void
  loadCV: (id: string) => void
  saveCV: () => void
  deleteCV: (id: string) => void
  duplicateCV: (id: string) => void
  updateCV: (updater: (cv: CVData) => void) => void
  setActiveSection: (section: string) => void
  setJobDescription: (jd: string) => void
  recalculateATS: () => void
  importCV: (data: CVData) => void
}

export const useCVStore = create<CVStore>()(
  persist(
    (set, get) => ({
      cvList: [],
      currentCV: null,
      activeSection: 'personal',
      jobDescription: '',
      atsResult: null,

      createCV: () => {
        const newCV = createEmptyCV()
        set((state) => ({
          cvList: [...state.cvList, newCV],
          currentCV: newCV
        }))
        get().recalculateATS()
      },

      loadCV: (id) => {
        const cv = get().cvList.find((c) => c.id === id)
        if (cv) {
          set({ currentCV: JSON.parse(JSON.stringify(cv)) })
          get().recalculateATS()
        }
      },

      saveCV: () => {
        const { currentCV, cvList } = get()
        if (!currentCV) return
        const updated = { ...currentCV, updatedAt: new Date().toISOString() }
        const newList = cvList.filter(c => c.id !== updated.id)
        set({ cvList: [...newList, updated], currentCV: updated })
      },

      deleteCV: (id) => {
        set((state) => ({
          cvList: state.cvList.filter((c) => c.id !== id),
          currentCV: state.currentCV?.id === id ? null : state.currentCV
        }))
      },

      duplicateCV: (id) => {
        const cv = get().cvList.find((c) => c.id === id)
        if (!cv) return
        const dup = JSON.parse(JSON.stringify(cv))
        dup.id = generateId()
        dup.name = `${dup.name} (Copy)`
        dup.createdAt = new Date().toISOString()
        dup.updatedAt = new Date().toISOString()
        set((state) => ({ cvList: [...state.cvList, dup] }))
      },

      updateCV: (updater) => {
        const { currentCV } = get()
        if (!currentCV) return
        const cloned = JSON.parse(JSON.stringify(currentCV))
        updater(cloned)
        set({ currentCV: cloned })
        get().recalculateATS()
      },

      setActiveSection: (activeSection) => set({ activeSection }),
      setJobDescription: (jobDescription) => {
        set({ jobDescription })
        get().recalculateATS()
      },

      recalculateATS: () => {
        const { currentCV, jobDescription } = get()
        if (currentCV) {
          set({ atsResult: calculateATS(currentCV, jobDescription) })
        }
      },

      importCV: (data) => {
        const newCV = { ...data, id: generateId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        set((state) => ({
          cvList: [...state.cvList, newCV],
          currentCV: newCV
        }))
        get().recalculateATS()
      }
    }),
    {
      name: 'ats-cv-builder'
    }
  )
)