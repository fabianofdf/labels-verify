const fs = require('fs')
const helpers = require('./helpers.js')

exports.analyse = (langPath, baseDirPath, ignoreLabels) => {
  const files = helpers.getDeepFiles(baseDirPath)
  const labels = helpers.getLabels(langPath, ignoreLabels)

  return helpers.countLabelsOccurrenceOnFiles(labels, files)
}
