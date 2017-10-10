const fs = require('fs');
const helpers = require('./helpers.js');
const config = require('../config.json');

const regex = new RegExp("^" + config.ignoreLabels.join("|^"), "i");

exports.analyse = function() {
  return new Promise(function(resolve, reject) {
    helpers.getFiles(config.path.files, function(err, files) {
      if (err) reject(err);

      helpers.getLabels(config.path.lang, function(err, labels) {
        if (err) reject(err);

        labels = labels.filter((item) => !regex.test(item.label));

        var i=0;
        (function next() {
          fs.readFile(files[i], 'utf-8', function(err, data) {
            if (err) reject(err);

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
