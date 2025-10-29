import { useState, useCallback } from 'react'
import type { Language } from '@/types/problem'
import type { TProblem } from '@/types/types'
import { getCodeSnippetForLanguage } from '@/utils/problemMapper'

/**
 * Custom hook for managing code editor state and language switching
 * Integrates with backend code snippets and maintains code per language
 */
export const useCodeEditor = (problem: TProblem | null) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>('javascript')
  const [codeByLanguage, setCodeByLanguage] = useState<
    Record<Language, string>
  >({
    javascript: '',
    python: '',
    java: '',
  })

  // Initialize code templates when problem loads
  const initializeCode = useCallback(() => {
    if (!problem) return

    const newCodeByLanguage: Record<Language, string> = {
      javascript: getCodeSnippetForLanguage(problem, 'javascript'),
      python: getCodeSnippetForLanguage(problem, 'python'),
      java: getCodeSnippetForLanguage(problem, 'java'),
    }

    setCodeByLanguage(newCodeByLanguage)
  }, [problem])

  // Handle language change and preserve code per language
  const handleLanguageChange = useCallback((language: Language) => {
    setSelectedLanguage(language)
  }, [])

  // Handle code changes for current language
  const handleCodeChange = useCallback(
    (code: string) => {
      setCodeByLanguage(prev => ({
        ...prev,
        [selectedLanguage]: code,
      }))
    },
    [selectedLanguage]
  )

  // Get current code for selected language
  const currentCode = codeByLanguage[selectedLanguage]

  return {
    selectedLanguage,
    currentCode,
    handleLanguageChange,
    handleCodeChange,
    initializeCode,
  }
}
