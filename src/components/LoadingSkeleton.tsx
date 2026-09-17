export function SkeletonLine({ className = '' }: { className?: string }) {
  return <div className={`h-4 bg-gray-800 rounded animate-pulse ${className}`} />
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 space-y-4">
      <SkeletonLine className="w-1/3 h-6" />
      <SkeletonLine className="w-full" />
      <SkeletonLine className="w-5/6" />
      <SkeletonLine className="w-4/6" />
    </div>
  )
}