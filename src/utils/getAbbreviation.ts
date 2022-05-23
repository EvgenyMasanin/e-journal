export const getAbbreviation = (str: string) => {
  const words = str.split(' ')

  if (words.length === 1) return str

  const abbreviation = words
    .map((word, i) => {
      if (isAbbreviation(word)) return word

      if (word[0].match(/и/i) && words[i].length === 1) return word[0].toLocaleLowerCase()

      return word[0].toUpperCase()
    })
    .join('')
  return abbreviation
}

const isAbbreviation = (str: string) => {
  return str.split('').every((letter) => letter.match(/[A-ZА-Я]/))
}
