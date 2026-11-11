# GRAVIT Showcase

GRAVIT(부트캠프 팀 프로젝트 — GitHub 기반 3D 프로젝트 학습 플랫폼)의 최종 결과와 산출물을 보여 주고 내려받게 하는 정적 사이트다. GRAVIT 애플리케이션 자체를 배포하는 것이 아니다.

- 개발 저장소: https://github.com/SamdoRyu/GRAVIT
- 스택: React 19 · TypeScript · Vite · Tailwind CSS 3 · lucide-react. 백엔드 · DB 없음.

## 실행

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/ — tsc + vite build
npm run preview   # 빌드 결과 확인 http://localhost:4173
npm run lint
```

`predev` · `prebuild`가 `scripts/file-sizes.mjs`를 먼저 실행한다. `src/data/artifacts.ts`가 가리키는 파일이 `public/`에 하나라도 없으면 **빌드가 실패**한다(없는 파일에 다운로드 버튼이 생기지 않게). 실제 파일 크기는 `src/data/fileSizes.json`(생성 파일, Git 제외)에 기록된다.

> Tailwind는 v3를 쓴다. v4의 네이티브 엔진(.node)이 개발 PC의 Windows 애플리케이션 제어 정책에 막혀 클래스가 생성되지 않았기 때문이다. v3는 순수 JS라 어디서나 같게 동작한다.

## 구조

```text
public/images/     화면 캡처(PNG) — mock-* / server-*
public/gifs/       동작 GIF — mock-*
public/downloads/  요약 문서 2개 + 전체 ZIP
src/data/artifacts.ts  전시 · 다운로드 메타데이터(한 곳에서 관리)
src/data/facts.ts      검증 수치 · 링크
src/sections/          Hero · Overview · Showcase · Verification · Downloads · Links
src/components/        Modal(<dialog>) · Lightbox · TextPreview(fetch 미리보기) · ModeBadge · Section
```

## 자료 추가 · 수정

1. 공개 검토를 마친 파일을 `public/images` · `public/gifs` · `public/downloads`에 둔다.
2. `src/data/artifacts.ts`의 `features`(갤러리) 또는 `docs`(문서)에 항목을 더한다. `mode`는 실행 방식대로 `mock` · `server`.
3. ZIP을 다시 만든다: `npm run zip` — **bsdtar**가 필요하다(Windows 기본 `C:\Windows\System32\tar.exe`, macOS 기본 `tar`). GNU tar는 `--format zip`을 몰라 실패한다(조용히 tar를 만들지 않음). Git Bash에서는 `/c/Windows/System32/tar.exe`로 같은 인자를 직접 실행한다.
4. `npm run build`로 확인한다.

## 화면 구분

| 배지 | 뜻 |
| --- | --- |
| Mock | 서버 없이 브라우저 seed 데이터로 실행한 화면, GRAVIT main `7b60c21`(2026-11-10) 기준 |
| Server | Spring API 서버 + 시연 사무실 seed 데이터(실제 GitHub 레포 아님), 2026-11-10 최신 main 시점 촬영 |

실제 GitHub 레포를 동기화한 화면 캡처는 아직 없다.

## 산출물과 원본

원본은 GRAVIT 로컬 작업 폴더의 Git 미추적 산출물이다(원본은 그대로 두고 사본만 복사).

| 공개 파일 | 원본 |
| --- | --- |
| `images/mock-04 · 05 · 06 · 07 · 12 · 14-*.png` | `notion-screen-design/screenshots/` 같은 번호 |
| `gifs/mock-01 ~ 04-*.gif` | `notion-screen-design/gifs/` |
| `images/server-20 ~ 26-*.png` | `artifacts/notion-screen-design/` |
| `downloads/gravit-performance-summary.md` | 새로 작성 — 내부 성능 보고서(측정 원문)의 수치를 옮긴 공개용 요약 |
| `downloads/gravit-verification-summary.md` | 새로 작성 — GitHub CI · 테스트 코드 · 내부 QA-LITE 보고서 기준 요약 |
| `downloads/gravit-showcase-assets.zip` | 위 이미지 13 · GIF 4 · 요약 2 |

## 공개하지 않은 것

| 자료 | 이유 |
| --- | --- |
| 내부 성능 보고서 원본 · 학습 자료 원본 | 로컬 경로 · 미반영 커밋 · 내부 리뷰 메모 포함 — 요약본으로 대체 |
| QA 보안 기록(`qa/security.md`) | 측정 중 보안 사고 조사 기록 |
| `qa/results/raw/` · `qa/datasets/out/` · `.jfr` | 원시 측정 로그 — 비밀 정보 포함 가능 |
| `.env` · `secrets/` · 키 파일 | 인증 정보 |
| `notion-screen-design/screenshots/19-retro-report.png` · `20-tech-decision-card.png` | #335 · #336 회고 개편 이전 화면 |
| `flow-agenda-to-card/*` | 개편 이전(「확인함」 단계 포함) mock 흐름 |
| `notion-visuals/` · `문서-사진/` | 11-07 구버전 캡처 · 시스템/DB 설계 페이지 몫 |
| 나머지 화면 설계 캡처 | 노션 「화면 설계」와 중복 |

## 다시 찍을 자료

- **회고 리포트** — 최신 main(#335 · #336 이후) 화면. 지금은 기능 설명만 있고 이미지는 없다.
- **실제 GitHub 연동 화면** — 리허설 레포(`SamdoRyu/gravit-rehearsal-1`)를 동기화한 사무실.
- **최종 시연 영상** — 전체 흐름 2~3분.
- **E2E 실행 보고서** — 지금은 공개할 실행 결과가 없어 사이트에서 통과를 주장하지 않는다.

## Vercel 배포

추가 설정 파일은 없다. Vercel이 Vite를 자동 인식한다(Build `npm run build`, Output `dist`).

1. GitHub에 새 저장소를 만들고 이 폴더를 push한다.
2. Vercel → Add New → Project → 그 저장소 Import.
3. Framework Preset이 **Vite**인지 확인하고 Deploy.

배포하면 `public/`의 모든 파일이 공개된다. 파일을 더하기 전에 위 「공개하지 않은 것」 기준으로 검토한다.
