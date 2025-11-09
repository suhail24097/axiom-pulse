import { WebSocketServer } from "ws"
const wss = new WebSocketServer({ port: 8787 })
const tokens = [
  { id: "1", symbol: "AXM", price: 1.23 },
  { id: "2", symbol: "ETH", price: 3280.11 },
  { id: "3", symbol: "SOL", price: 162.4 }
]
function jitter(p) { const d = (Math.random()-0.5)*0.01*p; return Math.max(0.0001, p + d) }
setInterval(() => {
  for (const t of tokens) t.price = jitter(t.price)
  const payload = JSON.stringify({ type: "tick", data: tokens })
  wss.clients.forEach(c => c.readyState === 1 && c.send(payload))
}, 1200)
wss.on("connection", (ws) => { ws.send(JSON.stringify({ type: "init", data: tokens })) })
console.log("WS mock running ws://localhost:8787")
