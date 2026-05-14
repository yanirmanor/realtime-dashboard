export function ChartsSection() {
  return (
    <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
      <div className="min-h-[360px] rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4">
          <h2 className="font-medium text-slate-100">Live Claims Throughput</h2>
          <p className="text-sm text-slate-400">
            Incoming claim events over time.
          </p>
        </div>

        <div className="flex h-[280px] items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-slate-500">
          Chart placeholder
        </div>
      </div>

      <div className="min-h-[360px] rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4">
          <h2 className="font-medium text-slate-100">Processing Distribution</h2>
          <p className="text-sm text-slate-400">Events by claim category.</p>
        </div>

        <div className="flex h-[280px] items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-slate-500">
          Distribution placeholder
        </div>
      </div>
    </section>
  )
}
