export type ClaimStatus =
  | 'processing'
  | 'approved'
  | 'rejected'
  | 'fraud_review'
  | 'failed'

export type ClaimCategory = 'health' | 'car' | 'home' | 'travel'

export type MetricEvent = {
  id: string
  timestamp: string
  claimId: string
  eventType:
    | 'claim_created'
    | 'document_processed'
    | 'ai_decision'
    | 'fraud_alert'
    | 'workflow_failed'
  agentName: string
  status: ClaimStatus
  category: ClaimCategory
  durationMs: number
  confidenceScore: number
}

export type ConnectionStatus =
  | 'connected'
  | 'disconnected'
  | 'reconnecting'
