export const lessons = Array(7)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    name: `lesson${
      i + 1
    }qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty`,
    number: i + 1,
  }))

export const now = new Date().toLocaleString('ru', { day: '2-digit', month: '2-digit', year: 'numeric' })
