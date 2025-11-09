export default function Loading() {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton h-8" />
      ))}
    </div>
  )
}
