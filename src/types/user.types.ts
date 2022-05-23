import { Teacher } from './teacher'

export interface Tokens {
  accessToken: string
  refreshToken: string
}

// export type UserRole = 'Admin' | 'Teacher'
export interface UserRole {
  id: number
  name: string
  description: string
}

export const isAdmin = (roles: UserRole[]) => roles?.some((role) => role.name === 'Admin')

export interface User {
  id: number
  email: string
  teacher?: Teacher
  roles: Role[]
}

export type AppUser = Omit<User, 'roles'> & { roles: UserRole[] }

export type UserWithTokens = Tokens & { user: AppUser }

export interface Role {
  id: number
  name: string
  description: string
}
