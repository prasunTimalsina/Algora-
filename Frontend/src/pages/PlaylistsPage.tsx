import { useState, useEffect } from 'react'
import {
  Code2,
  Flame,
  Sun,
  Moon,
  User,
  ArrowLeft,
  Trash2,
  ExternalLink,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import Navigation from '@/components/home/Navigation'

import PlaylistInput from '@/components/playlist/PlaylistInput'
import axiosInstance from '@/lib/axios'
import toast from 'react-hot-toast'

export default function PlaylistsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [showNewPlaylistInput, setShowNewPlaylistInput] = useState(true)

  const handleCreatePlaylist = async (name: string) => {
    try {
      const response = await axiosInstance.post('/playlist/create-playlist', {
        name,
        description: 'TODO: Add description field in UI',
      })
      if (response.data.success === true) {
        toast.success('Playlist created successfully!')
      }
    } catch (error) {
      throw new Error('Failed to create playlist', error)
    }
    setShowNewPlaylistInput(false)
  }

  const deletePlaylist = () => {
    setDeleteDialogOpen(false)
  }

  return (
    <div>
      <Navigation />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg">
              Delete Playlist
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground mt-2">
              Are you sure you want to delete this playlist? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end mt-6">
            <AlertDialogCancel className="bg-muted text-foreground hover:bg-muted/80">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deletePlaylist}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:text-foreground"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Part*/}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Playlists</h1>
              <p className="text-muted-foreground">
                Organize and track your learning journey
              </p>
            </div>
            <Button
              className="bg-foreground text-background hover:bg-foreground/90"
              onClick={() => setShowNewPlaylistInput(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Playlist
            </Button>
          </div>

          {/* Create New Playlist Input */}
          {showNewPlaylistInput && (
            <PlaylistInput
              onCreatePlaylist={handleCreatePlaylist}
              onCancel={() => setShowNewPlaylistInput(false)}
            />
          )}
        </div>
      </main>
    </div>
  )
}
