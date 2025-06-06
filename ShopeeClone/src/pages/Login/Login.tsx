import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Input from 'src/components/input'
import { loginAccount } from 'src/types/auth.api'
import { ResponseApi } from 'src/types/utilss.type'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { schemaWithMessages } from 'src/utils/yupResolverWithI18n'
import { Schema } from 'src/utils/yupSchema'
type FormData = Pick<Schema, 'email' | 'password'>

export default function Login() {
  const { t, i18n } = useTranslation()
  const schemaWithT = useMemo(() => schemaWithMessages(t), [t])
  const loginSchema = useMemo(() => schemaWithT.pick(['email', 'password']), [schemaWithT])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    trigger,
    setError
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirmPassword'>) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: (response) => {
        console.log('Registration successful:', response)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
          const formErrors = error.response?.data.data
          if (formErrors) {
            Object.keys(formErrors).forEach((key) => {
              setError(key as keyof FormData, {
                type: 'Server',
                message: formErrors[key as keyof FormData]
              })
            })
          }
        }
      }
    })
  })

  useEffect(() => {
    if (isSubmitted) {
      trigger()
    }
  }, [i18n.language, trigger, isSubmitted])

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Password'
                autoComplete='on'
                name='password'
                register={register}
                errorMessage={errors.password?.message}
              />
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='flex items-center justify-center gap-2 mt-8'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-red-400' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
