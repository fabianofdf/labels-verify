const fs = require('fs');

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

const extractLabelPath = (obj, labelPath = '') => {
  const labels = []
  labelPath += labelPath ? '.' : ''

  Object.entries(obj).forEach(([prop, value]) => {
    const newLabelPath = `${labelPath}${prop}`

    if (typeof value === 'object') {
      labels.push(...extractLabelPath(value, newLabelPath))
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

const getLabels = pathJsonFile => {
  const jsonFile = fs.readFileSync(pathJsonFile, 'utf-8')

  return extractLabelPath(JSON.parse(jsonFile))
}

exports.getDeepFiles = getDeepFiles;
exports.getLabels = getLabels;
