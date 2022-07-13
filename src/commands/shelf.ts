import { Command, Option } from 'clipanion'
import { baseDebug } from '../common'
import { getBrowser } from '../utils/pptr'
import fse from 'fs-extra'

const debug = baseDebug.extend('shelf')

export default class extends Command {
  static usage = Command.Usage({
    description: '输出书架前几本书的urls到文件',
  })

  static paths = [['shelf']]

  count = Option.String('-c,--count', {
    description: '前几本',
  })
  output = Option.String('-o,--out', {
    description: '输出到文件',
  })

  async execute() {
    if (!this.output) {
      return console.error('必须：-o指定输出文件')
    }
    if (!this.count) {
      this.count = '1'
    }

    const { browser, page } = await getBrowser()
    await page.goto('https://weread.qq.com/web/shelf')
    const booklist = await page.$$('.shelfBook')

    let urls: string[] = []
    for (const book of booklist) {
      const href = await page.evaluate((el) => el.getAttribute('href'), book)
      if (href?.startsWith('/web/reader/')) {
        urls.push('https://weread.qq.com' + href)
      }
    }

    const count = Math.min(parseInt(this.count), urls.length)
    urls = urls.slice(0, count)
    debug(count + ' books: ' + urls)

    await fse.outputJson(this.output, urls, {
      spaces: 2,
    })
    await browser.close()
  }
}
