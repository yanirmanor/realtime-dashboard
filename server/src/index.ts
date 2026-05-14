import { Server } from 'socket.io'

const PORT = 4000
const CLIENT_ORIGIN = 'http://localhost:5173'

const io = new Server(PORT, {
  cors: {
    origin: CLIENT_ORIGIN,
  },
})

let isStreaming = true

const statuses = ['processing', 'approved', 'rejected', 'fraud_review', 'failed'] as const
const categories = ['health', 'car', 'home', 'travel'] as const
const agents = ['Policy Extractor', 'Fraud Detector', 'Claim Validator', 'Risk Scorer'] as const
const eventTypes = ['claim_created', 'document_processed', 'ai_decision', 'fraud_alert'] as const

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function createEvent() {
  const status = randomItem(statuses)

  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    claimId: `CLM-${randomNumber(10000, 99999)}`,
    eventType: status === 'failed' ? 'workflow_failed' : randomItem(eventTypes),
    agentName: randomItem(agents),
    status,
    category: randomItem(categories),
    durationMs: randomNumber(300, 6500),
    confidenceScore: Number((Math.random() * (0.99 - 0.65) + 0.65).toFixed(2)),
  }
}

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.emit('connection-status', {
    status: 'connected',
    timestamp: new Date().toISOString(),
  })

  socket.on('stream:start', () => {
    isStreaming = true
    io.emit('stream:status', { isStreaming })
  })

  socket.on('stream:stop', () => {
    isStreaming = false
    io.emit('stream:status', { isStreaming })
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

setInterval(() => {
  if (!isStreaming) return

  io.emit('metric:event', createEvent())
}, 1000)

console.log(`Socket server running on http://localhost:${PORT}`)
