import { useState, useEffect } from 'react'
import {
  Send,
  ChevronDown,
  Clock,
  MemoryStick,
  Code2,
  XCircle,
} from 'lucide-react'
import axiosInstance from '@/lib/axios'
import { LoaderFour } from './Loader'
import toast from 'react-hot-toast'

// Types based on your updated API response
interface Submission {
  id: string
  userId: string
  problemId: string
  sourceCode: string
  language: string
  stdin: string
  stdout: string
  stderr: string | null
  compileOutput: string | null
  status: string
  memory: string // JSON array string like '["6832 KB","6868 KB","6896 KB"]'
  time: string // JSON array string like '["0.039 s","0.04 s","0.034 s"]'
  fasterThanPercentile: number
  createdAt: string
  updatedAt: string
}

interface SubmissionProps {
  problemId: string
}

const Submission = ({ problemId }: SubmissionProps) => {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedSubmissions, setExpandedSubmissions] = useState<Set<string>>(
    new Set()
  )

  // Fetch submissions on component mount
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!problemId) return

      setIsLoading(true)
      setError(null)

      try {
        const response = await axiosInstance.get(
          `/submissions/get-submission-for-problem/${problemId}`
        )

        if (response.data.success) {
          setSubmissions(response.data.data || [])
        } else {
          throw new Error(
            response.data.message || 'Failed to fetch submissions'
          )
        }
      } catch (err) {
        console.error('Error fetching submissions:', err)
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch submissions'
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubmissions()
  }, [problemId])

  // Toggle submission code visibility
  const toggleSubmissionExpanded = (submissionId: string) => {
    setExpandedSubmissions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(submissionId)) {
        newSet.delete(submissionId)
      } else {
        newSet.add(submissionId)
      }
      return newSet
    })
  }

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return 'Invalid date'
    }
  }

  // Parse memory/time arrays
  const parseMetrics = (metricString: string) => {
    try {
      const parsed = JSON.parse(metricString)
      if (Array.isArray(parsed) && parsed.length > 0) {
        const avg =
          parsed.reduce((sum, val) => {
            const numeric = parseFloat(val.replace(/[^\d.]/g, ''))
            return sum + (isNaN(numeric) ? 0 : numeric)
          }, 0) / parsed.length
        return {
          values: parsed,
          average: avg.toFixed(2),
          best: parsed[0] || 'N/A',
        }
      }
    } catch {
      // Fallback if not JSON
      return {
        values: [metricString],
        average: metricString,
        best: metricString,
      }
    }
    return { values: [], average: 'N/A', best: 'N/A' }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
      case 'wrong answer':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
      case 'time limit exceeded':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
      case 'memory limit exceeded':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
      case 'compile error':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <LoaderFour />
          <p className="text-sm text-muted-foreground mt-4">
            Loading submissions...
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8">
        <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Failed to Load Submissions
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  // Empty state
  if (submissions.length === 0) {
    return (
      <div className="text-center py-8">
        <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No Submissions Yet
        </h3>
        <p className="text-sm text-muted-foreground">
          Submit your solution to see your submission history here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Send className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Your Submissions</h2>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
          {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
        </span>
      </div>

      {submissions.map(submission => {
        const timeMetrics = parseMetrics(submission.time)
        const memoryMetrics = parseMetrics(submission.memory)

        return (
          <div
            key={submission.id}
            className="bg-muted/50 rounded-lg border border-border overflow-hidden"
          >
            {/* Submission Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${getStatusColor(submission.status)}`}
                  >
                    {submission.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(submission.createdAt)}
                  </span>
                  {submission.status.toLowerCase() === 'accepted' && (
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Faster than {submission.fasterThanPercentile}%
                    </span>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-background rounded p-3 border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Runtime</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {timeMetrics.best}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Avg: {timeMetrics.average}s
                  </p>
                </div>

                <div className="bg-background rounded p-3 border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <MemoryStick className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Memory</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {memoryMetrics.best}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Avg: {memoryMetrics.average} KB
                  </p>
                </div>

                <div className="bg-background rounded p-3 border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Code2 className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Language</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground capitalize">
                    {submission.language.toLowerCase()}
                  </p>
                </div>
              </div>

              {/* View Code Button */}
              <button
                onClick={() => toggleSubmissionExpanded(submission.id)}
                className="mt-3 text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                <Code2 className="h-3 w-3" />
                {expandedSubmissions.has(submission.id)
                  ? 'Hide Code'
                  : 'View Code'}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${
                    expandedSubmissions.has(submission.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Source Code (Collapsible) */}
            {expandedSubmissions.has(submission.id) && (
              <div className="p-4 bg-muted/30 border-b border-border">
                <h4 className="text-sm font-semibold mb-2">Source Code</h4>
                <div className="bg-background rounded-lg border border-border overflow-hidden">
                  <pre className="p-4 text-xs font-mono overflow-x-auto">
                    <code>{submission.sourceCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Submission
