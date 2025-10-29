import { useState } from 'react'
import type { TProblem } from '@/types/types'

interface ProblemDescriptionProps {
  problem: TProblem
}

export default function ProblemDescription({
  problem,
}: ProblemDescriptionProps) {
  const [expandedExamples, setExpandedExamples] = useState(false)

  return (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Description</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
          {problem.description}
        </p>
      </div>

      {/* Examples */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Examples</h3>
        <div className="space-y-4">
          {Object.values(problem.examples).map(
            (example, idx) =>
              (idx === 0 || expandedExamples) && (
                <div
                  key={idx}
                  className="bg-muted/50 rounded-lg p-4 border border-border space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Example {idx + 1}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-background rounded p-3 border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1 font-semibold">
                        Input:
                      </p>
                      <p className="text-xs font-mono text-foreground">
                        {example.input}
                      </p>
                    </div>
                    <div className="bg-background rounded p-3 border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1 font-semibold">
                        Output:
                      </p>
                      <p className="text-xs font-mono text-foreground">
                        {example.output}
                      </p>
                    </div>
                    <div className="bg-background rounded p-3 border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1 font-semibold">
                        Explanation:
                      </p>
                      <p className="text-xs text-foreground leading-relaxed">
                        {example.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
        <div className="mt-4 flex gap-2">
          {!expandedExamples && Object.values(problem.examples).length > 1 && (
            <button
              onClick={() => setExpandedExamples(true)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Show More Examples
            </button>
          )}
          {expandedExamples && Object.values(problem.examples).length > 1 && (
            <button
              onClick={() => setExpandedExamples(false)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Show Less Examples
            </button>
          )}
        </div>
      </div>

      {/* Constraints */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Constraints</h3>
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <ul className="text-sm text-muted-foreground space-y-2">
            {[problem.constraints].map((constraint, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                <span>{constraint}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Follow-up
      {problem.followUp && (
        <div>
          <h3 className="text-sm font-semibold mb-2">Follow-up</h3>
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground">{problem.followUp}</p>
          </div>
        </div>
      )} */}
    </div>
  )
}
