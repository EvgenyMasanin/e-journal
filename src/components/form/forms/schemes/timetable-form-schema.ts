import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import { number, object, string } from 'yup'
import { ErrorMessages } from './error-messages'

const timetableSchema = object().shape({
  teacherToSubjectId: number().required(ErrorMessages.required),
  groupId: number().required(ErrorMessages.required),
  subGroupsCount: string().required(ErrorMessages.required),
  subGroupNum: string().required(ErrorMessages.required),
  weekDay: string().required(ErrorMessages.required),
  subjectType: string().required(ErrorMessages.required),
  hoursPerSemester: number().required(ErrorMessages.required),
  hoursPerWeek: number().required(ErrorMessages.required),
  semester: string().required(ErrorMessages.required),
  course: string().required(ErrorMessages.required),
  lessonNumber: string().required(ErrorMessages.required),
  weekType: string().required(ErrorMessages.required),
  auditorium: number().required(ErrorMessages.required),
  campus: number().required(ErrorMessages.required),
})

export const useTimetableSchemaResolver = (mapper: any) =>
  useYupValidationResolver(timetableSchema, mapper)
