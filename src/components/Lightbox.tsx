import { MODE_LABEL, type Shot } from '../data/artifacts'
import { Modal } from './Modal'
import { ModeBadge } from './ModeBadge'

export function Lightbox({ shot, onClose }: { shot: Shot; onClose: () => void }) {
  return (
    <Modal title={shot.title} onClose={onClose} wide>
      <img src={`/${shot.path}`} alt={shot.caption} className="max-h-[75vh] w-full bg-black object-contain" />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3 text-sm">
        <ModeBadge mode={shot.mode} />
        <span className="text-ink/90">{shot.caption}</span>
        <span className="w-full text-xs text-muted">{MODE_LABEL[shot.mode].detail}</span>
      </div>
    </Modal>
  )
}
