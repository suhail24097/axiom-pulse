// app/api/tokens/route.ts

// Tip: using the Web Standard Request type avoids Next imports
type Group = 'new' | 'final' | 'migrated'
type Token = {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  group: Group
}

// Demo data — add as many as you like
const base: Token[] = [
  // new
  { id: '1', symbol: 'AXM',  name: 'Axiom',     price: 1.23,    change24h:  2.1, volume24h: 1_200_345, marketCap: 120_000_000,     group: 'new' },
  { id: '4', symbol: 'NEW1', name: 'New One',   price: 0.91,    change24h: -1.2, volume24h:   450_003, marketCap: 12_500_000,     group: 'new' },
  { id: '5', symbol: 'NEW2', name: 'New Two',   price: 2.34,    change24h:  3.6, volume24h:   980_112, marketCap: 56_000_000,     group: 'new' },

  // final
  { id: '2', symbol: 'ETH',  name: 'Ethereum',  price: 3280.11, change24h: -0.9, volume24h: 32_000_345, marketCap: 390_000_000_000, group: 'final' },
  { id: '6', symbol: 'BTC',  name: 'Bitcoin',   price: 67000.2, change24h:  0.4, volume24h: 62_000_000, marketCap: 1_300_000_000_000, group: 'final' },

  // migrated
  { id: '3', symbol: 'SOL',  name: 'Solana',    price: 162.4,   change24h:  4.3, volume24h: 11_000_345, marketCap: 73_000_000_000,  group: 'migrated' },
  { id: '7', symbol: 'MIG1', name: 'Migrated1', price: 3.10,    change24h: -2.4, volume24h:     300_221, marketCap: 25_000_000,     group: 'migrated' },
]

// Optional: ensure this route is always dynamic
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const group = searchParams.get('group') as Group | null
  const data = group ? base.filter(x => x.group === group) : base
  return Response.json(data)
}
