#! /usr/bin/env node
const { labelsVerify } = require("../lib/main.js")
const { Logger } = require("./logger.js")
const fs = require('fs')
const commandLineArgs = require('command-line-args')

const CONFIG_FILE_NAME = '.labelsverify'

const args = commandLineArgs([
  { name: 'lang-path', type: String },
  { name: 'base-dir-path', type: String },
  { name: 'max-labels', type: Number },
  { name: 'hide-found-labels', type: Boolean },
  { name: 'settings-path', defaultValue: CONFIG_FILE_NAME, type: String }
])

let settings = {}

if (fs.existsSync(args['settings-path'])) {
  settings = JSON.parse(fs.readFileSync(args['settings-path'], 'utf-8'))
}

const LANG_PATH = args['lang-path'] || settings.langPath || ''
const BASE_DIR_PATH = args['base-dir-path'] || settings.baseDirPath || ''
const MAX_NUMBER_LABELS_ALLOWED = args['max-labels'] || settings.maxLabels || ''
const HIDE_FOUND_LABELS = args['hide-found-labels'] || settings.hideFoundLabels || false
const IGNORE_LABELS = settings.ignoreLabels || []

Logger.start()

const labels = labelsVerify(LANG_PATH, BASE_DIR_PATH, IGNORE_LABELS)
const unusedLabels = labels.filter(({ uses }) => uses === 0)
const foundNumber = unusedLabels.length
const exceededMaxAllowed = foundNumber > MAX_NUMBER_LABELS_ALLOWED

if (!HIDE_FOUND_LABELS) {
  Logger.unusedLabels(unusedLabels)
}

Logger.result(MAX_NUMBER_LABELS_ALLOWED, foundNumber, exceededMaxAllowed)
Logger.end(exceededMaxAllowed)

if (exceededMaxAllowed) {
  process.exit(1)
}

process.exit()
