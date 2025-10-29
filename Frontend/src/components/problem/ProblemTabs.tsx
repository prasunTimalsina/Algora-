import { useState } from 'react'
import ProblemHeader from './ProblemHeader'
import ProblemDescription from './ProblemDescription'
import ProblemHints from './ProblemHints'
import ProblemDiscussion from './ProblemDiscussion'
import type { Discussion } from '@/types/problem'
import type { ProblemTab, TProblem } from '@/types/types'

interface ProblemTabsProps {
  problem: TProblem
  discussions: Discussion[]
}

export default function ProblemTabs({
  problem,
  discussions,
}: ProblemTabsProps) {
  const [activeTab, setActiveTab] = useState<ProblemTab>('description')

  const tabs = [
    { id: 'description' as const, label: 'Description' },
    { id: 'hints' as const, label: 'Hints' },
    { id: 'discussion' as const, label: 'Discussion' },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-border bg-muted/30 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }
            ${tab.id === 'hints' || tab.id === 'discussion' ? 'line-through' : ''}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'description' && (
          <div className="space-y-6">
            <ProblemHeader problem={problem} />
            <ProblemDescription problem={problem} />
          </div>
        )}

        {activeTab === 'hints' && <ProblemHints problem={problem} />}

        {activeTab === 'discussion' && (
          <ProblemDiscussion discussions={discussions} />
        )}
      </div>
    </div>
  )
}
