import { CategoryDistributionChart } from './CategoryDistributionChart'
import { LiveThroughputChart } from './LiveThroughputChart'

export function ChartsSection() {
  return (
    <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
      <div className="widget-card min-h-[360px] rounded-xl p-5">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-[#e2e2e8]">Processing Duration</h2>
          <p className="text-sm text-[#c1c6d7]">
            Live processing duration in milliseconds.
          </p>
        </div>

        <LiveThroughputChart />
      </div>

      <div className="widget-card min-h-[360px] rounded-xl p-5">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-[#e2e2e8]">
            Processing Distribution
          </h2>
          <p className="text-sm text-[#c1c6d7]">Events by claim category.</p>
        </div>

        <CategoryDistributionChart />
      </div>
    </section>
  )
}
