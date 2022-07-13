1. 使用了[zx 脚本](<(https://github.com/google/zx)>)串流程，先安装 zx 脚本引擎

```
npm i -g zx
```

2. 安装此修改版 weread-spy

```
git clone 此项目
pnpm i
pnpm link --global
```

3. 用法：下载书架前几本

下载微信读书的书架前 num_books 本，可指定章节切换的时间间隔 interval_ms

```
cd zx/
./weread.mjs <num_books> [interval_ms]
```
