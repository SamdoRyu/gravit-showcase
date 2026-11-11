// 검증 수치 · 링크. 출처는 GitHub(2026-11-11 확인)와 public/downloads의 요약 문서(원본: 팀 내부 QA 보고서).

const REPO = 'https://github.com/SamdoRyu/GRAVIT'

export const links = {
  repo: REPO,
  docsRepo: 'https://github.com/SamdoRyu/docs-for-PJ-review',
  rehearsalRepo: 'https://github.com/SamdoRyu/gravit-rehearsal-1',
  actions: `${REPO}/actions/workflows/ci.yml`,
  latestMainRun: `${REPO}/actions/runs/42792311651`,
  perfPr: `${REPO}/pull/310`,
  perfIssue: `${REPO}/issues/309`,
  e2e: `${REPO}/tree/main/frontend/tests/e2e`,
}

export const mainCommit = '66a9db4'

export const collab = [
  { value: '200', label: '병합된 PR', note: '198개 리뷰 승인' },
  { value: '141', label: '종료된 Issue', note: '열린 Issue 0' },
  { value: '358', label: '성공한 CI 실행', note: '실패 4 · 취소 67' },
  { value: '4명', label: '팀원', note: '2026-11-03 ~ 11-10' },
]

const testUrl = (p: string) => `${REPO}/blob/main/backend/src/test/java/com/samdoryu/backend/${p}.java`

export const securityChecks = [
  {
    title: 'Workspace 접근 격리',
    body: '권한 없는 사무실 · 다른 사무실 ID는 404로 존재를 숨긴다(IDOR 방어). 사무실 경로의 모든 API를 자동으로 모아 인가 누락을 검사한다.',
    tests: [
      { name: 'WorkspaceAccessScenarioTest', url: testUrl('auth/WorkspaceAccessScenarioTest') },
      { name: 'WorkspaceEndpointGuardTest', url: testUrl('auth/WorkspaceEndpointGuardTest') },
    ],
  },
  {
    title: '역할별 인가',
    body: '로그인 → 사무실 접근 → 역할 순서. 미인증 401, 역할 위반 403. GitHub 토큰은 서버 세션에만 둔다.',
    tests: [
      { name: 'AuthorizationIntegrationTest', url: testUrl('auth/AuthorizationIntegrationTest') },
      { name: 'LoginRepoRolesIntegrationTest', url: testUrl('auth/LoginRepoRolesIntegrationTest') },
    ],
  },
  {
    title: '강사 쓰기 제한',
    body: '계약이 강사에게 연 쓰기 밖의 사무실 쓰기 API는 모두 403. 강사 지정은 요청마다 DB에서 확인한다.',
    tests: [
      { name: 'InstructorWriteGuardIntegrationTest', url: testUrl('auth/InstructorWriteGuardIntegrationTest') },
      { name: 'InstructorAssignmentAuthorizationTest', url: testUrl('auth/InstructorAssignmentAuthorizationTest') },
    ],
  },
  {
    title: '심사용 로그인 · 개인 기록',
    body: '심사용 로그인은 기본 꺼짐(404), 세션 ID 재발급, 반복 실패 제한. 기술 결정 카드는 본인과 지정된 강사만.',
    tests: [
      { name: 'ReviewLoginIntegrationTest', url: testUrl('auth/ReviewLoginIntegrationTest') },
      { name: 'ReviewLoginThrottleIntegrationTest', url: testUrl('auth/ReviewLoginThrottleIntegrationTest') },
      { name: 'DecisionCardAccessIntegrationTest', url: testUrl('report/DecisionCardAccessIntegrationTest') },
    ],
  },
]

// 성능 Before/After — Focused 3회 중앙값(ms · req/s). 출처: downloads/gravit-performance-summary.md
export type PerfRow = {
  condition: string
  p95: [number, number]
  rps: [number, number]
  p99: [number, number]
  verdict: 'improved' | 'noise' | 'mixed'
}

export const perfRows: PerfRow[] = [
  { condition: 'small · VU 1', p95: [24.0, 22.7], rps: [48.1, 50.4], p99: [26.4, 25.5], verdict: 'noise' },
  { condition: 'medium · VU 20', p95: [135.5, 121.7], rps: [160.4, 180.1], p99: [142.0, 161.5], verdict: 'mixed' },
  { condition: 'large · VU 1', p95: [68.6, 51.7], rps: [15.9, 21.6], p99: [74.5, 56.2], verdict: 'improved' },
  { condition: 'large · VU 10', p95: [236.8, 164.3], rps: [48.1, 69.8], p99: [256.5, 177.3], verdict: 'improved' },
  { condition: 'large · VU 50', p95: [1111.2, 788.9], rps: [48.5, 69.9], p99: [1204.8, 845.8], verdict: 'improved' },
]

export const perfLimits = [
  'small VU 1은 Before/After 3회 범위가 겹쳐 측정 잡음으로 본다.',
  'medium VU 20의 p99는 142.0 → 161.5 ms로 나빠졌고 원인은 확인하지 못했다.',
  'After 수치는 같은 변경을 담은 실험 브랜치에서 잰 값이다. 병합된 최종 main에서는 다시 측정하지 않았다.',
  '로컬 PC 1대(서버 · DB · k6 동일 머신), 합성 데이터, GitHub 동기화 폴링 끔 — 운영 환경 측정이 아니다.',
]
