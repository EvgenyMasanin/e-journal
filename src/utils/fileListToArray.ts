export const fileListToArray = (list: FileList): File[] => {
  if (!list) return []
  const array = []
  for (let i = 0; i < list.length; i++) {
    array.push(list.item(i))
  }
  return array
}