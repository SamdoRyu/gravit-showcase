import { MODE_LABEL, type Mode } from '../data/artifacts'

export function ModeBadge({ mode }: { mode: Mode }) {
  const style =
    mode === 'server'
      ? 'border-glow/40 bg-glow/10 text-glow'
      : 'border-white/15 bg-white/5 text-muted'
  return (
    <span
      title={MODE_LABEL[mode].detail}
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide ${style}`}
    >
      {MODE_LABEL[mode].short}
    </span>
  )
}
