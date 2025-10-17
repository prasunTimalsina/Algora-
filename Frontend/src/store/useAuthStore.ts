import { create } from 'zustand'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'

import type { LoginUserInput, RegisterUserInput } from '../types/schema'
import { User } from 'lucide-react'

type User = {
  id: string
  email: string
  username?: string
  fullName?: string
  image?: string
  role: 'USER' | 'ADMIN'
}

type AuthStore = {
  authUser: User | null
  isSigninUp: boolean
  isLoggingIn: boolean
  isCheckingAuth: boolean

  checkAuth: () => Promise<void>
  signup: (data: RegisterUserInput) => Promise<void>
  login: (data: LoginUserInput) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>(set => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({
      isCheckingAuth: true,
    })
    try {
      const response = await axiosInstance.get('auth/get-me')
      set({
        authUser: response?.data.data || null,
      })
    } catch (error) {
      console.error('Error occured during checking auth: ', error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },
  signup: async (data: RegisterUserInput) => {
    set({ isSigninUp: true })
    try {
      const res = await axiosInstance.post('/auth/register', data)
      console.log(res.data.user)
      set({ authUser: res.data.user })

      toast.success(res.data.message)
    } catch (error) {
      console.log('Error signing up', error)
      toast.error('Error signing up')
    } finally {
      set({ isSigninUp: false })
    }
  },

  login: async (data: LoginUserInput) => {
    set({ isLoggingIn: true })
    try {
      const res = await axiosInstance.post('/auth/log-in', data)
      console.log(res.data.data.user)
      set({ authUser: res?.data.data.user || null })

      toast.success(res?.data.message)
    } catch (error) {
      console.log('Error logging in', error)
      toast.error('Error logging in')
    } finally {
      set({ isLoggingIn: false })
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/log-out')
      set({ authUser: null })

      toast.success('Logout successful')
    } catch (error) {
      console.log('Error logging out', error)
      toast.error('Error logging out')
    }
  },
}))
