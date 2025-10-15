import { useRef } from 'react'
import Editor, { type OnMount } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'

interface CodeEditorProps {
  value: string
  onChange: (value: string | undefined) => void
  language: 'python' | 'javascript' | 'cpp'
  height?: string
}

export function CodeEditor({
  value,
  onChange,
  language,
  height = '300px',
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount: OnMount = editor => {
    editorRef.current = editor
  }

  const getLanguageMode = () => {
    switch (language) {
      case 'python':
        return 'python'
      case 'javascript':
        return 'javascript'
      case 'cpp':
        return 'cpp'
      default:
        return 'javascript'
    }
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Editor
        height={height}
        language={getLanguageMode()}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vs-light"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 16, bottom: 16 },
          fontFamily: 'var(--font-mono)',
        }}
      />
    </div>
  )
}
