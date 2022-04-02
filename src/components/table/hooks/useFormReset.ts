import { FormResetContext } from './../table-form-wrapper/table-form-wrapper'
import { useContext } from 'react'

export const useFormReset = () => useContext(FormResetContext)
