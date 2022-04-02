import { useContext } from 'react'
import { TableActionButtonsContext } from '../table-context-provider'

export const useTableActionButtonsContext = () => useContext(TableActionButtonsContext)
