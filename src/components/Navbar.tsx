import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Menu, X, FileText, LayoutTemplate, Home, PlusCircle } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <nav className={`sticky top-0 z-50 transition-all ${scrolled || mobileMenuOpen ? 'bg-gray-950/95 backdrop-blur-md border-b border-gray-800 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors" />
            <span className="font-bold text-lg sm:text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              ATS CV Builder
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === '/' ? 'text-blue-500 underline underline-offset-4' : 'text-gray-300'}`}>Home</Link>
            <Link to="/dashboard" className={`text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === '/dashboard' ? 'text-blue-500 underline underline-offset-4' : 'text-gray-300'}`}>Dashboard</Link>
            <Link to="/templates" className={`text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === '/templates' ? 'text-blue-500 underline underline-offset-4' : 'text-gray-300'}`}>Templates</Link>
            <Link to="/builder" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-blue-900/20">
              Build CV
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/builder" className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md">
              Build CV
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-blue-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === '/' ? 'bg-blue-900/40 text-blue-400 border border-blue-800/50' : 'text-gray-300 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4 text-blue-400" />
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === '/dashboard' ? 'bg-blue-900/40 text-blue-400 border border-blue-800/50' : 'text-gray-300 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-400" />
            My CVs & Dashboard
          </Link>
          <Link
            to="/templates"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === '/templates' ? 'bg-blue-900/40 text-blue-400 border border-blue-800/50' : 'text-gray-300 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <LayoutTemplate className="w-4 h-4 text-blue-400" />
            Resume Templates
          </Link>
          <Link
            to="/builder"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === '/builder' ? 'bg-blue-600 text-white' : 'bg-blue-600/90 text-white hover:bg-blue-600'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            Open CV Builder
          </Link>
        </div>
      )}
    </nav>
  )
}
