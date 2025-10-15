import { useForm } from 'react-hook-form'
import { problemSchema, type TProblemInput } from '../../../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'

export const useProblemForm = () => {
  const form = useForm<TProblemInput>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      testcases: [{ input: '', output: '' }],
      tags: [''],
      examples: {
        JAVASCRIPT: { input: '', output: '', explanation: '' },
        PYTHON: { input: '', output: '', explanation: '' },
        JAVA: { input: '', output: '', explanation: '' },
      },
      codeSnippets: {
        JAVASCRIPT: 'function solution() {\n  // Write your code here\n}',
        PYTHON: 'def solution():\n    # Write your code here\n    pass',
        JAVA: 'public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}',
      },
      referenceSolutions: {
        JAVASCRIPT: '// Add your reference solution here',
        PYTHON: '# Add your reference solution here',
        JAVA: '// Add your reference solution here',
      },
    },
  })

  return { ...form }
}
