import { FormProvider, useForm } from 'react-hook-form'
import Header from './components/Header'
import { problemSchema, type TProblemInput } from '../../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import BasicInformation from './components/BasicInformation'

const AddProblemPage = () => {
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

  const onSubmit = (data: TProblemInput) => {
    console.log(data)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* TODO: Implement the load form Insider header */}
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-balance font-[family-name:var(--font-display)] text-text-light">
            Add New Problem
          </h2>
          <p className="mt-2 text-subtext-light">
            Create a new coding challenge for the Algora platform
          </p>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information  */}
            <BasicInformation />
          </form>
        </FormProvider>
      </main>
    </div>
  )
}

export default AddProblemPage
