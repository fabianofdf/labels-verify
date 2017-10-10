const fs = require('fs');
var helper = require('./files.js');

//const ptBrFile = '/home/fabianofdf/dev/projects/repo/hot-vulcano/languages/pt-BR.i18n.json';
const ptBrFile = '/media/fabianofdf/F8665B1B665ADA48/dev/projects/hotmart/hot-vulcano/languages/pt-BR.i18n.json';
//const baseDir = '/home/fabianofdf/dev/projects/repo/hot-vulcano/imports/client';
const baseDir = '/media/fabianofdf/F8665B1B665ADA48/dev/projects/hotmart/hot-vulcano/imports/client';
const desconsiderar = [
  "alerts.",
  "badges.",
  "category.",
  "collaborators_area.",
  "country.",
  "currencies.",
  "error.",
  "hotleads2.errors.",
  "integrations.account.",
  "language.",
  "order.checkout.orderprocessor.",
  "placeholders.",
  "providers.",
  "status.",
  "subcategory.",
  "tracking_pixel.provider."
];
var regex = new RegExp("^" + desconsiderar.join("|^"), "i");

exports.analyse = function() {
  return new Promise(function(resolve, reject) {
    helper.getFiles(baseDir, function(err, files) {
      if (err) reject(err);

      helper.getLabels(ptBrFile, function(err, labels) {
        if (err) throw err;

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
