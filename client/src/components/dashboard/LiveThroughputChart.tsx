import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'

export function LiveThroughputChart() {
  const events = useMetricsStore((state) => state.events)

  if (events.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-slate-500">
        Waiting for live processing data...
      </div>
    )
  }

  const chartData = events
    .slice()
    .reverse()
    .map((event, index) => ({
      index: index + 1,
      time: new Date(event.timestamp).toLocaleTimeString(),
      value: event.durationMs,
    }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData}>
        <XAxis dataKey="time" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            background: '#020617',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
