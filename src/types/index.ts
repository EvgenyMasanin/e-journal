function getEnumKeyByEnumValue<T extends Record<string, string | number>>(
  myEnum: T,
  enumValue: string
): string {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue)
  return keys.length > 0 ? keys[0] : ''
}

export default getEnumKeyByEnumValue
