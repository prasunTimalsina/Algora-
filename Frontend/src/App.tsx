import { Route, Routes } from 'react-router-dom'
import { LoaderIcon, Toaster } from 'react-hot-toast'

import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import HomePage from './pages/HomePage'
import AddProblemPage from './app/add-problem/AddProblemPage'

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <LoaderIcon className="text-10xl text-primary animate-spin m-auto mt-20" />
    )
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <Toaster />
      <Routes>
        <Route path="/add-problem" element={<AddProblemPage />} />
        <Route path="/" element={!authUser ? <LandingPage /> : <HomePage />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <HomePage />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <HomePage />}
        />
      </Routes>
    </div>
  )
}
export default App
