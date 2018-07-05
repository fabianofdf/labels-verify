const colors = require('colors')
const LIB_TITLE = colors.bgBlue(' LABELS-VERIFY ')

exports.Logger = class Logger {
  static start() {
    console.log(`\n${LIB_TITLE} ${colors.bgYellow(' START ')}`)
  }

  static unusedLabels(labels) {
    console.log(`\n${colors.yellow('Unused labels:')}\n`)

    labels.map(({ label, text }) => {
      console.log(colors.red(label), `- ${text}`)
    })
  }

  static maxAllowed(max){
    console.log(`\n${colors.yellow('Max number of unused labels allowed')}: ${max}`)
  }

  static numberUnusedLabels(found) {
    console.log(`\n${colors.yellow('Number of unused labels found')}: ${found}`)
  }

  static info(){
    console.log(`\n${colors.gray('Maybe you need to put them on ignore label list.')}`)
  }

  static end(success){
    console.log(`\n${LIB_TITLE} ${success ? colors.bgGreen(' FINISH ') : colors.bgRed(' FAIL ')}\n`)
  }

  static help(commands = []){
    const PAD_SIZE = commands.reduce((maxlength, {name = '', alias = ''}) => {
      const argLength = (name.length + alias.length + 20)
      return maxlength > argLength ? maxlength : argLength
    }, 0)

    console.log(`\n${LIB_TITLE} ${colors.bgMagenta(' ARGUMENTS ')}\n`)

    commands.forEach(({name, alias, description}) => {
      console.log(`  --${colors.yellow(name)} ${(alias ? `-${colors.yellow(alias)}` : '')}`.padEnd(PAD_SIZE), `${(description ? description : '')}`)
    })

    console.log('')
  }

  static error(message){
    console.log(`\n${LIB_TITLE} ${colors.bgRed(' ERROR ')}\n`)
    console.log(`${colors.red(message)}\n`)
  }
}
