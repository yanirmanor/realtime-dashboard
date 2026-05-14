import { AlertTriangle, Loader2, WifiOff } from 'lucide-react'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'

export function StatusBanner() {
  const connectionStatus = useMetricsStore((state) => state.connectionStatus)
  const isStreaming = useMetricsStore((state) => state.isStreaming)

  if (connectionStatus === 'connected' && isStreaming) {
    return null
  }

  if (connectionStatus === 'reconnecting') {
    return (
      <Banner
        icon={Loader2}
        title="Reconnecting to live stream"
        description="Trying to restore the websocket connection."
        className="border-amber-500/30 bg-amber-500/10 text-amber-200"
        spin
      />
    )
  }

  if (connectionStatus === 'disconnected') {
    return (
      <Banner
        icon={WifiOff}
        title="Live stream disconnected"
        description="The dashboard is not receiving new claim events."
        className="border-red-500/30 bg-red-500/10 text-red-200"
      />
    )
  }

  if (!isStreaming) {
    return (
      <Banner
        icon={AlertTriangle}
        title="Stream paused"
        description="Live updates are paused. Click Start to resume."
        className="border-slate-500/30 bg-slate-500/10 text-slate-200"
      />
    )
  }

  return null
}

function Banner({
  icon: Icon,
  title,
  description,
  className,
  spin = false,
}: {
  icon: typeof AlertTriangle
  title: string
  description: string
  className: string
  spin?: boolean
}) {
  return (
    <div className={`flex gap-3 rounded-2xl border p-4 ${className}`}>
      <Icon size={20} className={spin ? 'animate-spin' : ''} />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm opacity-80">{description}</p>
      </div>
    </div>
  )
}
