/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLInputTypeAttribute } from 'react'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps<T extends FieldValues> {
  type: HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: Path<T>
  register: UseFormRegister<T>
  rules: RegisterOptions<T>
  autoComplete?: string
}
export default function Input<T extends FieldValues>({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  rules,
  autoComplete = 'off'
}: InputProps<T>) {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
