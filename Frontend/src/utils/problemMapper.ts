import type { TProblem } from '@/types/types'
import type { ProblemData, ProblemExample } from '@/types/problem'

// Types for backend JSON fields
interface BackendExample {
  input: string
  output: string
  explanation?: string
}

interface BackendExamples {
  JAVASCRIPT?: BackendExample
  PYTHON?: BackendExample
  JAVA?: BackendExample
}

/**
 * Maps backend TProblem format to frontend ProblemData format
 * Handles the differences between Prisma schema and UI requirements
 */
export const mapTProblemToProblemData = (problem: TProblem): ProblemData => {
  // Parse examples from JSON format stored in backend
  const examples: ProblemExample[] = []

  if (problem.examples && typeof problem.examples === 'object') {
    // Backend stores examples as { JAVASCRIPT: {...}, PYTHON: {...}, JAVA: {...} }
    // We'll use JavaScript examples for the UI by default
    const backendExamples = problem.examples as BackendExamples
    const jsExample = backendExamples.JAVASCRIPT
    if (jsExample) {
      examples.push({
        input: jsExample.input || '',
        output: jsExample.output || '',
        explanation: jsExample.explanation || '',
      })
    }

    // Add other language examples if they exist
    const pyExample = backendExamples.PYTHON
    if (pyExample) {
      examples.push({
        input: pyExample.input || '',
        output: pyExample.output || '',
        explanation: pyExample.explanation || '',
      })
    }
  }

  // Parse constraints from string to array
  const constraints = problem.constraints
    ? problem.constraints.split('\n').filter(Boolean)
    : []

  // Parse hints from string to array
  const hints = problem.hints ? problem.hints.split('\n').filter(Boolean) : []

  // Map difficulty enum to display format
  const difficultyMap = {
    EASY: 'Easy' as const,
    MEDIUM: 'Medium' as const,
    HARD: 'Hard' as const,
  }

  return {
    id: problem.id,
    title: problem.title,
    difficulty: difficultyMap[problem.difficulty] || 'Easy',
    tags: problem.tags || [],
    likes: 0, // Backend doesn't have likes/dislikes yet
    dislikes: 0,
    acceptanceRate: 0, // Backend doesn't have acceptance rate yet
    description: problem.description,
    examples,
    constraints,
    followUp: problem.editorial || undefined,
    hints,
  }
}
