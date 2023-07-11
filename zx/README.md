# 安装

1. 使用了[zx 脚本](https://github.com/google/zx)串流程，先安装 zx 脚本引擎

```
npm i -g zx
```

2. 安装 [weread-spy](https://github.com/magicdawn/weread-spy)

```
pnpm add -g weread-spy
```

3. 安装此修改版 weread-spy.shelf

```
git clone https://github.com/smilingpoplar/weread-spy.git
pnpm add .
pnpm link --global
```

# 使用

下载微信读书的书架前 num_books 本，可指定章节切换的时间间隔 interval_ms

```
cd zx/
./weread.mjs <num_books> [interval_ms]
```
