'use client'

import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TokenTable from "@/components/TokenTable"
import { RootState } from "@/lib/store"
import { setActiveGroup, openTokenModal, closeTokenModal } from "@/lib/ui-slice"
import { useTokens } from "@/lib/hooks"
import { usePriceStream } from "@/lib/ws-client"

export default function TokensPage() {
  // ⬇️ All hooks at top, fixed order
  const dispatch = useDispatch()
  const ui = useSelector((s: RootState) => s.ui)
  const { data, isLoading, isError, refetch } = useTokens(ui.activeGroup)
  const [live, setLive] = useState<Record<string, number>>({})

  usePriceStream((ticks) => {
    setLive((prev) => {
      const next = { ...prev }
      for (const t of ticks) next[t.id] = t.price
      return next
    })
  })

  useEffect(() => {
    const id = setInterval(() => refetch(), 8000)
    return () => clearInterval(id)
  }, [refetch])

  // Always compute a tokens array; never undefined
  const tableTokens = useMemo(() => {
    const base = Array.isArray(data) ? data : []
    return base.map(t => (live[t.id] ? { ...t, price: live[t.id]! } : t))
  }, [data, live])

  // Status banner is just text; table always mounts
  const banner =
    isError ? (
      <div className="p-2 text-sm text-white bg-red-600 rounded">
        Failed to load. Showing last known data.
      </div>
    ) : isLoading ? (
      <div className="p-2 text-sm text-gray-600">Loading…</div>
    ) : null

  return (
    <main className="max-w-6xl mx-auto p-4 space-y-3">
      <div className="flex gap-2">
        {(["new", "final", "migrated"] as const).map((k) => (
          <button
            key={k}
            onClick={() => dispatch(setActiveGroup(k))}
            className={`px-3 py-1 rounded border ${
              ui.activeGroup === k ? "bg-gray-900 text-white" : "bg-white"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      {banner}

      <TokenTable tokens={tableTokens} onRowClick={(id) => dispatch(openTokenModal(id))} />

      <dialog
        open={Boolean(ui.modalTokenId)}
        className="rounded-xl p-4 bg-white border shadow w-[min(560px,95vw)]"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Token Details</h2>
          <button onClick={() => dispatch(closeTokenModal())}>✕</button>
        </div>
        <div className="text-sm text-gray-600">More token analytics can go here.</div>
      </dialog>
    </main>
  )
}
