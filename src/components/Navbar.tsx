import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-gray-950/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              ATS CV Builder
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === '/' ? 'text-blue-500 underline underline-offset-4' : 'text-gray-300'}`}>Home</Link>
            <Link to="/dashboard" className={`text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === '/dashboard' ? 'text-blue-500 underline underline-offset-4' : 'text-gray-300'}`}>Dashboard</Link>
            <Link to="/templates" className={`text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === '/templates' ? 'text-blue-500 underline underline-offset-4' : 'text-gray-300'}`}>Templates</Link>
            <Link to="/builder" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-blue-900/20">
              Build CV
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}