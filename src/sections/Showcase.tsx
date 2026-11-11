import { Camera, Maximize2 } from 'lucide-react'
import { Section } from '../components/Section'
import { ModeBadge } from '../components/ModeBadge'
import { features, MODE_LABEL, type Shot } from '../data/artifacts'

export function Showcase({ onOpen }: { onOpen: (s: Shot) => void }) {
  return (
    <Section
      id="showcase"
      eyebrow="Showcase"
      title="주요 구현 결과"
      lead={
        <>
          실제 GRAVIT 화면 캡처다. 각 이미지의 배지로 실행 방식을 구분한다 —{' '}
          <strong className="font-semibold text-ink">Mock</strong>: {MODE_LABEL.mock.detail}.{' '}
          <strong className="font-semibold text-glow">Server</strong>: {MODE_LABEL.server.detail}. 실제 GitHub 레포를
          동기화한 화면 캡처는 아직 없다.
        </>
      }
    >
      <div className="space-y-14">
        {features.map((f) => (
          <article key={f.id} aria-labelledby={`feature-${f.id}`}>
            <h3 id={`feature-${f.id}`} className="text-lg font-semibold">
              {f.title}
            </h3>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted">{f.summary}</p>

            {f.shots.length > 0 ? (
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {f.shots.map((s) => (
                  <li key={s.path}>
                    <button
                      type="button"
                      onClick={() => onOpen(s)}
                      className="group block w-full overflow-hidden rounded-xl border border-white/10 bg-space-900 text-left hover:border-white/25"
                      aria-label={`${s.title} 크게 보기`}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-black">
                        <img src={`/${s.path}`} alt={s.caption} loading="lazy" className="size-full object-cover object-left-top" />
                        <span className="absolute top-2 right-2 rounded-md bg-black/60 p-1 text-white/80 opacity-0 group-hover:opacity-100">
                          <Maximize2 className="size-4" aria-hidden />
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-2">
                          <ModeBadge mode={s.mode} />
                          {s.path.endsWith('.gif') && <span className="text-[11px] font-medium text-hull">GIF</span>}
                          <span className="truncate text-sm font-medium">{s.title}</span>
                        </div>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">{s.caption}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 flex items-start gap-2 rounded-xl border border-dashed border-white/15 p-4 text-sm text-muted">
                <Camera className="mt-0.5 size-4 shrink-0" aria-hidden /> {f.note}
              </p>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
