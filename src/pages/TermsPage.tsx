import { FileText, CheckCircle2, AlertCircle, Mail } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-gray-300">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-xs font-semibold mb-4">
          <FileText className="w-3.5 h-3.5" />
          Terms of Service
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Terms of Service</h1>
        <p className="text-sm text-gray-400">Last updated: September 17, 2026</p>
      </div>

      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 sm:p-10 space-y-8 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">1. Agreement to Terms</h2>
          <p>
            By accessing or using <strong>ATS CV Builder</strong>, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may discontinue use of the website immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            2. Permitted Use & Ownership
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>
              <strong>Your Content:</strong> You retain 100% intellectual property rights and full ownership over all resumes, text, descriptions, work history, and documents you create or upload using this platform.
            </li>
            <li>
              <strong>Free Access:</strong> You are granted a non-exclusive, worldwide license to use the templates and generated PDF/DOCX files for personal and commercial job application purposes.
            </li>
            <li>
              <strong>Prohibited Activities:</strong> You agree not to reverse engineer, scrape, abuse server endpoints, or transmit malicious code through the platform.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            3. Disclaimer of Career Outcomes
          </h2>
          <p>
            ATS CV Builder provides automated formatting and heuristic ATS compatibility scoring based on common recruitment industry standards. However, hiring decisions depend on individual company criteria, recruiter preferences, and market conditions. We make no warranty or guarantee that using this tool will result in job interviews, offers, or career outcomes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, ATS CV Builder and its creators shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. Modifications to the Service</h2>
          <p>
            We reserve the right to modify or discontinue features, templates, or services at any time without prior notice. Continued use of the platform following any modifications constitutes acceptance of updated terms.
          </p>
        </section>

        <section className="border-t border-gray-800 pt-6">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            6. Contact Us
          </h2>
          <p>
            For any inquiries regarding these terms, please contact:{' '}
            <a href="mailto:raamizriaz111@gmail.com" className="text-blue-400 font-medium underline hover:text-blue-300">
              raamizriaz111@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  )
}
