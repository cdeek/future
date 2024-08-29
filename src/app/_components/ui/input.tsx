import React from 'react';
import { FieldValues, UseFormRegister, Validate } from 'react-hook-form';
import { Label } from './label';

const inputStyle: string = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
const errorStyle: string = "text-sm line-height-[1.25] mt-[4px] text-red-500";
const labelStyle: string = "block mb-[12px] line-height-[1]";

type Props = {
  name?: string
  label: string
  id?: string
  placeholder?: string
  register?: UseFormRegister<FieldValues & any>
  required?: boolean
  error: any
  type?: 'text' | 'number' | 'password' | 'email' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'week' | 'time' | 'datetime' | 'color' | 'range' | 'file'
  validate?: (value: string) => boolean | string
  disabled?: boolean
}

export const Input: React.FC<Props> = ({
  name,
  label,
  id,
  placeholder,
  required,
  register,
  error,
  type = 'text',
  validate,
  disabled,
}) => {
  return (
    <div className="w-full">
      <Label htmlFor="name" className={labelStyle}>
        {label}
        {required ? <span className="text-red-600">&nbsp;*</span> : ''}
      </Label>
      <input
        className={[inputStyle, error && errorStyle].filter(Boolean).join(' ')}
        id={id}
        placeholder={placeholder}
        {...{ type }}
        {...register && {...register(name, {
          required,
          validate,
          ...(type === 'email'
            ? {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please enter a valid email',
                },
              }
            : {}),
        })}}
        disabled={disabled}
      />
      {error && (
        <div className={errorStyle}>
          {!error?.message && error?.type === 'required'
            ? 'This field is required'
            : error?.message}
        </div>
      )}
    </div>
  )
}
