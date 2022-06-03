import { VFC } from 'react'
import { TimetableCards } from '../timetable-cards/timetable-cards'
import { Grid } from 'components/grid'

export const TimetableCardsGrid: VFC = () => {
  return (
    <Grid>
      <TimetableCards />
    </Grid>
  )
}
