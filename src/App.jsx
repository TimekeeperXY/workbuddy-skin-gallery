import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  AppleLogo,
  Check,
  DownloadSimple,
  GithubLogo,
  Heart,
  MagnifyingGlass,
  Moon,
  Package,
  Sparkle,
  Sun,
  WindowsLogo,
  X,
} from "@phosphor-icons/react";

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
const releaseBase = "https://github.com/TimekeeperXY/workbuddy-skin-gallery/releases/download/v0.1.0";
const managerIcon = asset("images/skin-manager-icon-small.png");

const themes = [
  {
    id: "baxian",
    name: "八仙！星夜归位",
    author: "WorkBuddy Skin Gallery",
    version: "1.0.0",
    mode: "深色",
    category: "国风",
    image: asset("images/themes/baxian.jpg"),
    file: `${releaseBase}/baxian-movie-dark-v1.0.0.wbskin`,
    size: "8.5 MB",
    description: "暖金神话群像与深色工作台结合，把职场入口变成八仙夜行的冒险开场。",
    colors: ["#050610", "#e9c77e", "#52c5a4"],
    featured: true,
  },
  {
    id: "tiga",
    name: "迪迦奥特曼·星云作战舱",
    author: "WorkBuddy Skin Gallery",
    version: "1.0.0",
    mode: "深色",
    category: "特摄",
    image: asset("images/themes/tiga.jpg"),
    file: `${releaseBase}/tiga-ultraman-dark-v1.0.0.wbskin`,
    size: "5.8 MB",
    description: "红蓝光轨、银灰装甲面板和宇宙背景，为 WorkBuddy 换上深色作战舱。",
    colors: ["#050713", "#51d7ff", "#d8243f"],
  },
  {
    id: "jjlin",
    name: "林俊杰·午夜舞台",
    author: "WorkBuddy Skin Gallery",
    version: "1.1.0",
    mode: "深色",
    category: "舞台",
    image: asset("images/themes/jjlin.jpg"),
    file: `${releaseBase}/jjlin-midnight-stage-v1.1.0.wbskin`,
    size: "32.8 MB",
    description: "六张舞台影像随页面切换，让每一次任务都像演出开场。",
    colors: ["#07182b", "#1e6f9f", "#d1a75d"],
  },
  {
    id: "angels",
    name: "妄想天使·心动舞台",
    author: "WorkBuddy Skin Gallery",
    version: "1.0.1",
    mode: "浅色",
    category: "动漫",
    image: asset("images/themes/fantasy-angels.jpg"),
    file: `${releaseBase}/fantasy-angels-v1.0.1.wbskin`,
    size: "6.3 MB",
    description: "粉彩偶像舞台与轻盈界面融合，工作区也可以充满心动感。",
    colors: ["#f7c0df", "#7cb7ea", "#f7e78a"],
  },
  {
    id: "time",
    name: "光阴副本",
    author: "WorkBuddy Skin Gallery",
    version: "1.0.0",
    mode: "深色",
    category: "氛围",
    image: asset("images/themes/time-dungeon.jpg"),
    file: `${releaseBase}/time-dungeon-v1.0.0.wbskin`,
    size: "3.9 MB",
    description: "深墨绿、琥珀日轮与青绿色交互光，沉浸但不打扰。",
    colors: ["#102a22", "#cd8e38", "#47a58b"],
  },
  {
    id: "vivian",
    name: "绝区零·维琳娜·闲影",
    author: "WorkBuddy Skin Gallery",
    version: "2.0.0",
    mode: "浅色",
    category: "动漫",
    image: asset("images/themes/vivian.jpg"),
    file: `${releaseBase}/zzz-vivian-leisure-v2.0.0.wbskin`,
    size: "7.2 MB",
    description: "维琳娜居于工作区右侧，珍珠白与深靛蓝为内容留出安静空间。",
    colors: ["#edf2fb", "#5068a8", "#d4b775"],
  },
  {
    id: "bleach",
    name: "BLEACH·死神境界",
    author: "WorkBuddy Skin Gallery",
    version: "1.0.0",
    mode: "浅色",
    category: "动漫",
    image: asset("images/themes/bleach.jpg"),
    file: `${releaseBase}/bleach-soul-v1.0.0.wbskin`,
    size: "36.4 MB",
    description: "黑白漫画笔触与角色群像，为工作区注入凌厉的视觉节奏。",
    colors: ["#f0eee8", "#292826", "#d86b46"],
  },
];

