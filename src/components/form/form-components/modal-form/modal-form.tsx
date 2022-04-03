import { BaseSyntheticEvent, ReactNode } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  chakra,
  Box,
} from '@chakra-ui/react'
import { FormControls } from '../form-controls'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
// eslint-disable-next-line import/no-unresolved
import { Path } from 'react-hook-form/dist/types/path'
import { IoMdAddCircle } from 'react-icons/io'

export interface ModalFormProps<T> {
  openBtnTitle: string
  headerTitle: string

  register?: UseFormRegister<T>
  errors?: FieldErrors<T>
  fields?: Path<T>[]

  handleSubmit: (e?: BaseSyntheticEvent) => Promise<void>

  children?: ReactNode
}

export const ModalForm = <T,>({
  headerTitle,
  openBtnTitle,
  handleSubmit,
  register,
  errors,
  fields,
  children,
}: ModalFormProps<T>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!children) {
    if (!register)
      throw new Error(
        "If 'children' are not provided, it is necessary to provide the 'register' prop."
      )
    if (!errors)
      throw new Error(
        "If 'children' are not provided, it is necessary to provide the 'errors' prop."
      )
    if (!fields)
      throw new Error(
        "If 'children' are not provided, it is necessary to provide the 'fields' prop."
      )
  }

  return (
    <>
      <Box mb={5}>
        <Button colorScheme="teal" onClick={onOpen} leftIcon={<IoMdAddCircle />}>
          {openBtnTitle}
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <chakra.form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{headerTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {fields ? (
                <FormControls register={register} errors={errors} fields={fields} />
              ) : (
                children
              )}
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Сохранить
              </Button>
              <Button onClick={onClose}>Отмена</Button>
            </ModalFooter>
          </ModalContent>
        </chakra.form>
      </Modal>
    </>
  )
}
