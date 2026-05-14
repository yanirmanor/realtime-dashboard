import { Activity, Bell, Search } from 'lucide-react'
import { ConnectionStatus } from '../dashboard/ConnectionStatus'

export function Header() {
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/20 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
          <Activity size={20} />
        </div>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Live Claims Operations
          </h1>
          <p className="text-sm text-slate-400">
            Real-time AI insurance workflow monitoring
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-400 md:flex">
          <Search size={16} />
          <span>Search claims...</span>
        </div>

        <ConnectionStatus />

        <button className="rounded-xl border border-white/10 bg-slate-900 p-2 text-slate-300 hover:bg-slate-800">
          <Bell size={18} />
        </button>

        <div className="size-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600" />
      </div>
    </header>
  )
}
