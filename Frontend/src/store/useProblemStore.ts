import { create } from 'zustand'
import axiosInstance from '@/lib/axios'
import toast from 'react-hot-toast'
import type { TProblem } from '@/types/types'
import axios from 'axios'

type ProblemStore = {
  problems: TProblem[] | []
  problem: TProblem | null
  totalProblems: number
  allTags: string[] | []
  solvedProblems: TProblem[] | []
  isProblemsLoading: boolean
  isProblemLoading: boolean

  getAllProblems: (
    page?: number,
    limit?: number,
    tags?: string[],
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | '',
    signal?: AbortSignal
  ) => Promise<void>
  getProblemById: (id: number) => Promise<void>
  deleteProblem: (id: string) => Promise<void>
  // getSolvedProblemByUser: () => Promise<void>
}

export const useProblemStore = create<ProblemStore>(set => ({
  problems: [],
  totalProblems: 0,
  problem: null,
  allTags: [],
  solvedProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,

  getAllProblems: async (
    page: number = 1,
    limit: number = 5,
    tags: string[] = [],
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | '',
    signal?: AbortSignal
  ): Promise<void> => {
    try {
      set({ isProblemsLoading: true })

      const res = await axiosInstance.get(
        `problems/get-all-problem?page=${page}&limit=${limit}${difficulty ? `&difficulty=${difficulty}` : ''}&tags=${tags.join(',')}`,
        { signal }
      )

      set({ problems: res.data.data.problems })
      set({ totalProblems: res.data.data.meta.totalNoOfProblems })
      set({ allTags: res.data.data.meta.tags })
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled', error)
        return
      }
      console.log('Error getting all problems', error)
      toast.error('Error in getting problems')
    } finally {
      set({ isProblemsLoading: false })
    }
  },

  getProblemById: async id => {
    try {
      set({ isProblemLoading: true })

      const res = await axiosInstance.get(`/problems/get-problem/${id}`)

      set({ problem: res.data.problem })
      toast.success(res.data.message)
    } catch (error) {
      console.log('Error getting all problems', error)
      toast.error('Error in getting problems')
    } finally {
      set({ isProblemLoading: false })
    }
  },

  deleteProblem: async (id: string) => {
    try {
      // Instant local update
      set(state => ({
        problems: state.problems.filter(p => p.id !== id),
        totalProblems: state.totalProblems - 1,
      }))

      const res = await axiosInstance.delete(`/problems/delete-problem/${id}`)
      toast.success(res.data.message)

      // Silent background sync
      useProblemStore.getState().getAllProblems()
    } catch (error) {
      console.log('Error deleting problem', error)
      toast.error('Error deleting problem')
    }
  },

  //TODO:: need to implement later
  // getSolvedProblemByUser: async () => {
  //   try {
  //     const res = await axiosInstance.get('/problems/get-solved-problem')

  //     set({ solvedProblems: res.data.problems })
  //   } catch (error) {
  //     console.log('Error getting solved problems', error)
  //     toast.error('Error getting solved problems')
  //   }
  // },
}))
