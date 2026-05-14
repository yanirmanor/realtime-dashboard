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
        className="border-[#ffb84d]/40 bg-[#ffb84d]/12 text-[#ffd89f]"
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
        className="border-[#ffb4ab]/40 bg-[#ffb4ab]/12 text-[#ffd2ce]"
      />
    )
  }

  if (!isStreaming) {
    return (
      <Banner
        icon={AlertTriangle}
        title="Stream paused"
        description="Live updates are paused. Click Start to resume."
        className="border-[#8b90a0]/40 bg-[#8b90a0]/12 text-[#d7d9df]"
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
    <div className={`glass-panel flex gap-3 rounded-xl border p-4 ${className}`}>
      <Icon size={20} className={spin ? 'animate-spin' : ''} />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm opacity-85">{description}</p>
      </div>
    </div>
  )
}
