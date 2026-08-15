# Chromosome-Diagram-Generator | 基因染色体绘图生成器

> 🧬 专为生物学教学、课件制作、遗传学笔记与科研论文打造的高颜值染色体示意图在线绘制与导出工具。

[![Deploy to GitHub Pages](https://github.com/lbdslbds/Chromosome-Diagram-Generato/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/lbdslbds/Chromosome-Diagram-Generato/actions/workflows/deploy-pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌐 在线网页版 (Online Web App)

无需安装任何环境，即开即用：
👉 **[点击直接访问在线网页版](https://lbdslbds.github.io/Chromosome-Diagram-Generato/)**

---

## ✨ 核心特性

- 🧬 **多种染色体形态**：支持同源双染色体（Homologous Pair）、单条染色体（Single Chromosome）以及复制态双单体（Sister Chromatids）。
- 🏷️ **自定义等位基因位点**：支持动态增减基因位点（可添加 1~8 个或更多位点），支持上下标输入（如 $X^B$、$w^+$、$Neo^r$）与等位基因斜体/粗体规范。
- 🎨 **丰富配色与样式**：
  - 支持统一单色或左右同源染色体分色（父源蓝 / 母源红）。
  - 支持实色背景或**透明背景**（适合直接导出插入 Word、PPT、WPS、Keynote 试卷与幻灯片）。
  - 支持粗细、长度、间距、横臂长度微调。
- 🔘 **着丝粒支持**：提供无着丝粒、初级缢痕（Constriction）与圆点着丝粒（Dot）多种形态。
- 🚹 **性染色体标记与备注**：支持底部快速添加 XY、XX、ZW、ZZ 或自定义性别/基因型文本标记，支持顶部图题设置。
- 📚 **经典遗传学预设库**：一键套用孟德尔单基因杂交、双基因连锁、伴性遗传、三点测交、同源染色体分色、生化暗黑模式等预设。
- 💾 **多格式高清导出**：
  - **PNG 导出**：标准 (1x)、高清 (2x)、印刷级超清 (4x 300+ DPI)。
  - **SVG 矢量导出**：无损矢量文件，可在 Adobe Illustrator 或 Inkscape 中任意编辑。
  - **一键复制到剪贴板**：一键复制图片并直接 `Ctrl+V` 粘贴到 Word/PPT 中。
  - **链接分享与持久化**：支持自动保存草稿及一键生成包含完整参数的分享 URL。
- 🌓 **双语与主题切换**：支持中英文双语界面（中文 / English）以及深色 / 浅色科技风主题。

---

## 🚀 GitHub Pages 自动化部署说明

本项目已配置 GitHub Actions 自动化部署工作流（[deploy-pages.yml](.github/workflows/deploy-pages.yml)）。

当您将代码推送到 GitHub 的 `main` 分支时，Actions 会自动构建并将静态页面发布到 GitHub Pages。

### 首次使用请确认开启 Pages：
1. 打开 GitHub 仓库页面，点击 **Settings**。
2. 在左侧菜单中找到 **Pages**（或 **Code and automation -> Pages**）。
3. 在 **Build and deployment -> Source** 下拉框中，选择 **GitHub Actions**。
4. 之后每次推送代码，GitHub Actions 均会自动更新线上网页。

---

## 💻 Python 桌面版使用说明 (Desktop Edition)

本项目同时保留了 Python Tkinter + Matplotlib 本地桌面版。

### 安装依赖
```bash
git clone https://github.com/lbdslbds/Chromosome-Diagram-Generato.git
cd Chromosome-Diagram-Generato
pip install -r requirements.txt
```

### 运行程序
```bash
python Chromosome-Diagram-Generator.py
```

---

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。欢迎自由使用、修改与贡献！