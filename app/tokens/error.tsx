'use client'
export default function Error({ error }: { error: Error & { digest?: string }}) {
  return <div className="p-4 text-red-600">Failed to load tokens: {error.message}</div>
}
