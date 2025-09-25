// User & Auth Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'STUDENT' | 'TEACHER' | 'ADMIN'
  grade?: number
}

// Auth Response مع structure الصحيح
export interface AuthResponse {
  success: boolean
  data: {
    user: User
    token: string
  }
  message?: string
}

// API Response Type العام
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: {
    code: string
    message: string
  }
}