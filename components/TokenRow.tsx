'use client'

import NumberDelta from "./NumberDelta"

export interface TokenRowProps {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  onClick?: (id: string) => void
}

export function TokenRow({
  id, symbol, name, price, change24h, volume24h, marketCap, onClick
}: TokenRowProps) {
  return (
    <tr
      className="cursor-pointer transition-colors hover:bg-wash"
      onClick={() => onClick?.(id)}
    >
      <td className="px-3 py-2.5 font-medium text-ink whitespace-nowrap">
        {symbol}
      </td>
      <td className="px-3 py-2.5 text-muted hidden md:table-cell">
        {name}
      </td>
      <td className="px-3 py-2.5 tabular-nums">
        ${price.toFixed(2)}
      </td>
      <td className="px-3 py-2.5 tabular-nums">
        <NumberDelta value={change24h} format={(n) => `${n.toFixed(2)}%`} />
      </td>
      <td className="px-3 py-2.5 tabular-nums hidden sm:table-cell">
        {Intl.NumberFormat().format(volume24h)}
      </td>
      <td className="px-3 py-2.5 tabular-nums hidden lg:table-cell">
        {Intl.NumberFormat().format(marketCap)}
      </td>
    </tr>
  )
}
