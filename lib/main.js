const fs = require('fs');
var helpers = require('./helpers.js');
var config = require('../config.js');

var regex = new RegExp("^" + config.ignoreLabels.join("|^"), "i");

exports.analyse = function() {
  return new Promise(function(resolve, reject) {
    helpers.getFiles(config.baseDir, function(err, files) {
      if (err) reject(err);

      helpers.getLabels(config.langFile, function(err, labels) {
        if (err) reject(err);

        labels = labels.filter((item) => !regex.test(item.text));

        var i=0;
        (function next() {
          fs.readFile(files[i], 'utf-8', function(err, data) {
            if (err) reject(err);

            labels = labels.map(function(label) {
              var re = new RegExp(label.text, "ig");
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
