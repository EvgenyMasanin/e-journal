import { useRef } from 'react'
export const useDate = () => {
  const date = useRef(
    new Date().toLocaleString('ru', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  )

  return date.current
}
