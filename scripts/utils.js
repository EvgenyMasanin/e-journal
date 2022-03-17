const { writeFile } = require('fs')

const jsUpFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const toCamelCase = (string) => {
  return string
    .split('-')
    .map((word) => jsUpFirst(word))
    .join('')
}

const createFile = (directory, fileName, content) => {
  writeFile(`${directory}/${fileName}`, content, function (error) {
    if (error) {
      throw error
    }

    console.log(`${directory}/${fileName} file created.`)
  })
}

const generateDirectory = (componentName) => `src/components/${componentName}`

const generateIndexContent = (componentName) =>
  `export * from './${componentName}'
`

const generateComponentContent = (componentName) =>
  `import React, { VFC } from 'react'

export interface ${componentName}Props {}

export const ${componentName}: VFC<${componentName}Props> = ({}) => {
  return <div>${componentName}</div>
}

`

module.exports = {
  toCamelCase,
  createFile,
  generateDirectory,
  generateIndexContent,
  generateComponentContent,
}
