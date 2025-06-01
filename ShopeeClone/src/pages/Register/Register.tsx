import { useEffect, useMemo } from 'react'
import { RegisterOptions, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Input from 'src/components/input'
import { FormData } from 'src/domain/models/IRegister'
import { createRules } from 'src/utils/rules'

export default function Register() {
  const { t, i18n } = useTranslation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rules = useMemo(() => createRules(t), [t, i18n.language])
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    trigger
  } = useForm<FormData>()
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  useEffect(() => {
    if (isSubmitted) {
      trigger()
    }
  }, [i18n.language, trigger])

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
                rules={rules.email as RegisterOptions<FormData, 'email'>}
                errorMessage={errors.email?.message}
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Password'
                autoComplete='on'
                name='password'
                register={register}
                rules={rules.password as RegisterOptions<FormData, 'password'>}
                errorMessage={errors.password?.message}
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Confirm Password'
                autoComplete='on'
                name='confirmPassword'
                register={register}
                rules={rules.confirmPassword as RegisterOptions<FormData, 'confirmPassword'>}
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
