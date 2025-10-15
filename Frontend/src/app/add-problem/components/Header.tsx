import { Code2, Sparkles } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            <Link to="/" className="text-2xl font-bold">
              algora
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => loadSampleProblem('dp')}>
              <Sparkles className="mr-2 h-4 w-4" />
              Load DP Sample
            </Button>
            <Button
              variant="outline"
              onClick={() => loadSampleProblem('string')}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Load String Sample
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
