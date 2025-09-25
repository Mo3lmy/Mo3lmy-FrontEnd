import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  // State
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions - تأكد من وجودها هنا
  setAuth: (user: User, token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      // Actions implementation
      setAuth: (user, token) => {
        localStorage.setItem('token', token)
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        })
      },
      
      logout: () => {
        localStorage.removeItem('token')
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        // Redirect to login
        window.location.href = '/login'
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)