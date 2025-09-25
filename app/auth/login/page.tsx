'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import { authAPI } from '@/lib/api/auth'
import { useAuthStore } from '@/store/auth.store'

export default function LoginPage() {
  const router = useRouter()
  const { setAuth, setLoading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null)
      setLoading(true)
      
      console.log('🔐 Attempting login with:', data.email)
      
      const response = await authAPI.login(data)
      
      console.log('✅ Login response:', response)
      
      if (response?.success && response?.data) {
        setAuth(response.data.user, response.data.token)
        toast.success(`مرحباً ${response.data.user.firstName} 👋`)
        
        // تأخير بسيط قبل التحويل
        setTimeout(() => {
          router.push('/dashboard')
        }, 500)
      } else {
        throw new Error(response?.message || 'فشل تسجيل الدخول')
      }
    } catch (err: any) {
      console.error('❌ Login error details:', err)
      
      // رسائل خطأ أوضح حسب نوع الخطأ
      let errorMessage = 'حدث خطأ في تسجيل الدخول'
      
      if (err.status === 401) {
        errorMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      } else if (err.status === 404) {
        errorMessage = 'لا يمكن الاتصال بالخادم'
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = 'لا يوجد اتصال بالإنترنت'
      } else if (err.message?.includes('Invalid credentials')) {
        errorMessage = 'بيانات الدخول غير صحيحة'
      } else if (err.message?.includes('User not found')) {
        errorMessage = 'المستخدم غير موجود'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // ملء بيانات تجريبية
  const fillDemoCredentials = () => {
    setValue('email', 'demo@test.com')
    setValue('password', 'Demo123!')
    toast.info('تم ملء بيانات الحساب التجريبي')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            منصة التعليم الذكية
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            تعلم بذكاء، تقدم بثقة
          </p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
            <CardDescription className="text-center">
              أدخل بياناتك للوصول إلى حسابك
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    className="pr-10"
                    dir="ltr"
                    disabled={isSubmitting}
                    autoComplete="email"
                    {...register('email')}
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pr-10"
                    dir="ltr"
                    disabled={isSubmitting}
                    autoComplete="current-password"
                    {...register('password')}
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              
              {/* Remember Me */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  تذكرني لمدة 30 يوم
                </Label>
              </div>
              
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  'تسجيل الدخول'
                )}
              </Button>
              
              {/* Demo Account Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={fillDemoCredentials}
                disabled={isSubmitting}
              >
                استخدم الحساب التجريبي
              </Button>
            </form>
            
            {/* Divider */}
            <div className="mt-6">
              <Separator />
              
              {/* Register Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                ليس لديك حساب؟{' '}
                <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
                  سجل الآن
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          بالمتابعة، أنت توافق على{' '}
          <Link href="/terms" className="underline">
            الشروط والأحكام
          </Link>{' '}
          و{' '}
          <Link href="/privacy" className="underline">
            سياسة الخصوصية
          </Link>
        </p>
      </div>
    </div>
  )
}