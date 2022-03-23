import { Main } from 'pages/main'
import { TimetableInfo } from 'pages/timetable-info'
import { VFC } from 'react'
import { Route, Routes } from 'react-router-dom'

export interface RouterProps {}

export const Router: VFC<RouterProps> = ({}) => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="timetable-info/:teacher_id" element={<TimetableInfo />} />
    </Routes>
  )
}
