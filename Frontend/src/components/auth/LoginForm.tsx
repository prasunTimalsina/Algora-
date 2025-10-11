import React from 'react'
import { useForm } from 'react-hook-form'
import { SubmitButton } from './SubmitButton'
import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginUserSchema } from '../../types/schema'

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

interface LoginFormData {
  email: string
  password: string
}

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginUserSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    await new Promise(resolve => setTimeout(resolve, 3000)) // Simulate network request
    console.log('Login attempt:', data)
    // Handle login logic here
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="off"
          placeholder="you@example.com"
          className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          {...register('email')}
        />
        {errors?.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="off"
            placeholder="••••••••"
            className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white pr-10"
            {...register('password', { required: 'Password is required' })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <VisibilityOffOutlinedIcon className="h-5 w-5" />
            ) : (
              <VisibilityOutlinedIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors?.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="rememberMe"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-gray-100 dark:bg-gray-700"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <Link
            to="#"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <SubmitButton isLoading={isSubmitting}>Login</SubmitButton>
    </form>
  )
}
