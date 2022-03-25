import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Semester, WeekType } from 'types'

export interface TimetableSliceState {
  selectedWeekType: WeekType
  selectedSemester: Semester
}

const initialState: TimetableSliceState = {
  selectedWeekType: 'up',
  selectedSemester: 'first',
}

const timetableSlice = createSlice({
  name: 'timetableSlice',
  initialState,
  reducers: {
    selectWeekDay: (state, action: PayloadAction<WeekType>) => {
      state.selectedWeekType = action.payload
    },
    selectSemester: (state, action: PayloadAction<Semester>) => {
      state.selectedSemester = action.payload
    },
  },
})

export const { selectWeekDay, selectSemester } = timetableSlice.actions
export default timetableSlice.reducer
