// predev · prebuild: artifacts.ts가 가리키는 파일이 public/에 실제로 있는지 확인하고 크기를 기록한다.
// 하나라도 없으면 실패한다 — 없는 파일에 다운로드 버튼이 생기지 않게 하는 검사.
import { statSync, writeFileSync } from 'node:fs'
import { allPaths } from '../src/data/artifacts.ts'

const root = new URL('../public/', import.meta.url)
const sizes = {}
const missing = []

for (const path of allPaths) {
  try {
    sizes[path] = statSync(new URL(path, root)).size
  } catch {
    missing.push(path)
  }
}

if (missing.length) {
  console.error(`public/에 없는 파일:\n  ${missing.join('\n  ')}`)
  process.exit(1)
}

writeFileSync(new URL('../src/data/fileSizes.json', import.meta.url), JSON.stringify(sizes, null, 2) + '\n')
console.log(`file sizes: ${allPaths.length} files`)
