// 전시 · 다운로드 산출물 메타데이터 — 한 곳에서만 관리한다.
// path는 public/ 기준. scripts/file-sizes.mjs가 파일이 실제로 있는지 확인하고 크기를 읽는다.

export type Mode = 'mock' | 'server'

export const MODE_LABEL: Record<Mode, { short: string; detail: string }> = {
  mock: {
    short: 'Mock',
    detail: '서버 없이 브라우저 seed 데이터로 실행한 화면 · main 7b60c21(2026-11-10) 기준',
  },
  server: {
    short: 'Server',
    detail: 'Spring API 서버 + 시연 사무실 seed 데이터(실제 GitHub 레포 아님) · 2026-11-10 촬영',
  },
}

export type Shot = {
  path: string
  title: string
  caption: string
  mode: Mode
}

export type Feature = {
  id: string
  title: string
  summary: string
  shots: Shot[]
  note?: string
}

export const features: Feature[] = [
  {
    id: 'station',
    title: '3D 우주정거장 사무실',
    summary: '팀 레포의 이슈 · PR이 정거장 안의 오브젝트가 되고, 팀원은 작업 포드에, 회의는 브리지에서 열린다.',
    shots: [
      {
        path: 'images/mock-04-main-station-full.png',
        title: '정거장 전체',
        caption: '관리 패널을 접은 메인 화면 — 작업 포드 · 브리지 · 강사 우주선, 상단에 남은 기간 · 열린 PR · 평균 리뷰 대기',
        mode: 'mock',
      },
      {
        path: 'gifs/mock-01-select-issue-3d.gif',
        title: '3D에서 이슈 고르기',
        caption: '이슈 상자를 클릭하면 상세 서랍이 열리고 카메라가 그 상자로 다가간다',
        mode: 'mock',
      },
    ],
  },
  {
    id: 'issue-pr',
    title: 'Issue · PR 관리',
    summary: 'GitHub 원본은 읽기 전용. 상태 · 담당 변경은 GitHub 화면으로 보내고, 앱에서는 보기 · 익명 평가만 한다.',
    shots: [
      {
        path: 'images/mock-05-issue-detail.png',
        title: '이슈 상세',
        caption: '담당자 · 라벨 · 연결된 PR, 「GitHub에서 열기」 — 상태 · 담당은 GitHub에서 바꾼다',
        mode: 'mock',
      },
      {
        path: 'images/mock-06-pr-detail.png',
        title: 'PR 상세 · 추천/비추천 평가',
        caption: '평가 회차별 추천 · 비추천과 이유(평가자 표시 없음), 내 PR은 평가할 수 없다',
        mode: 'mock',
      },
      {
        path: 'images/mock-07-issue-pr-list.png',
        title: '이슈 · PR 목록',
        caption: '목록 탭 — 상태 · 우선순위 · 담당 · 마감을 한 표로',
        mode: 'mock',
      },
    ],
  },
  {
    id: 'agenda',
    title: '드래그로 회의 안건 올리기',
    summary: '이슈 · PR 상자를 브리지로 끌어 안건을 올리고, 회의를 시작하면 팀원이 브리지로 모인다.',
    shots: [
      {
        path: 'gifs/mock-02-drag-issue-to-agenda.gif',
        title: '이슈를 브리지로 드래그',
        caption: '이슈 상자를 브리지로 끌어 놓으면 「안건 올리기」가 열리고, 올린 안건이 탁자에 놓인다',
        mode: 'mock',
      },
      {
        path: 'gifs/mock-03-start-meeting.gif',
        title: '회의 시작',
        caption: '참석자를 고르고 회의를 시작하면 팀원이 브리지로 모인다',
        mode: 'mock',
      },
      {
        path: 'images/mock-14-meeting-live.png',
        title: '회의 중',
        caption: '브리지 홀로그램과 상단 바의 회의 시간 · 참석 · 안건 수',
        mode: 'mock',
      },
    ],
  },
  {
    id: 'requirement',
    title: '요구사항과 Issue 연결',
    summary: '레포의 요구사항 명세 문서를 읽어 요구사항별로 연결된 이슈와 진행률을 보여 준다.',
    shots: [
      {
        path: 'gifs/mock-04-drag-issue-to-requirement.gif',
        title: '이슈를 요구사항 판으로 드래그',
        caption: '레포 관리자가 이슈 상자를 요구사항 판에 놓아 연결한다(시연 사무실)',
        mode: 'mock',
      },
      {
        path: 'images/mock-12-requirements.png',
        title: '요구사항 탭',
        caption: '요구사항별 연결 이슈와 닫힘 비율, 연결 없음 · 문서에서 사라진 요구사항 표시',
        mode: 'mock',
      },
    ],
  },
  {
    id: 'help',
    title: '도움 요청과 강사 답변',
    summary: '학생이 강사에게 요청한 건만 강사가 답한다. 강사는 그 밖의 사무실 데이터를 바꿀 수 없다.',
    shots: [
      {
        path: 'images/server-21-instructor-inbox.png',
        title: '강사 요청함',
        caption: '강사 계정 — 결정 피드백 · 꼬리질문 · 도움 요청 중 답할 것을 한곳에서',
        mode: 'server',
      },
      {
        path: 'images/server-22-instructor-help.png',
        title: '도움 요청에 강사 답변',
        caption: '학생의 도움 요청 상세에 강사 답변이 달린 화면',
        mode: 'server',
      },
      {
        path: 'images/server-20-instructor-main.png',
        title: '강사로 연 사무실',
        caption: '강사 계정의 더보기 메뉴 — 강사 관리 · 강사 요청함(강사 전용)',
        mode: 'server',
      },
    ],
  },
  {
    id: 'decision-card',
    title: '기술 결정 카드와 강사 꼬리질문',
    summary: '학생이 머지 · 닫힌 내 PR로 기술 결정 카드를 쓰고, 강사에게 꼬리질문을 요청한다. 카드는 본인과 지정된 강사만 본다.',
    shots: [
      {
        path: 'images/server-23-instructor-followup.png',
        title: '강사가 꼬리질문 남기기',
        caption: '학생의 기술 결정 카드를 보고 강사가 꼬리질문을 쓰는 화면',
        mode: 'server',
      },
      {
        path: 'images/server-24-student-followup.png',
        title: '학생이 꼬리질문 확인',
        caption: '학생이 카드를 고치는 화면 아래에 강사 꼬리질문이 보인다',
        mode: 'server',
      },
    ],
  },
  {
    id: 'decision-feedback',
    title: '회의 결정 피드백',
    summary: '회의에서 정한 결정을 기록하고, 학생이 요청하면 강사가 그 결정에 피드백을 남긴다.',
    shots: [
      {
        path: 'images/server-25-instructor-feedback.png',
        title: '강사 피드백 작성',
        caption: '결정 기록(결론 · 더 알아볼 사람 · 다룬 회의)에 강사가 피드백을 남기는 화면',
        mode: 'server',
      },
      {
        path: 'images/server-26-student-feedback.png',
        title: '학생이 피드백 확인',
        caption: '학생 화면에서 강사 피드백과 요청 기록을 확인',
        mode: 'server',
      },
    ],
  },
  {
    id: 'retro',
    title: '회고 리포트',
    summary: '학습 타임라인과 회고 리포트(제목 · 느낀 점 · 기술 결정 카드 고르기)로 프로젝트에서 배운 것을 정리한다. 개인 기록은 본인과 지정된 강사만 본다.',
    shots: [],
    note: '최신 main(#335 · #336 · #343 회고 리포트 개편 이후) 화면을 다시 촬영할 예정이다. 기존 캡처는 개편 전 화면이라 싣지 않았다.',
  },
]

export type Doc = {
  path: string
  title: string
  description: string
}

export const docs: Doc[] = [
  {
    path: 'downloads/gravit-performance-summary.md',
    title: '성능 개선 요약',
    description: 'Snapshot API 부하 측정 조건 · 병목 원인 · Before/After 표 · 기각한 실험 · 한계',
  },
  {
    path: 'downloads/gravit-verification-summary.md',
    title: '테스트 · 검증 요약',
    description: 'CI 범위 · 보안/권한 자동 테스트 · 통합 · 동시성 검증(QA-LITE) · 검증하지 않은 것',
  },
]

export const bundle = {
  path: 'downloads/gravit-showcase-assets.zip',
  title: '공개 산출물 전체 (ZIP)',
  description: '이 페이지의 스크린샷 13장 · GIF 4개 · 요약 문서 2개',
}

export const allShots = features.flatMap((f) => f.shots)

// file-sizes.mjs가 존재 여부를 확인할 전체 목록
export const allPaths = [...allShots.map((s) => s.path), ...docs.map((d) => d.path), bundle.path]
