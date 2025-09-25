'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail, Lock, Eye, EyeOff, User, GraduationCap } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { registerSchema, type RegisterFormData } from '@/lib/validations/auth'
import { authAPI } from '@/lib/api/auth'
import { useAuthStore } from '@/store/auth.store'

export default function RegisterPage() {
  const router = useRouter()
  // استخدام الـ store بشكل صحيح
  const { setAuth, setLoading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      grade: 6, // الصف السادس كقيمة افتراضية
    }
  })

  const onSubmit = async (data: RegisterFormData) => {
  try {
    setError(null)
    setLoading(true)
    
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...registerData } = data
    
    // Call API
    const response = await authAPI.register(registerData)
    
    // Success - الـ response هو AuthResponse type
    if (response.success && response.data) {
      setAuth(response.data.user, response.data.token)
      toast.success('تم إنشاء الحساب بنجاح! 🎉')
      
      // Redirect to dashboard
      router.push('/dashboard')
    } else {
      throw new Error('فشل إنشاء الحساب')
    }
  } catch (err: any) {
    console.error('Register error:', err)
    
    // Handle specific error messages
    if (err.message?.includes('already exists')) {
      setError('البريد الإلكتروني مستخدم بالفعل')
    } else {
      setError(err.message || 'حدث خطأ في إنشاء الحساب')
    }
    
    toast.error(err.message || 'فشل إنشاء الحساب')
  } finally {
    setLoading(false)
  }
}

  // قائمة الصفوف الدراسية
  const grades = [
    { value: 1, label: 'الصف الأول الابتدائي' },
    { value: 2, label: 'الصف الثاني الابتدائي' },
    { value: 3, label: 'الصف الثالث الابتدائي' },
    { value: 4, label: 'الصف الرابع الابتدائي' },
    { value: 5, label: 'الصف الخامس الابتدائي' },
    { value: 6, label: 'الصف السادس الابتدائي' },
    { value: 7, label: 'الصف الأول الإعدادي' },
    { value: 8, label: 'الصف الثاني الإعدادي' },
    { value: 9, label: 'الصف الثالث الإعدادي' },
    { value: 10, label: 'الصف الأول الثانوي' },
    { value: 11, label: 'الصف الثاني الثانوي' },
    { value: 12, label: 'الصف الثالث الثانوي' },
  ]

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          إنشاء حساب جديد
        </CardTitle>
        <CardDescription className="text-center">
          انضم إلى منصة التعليم الذكية وابدأ رحلتك التعليمية
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
          
          {/* Name Fields - في نفس السطر */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">الاسم الأول</Label>
              <div className="relative">
                <Input
                  id="firstName"
                  type="text"
                  placeholder="محمد"
                  className="pr-10"
                  disabled={isSubmitting}
                  {...register('firstName')}
                />
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            
            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">اسم العائلة</Label>
              <div className="relative">
                <Input
                  id="lastName"
                  type="text"
                  placeholder="أحمد"
                  className="pr-10"
                  disabled={isSubmitting}
                  {...register('lastName')}
                />
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="pr-10"
                disabled={isSubmitting}
                {...register('email')}
              />
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          
          {/* Grade Selection */}
          <div className="space-y-2">
            <Label htmlFor="grade">الصف الدراسي</Label>
            <Select
              onValueChange={(value) => setValue('grade', parseInt(value))}
              defaultValue="6"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر الصف الدراسي" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade.value} value={grade.value.toString()}>
                    {grade.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              <GraduationCap className="inline h-3 w-3 ml-1" />
              اختر صفك الدراسي للحصول على محتوى مناسب
            </p>
          </div>
          
          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pr-10"
                disabled={isSubmitting}
                {...register('password')}
              />
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
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
            <p className="text-xs text-gray-500">
              يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، ورقم
            </p>
          </div>
          
          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pr-10"
                disabled={isSubmitting}
                {...register('confirmPassword')}
              />
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          {/* Terms & Conditions */}
          <div className="text-xs text-gray-600">
            بالتسجيل، أنت توافق على{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">
              الشروط والأحكام
            </Link>{' '}
            و{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              سياسة الخصوصية
            </Link>
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري إنشاء الحساب...
              </>
            ) : (
              'إنشاء حساب'
            )}
          </Button>
        </form>
        
        <div className="mt-6">
          <Separator />
          <p className="text-center text-sm text-gray-600 mt-4">
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              سجل دخولك الآن
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}