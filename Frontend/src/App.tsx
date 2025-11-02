import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import HomePage from './pages/HomePage'
import AddProblemPage from './app/add-problem/AddProblemPage'
import { LoaderOne } from './components/Loader'
import AdminRoute from './components/AdminRoute'
import ProblemPage from './pages/ProblemPage'
import { ThemeProvider } from './components/theme/ThemeProvider'

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return <LoaderOne />
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={!authUser ? <LandingPage /> : <HomePage />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to="/" />}
          />

          <Route
            path="/problem/:id"
            element={authUser ? <ProblemPage /> : <Navigate to={'/login'} />}
          />

          <Route element={<AdminRoute />}>
            <Route
              path="/add-problem"
              element={authUser ? <AddProblemPage /> : <Navigate to="/" />}
            />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  )
}
export default App
