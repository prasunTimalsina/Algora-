import { useState, useRef, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Navigation from '@/components/home/Navigation'
import ProblemTabs from '@/components/problem/ProblemTabs'
import CodeEditorPanel from '@/components/problem/CodeEditorPanel'
import TestCasesPanel from '@/components/problem/TestCasesPanel'
import { LoaderFour } from '@/components/Loader'
import { useProblem } from '@/hooks/useProblem'
import { useCodeEditor } from '@/hooks/useCodeEditor'
import { useAuthStore } from '@/store/useAuthStore'
import type { TestCase, Discussion } from '@/types/problem'
import axiosInstance from '@/lib/axios'
import { getLanguageId } from '@/utils/judge.util'
import toast from 'react-hot-toast'

const mockTestCases: TestCase[] = [
  {
    id: 1,
    input: 'nums = [2,7,11,15], target = 9',
    output: '[0,1]',
    status: 'passed',
    description: 'Basic case with two numbers that sum to target',
  },
  {
    id: 2,
    input: 'nums = [3,2,4], target = 6',
    output: '[1,2]',
    status: 'passed',
    description: 'Case where the indices are not in order',
  },
  {
    id: 3,
    input: 'nums = [3,3], target = 6',
    output: '[0,1]',
    status: 'failed',
    description: 'Edge case with duplicate numbers',
  },
]

// Mock data for discussions - TODO: Replace with API data
const mockDiscussions: Discussion[] = [
  {
    id: 1,
    author: 'Sarah Chen',
    avatar: '/avatar.jpg',
    timestamp: '2 hours ago',
    title: 'Optimal O(n) Solution using HashMap',
    replies: 12,
    likes: 45,
  },
  {
    id: 2,
    author: 'Alex Kumar',
    avatar: '/avatar.jpg',
    timestamp: '5 hours ago',
    title: 'Two Pointer Approach Explanation',
    replies: 8,
    likes: 23,
  },
]

export default function ProblemPage() {
  // Route parameters
  const { id } = useParams<{ id: string }>()

  // Authentication check
  const { authUser } = useAuthStore()

  // Problem data management
  const { problem, isLoading, error } = useProblem(id || '')
  console.log('Loaded problem:', problem)

  // Code editor state management
  const {
    selectedLanguage,
    currentCode,
    handleLanguageChange,
    handleCodeChange,
    initializeCode,
  } = useCodeEditor(problem)

  // UI state management
  const [showTestCases, setShowTestCases] = useState(true)
  const [dividerPos, setDividerPos] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Refs for resizing functionality
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  // Initialize code templates when problem loads
  useEffect(() => {
    if (problem) {
      initializeCode()
    }
  }, [problem, initializeCode])

  // Redirect to login if not authenticated
  if (!authUser) {
    return <Navigate to="/login" replace />
  }

  // Invalid problem ID
  if (!id) {
    return <Navigate to="/" replace />
  }

  // Resizing panel functionality
  const handleMouseDown = () => {
    isDragging.current = true
  }
  const handleMouseUp = () => {
    isDragging.current = false
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const newPos = ((e.clientX - rect.left) / rect.width) * 100

    // Limit panel sizes to reasonable bounds
    if (newPos > 30 && newPos < 70) {
      setDividerPos(newPos)
    }
  }
  // Code execution handlers - TODO: Integrate with Judge0 API
  const handleRun = async () => {
    setIsRunning(true)
    try {
      const stdin = problem?.testcases.map(tc => tc.input)
      const expected_outputs = problem?.testcases.map(tc => tc.output)

      const response = await axiosInstance.post('/execute-code/', {
        source_code: currentCode,
        language_id: getLanguageId(selectedLanguage.toLocaleLowerCase()),
        stdin,
        expected_outputs,
      })

      if (response.data.success === true) {
        toast.success('Code executed successfully')
      }
      console.log('Code execution response:', response.data)
      console.log('Running code:', currentCode, 'Language:', selectedLanguage)
      console.log('Code execution completed')
    } catch (error) {
      console.error('Error running code:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      console.log(
        'Submitting code:',
        currentCode,
        'Language:',
        selectedLanguage
      )

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000))

      console.log('Code submission completed')
    } catch (error) {
      toast.error('Failed to submit code', {
        duration: 3000,
      })
      console.error('Error submitting code:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center">
            <LoaderFour text="Loading problem..." />
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !problem) {
    return (
      <div className="h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Problem not found
            </h2>
            <p className="text-muted-foreground">
              The requested problem could not be loaded.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Main problem solving interface
  return (
    <div className="h-screen flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div
        ref={containerRef}
        className="flex flex-1 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Left Panel - Problem Statement */}
        <div
          style={{ width: `${dividerPos}%` }}
          className="flex flex-col border-r border-border overflow-hidden"
        >
          <ProblemTabs problem={problem} discussions={mockDiscussions} />
        </div>

        {/* Divider */}
        <div
          onMouseDown={handleMouseDown}
          className="w-1 bg-border hover:bg-foreground/20 cursor-col-resize transition-colors"
        />

        {/* Right Panel - Code Editor */}
        <div
          style={{ width: `${100 - dividerPos}%` }}
          className="flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-hidden">
            <CodeEditorPanel
              language={selectedLanguage}
              code={currentCode}
              onCodeChange={handleCodeChange}
              onLanguageChange={handleLanguageChange}
              onRun={handleRun}
              onSubmit={handleSubmit}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Test Cases Panel */}
          <TestCasesPanel
            testCases={mockTestCases}
            showTestCases={showTestCases}
            onToggleTestCases={() => setShowTestCases(!showTestCases)}
          />
        </div>
      </div>
    </div>
  )
}
