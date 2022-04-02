/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode } from 'react'
import {
  DeepMap,
  DeepPartial,
  FieldError,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormRegister,
  UseFormReset,
  UseFormReturn,
} from 'react-hook-form'
import { chakra } from '@chakra-ui/react'

export interface TableFormWrapperProps<T> {
  useFormReturn?: UseFormReturn<T>
  onValid?: SubmitHandler<T>
  onInValid?: SubmitErrorHandler<T>
  editable: boolean
  children: ReactNode
}

export const RegisterContext = createContext<UseFormRegister<any>>(null)
export const ValidationErrorsContext = createContext<DeepMap<DeepPartial<any>, FieldError>>(null)
export const FormResetContext = createContext<UseFormReset<any>>(null)

export const FormWrapper = <T,>({
  useFormReturn,
  onValid = () => {},
  onInValid = () => {},
  editable,
  children,
}: TableFormWrapperProps<T>) => {
  if (!editable) return <RegisterContext.Provider value={null}>{children}</RegisterContext.Provider>

  if (!useFormReturn) throw new Error("'form' prop is require is editable mode!")

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useFormReturn

  return (
    <chakra.form onSubmit={handleSubmit(onValid, onInValid)}>
      <RegisterContext.Provider value={register}>
        <ValidationErrorsContext.Provider value={{ errors }}>
          <FormResetContext.Provider value={reset}>{children}</FormResetContext.Provider>
        </ValidationErrorsContext.Provider>
      </RegisterContext.Provider>
    </chakra.form>
  )
}
