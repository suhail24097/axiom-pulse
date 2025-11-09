import "./globals.css"
import AppProviders from "./providers"

export const metadata = {
  title: "Axiom Pulse — Token Table",
  description: "Token discovery table demo with live updates"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
