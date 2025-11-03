import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import toast from 'react-hot-toast'
import { is } from 'zod/v4/locales'
import { Loader2, Send } from 'lucide-react'

type PlaylistInputProps = {
  onCreatePlaylist: (name: string) => Promise<void>
  onCancel: () => void
}

const PlaylistInput = ({ onCreatePlaylist, onCancel }: PlaylistInputProps) => {
  const [newPlaylistName, setNewPlaylistName] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim() !== '') {
      try {
        await onCreatePlaylist(newPlaylistName.trim())
      } catch (error) {
        toast.error('Failed to create playlist. Please try again.' + error)
      } finally {
        setIsSubmitting(false)
        setNewPlaylistName('')
      }
    }
  }

  return (
    <div className="border border-border rounded-lg p-4 bg-card mb-6">
      <div className="flex gap-3">
        <Input
          placeholder="Enter playlist name..."
          value={newPlaylistName}
          onChange={e => setNewPlaylistName(e.target.value)}
          onKeyUp={e => e.key === 'Enter' && handleCreatePlaylist()}
          autoFocus
        />
        <Button
          onClick={handleCreatePlaylist}
          className="bg-foreground text-background hover:bg-foreground/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Create
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            onCancel()
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default PlaylistInput
