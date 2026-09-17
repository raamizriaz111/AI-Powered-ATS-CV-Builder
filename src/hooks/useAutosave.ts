import { useEffect, useRef } from 'react'
import { useCVStore } from '../store/cvStore'

export function useAutosave() {
  const currentCV = useCVStore((state) => state.currentCV)
  const saveCV = useCVStore((state) => state.saveCV)
  const timeoutRef = useRef<number | undefined>(undefined)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      if (currentCV) {
        saveCV()
      }
    }, 1500)

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [currentCV, saveCV])
}