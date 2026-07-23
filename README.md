# WorkBuddy Skin Gallery

WorkBuddy 皮肤、管理器与公开源码生成 Skill 的统一入口，部署为 GitHub Pages 静态网页。

线上地址：<https://timekeeperxy.github.io/workbuddy-skin-gallery/>

## 页面入口

- Landing Page：管理器、皮肤库与公开源码 Skill 三条快速路径
- 皮肤库：筛选、预览并下载可直接导入的 `.wbskin`
- 管理器：下载 Windows 或 macOS 版本
- Skill 学习页：访问 `#/learn`，复制适用于所有支持 Skill 产品的统一安装与学习指令

皮肤生成 Skill 源码：<https://github.com/TimekeeperXY/workbuddy-dream-skin-skill>

## Copyright

Copyright © 2026 @晓阳的百宝箱. All rights reserved. 网站源码保留全部权利，未经书面许可不得复制、镜像、重新打包、销售或用于商业衍生项目。完整说明见 `LICENSE` 与网站 `#/terms` 页面。

版权联系：<timelinex@163.com>

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

GitHub 对普通仓库文件有 100 MB 单文件限制。Windows 和 macOS 管理器安装包放在 `v0.1.0` Release，Gallery 页面通过固定 Release URL 下载；当前 Windows 管理器下载指向 `WorkBuddy-Skin-Manager-Setup-0.1.5.exe`。网页源码和压缩预览图由 GitHub Pages 托管。
