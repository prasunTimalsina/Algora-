import { ChevronDown, Play, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Editor } from '@monaco-editor/react'
import type { CodeEditorProps, Language } from '@/types/problem'

const languages: { value: Language; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
]

export default function CodeEditorPanel({
  language,
  code,
  onCodeChange,
  onLanguageChange,
  onRun,
  onSubmit,
  isRunning = false,
  isSubmitting = false,
}: CodeEditorProps) {
  const currentLanguage = languages.find(lang => lang.value === language)

  return (
    <div className="flex flex-col h-full">
      {/* Editor Toolbar */}
      <div className="border-b border-border bg-muted/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                {currentLanguage?.label || language}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {languages.map(lang => (
                <DropdownMenuItem
                  key={lang.value}
                  onClick={() => onLanguageChange(lang.value)}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <Button variant="ghost" size="icon" className="rounded-lg">
            <Settings className="h-4 w-4 line-through" />
          </Button> */}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2 bg-transparent"
            onClick={onRun}
            disabled={isRunning || isSubmitting}
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run
              </>
            )}
          </Button>
          <Button
            className="gap-2 bg-foreground text-background hover:bg-foreground/90"
            onClick={onSubmit}
            disabled={isRunning || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language === 'javascript' ? 'javascript' : language}
          value={code}
          onChange={value => onCodeChange(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Fira Code, monospace',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            parameterHints: { enabled: true },
          }}
        />
      </div>
    </div>
  )
}
