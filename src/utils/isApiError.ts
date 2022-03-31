import { SerializedError } from '@reduxjs/toolkit'
import { ResponseError } from './../services/api-config'
export const isApiError = (error: ResponseError | SerializedError): error is ResponseError => {
  return error && 'status' in error
}
