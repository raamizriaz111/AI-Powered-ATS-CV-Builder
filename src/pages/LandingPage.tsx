import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Upload, BarChart, Sparkles, LayoutTemplate, Download } from 'lucide-react'

export default function LandingPage() {
  const features = [
    { icon: FileText, title: 'Build from Scratch', desc: 'Complete multi-step CV wizard' },
    { icon: Upload, title: 'Upload & Parse', desc: 'Import existing PDF or DOCX instantly' },
    { icon: BarChart, title: 'ATS Score', desc: 'Real-time compatibility analysis' },
    { icon: Sparkles, title: 'AI Optimization', desc: 'Gemini-powered content improvements' },
    { icon: LayoutTemplate, title: '6 Templates', desc: 'Professional, ATS-ready designs' },
    { icon: Download, title: 'Export', desc: 'Download PDF or DOCX instantly' },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section 
        className="relative pt-32 pb-20 overflow-hidden text-white"
        style={{ background: 'linear-gradient(-45deg, #0f172a, #1e1b4b, #172554, #0f172a)', backgroundSize: '400% 400%', animation: 'gradient 15s ease infinite' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-sm font-medium mb-6">
              ✨ Powered by Gemini AI
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Build. Optimize. <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Get Hired.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Create ATS-friendly resumes in minutes. Let our AI analyze your content against job descriptions to maximize your chances.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/builder" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg shadow-blue-900/20">
                Start Building Free
              </Link>
              <Link to="/upload" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-colors backdrop-blur-sm">
                Upload Resume
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden md:block">
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto bg-white rounded-lg shadow-2xl overflow-hidden p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-1/2 h-6 bg-gray-300 rounded mb-4" />
              <div className="w-1/3 h-3 bg-gray-200 rounded mb-8" />
              <div className="space-y-3 mb-8">
                <div className="w-full h-2 bg-gray-200 rounded" />
                <div className="w-full h-2 bg-gray-200 rounded" />
                <div className="w-5/6 h-2 bg-gray-200 rounded" />
              </div>
              <div className="w-1/4 h-4 bg-gray-300 rounded mb-4" />
              <div className="space-y-4">
                {[1,2].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="w-1/3 h-3 bg-gray-300 rounded" />
                      <div className="w-1/6 h-3 bg-gray-200 rounded" />
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded" />
                    <div className="w-4/5 h-2 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-gray-900 border-y border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
          <div><h4 className="text-2xl font-bold text-white mb-1">6</h4><p className="text-sm text-gray-400">Professional Templates</p></div>
          <div><h4 className="text-2xl font-bold text-white mb-1">100</h4><p className="text-sm text-gray-400">Point ATS Score</p></div>
          <div><h4 className="text-2xl font-bold text-white mb-1">AI</h4><p className="text-sm text-gray-400">Powered Optimization</p></div>
          <div><h4 className="text-2xl font-bold text-white mb-1">PDF</h4><p className="text-sm text-gray-400">& DOCX Export</p></div>
        </div>
      </div>

      {/* Features */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything you need to succeed</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:scale-105 transition-transform duration-300 cursor-default">
                <f.icon className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-gray-900 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-16">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -z-10" />
            <div className="flex-1 bg-gray-950 p-6 rounded-xl border border-gray-800">
              <div className="w-12 h-12 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center font-bold mx-auto mb-4 border border-blue-800">1</div>
              <h4 className="text-white font-medium">Create or Upload Your CV</h4>
            </div>
            <div className="flex-1 bg-gray-950 p-6 rounded-xl border border-gray-800">
              <div className="w-12 h-12 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center font-bold mx-auto mb-4 border border-blue-800">2</div>
              <h4 className="text-white font-medium">Check ATS Score & Fix Issues</h4>
            </div>
            <div className="flex-1 bg-gray-950 p-6 rounded-xl border border-gray-800">
              <div className="w-12 h-12 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center font-bold mx-auto mb-4 border border-blue-800">3</div>
              <h4 className="text-white font-medium">Download & Apply</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-800/50 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Land Your Dream Job?</h2>
            <Link to="/builder" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Build Your CV Now
            </Link>
          </div>
        </div>
      </section>
      
      <div className="py-6 text-center text-xs text-gray-600 italic">
        Disclaimer: This tool provides recommendations based on common ATS patterns. It does not guarantee job placement.
      </div>
    </div>
  )
}