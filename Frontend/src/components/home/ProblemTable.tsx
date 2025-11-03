import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Edit,
  Trash2,
  BookmarkPlus,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useState } from 'react'
import { capitalizeFirstLetter } from '@/lib/utils'

import type { Difficulty, Filter } from '@/pages/HomePage'
import type { TProblem } from '@/types/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { useProblemStore } from '@/store/useProblemStore'

interface ProblemsTableProps {
  problems: TProblem[]
  currentPage: number
  allTags: string[] | []
  setCurrentPage: (page: number) => void
  itemsPerPage: number
  isAdmin: boolean
  isProblemLoading: boolean
  totalProblems: number
  filters: Filter
  setFilters: React.Dispatch<React.SetStateAction<Filter>>
}

export default function ProblemsTable({
  problems,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  isAdmin,
  isProblemLoading,
  totalProblems,
  allTags,
  filters,
  setFilters,
}: ProblemsTableProps) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // ✅ Add missing state for tracking which problem to delete
  const [problemToDelete, setProblemToDelete] = useState<TProblem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  // ✅ Get delete function from store
  const { deleteProblem } = useProblemStore()

  const totalPages = Math.ceil(totalProblems / itemsPerPage)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
      case 'Medium':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
      case 'Hard':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const toggleTag = (tag: string) => {
    setFilters(prev =>
      prev.tags.includes(tag)
        ? { ...prev, tags: prev.tags.filter(t => t !== tag) }
        : { ...prev, tags: [...prev.tags, tag] }
    )
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setFilters({
      difficulty: '',
      tags: [],
    })
    setCurrentPage(1)
  }

  // ✅ Fixed delete handler
  const handleDeleteClick = (problem: TProblem) => {
    setProblemToDelete(problem)
    setDeleteDialogOpen(true)
  }

  // ✅ Fixed confirm delete handler
  const handleConfirmDelete = async () => {
    if (!problemToDelete) return

    setIsDeleting(true)
    try {
      await deleteProblem(problemToDelete.id)
      // ✅ Close dialog and reset state after successful deletion
      setDeleteDialogOpen(false)
      setProblemToDelete(null)
    } catch (error) {
      console.error('Failed to delete problem:', error)
      // Keep dialog open on error so user can try again
    } finally {
      setIsDeleting(false)
    }
  }

  // ✅ Cancel delete handler
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
    setProblemToDelete(null)
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Problems</h2>
        <Button
          onClick={() => navigate('/playlists')}
          className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer dark:text-foreground dark:bg-background-dark"
        >
          View Playlists
        </Button>
      </div>
      {/* ✅ Fixed AlertDialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg">
              Delete Problem
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground mt-2">
              {/* ✅ Show problem title in confirmation */}
              Are you sure you want to delete "{problemToDelete?.title}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end mt-6">
            <AlertDialogCancel
              onClick={handleCancelDelete}
              disabled={isDeleting}
              className="bg-muted text-foreground hover:bg-muted/80 cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90 disabled:opacity-50 cursor-pointer"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-4">
        {/* Search Bar and Filters in same row with dropdown indicators */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search problems by title..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Difficulty Filter with Dropdown Indicator */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap bg-transparent"
              >
                Difficulty{' '}
                {filters.difficulty &&
                  `(${capitalizeFirstLetter(filters.difficulty)})`}
                <ChevronRight className="ml-2 h-4 w-4 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => {
                  setFilters(prev => ({
                    ...prev,
                    difficulty: '',
                  }))
                  setCurrentPage(1)
                }}
              >
                All Difficulties
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {['EASY', 'MEDIUM', 'HARD'].map(diff => (
                <DropdownMenuItem
                  key={diff}
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      difficulty: diff as Difficulty,
                    }))
                    setCurrentPage(1)
                  }}
                  className={filters.difficulty === diff ? 'bg-muted' : ''}
                >
                  {capitalizeFirstLetter(diff)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tags Filter with Dropdown Indicator */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap bg-transparent"
              >
                Tags {filters.tags.length > 0 && `(${filters.tags.length})`}
                <ChevronRight className="ml-2 h-4 w-4 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {allTags.map(tag => (
                <DropdownMenuItem
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={filters.tags.includes(tag) ? 'bg-muted' : ''}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-4 w-4 rounded border ${
                        filters.tags.includes(tag)
                          ? 'bg-primary border-primary'
                          : 'border-border'
                      }`}
                    />
                    {tag}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Filters Button */}
          {(searchQuery || filters.difficulty || filters.tags.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="mr-1 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Problems Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 w-12 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Title
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Difficulty
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Tags
              </th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {problems.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  <p className="text-muted-foreground">No problems to show</p>
                </td>
              </tr>
            ) : (
              problems.map(problem => (
                <tr
                  key={problem.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4">
                    {problem.solved ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/30" />
                    )}
                  </td>
                  <td className="p-4">
                    <Link
                      to={`/problem/${problem.id}`}
                      className="font-medium hover:underline"
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant="outline"
                      className={`${getDifficultyColor(capitalizeFirstLetter(problem.difficulty))} font-medium`}
                    >
                      {capitalizeFirstLetter(problem.difficulty)}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {problem.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                      {isAdmin && (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 cursor-pointer"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 hover:text-destructive cursor-pointer"
                            onClick={() => handleDeleteClick(problem)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4 " />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, totalProblems)} of{' '}
          {totalProblems} problems
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="icon"
              onClick={() => setCurrentPage(page)}
              className="h-9 w-9"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
