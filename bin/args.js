const { Logger } = require("./logger.js")
const commandLineArgs = require('command-line-args')
const fs = require('fs')

const processArgs = process.argv.slice(2)
const settingPathArgIndex = processArgs.findIndex(arg => arg === '--settings-path')
const settingPathArg = (settingPathArgIndex >= 0) && processArgs[settingPathArgIndex + 1]
const CONFIG_FILE_PATH_DEFAULT = '.labelsverifyrc'
const CONFIG_FILE_PATH = settingPathArg || CONFIG_FILE_PATH_DEFAULT
const ENCODING = 'utf-8'
let settingsByFile = {}

if (fs.existsSync(CONFIG_FILE_PATH)) {
  settingsByFile = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, ENCODING))
} else if (CONFIG_FILE_PATH !== CONFIG_FILE_PATH_DEFAULT) {
  Logger.error(`File not found: --settings-path=${CONFIG_FILE_PATH}`)
  process.exit(1)
}

const options = [
  { name: 'labels-path',       type: String,  defaultValue: (settingsByFile.labelsPath || ''),          description: '- JSON file path with labels that you want to verify.' },
  { name: 'base-dir-path',     type: String,  defaultValue: (settingsByFile.baseDirPath || ''),         description: '- Root directory that you want to verify. It\'s a deep verify.' },
  { name: 'max-labels',        type: Number,  defaultValue: (settingsByFile.maxLabels || -1),           description: '- Max labels that you allowed.' },
  { name: 'hide-found-labels', type: Boolean, defaultValue: (settingsByFile.hideFoundLabels || false),  description: '- Hide labels found. Default: false' },
  { name: 'ignore-labels',     type: String,  defaultValue: (settingsByFile.ignoreLabels || []),        description: '- List of ignore labels.', multiple: true },
  { name: 'settings-path',     type: String,  defaultValue: CONFIG_FILE_PATH_DEFAULT,                   description: '- Path of settings file. Default: .labelsverifyrc on root path.' },
  { name: 'help',              type: Boolean, alias: 'h',                                               description: '- Show the lib options.' }
]
const args = commandLineArgs(options, { partial: true })

if (args._unknown) {
  Logger.error(`Invalid arguments: ${args._unknown.join(', ')}`)
  Logger.help(options)
  process.exit(1)
}

if (args.help) {
  Logger.help(options)
  process.exit()
}

if (!args['labels-path'] || !args['base-dir-path']) {
  Logger.error('These params are required: --labels-path, --base-dir-path')
  process.exit(1)
}

exports.args = args
