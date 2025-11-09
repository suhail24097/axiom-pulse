'use client'
import { useEffect, useRef } from "react"
export type PriceTick = { id: string; price: number }
export function usePriceStream(onTick: (ticks: PriceTick[]) => void) {
  const handler = useRef(onTick); handler.current = onTick
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8787"
    const ws = new WebSocket(url)
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg?.type === "tick") handler.current(msg.data)
    }
    return () => ws.close()
  }, [])
}
