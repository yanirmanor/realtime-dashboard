import { Loader2, Wifi, WifiOff } from 'lucide-react'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'

export function ConnectionStatus() {
  const connectionStatus = useMetricsStore((state) => state.connectionStatus)

  const config = {
    connected: {
      label: 'Connected',
      icon: Wifi,
      className: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    },
    reconnecting: {
      label: 'Reconnecting',
      icon: Loader2,
      className: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    },
    disconnected: {
      label: 'Disconnected',
      icon: WifiOff,
      className: 'border-red-500/30 bg-red-500/10 text-red-300',
    },
  }[connectionStatus]

  const Icon = config.icon

  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${config.className}`}
    >
      <Icon
        size={14}
        className={connectionStatus === 'reconnecting' ? 'animate-spin' : ''}
      />
      <span>{config.label}</span>
    </div>
  )
}
