//Lang file path
const langFile = '/home/fabianofdf/dev/projects/repo/hot-vulcano/languages/pt-BR.i18n.json';

//Base directory that you want to analyse
const baseDir = '/home/fabianofdf/dev/projects/repo/hot-vulcano/imports/client';

//Prefix labels that you want to ignore
const ignoreLabels = [
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

exports.langFile = langFile;
exports.baseDir = baseDir;
exports.ignoreLabels = ignoreLabels;
