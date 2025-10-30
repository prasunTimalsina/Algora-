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
export type ProblemTab = 'description' | 'hints' | 'discussion' | 'submissions'

//Code Execution Response Type
export type ExecutionResponse = {
  testCase: number
  passed: boolean
  stdout: string
  expected: string
  stderr: string
}

//Code Submission Type

export type Submission = {
  data: SubmissionData
  message: string
  statusCode: number
  success: boolean
}

export type SubmissionData = {
  id: string
  userId: string
  problemId: string
  language: string
  status: 'Accepted' | 'Wrong Answer'
  fasterThanPercentile?: number | null

  sourceCode: string
  stdin: string | null
  stdout: string | null
  stderr: string | null
  compileOutput: string | null

  // Stored as JSON strings in your DB
  memory: string // e.g. "[\"7176 KB\",\"6820 KB\",\"6988 KB\"]"
  time: string // e.g. "[\"0.028 s\",\"0.032 s\",\"0.035 s\"]"

  testCases: TestCaseResult[]

  createdAt: string
  updatedAt: string
}

export type TestCaseResult = {
  id: string
  submissionId: string
  testCase: number
  passed: boolean
  status: string
  input?: string
  output?: string
  expected?: string
}
