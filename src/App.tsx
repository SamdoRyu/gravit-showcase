import { useState } from 'react'
import { Lightbox } from './components/Lightbox'
import { TextPreview } from './components/TextPreview'
import { features, type Doc, type Shot } from './data/artifacts'
import { links } from './data/facts'
import { Downloads } from './sections/Downloads'
import { Hero } from './sections/Hero'
import { Links } from './sections/Links'
import { Overview } from './sections/Overview'
import { Showcase } from './sections/Showcase'
import { Verification } from './sections/Verification'

const nav = [
  ['overview', '개요'],
  ['showcase', '구현 결과'],
  ['verification', '검증'],
  ['downloads', '다운로드'],
  ['links', '링크'],
]

const heroShot = features[0].shots[0]

export default function App() {
  const [shot, setShot] = useState<Shot | null>(null)
  const [doc, setDoc] = useState<Doc | null>(null)

  return (
    <>
      <nav aria-label="섹션" className="sticky top-0 z-10 border-b border-white/5 bg-space-950/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-black tracking-wider">
            <img src="/favicon.svg" alt="" className="size-5" /> GRAVIT
          </a>
          <ul className="flex gap-1 overflow-x-auto text-sm text-muted">
            {nav.map(([id, label]) => (
              <li key={id} className={id === 'overview' || id === 'links' ? 'hidden sm:block' : ''}>
                <a href={`#${id}`} className="block rounded-lg px-2.5 py-1.5 whitespace-nowrap hover:bg-white/5 hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <Hero shot={heroShot} onOpen={setShot} />
      <main>
        <Overview />
        <Showcase onOpen={setShot} />
        <Verification onPreview={setDoc} />
        <Downloads onOpen={setShot} onPreview={setDoc} />
        <Links />
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-muted">
        <p>
          GRAVIT · 부트캠프 팀 프로젝트(4명) ·{' '}
          <a href={links.repo} target="_blank" rel="noreferrer" className="text-glow hover:underline">
            github.com/SamdoRyu/GRAVIT
          </a>
        </p>
      </footer>

      {shot && <Lightbox shot={shot} onClose={() => setShot(null)} />}
      {doc && <TextPreview doc={doc} onClose={() => setDoc(null)} />}
    </>
  )
}
