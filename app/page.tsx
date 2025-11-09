'use client'

import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TokenTable from "@/components/TokenTable"

import type { RootState } from "@/lib/store"
import type { Token } from "@/lib/types"

import { setActiveGroup, openTokenModal, closeTokenModal } from "@/lib/ui-slice"
import { useTokens } from "@/lib/hooks"
import { usePriceStream } from "@/lib/ws-client"

export default function TokensPage() {
  // Redux
  const dispatch = useDispatch()
  const ui = useSelector((s: RootState) => s.ui)

  // Token data
  const { data, isLoading, isError, refetch } = useTokens(ui.activeGroup)

  // Live price cache
  const [live, setLive] = useState<Record<string, number>>({})

  // WebSocket updates
  usePriceStream((ticks) => {
    setLive((prev) => {
      const next = { ...prev }
      for (const t of ticks) next[t.id] = t.price
      return next
    })
  })

  // Auto-refetch
  useEffect(() => {
    const id = setInterval(() => refetch(), 8000)
    return () => clearInterval(id)
  }, [refetch])

  // ✅ Final strict version — annotated return + cast base
  const tableTokens = useMemo<Token[]>(() => {
    const base = (data ?? []) as Token[]
    return base.map(t =>
      live[t.id] !== undefined ? { ...t, price: live[t.id] } : t
    ) as Token[]
  }, [data, live])
  

  // Banner
  const banner =
    isError ? (
      <div className="p-2 text-sm text-white bg-red-600 rounded">
        Failed to load. Showing last known data.
      </div>
    ) : isLoading ? (
      <div className="p-2 text-sm text-gray-600">Loading…</div>
    ) : null

  return (
    <main className="container space-y-3">
      {/* Tabs */}
      <div className="flex gap-2">
        {(["new", "final", "migrated"] as const).map((k) => (
          <button
            key={k}
            onClick={() => dispatch(setActiveGroup(k))}
            className={`px-3 py-1.5 rounded-md border text-sm transition
              ${
                ui.activeGroup === k
                  ? "bg-black text-white border-black"
                  : "bg-white text-ink border-line hover:bg-wash"
              }`}
          >
            {k}
          </button>
        ))}
      </div>

      {banner}

      {/* Table */}
      <TokenTable
        tokens={tableTokens}
        onRowClick={(id) => dispatch(openTokenModal(id))}
      />

      {/* Modal */}
      <dialog
        open={Boolean(ui.modalTokenId)}
        className="rounded-xl p-4 bg-white border shadow w-[min(560px,95vw)]"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Token Details</h2>
          <button onClick={() => dispatch(closeTokenModal())}>✕</button>
        </div>

        <div className="text-sm text-gray-600">
          More token analytics can go here.
        </div>
      </dialog>
    </main>
  )
}
