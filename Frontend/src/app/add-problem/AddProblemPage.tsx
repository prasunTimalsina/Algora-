import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import Header from './components/Header'
import { problemSchema, type TProblemInput } from '../../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import BasicInformation from './components/BasicInformation'
import TestCases from './components/TestCases'
import Examples from './components/Examples'
import StarterCode from './components/StarterCode'
import SolutionCode from './components/SolutionCode'
import AdditionalInformation from './components/AdditionalInformation'
import toast from 'react-hot-toast'
import { SAMPLE_PROBLEMS } from './constants/sampleProblems'
import axiosInstance from '@/lib/axios'

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
      hints: '',
      followUpQuestion: '',
    },
  })

  const onSubmit = async (data: TProblemInput) => {
    try {
      const res = await axiosInstance.post('/problems/create-problem', data)
      console.log('Problem submitted:', res.data.data)
      toast.success(res.data.message || 'Problem created successfully!')
    } catch (error) {
      console.error('Error creating problem:', error)
      toast.error('Failed to create problem')
    }
  }

  const handleSaveDraft = () => {
    const data = form.getValues()
    console.log('Saving draft:', data)
    toast.success('Draft saved successfully!')
  }

  const loadSampleProblem = (type: 'dp' | 'string') => {
    const sampleData = SAMPLE_PROBLEMS[type]
    if (sampleData) {
      // Reset the form with sample data
      form.reset(sampleData)
      toast.success(
        `${type === 'dp' ? 'Dynamic Programming' : 'String'} sample problem loaded!`
      )
    } else {
      toast.error('Sample problem not found')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header loadSampleProblem={loadSampleProblem} />

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

            {/* Test Cases */}
            <TestCases />

            {/* Examples */}
            <Examples />

            {/* Starter Code Templates */}
            <StarterCode />

            {/* Reference Solutions */}
            <SolutionCode />

            {/* Additional Information */}
            <AdditionalInformation />

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                size="lg"
              >
                Publish Problem
              </Button>
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  )
}

export default AddProblemPage
