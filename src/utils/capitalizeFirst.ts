const capitalizeFirst = <T extends string>(str: string): T => {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as T
}

export default capitalizeFirst
