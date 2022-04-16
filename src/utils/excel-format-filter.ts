export const excelFormatFilter = (file: File) => {
  const { name } = file
  return name.endsWith('.xls') || name.endsWith('.xlsx') || name.endsWith('.xlsm')
}