const tools = [
  {
    id: "musicbar",
    name: "MusicBar",
    tagline: "Windows 任务栏音乐播控与同步歌词工具",
    image: asset("images/tools/musicbar.jpg"),
    page: "https://timekeeperxy.github.io/MusicBar/",
    repo: "https://github.com/TimekeeperXY/MusicBar",
    accent: "#2f83bf",
  },
  {
    id: "lanclip",
    name: "LanClip",
    tagline: "局域网内文字和截图剪贴板同步",
    image: asset("images/tools/lanclip.jpg"),
    page: "https://timekeeperxy.github.io/LanClip/",
    repo: "https://github.com/TimekeeperXY/LanClip",
    accent: "#1f8758",
  },
  {
    id: "vr2mp4",
    name: "VR2MP4",
    tagline: "本地 VR 视频播放与 360° 转普通 MP4",
    image: asset("images/tools/vr2mp4.jpg"),
    page: "https://timekeeperxy.github.io/VR2MP4/",
    repo: "https://github.com/TimekeeperXY/VR2MP4",
    accent: "#a5df35",
  },
];

const filters = ["全部", "深色", "浅色", "动漫", "国风", "特摄", "舞台", "氛围"];

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="WorkBuddy Skin Gallery 首页">
      <span className="brand-mark"><img src={managerIcon} alt="" /></span>
      <span className="brand-name">WorkBuddy Skin Gallery</span>
    </a>
  );
}

