export interface ProblemExample {
  input: string
  output: string
  explanation: string
}

export interface TestCase {
  id: number
  input: string
  output: string
  status: 'passed' | 'failed' | 'pending'
  description: string
}

export interface Discussion {
  id: number
  author: string
  avatar: string
  timestamp: string
  title: string
  replies: number
  likes: number
}

export interface ProblemData {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
  likes: number
  dislikes: number
  acceptanceRate: number
  description: string
  examples: ProblemExample[]
  constraints: string[]
  followUp?: string
  hints: string[]
}

export type Language = 'javascript' | 'python' | 'java'

export interface CodeEditorProps {
  language: Language
  code: string
  onCodeChange: (code: string) => void
  onLanguageChange: (language: Language) => void
  onRun: () => void
  onSubmit: () => void
  isRunning?: boolean
  isSubmitting?: boolean
}
