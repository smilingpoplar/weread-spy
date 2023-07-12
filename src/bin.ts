import debugFactory from 'debug'
import { Builtins, Cli } from 'clipanion'

import GenEpubCommand from './commands/gen'
import LaunchCommand from './commands/launch'
import CheckCommand from './commands/check'
import DownloadCommand from './commands/download'
import OneCommand from './commands/one'
import ShelfCommand from './commands/shelf'

// enable logs
if (!process.env.DEBUG) {
  debugFactory.enable('weread-spy:*')
}

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json')

const cli = new Cli({
  binaryLabel: '微信读书下载器',
  binaryName: 'weread-spy',
  binaryVersion: version,
})

// default commands
cli.register(Builtins.HelpCommand)
cli.register(Builtins.VersionCommand)

// commands
cli.register(DownloadCommand)
cli.register(GenEpubCommand)
cli.register(LaunchCommand)
cli.register(CheckCommand)
cli.register(OneCommand)
cli.register(ShelfCommand)

cli.runExit(process.argv.slice(2), {
  ...Cli.defaultContext,
})
