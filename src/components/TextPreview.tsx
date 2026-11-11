import { Download, LoaderCircle, CircleExclamationPoint } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Doc } from '../data/artifacts'
import { Modal } from './Modal'

type State = { status: 'loading' } | { status: 'error'; message: string } | { status: 'done'; text: string }

export function TextPreview({ doc, onClose }: { doc: Doc; onClose: () => void }) {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/${doc.path}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`파일을 불러오지 못했어요 (HTTP ${res.status})`)
        return res.text()
      })
      .then((text) => setState({ status: 'done', text }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setState({ status: 'error', message: err instanceof Error ? err.message : '파일을 불러오지 못했어요' })
      })
    return () => controller.abort()
  }, [doc.path])

  return (
    <Modal title={doc.title} onClose={onClose}>
      <div className="max-h-[70vh] overflow-auto px-5 py-4">
        {state.status === 'loading' && (
          <p className="flex items-center gap-2 text-sm text-muted">
            <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" /> 불러오는 중…
          </p>
        )}
        {state.status === 'error' && (
          <p role="alert" className="flex items-center gap-2 text-sm text-hull">
            <CircleExclamationPoint className="size-4" /> {state.message}
          </p>
        )}
        {state.status === 'done' && (
          <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-ink/90">{state.text}</pre>
        )}
      </div>
      <div className="flex justify-end border-t border-white/10 px-5 py-3">
        <a
          href={`/${doc.path}`}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-hull px-3 py-1.5 text-sm font-semibold text-space-950 hover:bg-hull/90"
        >
          <Download className="size-4" /> 내려받기
        </a>
      </div>
    </Modal>
  )
}
