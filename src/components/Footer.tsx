import { Sparkles, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left max-w-sm">
            <Link to="/" className="flex items-center gap-2 group">
              <Sparkles className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors" />
              <span className="font-bold text-lg text-white">ATS CV Builder</span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-400">
              Free AI-powered ATS CV Builder & Resume Optimizer. Build, score, and optimize your CV to reach a 100/100 ATS score.
            </p>
          </div>

          {/* Legal & Company Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3 text-xs sm:text-sm font-medium text-gray-400">
            <Link to="/about" className="hover:text-white transition-colors">About & Contact</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-900/80 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} ATS CV Builder. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for job seekers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
