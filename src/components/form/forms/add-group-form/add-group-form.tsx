import { InputField, ModalForm } from 'components/form/form-components'
import { RadioField } from 'components/form/form-components/controls/radio-field/radio-field'
import { VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateGroupMutation } from 'api/group.api'
import { Group } from 'types'
import { useGroupSchemaResolver } from '../schemes/group-form-schema'

export type GroupFormFields = Pick<Group, 'name'> & { subGroupsCount: '1' | '2' }

export const AddGroupForm: VFC = ({}) => {
  const [createRole, { isLoading, isError }] = useCreateGroupMutation()

  const resolver = useGroupSchemaResolver()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm<GroupFormFields>({ resolver })

  const onSubmit: SubmitHandler<GroupFormFields> = async (group) => {
    console.log('submit', group)
    // const data = await createRole(group).unwrap()
    // console.log('🚀 ~ SubmitHandler<RoleFormFields>= ~ data',data)
    // if (data) reset()
  }

  return (
    <ModalForm
      openBtnTitle="Добавить пользователя"
      headerTitle="Введите данные пользователя"
      reset={reset}
      onValid={onSubmit}
      handleSubmit={handleSubmit}
    >
      <InputField
        label="Название группы"
        {...register('name')}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <RadioField
        label="Количество подгрупп"
        control={control}
        name="subGroupsCount"
        options={['1', '2']}
        setDefault={() => setValue('subGroupsCount', '1')}
      />
    </ModalForm>
  )
}
