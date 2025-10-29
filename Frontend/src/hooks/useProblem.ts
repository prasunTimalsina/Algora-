import { useEffect } from 'react'
import { useProblemStore } from '@/store/useProblemStore'

/**
 * Custom hook for fetching and managing single problem data
 * Follows the existing store pattern and provides clean API for components
 */
export const useProblem = (problemId: string) => {
  const { problem, isProblemLoading, getProblemById } = useProblemStore()

  useEffect(() => {
    if (problemId) {
      getProblemById(problemId)
    }
  }, [problemId, getProblemById])

  return {
    problem,
    isLoading: isProblemLoading,
    error: !isProblemLoading && !problem ? 'Problem not found' : null,
  }
}
