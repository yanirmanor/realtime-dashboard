import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'

function formatTime(value: unknown, withHour = false) {
  const date = value instanceof Date ? value : new Date(String(value))

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleTimeString([], {
    ...(withHour ? { hour: '2-digit' } : {}),
    minute: '2-digit',
    second: '2-digit',
  })
}

export function LiveThroughputChart() {
  const events = useMetricsStore((state) => state.events)

  if (events.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#141820] text-sm text-[#8b90a0]">
        Waiting for live processing data...
      </div>
    )
  }

  const chartData = events
    .slice()
    .reverse()
    .map((event, index) => ({
      index: index + 1,
      time: new Date(event.timestamp),
      value: event.durationMs,
    }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis
          dataKey="time"
          type="category"
          interval="preserveStartEnd"
          minTickGap={42}
          tickFormatter={(value) => formatTime(value)}
          tick={{ fontSize: 11, fill: '#8b90a0' }}
          axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#8b90a0' }}
          axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
          tickLine={false}
        />
        <Tooltip
          labelFormatter={(value) => formatTime(value, true)}
          labelStyle={{ color: '#c1c6d7' }}
          itemStyle={{ color: '#adc7ff' }}
          contentStyle={{
            background: '#1e2024',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 12,
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#adc7ff"
          strokeWidth={2.4}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
