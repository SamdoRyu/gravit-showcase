import { Download, Eye, FileArchive, FileText, Film, Image } from 'lucide-react'
import { Section } from '../components/Section'
import { ModeBadge } from '../components/ModeBadge'
import { allShots, bundle, docs, type Doc, type Shot } from '../data/artifacts'
import sizes from '../data/fileSizes.json'

const sizeOf = (path: string) => {
  const bytes = (sizes as Record<string, number>)[path]
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

const fileName = (path: string) => path.split('/').pop()!
const format = (path: string) => fileName(path).split('.').pop()!.toUpperCase()

function DownloadButton({ path }: { path: string }) {
  return (
    <a
      href={`/${path}`}
      download
      className="inline-flex items-center gap-1.5 rounded-lg bg-hull px-3 py-1.5 text-sm font-semibold text-space-950 hover:bg-hull/90"
      aria-label={`${fileName(path)} 내려받기`}
    >
      <Download className="size-4" aria-hidden /> 다운로드
    </a>
  )
}

function Meta({ path, preview }: { path: string; preview: boolean }) {
  return (
    <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted">
      <span className="break-all font-mono">{fileName(path)}</span>
      <span>{format(path)}</span>
      <span>{sizeOf(path)}</span>
      <span>{preview ? '미리보기 가능' : '미리보기 없음'}</span>
    </p>
  )
}

type Props = { onOpen: (s: Shot) => void; onPreview: (d: Doc) => void }

export function Downloads({ onOpen, onPreview }: Props) {
  return (
    <Section
      id="downloads"
      eyebrow="Downloads"
      title="산출물 다운로드"
      lead="공개를 검토한 파일만 올렸다. 원시 측정 로그 · 내부 보고서 원본 · 환경 설정 파일은 포함하지 않는다."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-hull/30 bg-hull/5 p-5">
          <FileArchive className="size-6 text-hull" aria-hidden />
          <h3 className="mt-3 font-semibold">{bundle.title}</h3>
          <p className="mt-1 text-sm text-muted">{bundle.description}</p>
          <Meta path={bundle.path} preview={false} />
          <div className="mt-4">
            <DownloadButton path={bundle.path} />
          </div>
        </div>
        {docs.map((d) => (
          <div key={d.path} className="rounded-2xl border border-white/10 bg-space-900 p-5">
            <FileText className="size-6 text-glow" aria-hidden />
            <h3 className="mt-3 font-semibold">{d.title}</h3>
            <p className="mt-1 text-sm text-muted">{d.description}</p>
            <Meta path={d.path} preview />
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => onPreview(d)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-sm font-medium hover:bg-white/5"
              >
                <Eye className="size-4" aria-hidden /> 미리보기
              </button>
              <DownloadButton path={d.path} />
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-12 text-sm font-semibold text-muted">화면 캡처 · GIF ({allShots.length}개)</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allShots.map((s) => {
          const Icon = s.path.endsWith('.gif') ? Film : Image
          return (
            <li key={s.path} className="flex min-w-0 gap-3 rounded-xl border border-white/10 bg-space-900 p-3">
              <button
                type="button"
                onClick={() => onOpen(s)}
                className="size-16 shrink-0 overflow-hidden rounded-lg bg-black"
                aria-label={`${s.title} 미리보기`}
              >
                <img src={`/${s.path}`} alt="" loading="lazy" className="size-full object-cover object-left-top" />
              </button>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="size-4 shrink-0 text-muted" aria-hidden />
                  <span className="truncate">{s.title}</span>
                  <ModeBadge mode={s.mode} />
                </p>
                <Meta path={s.path} preview />
                <div className="mt-2">
                  <DownloadButton path={s.path} />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
