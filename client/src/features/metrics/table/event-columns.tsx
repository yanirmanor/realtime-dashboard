import type { ColumnDef } from '@tanstack/react-table'
import type { MetricEvent } from '../types/metrics.types'

export const eventColumns: ColumnDef<MetricEvent>[] = [
  {
    accessorKey: 'claimId',
    header: 'Claim ID',
  },
  {
    accessorKey: 'eventType',
    header: 'Event Type',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status

      return (
        <span className="rounded-full border border-white/10 bg-slate-900 px-2 py-1 text-xs">
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: 'agentName',
    header: 'Agent',
  },
  {
    accessorKey: 'durationMs',
    header: 'Duration',
    cell: ({ row }) => `${row.original.durationMs}ms`,
  },
  {
    accessorKey: 'confidenceScore',
    header: 'Confidence',
    cell: ({ row }) => `${Math.round(row.original.confidenceScore * 100)}%`,
  },
  {
    accessorKey: 'timestamp',
    header: 'Time',
    cell: ({ row }) =>
      new Date(row.original.timestamp).toLocaleTimeString(),
  },
]
