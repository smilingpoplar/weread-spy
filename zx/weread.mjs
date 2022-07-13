#!/usr/bin/env zx

const logDir = './log/'
$`mkdir -p ${logDir}`
const booklist = path.join(logDir, 'booklist')

let count = 1
if (process.argv.length > 3) {
    count = process.argv[3]
}
await $`weread-spy shelf -o ${booklist} -c ${count}`
const urls = await fs.readJson(booklist)

const outputDir = './epub/'
$`mkdir -p ${outputDir}`

async function fieldWithUrl(url, field) {
    const mappingFile = path.join(os.homedir(), '/Library/Application Support/weread-spy/books/map-v2.json')
    const jqArgs = `.[] | select(.url == "${url}") | .` + field
    return (await $`jq ${jqArgs} ${mappingFile}`).toString().replace(/["\n]/g, '')
}

let interval = 500
if (process.argv.length > 4) {
    interval = process.argv[4]
}
for (const url of urls) {
    const logName = path.join(logDir, path.basename(url))
    await $`weread-spy dl -u ${url} --interval ${interval} 2>&1 | tee ${logName}`

    const bookId = await fieldWithUrl(url, 'id')
    $`weread-spy gen -u ${url} -i ${bookId} -d ${outputDir} 2>&1 | tee -a ${logName}`

    const bookTitle = await fieldWithUrl(url, 'title')
    $`mv ${logName} ${path.join(logDir, bookTitle)}`
}
