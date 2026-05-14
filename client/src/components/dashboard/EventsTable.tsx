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
import { eventColumns } from '../../features/metrics/table/event-columns'

export function EventsTable() {
  const events = useMetricsStore((state) => state.events)
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
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="grid grid-cols-[1.1fr_1.6fr_1.1fr_1.6fr_1fr_1fr_1fr] bg-slate-900 px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
        {table.getHeaderGroups()[0]?.headers.map((header) => (
          <button
            key={header.id}
            type="button"
            onClick={header.column.getToggleSortingHandler()}
            className="flex items-center gap-1 text-left hover:text-slate-200"
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
                onClick={() => selectEvent(row.original)}
                className="absolute left-0 grid w-full cursor-pointer grid-cols-[1.1fr_1.6fr_1.1fr_1.6fr_1fr_1fr_1fr] border-b border-white/10 px-4 py-3 text-sm text-slate-300 hover:bg-white/[0.04]"
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
          <div className="flex h-[240px] items-center justify-center text-sm text-slate-500">
            Waiting for live events...
          </div>
        )}
      </div>
    </div>
  )
}
