import { Link } from 'react-router-dom'
import {
  SignupForm,
  SignupHeader,
  SignupHeroSection,
  SocialAuthSection,
} from '../components/auth'

/**
 * SignupPage Component
 *
 */
export const SignupPage =
  () => {
    return (
      <div className="flex min-h-screen">
        {/* Left Side - Signup Form */}
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <SignupHeader />

            <div className="mt-8">
              <SignupForm />
              <SocialAuthSection />

              {/* Signup Footer */}
              <div className="mt-6 text-center text-sm">
                <p className="text-subtext-light dark:text-subtext-dark">
                  Already
                  have
                  an
                  account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Section */}
        <SignupHeroSection />
      </div>
    )
  }
