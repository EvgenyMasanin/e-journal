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
  `export { default as ${toCamelCase(componentName)}, ${toCamelCase(
    componentName
  )}Props } from './${componentName}'
`

const generateComponentContent = (componentName) =>
  `import React, { VFC } from 'react'

export interface ${componentName}Props {}

const ${componentName}: VFC<${componentName}Props> = ({}) => {
  return <div>${componentName}</div>
}

export default ${componentName}
`

module.exports = {
  toCamelCase,
  createFile,
  generateDirectory,
  generateIndexContent,
  generateComponentContent,
}
