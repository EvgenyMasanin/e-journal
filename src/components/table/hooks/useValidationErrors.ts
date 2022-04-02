import { ValidationErrorsContext } from '../table-form-wrapper/table-form-wrapper'
import { useContext } from 'react'

export const useValidationErrors = () => useContext(ValidationErrorsContext)
