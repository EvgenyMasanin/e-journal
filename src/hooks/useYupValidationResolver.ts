import React, { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Assign, ObjectShape } from 'yup/lib/object'

export const useYupValidationResolver = (
  validationSchema: yup.ObjectSchema<Assign<ObjectShape, unknown>>
) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
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
