import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { Schema } from 'src/utils/yupSchema'
import { schemaWithMessages } from 'src/utils/yupResolverWithI18n'
import Input from 'src/components/input'
import { registerAccount } from 'src/types/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utilss.type'

type FormData = Pick<Schema, 'email' | 'password' | 'confirmPassword'>

export default function Register() {
  const { t, i18n } = useTranslation()
  const schemaWithT = useMemo(() => schemaWithMessages(t), [t])
  const registerSchema = useMemo(() => schemaWithT.pick(['email', 'password', 'confirmPassword']), [schemaWithT])
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    trigger,
    setError
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirmPassword'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirmPassword'])
    registerAccountMutation.mutate(body, {
      onSuccess: (response) => {
        console.log('Registration successful:', response)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirmPassword'>>>(error)) {
          console.log(isAxiosUnprocessableEntityError(error))
          const formErrors = error.response?.data.data
          if (formErrors) {
            Object.keys(formErrors).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirmPassword'>, {
                type: 'Server',
                message: formErrors[key as keyof Omit<FormData, 'confirmPassword'>]
              })
            })
          }
          // if (formErrors?.email) {
          //   setError('email', {
          //     type: 'manual',
          //     message: t('form.emailAlreadyExists')
          //   })
          // }
          // if (formErrors?.password) {
          //   setError('password', {
          //     type: 'manual',
          //     message: formErrors.password
          //   })
          // }
        }
        console.error('Registration failed:', error)
      }
    })
    console.log(data)
  })

  useEffect(() => {
    if (isSubmitted) {
      trigger()
    }
  }, [i18n.language, trigger, isSubmitted])

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10 py-3'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>{t('register.title')}</div>
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
              <Input
                className='mt-2'
                type='password'
                placeholder='Confirm Password'
                autoComplete='on'
                name='confirmPassword'
                register={register}
                errorMessage={errors.confirmPassword?.message}
              />
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  {t('register.title')}
                </button>
              </div>
              <div className='flex items-center justify-center gap-2 mt-8'>
                <span className='text-gray-400'>{t('register.loginLink')}</span>
                <Link className='text-red-400' to='/login'>
                  {t('login.title')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
