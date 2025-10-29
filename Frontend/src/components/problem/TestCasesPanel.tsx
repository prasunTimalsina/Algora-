import { useState } from 'react'
import type { TestCase } from '@/types/problem'

interface TestCasesPanelProps {
  testCases: TestCase[]
  showTestCases: boolean
  onToggleTestCases: () => void
}

export default function TestCasesPanel({
  testCases,
  showTestCases,
  onToggleTestCases,
}: TestCasesPanelProps) {
  const [selectedTestCase, setSelectedTestCase] = useState(0)

  if (!showTestCases) {
    return (
      <div className="border-t border-border bg-muted/30 px-4 py-2">
        <button
          onClick={onToggleTestCases}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Show Test Cases
        </button>
      </div>
    )
  }

  return (
    <div className="border-t border-border bg-muted/30 max-h-56 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between border-b border-border bg-background px-4 py-2">
        <div className="flex border-b border-border bg-background overflow-x-auto flex-1">
          {testCases.map((testCase, idx) => (
            <button
              key={testCase.id}
              onClick={() => setSelectedTestCase(idx)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                selectedTestCase === idx
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    testCase.status === 'passed' 
                      ? 'bg-green-500' 
                      : testCase.status === 'failed'
                      ? 'bg-red-500'
                      : 'bg-gray-400'
                  }`}
                />
                Case {idx + 1}
              </div>
            </button>
          ))}
          <button className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent">
            +
          </button>
        </div>
        <button
          onClick={onToggleTestCases}
          className="text-xs text-muted-foreground hover:text-foreground ml-2 flex-shrink-0 transition-colors"
        >
          Hide
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {testCases[selectedTestCase] && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  testCases[selectedTestCase].status === 'passed' 
                    ? 'bg-green-500' 
                    : testCases[selectedTestCase].status === 'failed'
                    ? 'bg-red-500'
                    : 'bg-gray-400'
                }`}
              />
              <span className="text-xs font-semibold">Test Case {selectedTestCase + 1}</span>
              <span
                className={`text-xs font-medium ${
                  testCases[selectedTestCase].status === 'passed'
                    ? 'text-green-600 dark:text-green-400'
                    : testCases[selectedTestCase].status === 'failed'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {testCases[selectedTestCase].status === 'passed' 
                  ? 'Passed' 
                  : testCases[selectedTestCase].status === 'failed'
                  ? 'Failed'
                  : 'Pending'
                }
              </span>
            </div>

            <p className="text-xs text-muted-foreground">{testCases[selectedTestCase].description}</p>

            <div className="space-y-2">
              <div className="bg-background rounded p-3 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1 font-semibold">Input:</p>
                <p className="text-xs font-mono text-foreground">{testCases[selectedTestCase].input}</p>
              </div>
              <div className="bg-background rounded p-3 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1 font-semibold">Output:</p>
                <p className="text-xs font-mono text-foreground">{testCases[selectedTestCase].output}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}