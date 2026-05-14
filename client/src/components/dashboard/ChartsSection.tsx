import { CategoryDistributionChart } from './CategoryDistributionChart'
import { LiveThroughputChart } from './LiveThroughputChart'

export function ChartsSection() {
  return (
    <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
      <div className="min-h-[360px] rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4">
          <h2 className="font-medium text-slate-100">Processing Duration</h2>
          <p className="text-sm text-slate-400">
            Live processing duration in milliseconds.
          </p>
        </div>

        <LiveThroughputChart />
      </div>

      <div className="min-h-[360px] rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4">
          <h2 className="font-medium text-slate-100">
            Processing Distribution
          </h2>
          <p className="text-sm text-slate-400">Events by claim category.</p>
        </div>

        <CategoryDistributionChart />
      </div>
    </section>
  )
}
