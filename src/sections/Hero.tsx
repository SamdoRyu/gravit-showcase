import { ArrowDown, FolderGit2 } from 'lucide-react'
import type { Shot } from '../data/artifacts'
import { links } from '../data/facts'
import { ModeBadge } from '../components/ModeBadge'

export function Hero({ shot, onOpen }: { shot: Shot; onOpen: (s: Shot) => void }) {
  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_0%,rgb(125_211_200/0.12),transparent),radial-gradient(40%_40%_at_10%_20%,rgb(242_166_90/0.08),transparent)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[5fr_7fr] lg:pt-20 lg:pb-24">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-glow uppercase">Bootcamp team project · 2026</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl">GRAVIT</h1>
          <p className="mt-3 text-lg font-semibold text-ink/90">GitHub 기반 3D 프로젝트 학습 플랫폼</p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            팀 GitHub 레포의 이슈 · PR을 읽어 3D 우주정거장 사무실로 보여 주고, PR 익명 평가 · 회의 안건 ·
            도움 요청 · 회고 리포트를 앱 안에서 다룬다. GitHub 원본은 읽기만 한다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-hull px-4 py-2.5 text-sm font-semibold text-space-950 hover:bg-hull/90"
            >
              <FolderGit2 className="size-4" /> GitHub 저장소
            </a>
            <a
              href="#downloads"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold hover:bg-white/5"
            >
              <ArrowDown className="size-4" /> 산출물 보기
            </a>
          </div>
        </div>
        <figure>
          <button
            type="button"
            onClick={() => onOpen(shot)}
            className="block w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
            aria-label={`${shot.title} 크게 보기`}
          >
            <img src={`/${shot.path}`} alt={shot.caption} width={1440} height={900} className="w-full" fetchPriority="high" />
          </button>
          <figcaption className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
            <ModeBadge mode={shot.mode} /> {shot.caption}
          </figcaption>
        </figure>
      </div>
    </header>
  )
}
