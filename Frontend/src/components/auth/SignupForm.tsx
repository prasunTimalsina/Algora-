import React from 'react'
import { useForm } from 'react-hook-form'
import { SubmitButton } from './SubmitButton'
import { registerUserSchema, type RegisterUserInput } from '../../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

export const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(registerUserSchema),
  })

  const onSubmit = async (data: RegisterUserInput) => {
    await new Promise(resolve => setTimeout(resolve, 3000)) // Simulate network request
    console.log('Signup attempt:', data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          placeholder="Enter your username"
          className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          {...register('username')}
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">
            {errors?.username.message}
          </p>
        )}
      </div>

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
          autoComplete="email"
          placeholder="you@example.com"
          className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors?.email.message}</p>
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
            autoComplete="new-password"
            placeholder="••••••••"
            className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white pr-10"
            {...register('password')}
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
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {errors?.password.message}
          </p>
        )}
      </div>

      <SubmitButton isLoading={isSubmitting}>Sign up</SubmitButton>
    </form>
  )
}
