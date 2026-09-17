import { Shield, Lock, Eye, Mail } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-gray-300">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-xs font-semibold mb-4">
          <Shield className="w-3.5 h-3.5" />
          Legal & Privacy
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
        <p className="text-sm text-gray-400">Last updated: September 17, 2026</p>
      </div>

      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 sm:p-10 space-y-8 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" />
            1. Overview & Data Philosophy
          </h2>
          <p>
            At <strong>ATS CV Builder</strong> (accessible via our website), we respect your personal privacy. We recognize that curriculum vitae and resumes contain sensitive professional and contact information. Our platform is architected with a privacy-first approach: your CV content is stored directly within your device’s local browser storage and is never sold, leased, or rented to third-party data brokers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" />
            2. Information We Collect & How We Use It
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>
              <strong>Resume Data:</strong> Contact information, employment history, educational qualifications, skills, and projects you enter into the builder or upload via PDF/DOCX documents. This information is used exclusively to format, score, and generate your CV documents.
            </li>
            <li>
              <strong>AI Processing (Google Gemini API):</strong> When you choose to use the "1-Click Auto-Optimize" or section rewrite tools, the selected CV text is securely sent to Google’s Gemini API solely to generate improved phrasing and ATS alignment. It is not retained to train generalized AI models.
            </li>
            <li>
              <strong>Analytics & Server Logs:</strong> Standard anonymous server logs (IP address, browser type, referring pages) to monitor performance, error diagnostics, and system stability.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">
            3. Cookies & Advertising (Google AdSense Compliance)
          </h2>
          <p className="mb-3">
            We and third-party vendors, including <strong>Google</strong>, use cookies and similar technologies to analyze traffic, enhance user experience, and serve relevant advertisements:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>
              Google’s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting{' '}
              <a 
                href="https://www.google.com/settings/ads" 
                target="_blank" 
                rel="noreferrer" 
                className="text-blue-400 underline hover:text-blue-300"
              >
                Google Ads Settings
              </a>
              .
            </li>
            <li>
              Alternatively, you can opt out of a third-party vendor’s use of cookies for personalized advertising by visiting{' '}
              <a 
                href="https://www.aboutads.info" 
                target="_blank" 
                rel="noreferrer" 
                className="text-blue-400 underline hover:text-blue-300"
              >
                www.aboutads.info
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Data Retention & Deletion</h2>
          <p>
            Because your CV documents are saved in your local browser cache, you have total control over your data. You can delete any CV draft at any moment by clicking the "Delete" button in your Dashboard, or by clearing your browser’s cookies and local storage.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. Security</h2>
          <p>
            We implement industry-standard HTTPS encryption across all endpoints to ensure all data transmitted between your browser and our server is secured against interception.
          </p>
        </section>

        <section className="border-t border-gray-800 pt-6">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            6. Contact Information
          </h2>
          <p>
            If you have questions, feedback, or requests regarding this Privacy Policy, please contact our team at:{' '}
            <a href="mailto:raamizriaz111@gmail.com" className="text-blue-400 font-medium underline hover:text-blue-300">
              raamizriaz111@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  )
}
