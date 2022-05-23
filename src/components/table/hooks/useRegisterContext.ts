import { useContext } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { RegisterContext } from '../table-form-wrapper'

export const useRegisterContext = <T = any>() => useContext<UseFormRegister<T>>(RegisterContext)
