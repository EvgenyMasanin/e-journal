import { Teacher } from './teacher'

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export type Role = 'Admin' | 'Teacher'

export const isAdmin = (roles: Role[]) => roles?.includes('Admin')

export interface User {
  id: number
  email: string
  teacher: Teacher
  roles: Role[]
}

export type UserWithTokens = Tokens & { user: User }
