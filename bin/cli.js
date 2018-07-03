#! /usr/bin/env node
const { analyse } = require("../lib/main.js")
const { ignoreLabels } = require('../config.json')
const colors = require('colors')
const commandLineArgs = require('command-line-args')

const options = commandLineArgs([
  { name: 'lang-path', defaultValue: '', type: String },
  { name: 'base-dir-path', defaultValue: '', type: String },
  { name: 'max-labels', defaultValue: 0, type: Number },
  { name: 'hide-found-labels', defaultValue: false, type: Boolean }
])
const LANG_PATH = options['lang-path']
const BASE_DIR_PATH = options['base-dir-path']
const MAX_NUMBER_LABELS_ALLOWED = options['max-labels']
const HIDE_FOUND_LABELS = options['hide-found-labels']

console.log('');
console.log(' LABELS-VERIFY '.bgBlue, ' START '.bgYellow)

const labels = analyse(LANG_PATH, BASE_DIR_PATH, ignoreLabels)
const unusedLabels = labels.filter(({ uses }) => uses === 0)
const foundNumber = unusedLabels.length
const exceededMaxAllowed = foundNumber > MAX_NUMBER_LABELS_ALLOWED

if (!HIDE_FOUND_LABELS) {
  console.log('');
  console.log('Unused labels:'.yellow, '\n');

  unusedLabels.map(({ label, text }) => {
    console.log(colors.red(label), `- ${text}`);
  })
}

console.log(`
${colors.yellow('Max number of unused labels allowed')}: ${MAX_NUMBER_LABELS_ALLOWED}
${colors.yellow('Number of unused labels found')}: ${exceededMaxAllowed ? colors.red(foundNumber) : foundNumber}
`);

if (exceededMaxAllowed) {
  console.log('Maybe you need to put them on ignore label list.'.gray, '\n');
  process.exitCode = 1
}

console.log(' LABELS-VERIFY '.bgBlue, (exceededMaxAllowed ? ' FAIL '.bgRed : ' PASSED '.bgGreen), '\n')

process.exit()
