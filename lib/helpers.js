const fs = require('fs');
const syncRequest = require('sync-request');
const isUrl = require('is-url');

const _extractLabelPath = (obj, labelPath = '') => {
  const labels = []
  labelPath += labelPath ? '.' : ''

  Object.entries(obj).forEach(([prop, value]) => {
    const newLabelPath = `${labelPath}${prop}`

    if (typeof value === 'object') {
      labels.push(..._extractLabelPath(value, newLabelPath))
    } else {
      labels.push({
        label: newLabelPath,
        text: value,
        uses: 0
      })
    }
  })

  return labels
}

const _removeItensByIgnoreList = (labels, ignoreLabels) => {
  if (ignoreLabels && ignoreLabels.length > 0) {
    const expressionString = '^' + ignoreLabels.join('|^').replace(/\./g, '\\.')
    const regex = new RegExp(expressionString, 'i')

    return labels.filter((item) => !regex.test(item.label))
  }

  return labels
}

const getLabels = (pathJsonFile, ignoreLabels) => {

  let jsonFile = {}

  try {
    if(isUrl(pathJsonFile)) {
      jsonFile = syncRequest('GET', pathJsonFile).getBody()
    } else {
      jsonFile = fs.readFileSync(pathJsonFile, 'utf-8')
    }
  } catch (e) {
    console.log(e)
  }

  const labels = _extractLabelPath(JSON.parse(jsonFile))
  return _removeItensByIgnoreList(labels, ignoreLabels)
}

const getDeepFiles = dir => {
  const results = []
  const files = fs.readdirSync(dir)

  files.forEach(item => {
    const itemFullPath = `${dir}/${item}`
    const isDirectory = fs.statSync(itemFullPath).isDirectory()
    const isExpectedType = (/\.(js|html)$/i).test(itemFullPath)

    isDirectory && results.push(...getDeepFiles(itemFullPath))
    isExpectedType && results.push(itemFullPath)
  })

  return results
}

const countLabelsOccurrenceOnFiles = (labels, files) => {
  files.forEach(file => {
    const contentFile = fs.readFileSync(file, 'utf-8')

    labels = labels.map(item => {
      const re = new RegExp(item.label, 'ig')
      const found = contentFile.match(re)

      found && (item.uses += found.length)
      return item
    })
  })

  return labels
}

exports.getDeepFiles = getDeepFiles;
exports.getLabels = getLabels;
exports.countLabelsOccurrenceOnFiles = countLabelsOccurrenceOnFiles;
