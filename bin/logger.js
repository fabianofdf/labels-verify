const colors = require('colors')

exports.Logger = class Logger {
  static start() {
    console.log('\n LABELS-VERIFY '.bgBlue, ' START '.bgYellow)
  }

  static unusedLabels(labels) {
    console.log('\nUnused labels:'.yellow, '\n');

    labels.map(({ label, text }) => {
      console.log(colors.red(label), `- ${text}`);
    })
  }

  static result(max, found, fail) {
    console.log(`\n${colors.yellow('Max number of unused labels allowed')}: ${max}`)
    console.log(`${colors.yellow('Number of unused labels found')}: ${fail ? colors.red(found) : found}`);

    if (fail) {
      console.log('\nMaybe you need to put them on ignore label list.'.gray);
    }
  }

  static end(fail){
    console.log('\n LABELS-VERIFY '.bgBlue, (fail ? ' FAIL '.bgRed : ' PASSED '.bgGreen), '\n')
  }
}
