// 'use client'
// import { useRef, useEffect, useState } from "react"
// export default function NumberDelta({ value, format }: { value: number; format?: (n:number)=>string }) {
//   const [cls, setCls] = useState("")
//   const prev = useRef<number>(value)
//   useEffect(() => {
//     if (value > prev.current) setCls("price-delta-up")
//     else if (value < prev.current) setCls("price-delta-down")
//     const id = setTimeout(() => setCls(""), 650)
//     prev.current = value
//     return () => clearTimeout(id)
//   }, [value])
//   const txt = format ? format(value) : value.toFixed(2)
//   const color = value >= 0 ? "text-up" : "text-down"
//   return <span className={`${color} transition-colors ${cls}`}>{txt}</span>
// }
'use client'

import { useRef, useEffect, useState } from "react"

export default function NumberDelta({
  value,
  format,
}: {
  value: number
  format?: (n: number) => string
}) {
  const [cls, setCls] = useState("")
  const prev = useRef<number>(value)

  useEffect(() => {
    if (value > prev.current) setCls("price-delta-up")
    else if (value < prev.current) setCls("price-delta-down")
    const id = setTimeout(() => setCls(""), 650)
    prev.current = value
    return () => clearTimeout(id)
  }, [value])

  const txt = format ? format(value) : value.toFixed(2)
  const color = value >= 0 ? "text-up" : "text-down"

  return <span className={`${color} transition-colors ${cls}`}>{txt}</span>
}
