#!/usr/bin/env zx

const logDir = './log/'
$`mkdir -p ${logDir}`
const booklistPath = path.join(logDir, 'booklist')

let count = 1
if (process.argv.length > 3) {
    count = process.argv[3]
}
await $`weread-spy.shelf shelf -o ${booklistPath} -c ${count}`
const urls = await fs.readJson(booklistPath)

const epubDir = './epub/'
$`mkdir -p ${epubDir}`

let interval = 500
if (process.argv.length > 4) {
    interval = process.argv[4]
}

let allDone = true;
for (const [name, url] of urls) {
    try {
        const logPath = path.join(logDir, name)
        const logPathTmp = logPath + '.tmp'
        await $`weread-spy dl -u ${url} --interval ${interval} 2>&1 | tee ${logPathTmp}`
        await $`weread-spy gen ${url} -d ${epubDir} 2>&1 | tee -a ${logPathTmp}`
        await $`mv ${logPathTmp} ${logPath}`
    } catch (error) {
        allDone = false;
        console.error(error);
    }
}
if (allDone) {
    const booksDir = await $`weread-spy info | grep BOOKS_DIR | cut -c 18-`
    await $`rm -fr ${booksDir}`
}
