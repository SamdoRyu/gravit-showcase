import { Boxes, GitPullRequest, MessagesSquare, Users } from 'lucide-react'
import { Section } from '../components/Section'
import { collab } from '../data/facts'

const stack = ['React 19', 'TypeScript', 'Three.js · React Three Fiber', 'Spring Boot 4', 'Spring Security', 'MySQL 8.4', 'Flyway', 'GitHub App']

const pillars = [
  {
    icon: Boxes,
    title: 'GitHub 데이터 → 3D 정거장',
    body: '이슈 · PR · 요구사항을 읽기 전용으로 동기화해 정거장 안의 오브젝트와 팀원 위치로 보여 준다.',
  },
  {
    icon: GitPullRequest,
    title: 'PR 익명 평가',
    body: '추천 · 비추천과 이유를 남긴다. 평가자는 드러나지 않고, 사람별 합계 · 순위는 만들지 않는다.',
  },
  {
    icon: MessagesSquare,
    title: '회의 · 도움 요청',
    body: '드래그로 안건을 올리고 회의에서 결정을 기록한다. 막히면 팀이나 강사에게 도움을 요청한다.',
  },
  {
    icon: Users,
    title: '학습 기록 · 강사 피드백',
    body: '학습 타임라인 · 회고 리포트 · 기술 결정 카드. 강사는 학생이 요청한 건에만 답한다.',
  },
]

export function Overview() {
  return (
    <Section id="overview" eyebrow="Overview" title="프로젝트 개요">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-space-900 p-5">
            <Icon className="size-5 text-glow" aria-hidden />
            <h3 className="mt-3 font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <h3 className="text-sm font-semibold text-muted">주요 기술</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stack.map((s) => (
              <li key={s} className="rounded-lg border border-white/10 bg-space-800 px-3 py-1.5 text-sm">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted">협업 기록 (GitHub)</h3>
          <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {collab.map((c) => (
              <div key={c.label} className="rounded-xl border border-white/10 bg-space-900 p-3">
                <dt className="text-xs text-muted">{c.label}</dt>
                <dd className="mt-1 text-2xl font-bold">{c.value}</dd>
                <dd className="mt-0.5 text-[11px] text-muted">{c.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
