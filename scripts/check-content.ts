// Legality check for one content area, so files can be validated in isolation:
//   node scripts/check-content.ts level3        (curriculum level 1-6)
//   node scripts/check-content.ts openings
//   node scripts/check-content.ts handbook
//   node scripts/check-content.ts puzzles
import { readFileSync } from 'node:fs'
import type { Module, Opening, Puzzle, TipSection, Trap } from '../src/data/types.ts'
import { validateHandbook, validateModules, validateOpenings, validatePuzzles } from '../src/data/validate.ts'

const target = process.argv[2] ?? ''
let errors: string[] = []
let summary = ''

if (/^level[1-6]$/.test(target)) {
  const mod = await import(`../src/data/curriculum/${target}.ts`)
  const modules = mod[target] as Module[]
  errors = validateModules(modules)
  const lessons = modules.flatMap((m) => m.lessons)
  const exercises = lessons.flatMap((l) => l.blocks.filter((b) => b.type === 'exercise'))
  summary = `${modules.length} modules, ${lessons.length} lessons, ${exercises.length} exercises`
} else if (target === 'openings') {
  const { openings } = (await import('../src/data/openings/index.ts')) as { openings: Opening[] }
  errors = validateOpenings(openings)
  summary = `${openings.length} openings, ${openings.reduce((n, o) => n + o.lines.length, 0)} lines`
} else if (target === 'handbook') {
  const { tipSections } = (await import('../src/data/handbook/tips.ts')) as { tipSections: TipSection[] }
  const { traps } = (await import('../src/data/handbook/traps.ts')) as { traps: Trap[] }
  errors = validateHandbook(tipSections, traps)
  summary = `${tipSections.length} tip sections, ${tipSections.reduce((n, s) => n + s.tips.length, 0)} tips, ${traps.length} traps`
} else if (target === 'puzzles') {
  const puzzles = JSON.parse(readFileSync(new URL('../src/data/puzzles.json', import.meta.url), 'utf8')) as Puzzle[]
  errors = validatePuzzles(puzzles)
  summary = `${puzzles.length} puzzles`
} else {
  console.error('usage: node scripts/check-content.ts level1..level6|openings|handbook|puzzles')
  process.exit(2)
}

for (const e of errors) console.log(`ERROR ${e}`)
console.log(`${target}: ${summary}. ${errors.length} errors.`)
process.exit(errors.length ? 1 : 0)
