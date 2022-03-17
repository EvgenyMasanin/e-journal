const { mkdir, appendFile } = require('fs')
const {
  generateIndexContent,
  generateDirectory,
  generateComponentContent,
  createFile,
  toCamelCase,
} = require('./utils')

function createComponentFiles(directory, componentName) {
  createFile(directory, 'index.ts', generateIndexContent(componentName))
  createFile(
    directory,
    `${componentName}.tsx`,
    generateComponentContent(toCamelCase(componentName))
  )
}

function addComponent(componentName) {
  const directory = generateDirectory(componentName)
  mkdir(directory, () => {
    createComponentFiles(directory, componentName)
  })
}

if (process.argv[2]) {
  addComponent(process.argv[2])
} else {
  throw new Error('Component name is not provided')
}
