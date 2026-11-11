import type { ReactNode } from 'react'

type Props = {
  id: string
  eyebrow: string
  title: string
  lead?: ReactNode
  children: ReactNode
}

export function Section({ id, eyebrow, title, lead, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-white/5 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-hull uppercase">{eyebrow}</p>
        <h2 id={`${id}-title`} className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {lead && <p className="mt-3 max-w-3xl text-muted">{lead}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
