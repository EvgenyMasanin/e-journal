export const subjectTypes = ['lecture', 'practice', 'laboratory'] as const
export type SubjectTypes = typeof subjectTypes[number]

export enum SubjectTypesMap {
  'lecture' = 'лекция',
  'practice' = 'практика',
  'laboratory' = 'лабораторная',
}
export enum SubjectTypesAbbreviationMap {
  'lecture' = 'лек',
  'practice' = 'пр',
  'laboratory' = 'лаб',
}

export type SubjectHours = Record<SubjectTypes, number>

export interface Subject {
  id: number
  name: string
}
