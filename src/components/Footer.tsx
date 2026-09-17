import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-lg text-white">ATS CV Builder</span>
          </Link>
          <p className="text-sm text-gray-500">Build. Optimize. Get Hired.</p>
        </div>
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ATS CV Builder. All rights reserved.
        </div>
      </div>
    </footer>
  )
}