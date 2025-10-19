import { useEffect, useRef, useState } from 'react'
import Navigation from '../components/home/Navigation'
import HeroSection from '../components/home/HeroSection'
import StatsCards from '../components/home/StatsCards'
import ProblemsTable from '../components/home/ProblemTable'
import { useProblemStore } from '@/store/useProblemStore'
import { json } from 'zod'
import { FitScreen } from '@mui/icons-material'

// Mock data for problems
const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    solved: true,
  },
  {
    id: 2,
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    tags: ['Linked List', 'Math'],
    solved: false,
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    tags: ['String', 'Sliding Window'],
    solved: true,
  },
  {
    id: 4,
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    tags: ['Array', 'Binary Search'],
    solved: false,
  },
  {
    id: 5,
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    tags: ['String', 'Dynamic Programming'],
    solved: false,
  },
  {
    id: 6,
    title: 'Zigzag Conversion',
    difficulty: 'Medium',
    tags: ['String'],
    solved: true,
  },
  {
    id: 7,
    title: 'Reverse Integer',
    difficulty: 'Easy',
    tags: ['Math'],
    solved: false,
  },
  {
    id: 8,
    title: 'String to Integer (atoi)',
    difficulty: 'Medium',
    tags: ['String'],
    solved: false,
  },
]

// Mock stats data
const statsData = {
  problemsSolved: 127,
  totalProblems: 2847,
  globalRank: 1234,
}

// Mock user data - in real app, this would come from auth
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/diverse-user-avatars.png',
}

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | ''

export type Filter = {
  difficulty: Difficulty
  tags: string[]
}

export default function HomePage() {
  const [isDark, setIsDark] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Filter>({
    difficulty: '',
    tags: [],
  })
  const { problems, totalProblems, allTags, getAllProblems, isProblemLoading } =
    useProblemStore()

  const abortControllerRef = useRef<AbortController | null>(null)
  const itemsPerPage = 5

  // Mock admin status - in real app, this would come from auth
  const isAdmin = true

  const stats = {
    problemsSolved: 0,
    totalProblems,
    globalRank: 0,
  }

  useEffect(() => {
    // ✅ Create a new AbortController for THIS effect
    if (abortControllerRef.current) {
      abortControllerRef.current.abort() // Abort previous request
    }

    // ✅ Create new AbortController and store in ref
    abortControllerRef.current = new AbortController()

    // ✅ Capture it in a local variable
    const currentAbortController = abortControllerRef.current

    getAllProblems(
      currentPage,
      5,
      filters.tags,
      filters.difficulty,
      currentAbortController.signal
    )

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [getAllProblems, currentPage, filters])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen bg-background ${isDark ? 'dark' : ''}`}>
      <Navigation
        isDark={isDark}
        toggleTheme={toggleTheme}
        user={mockUser}
        isAdmin={isAdmin}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection />

        <StatsCards stats={stats} />

        <div className="mt-16">
          <ProblemsTable
            problems={problems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            isAdmin={isAdmin}
            isProblemLoading={isProblemLoading}
            totalProblems={totalProblems}
            allTags={allTags}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </main>
    </div>
  )
}
