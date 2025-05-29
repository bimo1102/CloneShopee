import { RegisterOptions } from 'react-hook-form'
import { FormData } from 'src/domain/models/IRegister'
import { TFunction } from 'i18next'

type Rules = { [key in keyof FormData]?: RegisterOptions }
const notOnlySpaces = (message: string) => (value: string) => value.trim().length > 0 || message
export const createRules = (t: TFunction): Rules => ({
  email: {
    required: t('form.emailRequired'),
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: t('form.emailInvalid')
    },
    maxLength: {
      value: 160,
      message: t('form.emailMax')
    },
    minLength: {
      value: 5,
      message: t('form.emailMin')
    },
    validate: {
      notOnlySpaces: notOnlySpaces(t('form.emailWhitespace'))
    }
  },
  password: {
    required: t('form.passwordRequired'),
    maxLength: {
      value: 160,
      message: t('form.passwordMax')
    },
    minLength: {
      value: 6,
      message: t('form.passwordMin')
    },
    validate: {
      notOnlySpaces: notOnlySpaces(t('form.passwordWhitespace'))
    }
  },
  confirmPassword: {
    required: t('form.confirmPasswordRequired'),
    maxLength: {
      value: 160,
      message: t('form.confirmPasswordMax')
    },
    minLength: {
      value: 6,
      message: t('form.confirmPasswordMin')
    },
    validate: {
      notOnlySpaces: notOnlySpaces(t('form.confirmPasswordWhitespace')),
      matchPassword: (value, formValues) => value === formValues.password || t('form.confirmPasswordNotMatch')
    }
  }
})
