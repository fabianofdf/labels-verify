const fs = require('fs');
const helpers = require('./helpers.js');
const config = require('../config.json');

exports.analyse = function(langPath, baseDirPath) {
  return new Promise(function(resolve, reject) {
    helpers.getFiles(baseDirPath, function(err, files) {
      if (err) return reject(err);

      helpers.getLabels(langPath, function(err, labels) {
        if (err) return reject(err);

        if (config.ignoreLabels && config.ignoreLabels.length > 0) {
          const regex = new RegExp("^" + config.ignoreLabels.join("|^"), "i");
          labels = labels.filter((item) => !regex.test(item.label));
        }

        var i=0;
        (function next() {
          fs.readFile(files[i], 'utf-8', function(err, data) {
            if (err) return reject(err);

            labels = labels.map(function(label) {
              var re = new RegExp(label.label, "ig");
              if (re.test(data)) {
                label.uses += data.match(re).length;
              }
              return label;
            });

            i++;
            if (i < files.length) {
              next();
            } else {
              resolve(labels);
            }
          });
        })();
      });
    });
  });
};
