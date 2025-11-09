'use client'

import { useCallback, useMemo, useState } from "react"
import type { Token } from "@/lib/types"         // ✅ type-only import
import { TokenRow } from "./TokenRow"

interface TokenTableProps {
  tokens: Token[]                               // ✅ strict, clean type
  onRowClick: (id: string) => void
}

export default function TokenTable({ tokens, onRowClick }: TokenTableProps) {
  const [sort, setSort] = useState<{ key: keyof Token; dir: "asc" | "desc" }>({
    key: "marketCap",
    dir: "desc",
  })

  // ✅ sort stable & safe
  const sorted = useMemo(() => {
    const arr = [...(tokens ?? [])]
    arr.sort((a, b) => {
      const k = sort.key
      const d = sort.dir === "asc" ? 1 : -1
      const av = (a as any)[k]
      const bv = (b as any)[k]
      return av === bv ? 0 : (av > bv ? 1 : -1) * d
    })
    return arr
  }, [tokens, sort])

  const toggleSort = useCallback((key: keyof Token) => {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    )
  }, [])

  const SortLabel = ({
    label,
    active,
  }: {
    label: string
    active: boolean
  }) => (
    <span className="inline-flex items-center gap-1">
      {label}
      {active ? (
        <span className="opacity-70">{sort.dir === "asc" ? "▲" : "▼"}</span>
      ) : null}
    </span>
  )

  return (
    <div className="card">
      <div className="flex items-center justify-between p-3">
        <div className="text-sm text-muted">Columns</div>
        <div className="text-sm text-muted">Live prices stream every ~1.2s</div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-t border-line">
            <th
              className="px-3 py-2.5 cursor-pointer select-none"
              onClick={() => toggleSort("symbol")}
            >
              <SortLabel label="Token" active={sort.key === "symbol"} />
            </th>
            <th className="px-3 py-2.5 hidden md:table-cell">Name</th>

            <th
              className="px-3 py-2.5 cursor-pointer select-none"
              onClick={() => toggleSort("price")}
            >
              <SortLabel label="Price" active={sort.key === "price"} />
            </th>

            <th
              className="px-3 py-2.5 cursor-pointer select-none"
              onClick={() => toggleSort("change24h")}
            >
              <SortLabel label="24h" active={sort.key === "change24h"} />
            </th>

            <th
              className="px-3 py-2.5 hidden sm:table-cell cursor-pointer select-none"
              onClick={() => toggleSort("volume24h")}
            >
              <SortLabel label="Volume" active={sort.key === "volume24h"} />
            </th>

            <th
              className="px-3 py-2.5 hidden lg:table-cell cursor-pointer select-none"
              onClick={() => toggleSort("marketCap")}
            >
              <SortLabel label="Mkt Cap" active={sort.key === "marketCap"} />
            </th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((t) => (
            <TokenRow key={t.id} {...t} onClick={onRowClick} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
