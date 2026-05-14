import { Dialog } from '@base-ui-components/react/dialog'
import { X } from 'lucide-react'
import { useMetricsStore } from '@/features/metrics/store/metrics.store'

export function EventDetailsDrawer() {
  const selectedEvent = useMetricsStore((state) => state.selectedEvent)
  const closeEventDetails = useMetricsStore(
    (state) => state.closeEventDetails,
  )

  if (!selectedEvent) {
    return null
  }

  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) {
          closeEventDetails()
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-200" />
        <Dialog.Popup
          role="dialog"
          aria-modal="true"
          aria-label={`Claim details for ${selectedEvent.claimId}`}
          className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-slate-950 p-6 shadow-2xl transition-transform duration-200"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Claim details</p>
              <Dialog.Title className="text-xl font-semibold text-slate-50">
                {selectedEvent.claimId}
              </Dialog.Title>
            </div>

            <Dialog.Close
              aria-label="Close claim details drawer"
              className="rounded-xl border border-white/10 bg-slate-900 p-2 text-slate-300 hover:bg-slate-800"
            >
              <X size={18} />
            </Dialog.Close>
          </div>

          <Dialog.Description className="sr-only">
            Detailed claim information and available next actions.
          </Dialog.Description>

          <div className="grid gap-4">
            <DetailItem label="Event ID" value={selectedEvent.id} />
            <DetailItem label="Event Type" value={selectedEvent.eventType} />
            <DetailItem label="Status" value={selectedEvent.status} />
            <DetailItem label="AI Agent" value={selectedEvent.agentName} />
            <DetailItem label="Category" value={selectedEvent.category} />
            <DetailItem
              label="Duration"
              value={`${selectedEvent.durationMs}ms`}
            />
            <DetailItem
              label="Confidence"
              value={`${Math.round(selectedEvent.confidenceScore * 100)}%`}
            />
            <DetailItem
              label="Timestamp"
              value={new Date(selectedEvent.timestamp).toLocaleString()}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="mb-2 text-sm font-medium text-slate-200">
              AI Decision Summary
            </h3>
            <p className="text-sm leading-6 text-slate-400">
              The AI agent processed this claim event and assigned a confidence
              score based on extracted policy data, claim category, and workflow
              status.
            </p>
          </div>

          <div className="mt-6 flex gap-2">
            <button className="flex-1 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-cyan-950">
              Retry workflow
            </button>

            <button className="flex-1 rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800">
              Manual review
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function DetailItem({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm text-slate-200">{value}</p>
    </div>
  )
}
