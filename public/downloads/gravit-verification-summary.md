# GRAVIT 테스트 · 검증 요약

> 공개용 요약본이다. GitHub에서 확인할 수 있는 기록과 팀 내부 QA 보고서(2026-11-10)의 결과만 옮겼다.
> 확인 기준: GRAVIT `main` `499289b` (2026-11-12).

## 1. CI — GitHub Actions

워크플로: [`.github/workflows/ci.yml`](https://github.com/SamdoRyu/GRAVIT/blob/main/.github/workflows/ci.yml) · 실행 목록: [Actions](https://github.com/SamdoRyu/GRAVIT/actions/workflows/ci.yml)

| 작업 | 실행 내용 |
| --- | --- |
| frontend (lint · contract · build) | `npm ci` → `npm run lint`(oxlint) → `npm run test:contract`(계약 예시 JSON 기준 테스트) → `npm run build` |
| backend (test · bootJar) | MySQL 서비스 컨테이너를 띄우고 `./gradlew test bootJar` — 단위 · 통합 테스트 전체 |

- 최신 `main` `499289b`의 CI 실행: 두 작업 모두 성공 — [run 43132336248](https://github.com/SamdoRyu/GRAVIT/actions/runs/43132336248)
- 2026-11-03 ~ 11-12 전체 CI 실행 기록: 성공 367 · 실패 4 · 취소 67(워크플로가 `cancel-in-progress`라 같은 브랜치에 새 실행이 오면 이전 실행이 취소된다)
- 저장소 기록: Pull Request 203개 병합(그중 201개가 GitHub 리뷰 승인 상태), Issue 144개 종료 · 열린 Issue 0

**CI 성공이 뜻하는 범위**: 린트 · 프론트 계약 테스트 · 프론트 빌드 · 백엔드 테스트와 jar 빌드다. **화면 E2E 테스트와 실제 브라우저 동작은 CI에 들어 있지 않다.**

## 2. 화면 E2E 테스트 (Playwright)

- 테스트 코드: [`frontend/tests/e2e/`](https://github.com/SamdoRyu/GRAVIT/tree/main/frontend/tests/e2e) — spec 파일 36개(3D 사무실 · 안건 드래그 · 회의 · 평가 · 도움 요청 · 요구사항 · 회고 · 강사 화면 · 반응형 · 터치 등)
- 실행 방식: 서버 없이 브라우저 seed 데이터로 동작하는 **mock 모드** 기준, 로컬에서만 실행(Chrome 필요)
- **CI에서 실행하지 않으며, 공개할 수 있는 실행 보고서가 없다.** 이 문서는 E2E 통과를 주장하지 않는다.

## 3. 보안 · 권한 검증 (자동 테스트)

아래는 백엔드 자동 테스트로 검증하는 항목이다. 이 테스트들은 CI의 `./gradlew test`에 포함되어 최신 `main`에서 통과했다.

| 검증 항목 | 기대 동작 | 테스트 |
| --- | --- | --- |
| 사무실(Workspace) 접근 격리 | 들어갈 수 없는 사무실은 `404`(존재를 숨김), 다른 사무실의 ID를 내 사무실 경로에 넣어도 `404`(IDOR 방어). 사무실 경로의 **모든** API를 앱에서 모아 세션 없음 `401` · 다른 사무실 팀원 성공 응답 없음을 확인. 심사용 계정은 시연 사무실에만 | [`WorkspaceAccessScenarioTest`](https://github.com/SamdoRyu/GRAVIT/blob/main/backend/src/test/java/com/samdoryu/backend/auth/WorkspaceAccessScenarioTest.java) · [`WorkspaceEndpointGuardTest`](https://github.com/SamdoRyu/GRAVIT/blob/main/backend/src/test/java/com/samdoryu/backend/auth/WorkspaceEndpointGuardTest.java) |
| 로그인 · 역할 인가 | 로그인 → 사무실 접근 → 역할 순서 검사. 미인증 `401`, 참여자의 레포 관리자 동작 · 다른 학생 개인 API `403`. 역할은 로그인 때 레포 권한으로 판정하고, 학생의 GitHub 토큰은 서버 세션에만 둔다 | [`AuthorizationIntegrationTest`](https://github.com/SamdoRyu/GRAVIT/blob/main/backend/src/test/java/com/samdoryu/backend/auth/AuthorizationIntegrationTest.java) · [`LoginRepoRolesIntegrationTest`](https://github.com/SamdoRyu/GRAVIT/blob/main/backend/src/test/java/com/samdoryu/backend/auth/LoginRepoRolesIntegrationTest.java) |
| 강사 권한 | 계약이 강사에게 연 쓰기 밖의 사무실 쓰기 API는 모두 `403 forbidden_role`(쓰기 API를 앱에서 모아 자동 검사). 강사 지정은 요청마다 DB에서 확인 — 해제되면 다음 요청부터 `404` | [`InstructorWriteGuardIntegrationTest`](https://github.com/SamdoRyu/GRAVIT/blob/main/backend/src/test/java/com/samdoryu/backend/auth/InstructorWriteGuardIntegrationTest.java) · [`InstructorAssignmentAuthorizationTest`](https://github.com/SamdoRyu/GRAVIT/blob/main/backend/src/test/java/com/samdoryu/backend/auth/InstructorAssignmentAuthorizationTest.java) |
| 심사용 ID/PW 로그인 | 기본은 꺼짐(경로 `404`). 로그인 때 세션 ID 재발급, 로그아웃 뒤 `401`. 여러 번 틀린 계정은 잠김을 드러내지 않고 `401` | [`ReviewLoginIntegrationTest`](https://github.com/SamdoRyu/GRAVIT/blob/main/backend/src/test/java/com/samdoryu/backend/auth/ReviewLoginIntegrationTest.java) · [`ReviewLoginDisabledTest`](https://github.com/SamdoRyu/GRAVIT/blob/main/backend/src/test/java/com/samdoryu/backend/auth/ReviewLoginDisabledTest.java) · [`ReviewLoginThrottleIntegrationTest`](https://github.com/SamdoRyu/GRAVIT/blob/main/backend/src/test/java/com/samdoryu/backend/auth/ReviewLoginThrottleIntegrationTest.java) |
| 개인 기록 접근 | 기술 결정 카드 · 강사 꼬리질문은 본인과 지정된 강사만. 같은 사무실 다른 학생 `403`, 해제 · 미지정 강사와 다른 사무실 팀원 `404`, 거부된 요청 뒤 데이터 변화 없음 | [`DecisionCardAccessIntegrationTest`](https://github.com/SamdoRyu/GRAVIT/blob/main/backend/src/test/java/com/samdoryu/backend/report/DecisionCardAccessIntegrationTest.java) |

**범위**: 위 결과는 팀이 작성한 자동 테스트의 통과 여부다. **외부 보안 진단 · 침투 테스트를 받은 것이 아니다.**

## 4. 통합 · 동시성 검증 (QA-LITE, 2026-11-10)

성능 개선(PR #310)과 동시 첫 조회 수정을 담은 **QA 브랜치**에서 실행한 내부 검증이다. 병합된 최종 `main`에서 다시 실행한 것은 아니다. 판정: 필수 4항목 PASS.

| 항목 | 결과 |
| --- | --- |
| 동시 첫 조회 503 수정 | 동시 2요청 × 5라운드 · 4요청 × 5라운드 모두 200, 동기화 상태 행 1개 |
| 동기화와 조회 겹침 | 수동 동기화 중 Snapshot 99건 모두 200, 정합성 점검 위반 0/14 |
| 요구사항 재동기화 | 같은 문서 20회 재동기화 중 동시 Snapshot 40건 모두 200, 기존 요구사항 ID · 이슈 연결 보존 |
| API 32단계 순회 | 평가 · 회의 · 도움 요청 · 요구사항 연결 · 스탠드업 등과 401 · 403 · 404 응답이 기대대로 |
| 실시간 알림(SSE) | 참여자가 쓰는 동안 다른 사용자 연결에 `change` 이벤트 14건 도착 |

### 역할이 섞인 협업 부하

같은 시연 사무실에서 레포 관리자 · 참여자 · 강사 세션이 각자 1~3초씩 쉬며 도움 요청 · 댓글 · 안건 · 요구사항 연결 · 평가를 섞어 보낸 60초 실행(단계별 1회). 성능 개선 Before/After 측정과는 부하 모양이 달라 같은 표로 비교하지 않는다.

| 단계 | 세션 | 요청(60초) | RPS | p50 | p95 | p99 | 예상 밖 응답 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| VU 5 | 5 | 422 | 7.0 | 20.0 | 41.7 | 51.4 | 0 |
| VU 10 | 10 | 865 | 14.4 | 16.8 | 35.8 | 41.6 | 0 |
| VU 20 | 20 | 1,718 | 28.6 | 15.2 | 34.3 | 40.1 | 0 |

시간 ms. VU 20에서는 팀원 세션 16개가 seed 팀원 8명을 2개씩 맡았다(같은 사람이 탭 두 개).

쓰기 성공 수와 DB 행 수가 일치했다: 도움 요청 304 = 304, 댓글 · 강사 답변 451 = 451, 안건 올리기 → 거두기 226 = 226(모두 거둠), 요구사항 연결 → 해제 32(남은 연결 0), 평가 253회 → 160행(같은 회차 · 평가자는 갱신, 중복 0).

권한: 참여자의 요구사항 연결 `403` · 강사의 안건 쓰기 `403` · 다른 사무실 `404`가 모두 기대대로 나왔다.

## 5. 검증하지 않은 것

- 병합된 최종 `main`에서의 성능 재측정과 QA-LITE 재실행
- 화면 E2E의 CI 실행 · 공개 실행 보고서
- 실제 GitHub 레포를 동기화한 상태의 부하 · 장시간 실행
- 운영 환경 배포(v1은 로컬 실행 기준)
- 외부 보안 진단
