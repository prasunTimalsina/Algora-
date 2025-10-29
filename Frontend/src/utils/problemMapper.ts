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

/**
 * Gets the default code template for a language from backend codeSnippets
 */
export const getCodeSnippetForLanguage = (
  problem: TProblem,
  language: string
): string => {
  if (!problem.codeSnippets || typeof problem.codeSnippets !== 'object') {
    return getDefaultCodeTemplate(language)
  }

  const snippets = problem.codeSnippets as Record<string, string>
  const languageKey = language.toUpperCase()

  return snippets[languageKey] || getDefaultCodeTemplate(language)
}

/**
 * Fallback code templates when backend doesn't provide them
 */
const getDefaultCodeTemplate = (language: string): string => {
  switch (language.toLowerCase()) {
    case 'javascript':
      return `function solution() {
    // Write your solution here
    return null;
}`
    case 'python':
      return `def solution():
    # Write your solution here
    return None`
    case 'java':
      return `public class Solution {
    public int[] solution() {
        // Write your solution here
        return new int[0];
    }
}`
    case 'cpp':
      return `class Solution {
public:
    vector<int> solution() {
        // Write your solution here
        return {};
    }
};`
    case 'typescript':
      return `function solution(): any {
    // Write your solution here
    return null;
}`
    default:
      return '// Write your solution here'
  }
}
