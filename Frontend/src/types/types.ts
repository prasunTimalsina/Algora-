import type { TProblemInput } from './schema'

export type User = {
  email: string
  fullName?: string | null
  id: string
  image: string | null
  isEmailVerified: boolean
  role: 'ADMIN' | 'USER'
  username?: string | null
}

export type TProblem = TProblemInput & { id: string }
