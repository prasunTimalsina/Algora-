import { Badge } from '@/components/ui/badge'
import { capitalizeFirstLetter } from '@/lib/utils'

import type { TProblem } from '@/types/types'

interface ProblemHeaderProps {
  problem: TProblem
}

export default function ProblemHeader({ problem }: ProblemHeaderProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (capitalizeFirstLetter(difficulty)) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-4">
      {/* Title and Stats */}
      <div>
        <h1 className="text-3xl font-bold mb-3">{problem.title}</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <Badge className={getDifficultyColor(problem.difficulty)}>
            {problem.difficulty}
          </Badge>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="line-through">👍 {25}</span>
            <span className="line-through">👎 {3}</span>
            <span className="line-through">Acceptance: {50}%</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Tags</h3>
        <div className="flex gap-2 flex-wrap">
          {problem.tags.map(tag => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-3 py-1 rounded text-xs bg-muted text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
