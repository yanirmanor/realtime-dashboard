import { useVirtualizer } from '@tanstack/react-virtual'
import { Select } from '@base-ui-components/react/select'
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Search,
  XCircle,
} from 'lucide-react'
import { useMemo, useRef } from 'react'
import { useFilteredEvents } from '../../features/metrics/hooks/useFilteredEvents'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'
import type { ClaimStatus } from '../../features/metrics/types/metrics.types'
import { StatusBadge } from './StatusBadge'

const statuses = [
  'all',
  'processing',
  'approved',
  'rejected',
  'fraud_review',
  'failed',
]

const categoryAccent = {
  health: 'before:bg-[#4a8eff]',
  car: 'before:bg-[#4edea3]',
  home: 'before:bg-[#ffb84d]',
  travel: 'before:bg-[#b596ff]',
} as const

const statusIcon: Record<ClaimStatus, typeof Clock3> = {
  processing: Clock3,
  approved: CheckCircle2,
  rejected: XCircle,
  fraud_review: AlertTriangle,
  failed: XCircle,
}

export function MobileEventsList() {
  const events = useFilteredEvents()
  const selectEvent = useMetricsStore((state) => state.selectEvent)
  const searchQuery = useMetricsStore((state) => state.searchQuery)
  const setSearchQuery = useMetricsStore((state) => state.setSearchQuery)
  const selectedStatus = useMetricsStore((state) => state.selectedStatus)
  const setSelectedStatus = useMetricsStore((state) => state.setSelectedStatus)
  const parentRef = useRef<HTMLDivElement>(null)

  const data = useMemo(() => events, [events])

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 104,
    overscan: 6,
  })

  if (data.length === 0) {
    return (
      <div className="flex h-[240px] flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm font-medium text-[#d2d6e2]">No events to display</p>
        <p className="max-w-sm text-sm text-[#8b90a0]">
          Waiting for live claim events, or your current filters do not match any
          existing events.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="sticky top-0 z-20 -mx-1 rounded-xl border border-white/10 bg-[#0f131b]/95 p-2.5 backdrop-blur">
        <div className="grid grid-cols-[1fr_132px] gap-2.5">
          <label className="group flex h-10 items-center gap-2 rounded-lg border border-[#adc7ff]/15 bg-[#0c0e12] pr-2 pl-3 transition-colors focus-within:border-[#adc7ff]/50 focus-within:bg-[#101826]">
            <Search size={14} className="text-[#8b90a0]" />
            <input
              aria-label="Search live claim events"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-[#e2e2e8] outline-none placeholder:text-[#8b90a0]"
            />
          </label>

          <Select.Root
            value={selectedStatus}
            onValueChange={(value) => {
              if (value) {
                setSelectedStatus(String(value))
              }
            }}
          >
            <Select.Trigger
              aria-label="Filter events by claim status"
              className="h-10 rounded-lg border border-white/10 bg-[#141820] px-3 text-left text-sm text-[#e2e2e8] outline-none transition-colors hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <Select.Value>
                  {(value) => String(value ?? 'all').replace('_', ' ')}
                </Select.Value>
                <span className="text-[#8b90a0]">▾</span>
              </div>
            </Select.Trigger>

            <Select.Portal>
              <Select.Positioner sideOffset={8}>
                <Select.Popup className="z-[70] min-w-[160px] overflow-hidden rounded-xl border border-white/10 bg-[#1a1c20] p-1 shadow-2xl shadow-black/50">
                  <Select.List>
                    {statuses.map((status) => (
                      <Select.Item
                        key={status}
                        value={status}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-[#d2d6e2] outline-none data-[highlighted]:bg-[#adc7ff]/12"
                      >
                        <Select.ItemText>{status.replace('_', ' ')}</Select.ItemText>
                        <Select.ItemIndicator className="text-[#adc7ff]">✓</Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>

      <div ref={parentRef} className="h-[440px] overflow-auto">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const event = data[virtualRow.index]
          const StatusIcon = statusIcon[event.status]

          return (
            <button
              key={event.id}
              type="button"
              onClick={() => selectEvent(event)}
              className={`absolute left-0 w-full rounded-xl border border-white/10 bg-[#141820] p-3 pl-4 text-left transition-colors before:absolute before:bottom-2 before:left-0 before:top-2 before:w-1 before:rounded-r-full hover:bg-[#adc7ff]/6 ${categoryAccent[event.category]}`}
              style={{
                height: `${virtualRow.size - 8}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              aria-label={`Open details for claim ${event.claimId}`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="font-mono text-sm text-[#e2e2e8]">{event.claimId}</p>
                <StatusBadge status={event.status} />
              </div>

              <div className="flex items-center gap-2 text-xs text-[#8b90a0]">
                <StatusIcon size={14} />
                <span className="uppercase tracking-[0.06em]">{event.eventType.replace('_', ' ')}</span>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-[#c1c6d7]">
                <span>{event.agentName}</span>
                <span className="font-mono text-[#8b90a0]">{relativeTime(event.timestamp)}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
    </div>
  )
}

function relativeTime(timestamp: string) {
  const now = Date.now()
  const then = new Date(timestamp).getTime()
  const diffSeconds = Math.round((then - now) / 1000)

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  if (Math.abs(diffSeconds) < 60) {
    return rtf.format(diffSeconds, 'second')
  }

  const diffMinutes = Math.round(diffSeconds / 60)
  if (Math.abs(diffMinutes) < 60) {
    return rtf.format(diffMinutes, 'minute')
  }

  const diffHours = Math.round(diffMinutes / 60)
  return rtf.format(diffHours, 'hour')
}
