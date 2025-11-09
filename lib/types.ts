// import { z } from "zod"
// export const TokenSchema = z.object({
//   id: z.string(),
//   symbol: z.string(),
//   name: z.string(),
//   price: z.number(),
//   change24h: z.number(),
//   volume24h: z.number(),
//   marketCap: z.number(),
//   group: z.enum(["new","final","migrated"])
// })
// ✅ Core Token shape used everywhere
export interface Token {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  group: string        
}

// export interface Token {
//   id: string
//   symbol: string
//   name: string
//   price: number
//   change24h: number
//   volume24h: number
//   marketCap: number
//   group: string
// }

