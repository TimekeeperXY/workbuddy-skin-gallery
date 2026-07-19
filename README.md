# WorkBuddy Skin Gallery

WorkBuddy 皮肤 Gallery 与管理器下载网站，部署为 GitHub Pages 静态网页。

线上地址：<https://timekeeperxy.github.io/workbuddy-skin-gallery/>

## 本地运行

```powershell
npm install
npm run dev
```

生产构建：

```powershell
npm run build
```

构建结果位于 `dist`。推送到 `main` 后，GitHub Actions 会自动部署 GitHub Pages。

## 内容目录

- `public/images`：网站使用的压缩预览图
- `release-assets`：本地保存的安装包和 `.wbskin`，通过 GitHub Release 提供下载
- `source-images`：未压缩的原始预览图备份，不进入 Git 仓库

## 下载架构

GitHub 对普通仓库文件有 100 MB 单文件限制。Windows 和 macOS 管理器安装包放在 `v0.1.0` Release，Gallery 页面通过固定 Release URL 下载；网页源码和压缩预览图由 GitHub Pages 托管。
