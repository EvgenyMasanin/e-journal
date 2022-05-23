import { ValidationErrorsContext } from '../table-form-wrapper/table-form-wrapper'
import { useContext } from 'react'
import { FieldErrors } from 'react-hook-form'

export const useValidationErrors = <T = any>() =>
  useContext<{ errors: FieldErrors<T> }>(ValidationErrorsContext)
