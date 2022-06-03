import { CountOfLessonMistakeCard } from 'components/count-of-lessons-mistake-card'
import { Grid } from 'components/grid'
import { MissingCampusOrAuditoriumMistakeCard } from 'components/missing-campus-or-auditorium-mistake-card'
import { MistakesPlaceholder } from 'components/mistakes-placeholder'
import { SameAuditoriumMistakeCard } from 'components/same-auditorium-mistake-card'
import { ReactNode, VFC } from 'react'
import { Mistakes } from 'types/timetable-mistakes.types'

export interface MistakesGridProps {
  mistakeType: keyof Mistakes
  mistakes: Mistakes
}

const MistakeComponentsMap: Record<
  keyof Mistakes,
  | typeof SameAuditoriumMistakeCard
  | typeof MissingCampusOrAuditoriumMistakeCard
  | typeof CountOfLessonMistakeCard
> = {
  sameAuditorium: SameAuditoriumMistakeCard,
  missingCampusOrAuditorium: MissingCampusOrAuditoriumMistakeCard,
  mistakesWithCountOfLessons: CountOfLessonMistakeCard,
}

export const MistakesGrid: VFC<MistakesGridProps> = ({ mistakes, mistakeType }) => {
  const Component = MistakeComponentsMap[mistakeType]

  return mistakes[mistakeType].length === 0 ? (
    <MistakesPlaceholder />
  ) : (
    <Grid {...(mistakeType === 'sameAuditorium' && { columns: [1, 1, 1, 1, 2] })}>
      {mistakes[mistakeType].map((mistake, i) => (
        <Component key={i} mistake={mistake as any} />
      ))}
    </Grid>
  )
}
