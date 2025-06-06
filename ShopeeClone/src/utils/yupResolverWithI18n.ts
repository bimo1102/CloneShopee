import { TFunction } from 'i18next'
import * as yup from 'yup'

export const schemaWithMessages = (t: TFunction) =>
  yup.object({
    email: yup
      .string()
      .required(t('form.emailRequired'))
      .email(t('form.emailInvalid'))
      .min(5, t('form.emailMin'))
      .max(160, t('form.emailMax'))
      .test('notOnlySpaces', t('form.emailWhitespace'), (value) => value?.trim().length > 0),

    password: yup
      .string()
      .required(t('form.passwordRequired'))
      .min(6, t('form.passwordMin'))
      .max(160, t('form.passwordMax'))
      .test('notOnlySpaces', t('form.passwordWhitespace'), (value) => value?.trim().length > 0),

    confirmPassword: yup
      .string()
      .required(t('form.confirmPasswordRequired'))
      .min(6, t('form.confirmPasswordMin'))
      .max(160, t('form.confirmPasswordMax'))
      .test('notOnlySpaces', t('form.confirmPasswordWhitespace'), (value) => value?.trim().length > 0)
      .oneOf([yup.ref('password')], t('form.confirmPasswordNotMatch'))
  })
