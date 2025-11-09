'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/lib/store"
import { useState } from "react"

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const [qc] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 5000, refetchOnWindowFocus: false } }
  }))
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    </ReduxProvider>
  )
}
