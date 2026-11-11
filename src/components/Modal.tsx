import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  title: string
  onClose: () => void
  children: ReactNode
  wide?: boolean
}

// 열려 있을 때만 렌더링한다. 네이티브 <dialog> — Esc · 포커스 가두기는 브라우저가 처리.
export function Modal({ title, onClose, children, wide }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    ref.current?.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className={`m-auto w-[calc(100%-2rem)] ${wide ? 'max-w-6xl' : 'max-w-3xl'} rounded-2xl border border-white/10 bg-space-900 p-0 text-ink`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
        <h2 className="truncate text-sm font-semibold">{title}</h2>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="rounded-lg p-1.5 text-muted hover:bg-white/5 hover:text-ink"
          aria-label="닫기"
        >
          <X className="size-5" />
        </button>
      </div>
      {children}
    </dialog>
  )
}
