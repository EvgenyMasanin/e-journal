import { useContext } from 'react'
import { TableContext } from '../table-context-provider'

const useTableContext = () => useContext(TableContext)

export default useTableContext
