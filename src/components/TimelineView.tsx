type TimelineEvent = {
  id: string
  timestamp: string
  title: string
  detail: string
}

type TimelineViewProps = {
  events: TimelineEvent[]
}

export default function TimelineView({ events }: TimelineViewProps) {
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold text-white">Investigation Timeline</h2>
      <div className="mt-4 space-y-4">
        {events.map(event => (
          <div key={event.id} className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>{event.timestamp}</span>
              <span className="rounded-full bg-slate-800/80 px-2 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                {event.title}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{event.detail}</p>
          </div>
        ))}
        {events.length === 0 && <p className="text-sm text-slate-500">No timeline events available.</p>}
      </div>
    </div>
  )
}
