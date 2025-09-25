'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import { authAPI } from '@/lib/api/auth'
import { useAuthStore } from '@/store/auth.store'

export function LoginForm() {
  const router = useRouter()
  // استخدام setAuth بدلاً من setUser
  const { setAuth, setLoading: setGlobalLoading } = useAuthStore()
  
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      setGlobalLoading(true)
      setError('')

      const response = await authAPI.login(data)
      
      // التحقق من نجاح العملية
      if (response.success && response.data) {
        // حفظ بيانات المستخدم والتوكن في Store
        setAuth(response.data.user, response.data.token)
        
        // عرض رسالة نجاح
        toast.success(`مرحباً ${response.data.user.firstName} 👋`)
        
        // التوجيه للصفحة الرئيسية
        setTimeout(() => {
          router.push('/dashboard')
        }, 500)
      } else {
        throw new Error(response.message || 'فشل تسجيل الدخول')
      }
      
    } catch (err: any) {
      // عرض رسالة الخطأ
      const errorMessage = err.message || 'حدث خطأ أثناء تسجيل الدخول'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
      setGlobalLoading(false)
    }
  }

  // دالة لملء بيانات الحساب التجريبي
  const fillDemoCredentials = () => {
    setValue('email', 'student@test.com')
    setValue('password', 'Test123456')
    toast.info('تم ملء بيانات الحساب التجريبي')
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 text-white"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          مرحباً بك مجدداً
        </CardTitle>
        <CardDescription className="text-center text-base">
          أدخل بياناتك للوصول إلى منصة التعليم الذكية
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="animate-in fade-in-50">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              البريد الإلكتروني
            </Label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="pr-10 h-11 text-base transition-colors focus:border-primary"
                dir="ltr"
                disabled={isLoading}
                autoComplete="email"
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                كلمة المرور
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline transition-colors"
                tabIndex={-1}
              >
                نسيت كلمة المرور؟
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pr-10 pl-10 h-11 text-base transition-colors focus:border-primary"
                dir="ltr"
                disabled={isLoading}
                autoComplete="current-password"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              disabled={isLoading}
            />
            <Label 
              htmlFor="remember" 
              className="text-sm font-normal cursor-pointer select-none"
            >
              تذكرني لمدة 30 يوم
            </Label>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2">
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-medium transition-all hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري تسجيل الدخول...
              </>
            ) : (
              'تسجيل الدخول'
            )}
          </Button>

          {/* Divider */}
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                أو
              </span>
            </div>
          </div>

          {/* Demo Account Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 text-base font-medium"
            onClick={fillDemoCredentials}
            disabled={isLoading}
          >
            استخدم الحساب التجريبي
          </Button>

          {/* Register Link */}
          <p className="text-sm text-center text-muted-foreground pt-2">
            ليس لديك حساب؟{' '}
            <Link
              href="/register"
              className="text-primary hover:underline font-semibold transition-colors"
            >
              سجل الآن مجاناً
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}