'use client'

import { useQuery } from "@tanstack/react-query"
import type { Token } from "./types"

export function useTokens(group?: string) {
  return useQuery<Token[]>({
    queryKey: ["tokens", group ?? "all"],
    queryFn: async () => {
      const url = group ? `/api/tokens?group=${group}` : "/api/tokens"
      const res = await fetch(url, { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch tokens")
      const json = (await res.json()) as Token[]
      return json
    }
  })
}
