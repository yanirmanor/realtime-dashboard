import type { ColumnDef } from '@tanstack/react-table'
import { StatusBadge } from '@/features/metrics/components/StatusBadge'
import type { MetricEvent } from '@/features/metrics/types/metrics.types'

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
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
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
