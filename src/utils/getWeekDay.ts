import { WeekDaysRU } from 'types'
import capitalizeFirst from './capitalizeFirst'

const getWeekDay = () =>
  capitalizeFirst<WeekDaysRU>(new Date().toLocaleString('ru', { weekday: 'long' }))
export default getWeekDay
