const fs = require('fs');

const getFiles = dir => {
  const results = []
  const files = fs.readdirSync(dir)

  files.forEach(item => {
    const itemFullPath = `${dir}/${item}`
    const isDirectory = fs.statSync(itemFullPath).isDirectory()
    const isExpectedType = (/\.(js|html)$/i).test(itemFullPath)

    isDirectory && results.push(...getFiles(itemFullPath))
    isExpectedType && results.push(itemFullPath)
  })

  return results
}

var createLabels = function(mainObj) {
  var labels = [];

  (function next(lastProp, obj) {
    lastProp = lastProp ? lastProp + '.' : '';
    for(prop in obj) {
      if (typeof obj[prop] === "object") {
        next(`${lastProp}${prop}`, obj[prop]);
      } else {
        labels.push({
          label:`${lastProp}${prop}`,
          text: obj[prop],
          uses:0
        });
      }
    }
  })('', mainObj);

  return labels;
};

var getLabels = pathJsonFile => {
  const jsonFile = fs.readFileSync(pathJsonFile, 'utf-8')

  return createLabels(JSON.parse(jsonFile))
}

exports.getFiles = getFiles;
exports.getLabels = getLabels;
