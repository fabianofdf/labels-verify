const fs = require('fs');

var getFiles = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) {
      done(err);
    } else {
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) {
          done(null, results);
        } else {
          file = dir + '/' + file;
          fs.stat(file, function(err, stat) {
            if (stat && stat.isDirectory()) {
              getFiles(file, function(err, res) {
                results = results.concat(res);
                next();
              });
            } else {
              if ((/\.(js|html)$/i).test(file)) {
                results.push(file);
              }
              next();
            }
          });
        }
      })();
    }
  });
};

var createLabels = function(mainObj) {
  var labels = [];

  (function next(lastProp, obj) {
    lastProp = lastProp ? lastProp + '.' : '';
    for(prop in obj) {
      if (typeof obj[prop] === "object") {
        next(`${lastProp}${prop}`, obj[prop]);
      } else {
        labels.push({text:`${lastProp}${prop}`, uses:0});
      }
    }
  })('', mainObj);

  return labels;
};

var getLabels = function(path, done) {
  fs.readFile(path, 'utf-8', function(err, data) {
    if (err) {
      done(err);
    } else {
      done(null, createLabels(JSON.parse(data)));
    }
  });
};

exports.getFiles = getFiles;
exports.getLabels = getLabels;
