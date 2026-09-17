import { Sparkles, Target, Zap, Heart, Mail, ShieldCheck, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-gray-300">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Our Mission
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">About ATS CV Builder</h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Democratizing career advancement with free, senior-engineer quality resume technology powered by Google Gemini AI.
        </p>
      </div>

      {/* Main Story Card */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 sm:p-10 space-y-10 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Target className="w-6 h-6 text-blue-500" />
            Why We Built This
          </h2>
          <p className="mb-4">
            Over 75% of job applications are filtered out by automated <strong>Applicant Tracking Systems (ATS)</strong> before a human hiring manager ever glances at them. Worse, existing commercial resume builders trick job seekers into spending 30 minutes crafting a CV, only to lock the download button behind an aggressive \$20/month subscription.
          </p>
          <p>
            We built <strong>ATS CV Builder</strong> to break that cycle. Our platform provides a free, professional-grade solution where anyone can upload an existing CV, analyze it against real algorithmic ATS benchmarks, auto-optimize phrasing using state-of-the-art AI, and download high-resolution PDFs and Word documents without surprise fees.
          </p>
        </section>

        {/* Pillars */}
        <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-gray-800">
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800/80">
            <Zap className="w-6 h-6 text-amber-400 mb-3" />
            <h3 className="font-semibold text-white mb-1">Gemini AI Powered</h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Context-aware content rephrasing that strengthens impact and metrics without fabricating details.
            </p>
          </div>
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800/80">
            <ShieldCheck className="w-6 h-6 text-green-400 mb-3" />
            <h3 className="font-semibold text-white mb-1">100-Point Scoring</h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Transparent rule-based scoring evaluating contact clarity, bullet density, action verbs, and structure.
            </p>
          </div>
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800/80">
            <Heart className="w-6 h-6 text-red-400 mb-3" />
            <h3 className="font-semibold text-white mb-1">Zero Paywall Promise</h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Free templates, free PDF downloads, and free AI optimization for ambitious job seekers worldwide.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <section className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-blue-950/20 border border-blue-900/40 p-6 sm:p-8 rounded-xl">
            <div>
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                Get in Touch & Feedback
              </h2>
              <p className="text-sm text-gray-400 max-w-md">
                Have suggestions for new templates, questions, or partnership opportunities? We'd love to hear from you.
              </p>
            </div>
            <a
              href="mailto:raamizriaz111@gmail.com"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-blue-900/30 whitespace-nowrap"
            >
              Contact Support
            </a>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <Link
          to="/builder"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-900/30 transition-all text-sm sm:text-base"
        >
          <Sparkles className="w-4 h-4" />
          Start Building Your ATS CV Now
        </Link>
      </div>
    </div>
  )
}
