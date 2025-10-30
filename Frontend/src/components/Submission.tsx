const Submission = ({ problemId }) => {
  const [submissions, setSubmissions] = useState<TSubmission[]>([])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Send className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Your Submissions</h2>
      </div>

      {submissions.map(submission => (
        <div
          key={submission.id}
          className="bg-muted/50 rounded-lg border border-border overflow-hidden"
        >
          {/* Submission Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    submission.status === 'Accepted'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                  }`}
                >
                  {submission.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {submission.timestamp}
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-background rounded p-3 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Runtime</p>
                <p className="text-sm font-semibold text-foreground">
                  {submission.runtime}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Avg: {submission.avgRuntime}
                </p>
              </div>
              <div className="bg-background rounded p-3 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Memory</p>
                <p className="text-sm font-semibold text-foreground">
                  {submission.memory}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Avg: {submission.avgMemory}
                </p>
              </div>
              <div className="bg-background rounded p-3 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Language</p>
                <p className="text-sm font-semibold text-foreground capitalize">
                  {selectedLanguage}
                </p>
              </div>
            </div>
          </div>

          {/* Test Results Table */}
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-3">Test Case Results</h3>
            <div className="space-y-2">
              {submission.testResults.map(result => (
                <div
                  key={result.id}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  {/* Collapsible Header */}
                  <button
                    onClick={() => toggleTestResultExpanded(result.id)}
                    className="w-full flex items-center justify-between p-3 bg-background hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          result.status === 'passed'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      />
                      <span className="text-xs font-semibold">
                        Test Case {result.id}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          result.status === 'passed'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {result.status === 'passed' ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        expandedTestResults.includes(result.id)
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>

                  {/* Collapsible Content */}
                  {expandedTestResults.includes(result.id) && (
                    <div className="p-3 bg-muted/30 border-t border-border space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-background rounded p-3 border border-border/50">
                          <p className="text-xs text-muted-foreground mb-1 font-semibold">
                            Input:
                          </p>
                          <p className="text-xs font-mono text-foreground break-words">
                            {result.input}
                          </p>
                        </div>
                        <div className="bg-background rounded p-3 border border-border/50">
                          <p className="text-xs text-muted-foreground mb-1 font-semibold">
                            Expected:
                          </p>
                          <p className="text-xs font-mono text-foreground break-words">
                            {result.expected}
                          </p>
                        </div>
                        <div className="bg-background rounded p-3 border border-border/50">
                          <p className="text-xs text-muted-foreground mb-1 font-semibold">
                            Your Output:
                          </p>
                          <p className="text-xs font-mono text-foreground break-words">
                            {result.output}
                          </p>
                        </div>
                        <div className="bg-background rounded p-3 border border-border/50">
                          <p className="text-xs text-muted-foreground mb-1 font-semibold">
                            Stats:
                          </p>
                          <p className="text-xs text-foreground">
                            {result.time} • {result.memory}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Submission
