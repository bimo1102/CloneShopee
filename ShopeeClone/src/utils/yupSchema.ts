import * as yup from 'yup'

export const baseSchema = yup.object({
  email: yup
    .string()
    .required()
    .email()
    .max(160)
    .min(5)
    .test('notOnlySpaces', '', (value) => value?.trim().length > 0)
    .meta({}),

  password: yup
    .string()
    .required()
    .max(160)
    .min(6)
    .test('notOnlySpaces', '', (value) => value?.trim().length > 0)
    .meta({}),

  confirmPassword: yup
    .string()
    .required()
    .max(160)
    .min(6)
    .test('notOnlySpaces', '', (value) => value?.trim().length > 0)
    .oneOf([yup.ref('password')])
    .meta({})
})

export type Schema = yup.InferType<typeof baseSchema>