function ThemeCard({ theme, onPreview }) {
  const [liked, setLiked] = useState(false);
  return (
    <motion.article
      className="theme-card"
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="theme-image" onClick={() => onPreview(theme)} aria-label={`预览 ${theme.name}`}>
        <img src={theme.image} alt={`${theme.name} WorkBuddy 皮肤预览`} />
        <span className="image-action">查看大图 <ArrowRight size={16} weight="bold" /></span>
      </button>
      <div className="theme-info">
        <div className="theme-heading">
          <div>
            <h3>{theme.name}</h3>
            <p>{theme.author}</p>
          </div>
          <button className={`icon-button ${liked ? "is-liked" : ""}`} onClick={() => setLiked(!liked)} aria-label={liked ? "取消收藏" : "收藏皮肤"}>
            <Heart size={19} weight={liked ? "fill" : "regular"} />
          </button>
        </div>
        <p className="theme-description">{theme.description}</p>
        <div className="theme-meta">
          <span>{theme.mode}</span><span>{theme.category}</span><span>{theme.size}</span>
        </div>
        <div className="theme-footer">
          <div className="swatches" aria-label="主题配色">
            {theme.colors.map((color) => <span key={color} style={{ backgroundColor: color }} />)}
          </div>
          <a className="download-link" href={theme.file} download onClick={(event) => event.stopPropagation()}>
            <DownloadSimple size={18} weight="bold" /> 下载 .wbskin
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function App() {
  const [filter, setFilter] = useState("全部");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState(null);
  const [light, setLight] = useState(false);
  const reduceMotion = useReducedMotion();

  const visibleThemes = useMemo(() => themes.filter((theme) => {
    const matchesFilter = filter === "全部" || theme.mode === filter || theme.category === filter;
    const matchesQuery = theme.name.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  }), [filter, query]);

  return (
    <div className={light ? "site light" : "site"} id="top">
      <header className="nav-shell">
        <nav className="nav container" aria-label="主导航">
          <Logo />
          <div className="nav-links">
            <a href="#themes">皮肤</a>
            <a href="#manager">管理器</a>
            <a href="#tools">百宝箱</a>
            <a href="#guide">使用指南</a>
          </div>
          <div className="nav-actions">
            <button className="icon-button theme-toggle" onClick={() => setLight(!light)} aria-label={light ? "切换深色模式" : "切换浅色模式"}>
              {light ? <Moon size={19} /> : <Sun size={19} />}
            </button>
            <a className="nav-download" href="#manager"><DownloadSimple size={18} weight="bold" /> 获取管理器</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero container">
          <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <p className="eyebrow"><Sparkle size={15} weight="fill" /> #4cc9af edition</p>
            <h1>皮肤在这里，管理器也在这里。</h1>
            <p className="hero-text">下载管理器与 `.wbskin` 文件，几次点击就能换上新的 WorkBuddy 外观。</p>
            <div className="hero-actions">
              <a className="primary-button" href="#themes">浏览皮肤 <ArrowDown size={18} weight="bold" /></a>
              <a className="text-button" href="#manager">下载管理器 <ArrowRight size={18} weight="bold" /></a>
            </div>
          </motion.div>
          <motion.div className="hero-visual hero-stack" initial={reduceMotion ? false : { opacity: 0, x: 36, rotate: 1.5 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            <img src={asset("images/themes/baxian.jpg")} alt="八仙星夜归位皮肤在 WorkBuddy 中的效果" />
            <div className="hero-icon-card">
              <img src={managerIcon} alt="WorkBuddy Skin Manager 图标" />
              <span>Skin Manager</span>
            </div>
            <div className="hero-caption">
              <span>本周精选</span>
              <strong>八仙！星夜归位</strong>
              <a href={`${releaseBase}/baxian-movie-dark-v1.0.0.wbskin`} aria-label="下载八仙星夜归位皮肤"><ArrowDown size={20} weight="bold" /></a>
            </div>
          </motion.div>
        </section>

        <section className="library container" id="themes">
          <div className="section-title">
            <h2>挑一套，马上换上。</h2>
            <p>Gallery 中的每个 `.wbskin` 文件都可直接导入配套皮肤管理器。</p>
          </div>
          <div className="library-tools">
            <div className="filters" role="group" aria-label="筛选皮肤">
              {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
            </div>
            <label className="search">
              <MagnifyingGlass size={18} />
              <span className="sr-only">搜索皮肤</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索皮肤" />
            </label>
          </div>
          {visibleThemes.length ? (
            <motion.div className="theme-grid" layout>
              <AnimatePresence mode="popLayout">
                {visibleThemes.map((theme) => <ThemeCard key={theme.id} theme={theme} onPreview={setPreview} />)}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="empty-state">
              <MagnifyingGlass size={28} />
              <h3>没有找到对应皮肤</h3>
              <p>换个名称，或清除当前筛选条件。</p>
              <button onClick={() => { setFilter("全部"); setQuery(""); }}>查看全部皮肤</button>
            </div>
          )}
        </section>

        <section className="manager-wrap" id="manager">
          <div className="manager container">
            <div className="manager-shot">
              <img src={asset("images/manager.jpg")} alt="WorkBuddy Skin Manager 管理界面" />
            </div>
            <div className="manager-copy">
              <p className="eyebrow"><Package size={15} weight="fill" /> 新图标皮肤管理器</p>
              <img className="manager-icon" src={managerIcon} alt="WorkBuddy Skin Manager 新图标" />
              <h2>管理、预览、恢复，都在一个地方。</h2>
              <p>用管理器导入 `.wbskin`、预览并启用皮肤。想换回原始界面，也只需一次点击。</p>
              <div className="feature-lines">
                <span><Check size={18} weight="bold" /> 本地导入与结构校验</span>
                <span><Check size={18} weight="bold" /> 一键启用与安全恢复</span>
                <span><Check size={18} weight="bold" /> 不修改 WorkBuddy 安装文件</span>
              </div>
              <div className="os-downloads">
                <a className="os-button" href={`${releaseBase}/WorkBuddy-Skin-Manager-Setup-0.1.3.exe`}>
                  <WindowsLogo size={24} weight="duotone" />
                  <span><small>Windows 10 / 11</small><strong>下载安装包</strong></span>
                  <DownloadSimple size={20} weight="bold" />
                </a>
                <a className="os-button" href={`${releaseBase}/WorkBuddy-Skin-Manager-0.1.0-arm64.dmg`}>
                  <AppleLogo size={24} weight="duotone" />
                  <span><small>macOS</small><strong>下载安装包</strong></span>
                  <DownloadSimple size={20} weight="bold" />
                </a>
              </div>
              <p className="platform-note">macOS 安装包适用于 Apple 芯片设备。</p>
            </div>
          </div>
        </section>

        <section className="tool-wall container" id="tools">
          <div className="section-title">
            <p className="eyebrow"><Sparkle size={15} weight="fill" /> Created by 晓阳的百宝箱</p>
            <h2>顺手看看，还有这些开源小工具。</h2>
            <p>同一个创作者维护的 GitHub Pages 项目，适合放进工作流里慢慢试。</p>
          </div>
          <div className="tool-strip" aria-label="晓阳的百宝箱开源工具">
            {tools.map((tool) => (
              <a className="tool-ad" href={tool.page} target="_blank" rel="noreferrer" key={tool.id} style={{ "--tool-accent": tool.accent }}>
                <img src={tool.image} alt={`${tool.name} GitHub Pages 预览`} />
                <span className="tool-ad-copy">
                  <strong>{tool.name}</strong>
                  <small>{tool.tagline}</small>
                </span>
                <span className="tool-ad-action">
                  查看项目 <ArrowRight size={16} weight="bold" />
                </span>
              </a>
            ))}
          </div>
          <div className="tool-links">
            {tools.map((tool) => (
              <a href={tool.repo} target="_blank" rel="noreferrer" key={tool.repo}>
                <GithubLogo size={18} /> {tool.name} GitHub
              </a>
            ))}
          </div>
        </section>

        <section className="guide container" id="guide">
          <div className="guide-copy">
            <h2>管理器搭配皮肤文件使用。</h2>
            <p>先安装对应系统的管理器，再下载喜欢的 `.wbskin` 文件并导入。</p>
          </div>
          <div className="guide-steps">
            <article><span><Package size={24} /></span><h3>安装管理器</h3><p>下载 Windows 或 macOS 安装包并完成安装。</p></article>
            <article><span><DownloadSimple size={24} /></span><h3>下载并导入</h3><p>保存喜欢的 `.wbskin`，在管理器中选择导入。</p></article>
            <article><span><Sparkle size={24} /></span><h3>预览并启用</h3><p>确认预览效果，点击启用并重新打开 WorkBuddy。</p></article>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <Logo />
        <p>Created by 晓阳的百宝箱 · 管理器与皮肤文件，集中在一个清爽的下载页面。</p>
        <a className="icon-button" href="https://github.com/TimekeeperXY/workbuddy-skin-gallery/releases" target="_blank" rel="noreferrer" aria-label="查看 GitHub Releases"><GithubLogo size={20} /></a>
      </footer>

      <AnimatePresence>
        {preview && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPreview(null)}>
            <motion.div className="preview-modal" initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.28 }} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${preview.name} 预览`}>
              <button className="modal-close" onClick={() => setPreview(null)} aria-label="关闭预览"><X size={22} weight="bold" /></button>
              <img src={preview.image} alt={`${preview.name} 大图预览`} />
              <div className="modal-info">
                <div><h3>{preview.name}</h3><p>{preview.description}</p></div>
                <a className="primary-button" href={preview.file} download><DownloadSimple size={18} weight="bold" /> 下载 {preview.size}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
