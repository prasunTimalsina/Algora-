import { CheckCircle2, Target, Trophy } from 'lucide-react'

interface StatsData {
  problemsSolved: number
  totalProblems: number
  globalRank: number
}

interface StatsCardsProps {
  stats: StatsData
}

export default function StatsCards({ stats }: StatsCardsProps) {
  function getMotivationalMessage(solvedCount: number) {
    switch (true) {
      case solvedCount === 0:
        return "Let's get started! Your first problem awaits."
      case solvedCount < 5:
        return 'Great start! Keep practicing to build momentum.'
      case solvedCount < 10:
        return "Keep up the great work! You're improving with every problem."
      case solvedCount < 20:
        return 'Awesome consistency! Each solved question sharpens your skills.'
      case solvedCount < 50:
        return "Impressive effort! You're becoming a problem-solving pro."
      case solvedCount >= 50:
        return "Outstanding dedication! You're mastering the art of algorithms!"
      default:
        return "Keep going — you're on the right path!"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Problems Solved
          </h3>
        </div>
        <p className="text-3xl font-bold">{stats.problemsSolved}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {getMotivationalMessage(stats.problemsSolved)}
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Problems
          </h3>
        </div>
        <p className="text-3xl font-bold">
          {stats.totalProblems.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          New problems added weekly
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Global Rank
          </h3>
        </div>
        <p className="text-3xl font-bold">
          #{stats.globalRank.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Top {100}% worldwide
        </p>
      </div>
    </div>
  )
}
