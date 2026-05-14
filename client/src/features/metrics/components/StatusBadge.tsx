import type { ClaimStatus } from '@/features/metrics/types/metrics.types'

const statusStyles: Record<ClaimStatus, string> = {
  processing: 'border-[#4a8eff]/40 bg-[#4a8eff]/15 text-[#adc7ff]',
  approved: 'border-[#4edea3]/40 bg-[#4edea3]/15 text-[#7dffc8]',
  rejected: 'border-[#ffb4ab]/40 bg-[#ffb4ab]/12 text-[#ffd2ce]',
  fraud_review: 'border-[#ffb84d]/40 bg-[#ffb84d]/15 text-[#ffd89f]',
  failed: 'border-[#ff8da1]/40 bg-[#ff8da1]/15 text-[#ffc8d2]',
}

export function StatusBadge({ status }: { status: ClaimStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] ${statusStyles[status]}`}
    >
      {status.replace('_', ' ')}
    </span>
  )
}
