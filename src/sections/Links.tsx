import { ExternalLink } from 'lucide-react'
import { Section } from '../components/Section'
import { links } from '../data/facts'

const items = [
  { href: links.repo, title: 'GRAVIT 개발 저장소', body: 'React 3D 프론트엔드 · Spring Boot 백엔드 · 공통 계약 문서' },
  { href: links.docsRepo, title: '기획 문서 저장소', body: '요구사항 정의서 · 이슈 백로그 · 설계 문서' },
  { href: links.rehearsalRepo, title: '리허설 저장소', body: 'GRAVIT 연동 리허설용 시연 레포(스터디 게시판 예제)' },
  { href: links.actions, title: 'GitHub Actions CI', body: 'lint · 계약 테스트 · 빌드 · 백엔드 테스트 실행 기록' },
  { href: links.perfPr, title: '성능 개선 PR #310', body: 'Snapshot auto-flush 최적화 · SyncState 동시 생성 오류 수정' },
]

export function Links() {
  return (
    <Section id="links" eyebrow="Links" title="관련 링크">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <li key={i.href}>
            <a
              href={i.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-full flex-col rounded-xl border border-white/10 bg-space-900 p-4 hover:border-white/25"
            >
              <span className="flex items-center justify-between gap-2 font-semibold">
                {i.title} <ExternalLink className="size-4 text-muted" aria-hidden />
              </span>
              <span className="mt-1 text-sm text-muted">{i.body}</span>
              <span className="mt-2 truncate font-mono text-xs text-glow/80">{i.href.replace('https://', '')}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
