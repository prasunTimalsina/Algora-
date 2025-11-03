import { Link } from 'react-router-dom'
import { Code2 } from 'lucide-react'

const authButtons: { label: string; href: string; className?: string }[] = [
  {
    label: 'Log in',
    href: '/login',
    className:
      'text-subtext-light dark:text-subtext-dark hover:text-primary dark:hover:text-primary font-medium',
  },
  {
    label: 'Sign up',
    href: '/signup',
    className:
      'bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors',
  },
]

export const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Code2
            className=" text-primary text-3xl font-bold"
            fontSize="large"
          />
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
            algora
          </h1>
        </Link>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {authButtons.map((btn, idx) => (
            <Link key={idx} to={btn.href} className={btn.className}>
              {btn.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
