const fs = require('fs')
const helpers = require('./helpers.js')

exports.analyse = (langPath, baseDirPath, ignoreLabels) => {
  const files = helpers.getDeepFiles(baseDirPath)
  let labels = helpers.getLabels(langPath, ignoreLabels)

  files.forEach(file => {
    const contentFile = fs.readFileSync(file, 'utf-8')

    labels = labels.map(function(label) {
      var re = new RegExp(label.label, "ig")
      if (re.test(contentFile)) {
        label.uses += contentFile.match(re).length
      }
      return label
    })
  })

  return labels
}
