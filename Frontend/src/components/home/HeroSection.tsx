import { Award } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="mb-16 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 mb-4">
          <Award className="h-4 w-4" />
          <span className="text-sm font-medium">Master Coding Interviews</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          Practice coding problems
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Solve challenges, prepare for interviews, and improve your programming
          skills.
        </p>
      </div>
    </div>
  )
}
