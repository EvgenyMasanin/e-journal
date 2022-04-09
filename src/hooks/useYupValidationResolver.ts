import { useCallback } from 'react'
import * as yup from 'yup'
import { Assign, ObjectShape } from 'yup/lib/object'

export const useYupValidationResolver = (
  validationSchema: yup.ObjectSchema<Assign<ObjectShape, unknown>>,
  mapper?: (data: any) => any
) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(mapper ? mapper(data) : data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema]
  )
