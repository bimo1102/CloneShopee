import { RegisterOptions } from 'react-hook-form'
import { FormData } from 'src/domain/models/IRegister'

type Rules = { [key in keyof FormData]?: RegisterOptions }

export const rules: Rules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Invalid email address'
    },
    maxLength: {
      value: 160,
      message: 'Email must be less than 160 characters'
    },
    minLength: {
      value: 5,
      message: 'Email must be at least 6 characters long'
    }
  },
  password: {
    required: 'Password is required',
    maxLength: {
      value: 160,
      message: 'Email must be less than 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Email must be at least 6 characters long'
    }
  },
  confirmPassword: {
    required: 'Confirm password is required',
    maxLength: {
      value: 160,
      message: 'Confirm password must be less than 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Confirm password must be at least 6 characters long'
    }
  }
}
