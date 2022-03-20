export const subjectTypes = ['lecture', 'practice', 'laboratory'] as const
export type SubjectTypes = typeof subjectTypes[number]

export enum SubjectTypesMap {
  'lecture'= 'лекция',
  'practice'= 'практика',
  'laboratory'= 'лабораторная',
}

export type SubjectHours = Record<SubjectTypes, number>

export interface Subject {
  id: number
  name: string
}