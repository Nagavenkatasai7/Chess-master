import type { Lesson, Module } from '../types.ts'
import { level1 } from './level1.ts'
import { level2 } from './level2.ts'
import { level3 } from './level3.ts'
import { level4 } from './level4.ts'
import { level5 } from './level5.ts'
import { level6 } from './level6.ts'

export const curriculum: Module[] = [...level1, ...level2, ...level3, ...level4, ...level5, ...level6]

export const allLessons: { lesson: Lesson; module: Module }[] = curriculum.flatMap((module) =>
  module.lessons.map((lesson) => ({ lesson, module })),
)

export function findLesson(id: string) {
  return allLessons.find((entry) => entry.lesson.id === id)
}
