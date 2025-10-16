import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useFormContext, useFieldArray } from 'react-hook-form'

const TestCases = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  const {
    fields: testCaseFields,
    append: addTestCase,
    remove: removeTestCase,
  } = useFieldArray({
    control,
    name: 'testcases',
  })

  // Ensure at least one test case exists
  React.useEffect(() => {
    if (testCaseFields.length === 0) {
      addTestCase({
        input: '',
        output: '',
      })
    }
  }, [testCaseFields.length, addTestCase])

  const handleAddTestCase = () => {
    addTestCase({
      input: '',
      output: '',
    })
  }

  // Helper function to safely get field errors
  const getFieldError = (index: number, field: 'input' | 'output') => {
    const testCaseErrors = errors?.testcases
    if (Array.isArray(testCaseErrors) && testCaseErrors[index]) {
      return testCaseErrors[index]?.[field]
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-display)]">
          Test Cases
        </CardTitle>
        <CardDescription className="text-subtext-light">
          Define the test cases that will validate solutions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {testCaseFields.map((testCase, index) => (
          <div
            key={testCase.id}
            className="space-y-3 rounded-lg border border-border-light p-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Test Case {index + 1}</h4>
              {testCaseFields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTestCase(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`testcases.${index}.input`}>Input</Label>
                <Textarea
                  id={`testcases.${index}.input`}
                  placeholder="Enter input..."
                  {...register(`testcases.${index}.input`, {
                    required: 'Input is required',
                  })}
                  rows={3}
                  className={
                    getFieldError(index, 'input') ? 'border-red-500' : ''
                  }
                />
                {getFieldError(index, 'input') && (
                  <p className="text-red-500 text-xs mt-1">
                    {getFieldError(index, 'input')?.message ||
                      'Input is required'}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`testcases.${index}.output`}>
                  Expected Output
                </Label>
                <Textarea
                  id={`testcases.${index}.output`}
                  placeholder="Enter expected output..."
                  {...register(`testcases.${index}.output`, {
                    required: 'Expected output is required',
                  })}
                  rows={3}
                  className={
                    getFieldError(index, 'output') ? 'border-red-500' : ''
                  }
                />
                {getFieldError(index, 'output') && (
                  <p className="text-red-500 text-xs mt-1">
                    {getFieldError(index, 'output')?.message ||
                      'Expected output is required'}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Global test cases error */}
        {errors?.testcases && (
          <p className="text-red-500 text-sm">
            Please ensure all test cases have valid input and output values.
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddTestCase}
          className="w-full bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Test Case
        </Button>
      </CardContent>
    </Card>
  )
}

export default TestCases
