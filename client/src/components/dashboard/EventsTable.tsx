import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { ArrowUpDown } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'
import { useFilteredEvents } from '../../features/metrics/hooks/useFilteredEvents'
import { eventColumns } from '../../features/metrics/table/event-columns'

export function EventsTable() {
  const events = useFilteredEvents()
  const selectEvent = useMetricsStore((state) => state.selectEvent)
  const [sorting, setSorting] = useState<SortingState>([])

  const data = useMemo(() => events, [events])
  const parentRef = useRef<HTMLDivElement>(null)

  const table = useReactTable({
    data,
    columns: eventColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const rows = table.getRowModel().rows

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
    overscan: 8,
  })

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141820]">
      <div className="grid grid-cols-[1.1fr_1.6fr_1.1fr_1.6fr_1fr_1fr_1fr] border-b border-white/10 bg-[#0c0e12] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c1c6d7]">
        {table.getHeaderGroups()[0]?.headers.map((header) => (
          <button
            key={header.id}
            type="button"
            onClick={header.column.getToggleSortingHandler()}
            className="flex items-center gap-1 text-left hover:text-[#e2e2e8]"
          >
            {flexRender(
              header.column.columnDef.header,
              header.getContext(),
            )}
            <ArrowUpDown size={12} />
          </button>
        ))}
      </div>

      <div
        ref={parentRef}
        className="h-[420px] overflow-auto"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index]

            return (
              <div
                key={row.id}
                role="button"
                tabIndex={0}
                aria-label={`Open details for claim ${row.original.claimId}`}
                onClick={() => selectEvent(row.original)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    selectEvent(row.original)
                  }
                }}
                className="absolute left-0 grid w-full cursor-pointer grid-cols-[1.1fr_1.6fr_1.1fr_1.6fr_1fr_1fr_1fr] border-b border-white/5 px-4 py-3 text-sm text-[#d2d6e2] outline-none hover:bg-[#adc7ff]/5 focus:bg-[#adc7ff]/10"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="truncate pr-3">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {events.length === 0 && (
          <div className="flex h-[240px] flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-[#d2d6e2]">
              No events to display
            </p>
            <p className="max-w-sm text-sm text-[#8b90a0]">
              Waiting for live claim events, or your current filters do not match any
              existing events.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
