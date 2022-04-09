import { ModalForm } from 'components/form/form-components'
import { VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateSubjectMutation } from 'services/subjectsService'
import { Subject } from 'types'
import { useSubjectSchemaResolver } from '../schemes/subject-form-schema'

export type SubjectFormFields = Omit<Subject, 'id'>

export const AddSubjectForm: VFC = () => {
  const [createSubject] = useCreateSubjectMutation()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SubjectFormFields>({ resolver: useSubjectSchemaResolver() })

  const onSubmit: SubmitHandler<SubjectFormFields> = (data) => {
    console.log('submit', data)
    createSubject(data)
    reset()
  }

  const fields: Array<keyof SubjectFormFields> = ['name']

  return (
    <ModalForm
      openBtnTitle="Добавить предмет"
      headerTitle="Введите данные предмета"
      reset={reset}
      onValid={onSubmit}
      handleSubmit={handleSubmit}
      fields={fields}
      register={register}
      errors={errors}
    />
  )
}
