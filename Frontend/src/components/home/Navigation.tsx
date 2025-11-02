import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Code2, User as UserIcon, Plus, Trophy, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export default function Navigation() {
  const { logout, authUser: user } = useAuthStore()

  const isAdmin = user?.role === 'ADMIN'
  const handleLogout = async () => {
    await logout()
  }

  // ✅ Helper function to get user initials safely
  const getUserInitials = (fullName: string | null | undefined): string => {
    if (!fullName) return 'U' // Default to 'U' for User

    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) // Limit to 2 characters
  }

  const displayName = user?.fullName || 'User'
  const userImage = user?.image || '/placeholder.svg'

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            <span className="text-xl font-semibold">algora</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/problems"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Problems
            </Link>
            <Link
              to="/contests"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Contests
            </Link>
            <Link
              to="/leaderboard"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              to="/discuss"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Discuss
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-lg">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={userImage} alt={displayName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials(user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userImage} alt={displayName} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {getUserInitials(user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{displayName}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trophy className="mr-2 h-4 w-4" />
                  My Progress
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  My Playlists
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/add-problem">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Problem
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
