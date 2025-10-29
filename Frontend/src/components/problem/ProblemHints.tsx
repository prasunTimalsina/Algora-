import { Lightbulb } from 'lucide-react'
import type { TProblem } from '@/types/types'

interface ProblemHintsProps {
  problem: TProblem
}

export default function ProblemHints({ problem }: ProblemHintsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Hints to Guide Your Solution</h2>
      </div>
      {/* <div className="space-y-3">
        {problem.hints.map((hint, idx) => (
          <div key={idx} className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-start gap-3">
              <span className="text-xs font-semibold text-muted-foreground bg-background rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">{hint}</p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  )
}
