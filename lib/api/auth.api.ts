import api from './client'
import type { LoginFormData, RegisterFormData, AuthResponse, User } from '@/types/auth.types'

export const authAPI = {
  // تسجيل الدخول
  async login(data: LoginFormData): Promise<AuthResponse> {
    // api.post يرجع response.data مباشرة بسبب الـ interceptor
    const response = await api.post('/auth/login', data) as AuthResponse
    
    // التحقق من وجود البيانات وحفظ التوكن
    if (response.success && response.data?.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    
    return response
  },

  // إنشاء حساب جديد
  async register(data: RegisterFormData): Promise<AuthResponse> {
    // إزالة confirmPassword قبل الإرسال
    const { confirmPassword, ...registerData } = data
    
    // api.post يرجع response.data مباشرة
    const response = await api.post('/auth/register', registerData) as AuthResponse
    
    // التحقق من وجود البيانات وحفظ التوكن
    if (response.success && response.data?.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    
    return response
  },

  // جلب بيانات المستخدم الحالي
  async getMe(): Promise<User> {
    // الـ backend يرجع { success: true, data: User }
    const response = await api.get('/auth/me') as { success: boolean; data: User }
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error('Failed to get user data')
  },

  // تسجيل الخروج
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/auth/login'
  },

  // التحقق من التوكن
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  },

  // جلب المستخدم من localStorage
  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('user')
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  }
}