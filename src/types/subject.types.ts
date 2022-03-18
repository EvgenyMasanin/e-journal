export const subjectTypes = ['lecture', 'practice', 'laboratory'] as const
export type SubjectTypes = typeof subjectTypes[number]

export type SubjectHours = Record<SubjectTypes, number>

export interface Subject {
  id: number
  name: string
}
