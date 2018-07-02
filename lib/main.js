const fs = require('fs')
const helpers = require('./helpers.js')

exports.analyse = (langPath, baseDirPath, ignoreLabels) => {
  const files = helpers.getDeepFiles(baseDirPath)
  let labels = helpers.getLabels(langPath, ignoreLabels)

  files.forEach(file => {
    const contentFile = fs.readFileSync(file, 'utf-8')

    labels = labels.map(item => {
      const re = new RegExp(item.label, "ig")
      const found = contentFile.match(re)

      found && (item.uses += found.length)
      return item
    })
  })
  return labels
}
