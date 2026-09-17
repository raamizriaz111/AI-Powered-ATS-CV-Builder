import { useCVStore } from '../../../store/cvStore'

export default function PersonalSection() {
  const { currentCV, updateCV } = useCVStore()
  if (!currentCV) return null

  const p = currentCV.personal
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCV(cv => { (cv.personal as any)[e.target.name] = e.target.value })
  }

  const fields = [
    { name: 'name', label: 'Full Name', placeholder: 'John Doe' },
    { name: 'title', label: 'Professional Title', placeholder: 'Software Engineer' },
    { name: 'email', label: 'Email', placeholder: 'john@example.com' },
    { name: 'phone', label: 'Phone', placeholder: '+1 234 567 8900' },
    { name: 'location', label: 'Location', placeholder: 'New York, NY' },
    { name: 'linkedin', label: 'LinkedIn URL', placeholder: 'linkedin.com/in/johndoe' },
    { name: 'github', label: 'GitHub URL', placeholder: 'github.com/johndoe' },
    { name: 'portfolio', label: 'Portfolio URL', placeholder: 'johndoe.com' }
  ]

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.name} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">{f.label}</label>
            <input
              name={f.name}
              value={(p as any)[f.name] || ''}
              onChange={handleChange}
              placeholder={f.placeholder}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  )
}