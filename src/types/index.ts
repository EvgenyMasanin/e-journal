function getEnumKeyByEnumValue<T extends Record<string, string | number>>(
  myEnum: T,
  enumValue: string
): string {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue)
  return keys.length > 0 ? keys[0] : ''
}

export default getEnumKeyByEnumValue

export * from './timetable.types'
export * from './group.types'
export * from './subject.types'
export * from './teacher'
export * from './user.types'
