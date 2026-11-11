import { ExternalLink, FileText, FlaskConical, Gauge, ShieldCheck, Workflow } from 'lucide-react'
import type { ReactNode } from 'react'
import { Section } from '../components/Section'
import { docs, type Doc } from '../data/artifacts'
import { links, mainCommit, perfLimits, perfRows, securityChecks, type PerfRow } from '../data/facts'

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-glow hover:underline">
      {children} <ExternalLink className="size-3.5" aria-hidden />
    </a>
  )
}

function Card({ icon: Icon, title, children }: { icon: typeof Workflow; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-space-900 p-5 sm:p-6">
      <h3 className="flex items-center gap-2 font-semibold">
        <Icon className="size-5 text-glow" aria-hidden /> {title}
      </h3>
      <div className="mt-4 text-sm leading-relaxed text-ink/90">{children}</div>
    </div>
  )
}

const pct = (before: number, after: number) => {
  const v = ((after - before) / before) * 100
  return `${v > 0 ? '+' : ''}${v.toFixed(1)}%`
}

const ms = (pair: [number, number]) => `${pair[0].toFixed(1)} → ${pair[1].toFixed(1)}`

const VERDICT: Record<PerfRow['verdict'], { label: string; cls: string }> = {
  improved: { label: '개선', cls: 'text-glow' },
  noise: { label: '잡음 범위', cls: 'text-muted' },
  mixed: { label: 'p95 · RPS 개선 / p99 악화', cls: 'text-hull' },
}

export function Verification({ onPreview }: { onPreview: (d: Doc) => void }) {
  return (
    <Section
      id="verification"
      eyebrow="Verification"
      title="테스트 및 검증"
      lead={`GitHub 기록과 팀 내부 QA 보고서에서 확인한 결과만 적었다. 기준 main ${mainCommit}.`}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Card icon={Workflow} title="CI · 기능 검증">
          <ul className="space-y-2">
            <li>
              <strong className="font-semibold">GitHub Actions</strong> — 프론트엔드 lint · 계약 테스트 · 빌드, 백엔드
              MySQL 서비스 컨테이너로 <code className="text-xs">gradlew test bootJar</code>(단위 · 통합 테스트).
            </li>
            <li>
              최신 main({mainCommit}) 실행: 두 작업 모두 성공 — <Ext href={links.latestMainRun}>실행 기록</Ext> ·{' '}
              <Ext href={links.actions}>전체 CI</Ext>
            </li>
          </ul>
          <p className="mt-4 flex gap-2 rounded-lg bg-white/5 p-3 text-xs text-muted">
            <FlaskConical className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>
              Playwright E2E <Ext href={links.e2e}>spec 36개</Ext>는 mock 모드 기준으로 로컬에서만 돈다.{' '}
              <strong className="text-ink">CI에 포함되지 않고 공개 실행 보고서가 없어</strong> 이 페이지는 E2E 통과를
              주장하지 않는다. CI 성공은 E2E 성공이 아니다.
            </span>
          </p>
        </Card>

        <Card icon={ShieldCheck} title="보안 · 권한 검증 (자동 테스트)">
          <ul className="space-y-3">
            {securityChecks.map((c) => (
              <li key={c.title}>
                <p className="font-semibold">{c.title}</p>
                <p className="text-muted">{c.body}</p>
                <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  {c.tests.map((t) => (
                    <Ext key={t.name} href={t.url}>
                      {t.name}
                    </Ext>
                  ))}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-white/5 p-3 text-xs text-muted">
            팀이 작성한 백엔드 자동 테스트이며 CI에서 통과했다. <strong className="text-ink">외부 보안 진단 · 침투 테스트가 아니다.</strong>
          </p>
        </Card>
      </div>

      <div className="mt-5">
        <Card icon={Gauge} title="성능 개선 — Snapshot API">
          <p className="max-w-3xl text-muted">
            사무실 화면 전체를 한 번에 돌려주는 Snapshot API를 k6로 측정했다. VU 10부터 처리량이 커넥션 풀(10개)에 묶였고, 원인은
            조립 중 쿼리마다 반복되던 Hibernate auto-flush dirty checking이었다(N+1 아님). 조립 구간만 flush 모드를
            COMMIT으로 바꿔 해결했고, 같은 PR에서 동시 첫 조회 503 결함도 고쳤다 — <Ext href={links.perfIssue}>Issue #309</Ext> ·{' '}
            <Ext href={links.perfPr}>PR #310</Ext>.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="pb-2 text-left text-xs text-muted">
                3회 반복 중앙값 · 단위 ms(p95 · p99), req/s(RPS) · 데이터셋 small 이슈 6 / medium 60 / large 600
              </caption>
              <thead className="border-b border-white/10 text-xs text-muted">
                <tr>
                  <th className="py-2 pr-3 font-medium">조건</th>
                  <th className="py-2 pr-3 font-medium">p95 Before → After</th>
                  <th className="py-2 pr-3 font-medium">RPS Before → After</th>
                  <th className="py-2 pr-3 font-medium">p99 Before → After</th>
                  <th className="py-2 font-medium">판정</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 tabular-nums">
                {perfRows.map((r) => (
                  <tr key={r.condition}>
                    <th scope="row" className="py-2 pr-3 font-medium">
                      {r.condition}
                    </th>
                    <td className="py-2 pr-3">
                      {ms(r.p95)} <span className="text-xs text-muted">({pct(r.p95[0], r.p95[1])})</span>
                    </td>
                    <td className="py-2 pr-3">
                      {ms(r.rps)} <span className="text-xs text-muted">({pct(r.rps[0], r.rps[1])})</span>
                    </td>
                    <td className={`py-2 pr-3 ${r.p99[1] > r.p99[0] ? 'text-hull' : ''}`}>
                      {ms(r.p99)}
                    </td>
                    <td className={`py-2 text-xs font-medium ${VERDICT[r.verdict].cls}`}>{VERDICT[r.verdict].label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl border border-hull/30 bg-hull/5 p-4">
            <p className="text-xs font-semibold tracking-wide text-hull uppercase">측정 한계</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/90">
              {perfLimits.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {docs.map((d) => (
          <button
            key={d.path}
            type="button"
            onClick={() => onPreview(d)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium hover:bg-white/5"
          >
            <FileText className="size-4 text-glow" aria-hidden /> {d.title} 미리보기
          </button>
        ))}
      </div>
    </Section>
  )
}
