import { MessageCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Discussion } from '@/types/problem'

interface ProblemDiscussionProps {
  discussions: Discussion[]
}

export default function ProblemDiscussion({ discussions }: ProblemDiscussionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Community Discussions</h2>
      </div>
      <div className="space-y-3">
        {discussions.map((discussion) => (
          <div
            key={discussion.id}
            className="bg-muted/50 rounded-lg p-4 border border-border hover:border-foreground/30 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3 mb-2">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                <AvatarFallback>{discussion.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{discussion.author}</p>
                <h3 className="text-sm font-semibold text-foreground mt-1">{discussion.title}</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{discussion.timestamp}</span>
              <span>💬 {discussion.replies} replies</span>
              <span>👍 {discussion.likes} likes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}