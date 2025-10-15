import { create } from 'zustand'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'

import type { LoginUserInput, RegisterUserInput } from '../types/schema'

///TODO: Add the type for the store

export const useAuthStore = create(set => ({
  authUser: null,
  isSigninUp: false,
  isLogingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({
      isCheckingAuth: true,
    })
    try {
      const response = await axiosInstance.get('auth/get-me')
      console.log('check Response: ', response.data.data)
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
