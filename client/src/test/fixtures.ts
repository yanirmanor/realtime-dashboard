import type { MetricEvent } from '../features/metrics/types/metrics.types'

export function createMetricEvent(overrides: Partial<MetricEvent> = {}): MetricEvent {
  return {
    id: 'evt-1',
    timestamp: '2026-01-01T00:00:00.000Z',
    claimId: 'CLM-0001',
    eventType: 'claim_created',
    agentName: 'Agent Smith',
    status: 'processing',
    category: 'health',
    durationMs: 320,
    confidenceScore: 0.82,
    ...overrides,
  }
}
