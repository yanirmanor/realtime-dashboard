import { Select } from '@base-ui-components/react/select'
import { Play, Search, StopCircle } from 'lucide-react'
import {
  startStream,
  stopStream,
} from '../../features/metrics/sockets/useMetricsSocket'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'

const statuses = [
  'all',
  'processing',
  'approved',
  'rejected',
  'fraud_review',
  'failed',
]

export function Header() {
  const isStreaming = useMetricsStore((state) => state.isStreaming)
  const searchQuery = useMetricsStore((state) => state.searchQuery)
  const setSearchQuery = useMetricsStore((state) => state.setSearchQuery)
  const selectedStatus = useMetricsStore((state) => state.selectedStatus)
  const setSelectedStatus = useMetricsStore((state) => state.setSelectedStatus)

  return (
    <header className="glass-panel sticky top-3 z-40 mb-6 rounded-2xl p-0 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:gap-6">
        <div className="min-w-[190px]">
          <h1 className="text-4xl font-semibold tracking-tight text-[#e2e2e8] lg:text-3xl">
            ClaimGuard AI
          </h1>
          <p className="text-[28px] text-[#c1c6d7] lg:text-sm">Live Claims Operations</p>
        </div>

        <label className="flex h-14 flex-[1.4] items-center gap-3 rounded-full border border-white/10 bg-[#020912] px-5">
          <Search size={20} className="text-[#8b90a0]" />
          <input
            aria-label="Search live claim events"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search claim, agent, event..."
            className="w-full bg-transparent text-lg text-[#e2e2e8] outline-none placeholder:text-[#8b90a0]"
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
            className="h-14 min-w-[220px] rounded-xl border border-white/10 bg-[#141820] px-4 text-left text-lg text-[#e2e2e8] outline-none"
          >
            <div className="flex items-center justify-between gap-3">
              <Select.Value>
                {(value) => String(value ?? 'all').replace('_', ' ')}
              </Select.Value>
              <span className="text-[#8b90a0]">▾</span>
            </div>
          </Select.Trigger>

          <Select.Portal>
            <Select.Positioner sideOffset={8}>
              <Select.Popup className="z-[60] min-w-[200px] overflow-hidden rounded-xl border border-white/10 bg-[#1a1c20] p-1 shadow-2xl shadow-black/50">
                <Select.List>
                  {statuses.map((status) => (
                    <Select.Item
                      key={status}
                      value={status}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-base text-[#d2d6e2] outline-none data-[highlighted]:bg-[#adc7ff]/12"
                    >
                      <Select.ItemText>
                        {status.replace('_', ' ')}
                      </Select.ItemText>
                      <Select.ItemIndicator className="text-[#adc7ff]">
                        ✓
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.List>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>

        <div className="ml-auto flex items-center gap-3">
          <div className="flex rounded-xl bg-[#2b2f39] p-1">
            <button
              type="button"
              aria-label="Start live event stream"
              onClick={startStream}
              disabled={isStreaming}
              className="inline-flex items-center gap-2 rounded-lg bg-[#4edea3] px-6 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#003824] disabled:opacity-45"
            >
              <Play size={14} />
              Start
            </button>
            <button
              type="button"
              aria-label="Pause live event stream"
              onClick={stopStream}
              disabled={!isStreaming}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#c1c6d7] disabled:opacity-45"
            >
              <StopCircle size={14} />
              Stop
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}
