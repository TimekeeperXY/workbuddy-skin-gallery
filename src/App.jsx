import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  AppleLogo,
  BookOpen,
  BracketsCurly,
  Check,
  Copy,
  DownloadSimple,
  EnvelopeSimple,
  GithubLogo,
  Heart,
  MagnifyingGlass,
  Moon,
  Package,
  Palette,
  Sparkle,
  Sun,
  TerminalWindow,
  WindowsLogo,
  X,
} from "@phosphor-icons/react";

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
const releaseBase = "https://github.com/TimekeeperXY/workbuddy-skin-gallery/releases/download/v0.1.0";
const managerIcon = asset("images/skin-manager-icon-small.png");
const skillRepo = "https://github.com/TimekeeperXY/workbuddy-dream-skin-skill";

const themes = [
  {
    id: "baxian",
    name: "八仙！星夜归位",
    author: "@晓阳的百宝箱",
    rights: "粉丝创作 · 非商业",
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
    author: "@晓阳的百宝箱",
    rights: "粉丝创作 · 非商业",
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
    author: "@晓阳的百宝箱",
    rights: "粉丝创作 · 非商业",
    version: "1.1.0",
    mode: "深色",
    category: "舞台",
    image: asset("images/themes/jjlin.jpg"),
    file: `${releaseBase}/jjlin-midnight-stage-v1.1.0.wbskin`,
    size: "10.1 MB",
    description: "六张舞台影像随页面切换，让每一次任务都像演出开场。",
    colors: ["#07182b", "#1e6f9f", "#d1a75d"],
  },
  {
    id: "angels",
    name: "妄想天使·心动舞台",
    author: "@晓阳的百宝箱",
    rights: "粉丝创作 · 非商业",
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
    author: "@晓阳的百宝箱",
    rights: "原创 · 个人免费",
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
    author: "@晓阳的百宝箱",
    rights: "粉丝创作 · 非商业",
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
    author: "@晓阳的百宝箱",
    rights: "粉丝创作 · 非商业",
    version: "1.0.0",
    mode: "浅色",
    category: "动漫",
    image: asset("images/themes/bleach.jpg"),
    file: `${releaseBase}/bleach-soul-v1.0.0.wbskin`,
    size: "15.5 MB",
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

const universalSkillInstruction = `请安装这个workbuddy皮肤生成技能：${skillRepo}，安装完成后学习并复述对这个skill的理解，最后告知我未来该如何使用这个skill`;

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
          <span>{theme.mode}</span><span>{theme.category}</span><span>{theme.size}</span><span>{theme.rights}</span>
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

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button className="copy-button" onClick={copy} aria-label="复制指令">
      {copied ? <Check size={17} weight="bold" /> : <Copy size={17} />}
      {copied ? "已复制" : "复制"}
    </button>
  );
}

function LearnPage() {
  const starterPrompt = `使用 workbuddy-dream-skin skill。先连接正在运行的 WorkBuddy，读取真实 DOM 和 computed styles，生成 selector map，再根据我的参考图制作主题。重点验证菜单、弹窗、专家卡片、文件产物、悬停状态和首次启用流程，最后输出 .wbskin 与独立一键启用包。`;

  return (
    <div className="site learn-site">
      <header className="nav-shell">
        <nav className="nav container" aria-label="学习页导航">
          <Logo />
          <div className="nav-links learn-nav-links">
            <a href="#/learn">安装 Skill</a>
            <a href="#workflow">生成流程</a>
            <a href="#prompt">启动指令</a>
          </div>
          <a className="nav-download" href="#top"><ArrowLeft size={18} weight="bold" /> 返回首页</a>
        </nav>
      </header>

      <main id="learn-top">
        <section className="learn-hero container">
          <div className="learn-hero-copy">
            <p className="eyebrow"><BracketsCurly size={15} weight="bold" /> SOURCE AVAILABLE AGENT SKILL</p>
            <h1>教会你的 Agent，亲手设计 WorkBuddy 皮肤。</h1>
            <p>从真实 DOM 到 selector map，再到可安装的 `.wbskin`。这套 Skill 把设计、注入、测试和打包变成一条可复用流程。</p>
            <div className="hero-actions">
              <a className="primary-button" href="#install">复制安装指令 <ArrowDown size={18} weight="bold" /></a>
              <a className="text-button" href={skillRepo} target="_blank" rel="noreferrer"><GithubLogo size={19} /> 查看源码</a>
            </div>
          </div>
          <div className="skill-file" aria-label="Skill 文件结构预览">
            <div className="skill-file-bar"><span>workbuddy-dream-skin</span><span>PERSONAL / NON-COMMERCIAL</span></div>
            <pre><code>{`SKILL.md\nagents/\nassets/runtime-template/\nreferences/\n  design-and-dom.md\n  field-lessons.md\n  qa-checklist.md\nscripts/\n  extract_selector_map.mjs`}</code></pre>
            <div className="skill-file-foot"><span><Check size={16} weight="bold" /> 不修改 app.asar</span><span><Check size={16} weight="bold" /> Console DOM 驱动</span></div>
          </div>
        </section>

        <section className="install-section container" id="install">
          <div className="section-title">
            <h2>一条指令，交给任何支持 Skill 的 Agent。</h2>
            <p>无需选择产品。把下面这段话完整发送给你的 Agent，由它完成安装、学习和使用说明。</p>
          </div>
          <div className="install-console">
            <div className="console-heading"><div><small>通用 Agent 指令</small><strong>安装、学习并复述 Skill</strong></div><CopyButton value={universalSkillInstruction} /></div>
            <pre><code>请安装这个workbuddy皮肤生成技能：<a href={skillRepo} target="_blank" rel="noreferrer">TimekeeperXY/workbuddy-dream-skin-skill</a>，安装完成后学习并复述对这个skill的理解，最后告知我未来该如何使用这个skill</code></pre>
          </div>
          <ol className="install-steps">
            {["将完整指令发送给 Agent。", "等待 Agent 安装并学习仓库中的 SKILL.md。", "根据 Agent 的复述确认能力，然后按它给出的方式开始制作皮肤。"].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}
          </ol>
        </section>

        <section className="workflow-section" id="workflow">
          <div className="container workflow-inner">
            <div className="workflow-copy"><h2>不是套 CSS，先理解真实界面。</h2><p>截图决定审美方向，Console DOM 决定选择器是否准确。两者缺一不可。</p></div>
            <div className="workflow-rail">
              <article><span>01</span><h3>读取 DOM</h3><p>扫描真实页面、弹窗和交互状态。</p></article>
              <article><span>02</span><h3>生成地图</h3><p>把稳定元素整理成 selector map。</p></article>
              <article><span>03</span><h3>设计主题</h3><p>用单一背景责任层和精确叶子选择器实现视觉。</p></article>
              <article><span>04</span><h3>测试打包</h3><p>冷启动验证后输出 `.wbskin` 与独立包。</p></article>
            </div>
          </div>
        </section>

        <section className="prompt-section container" id="prompt">
          <div className="prompt-heading"><div><h2>第一次生成，就从这段话开始。</h2><p>安装完成后，把参考图和这段启动指令一起发给 Agent。</p></div><CopyButton value={starterPrompt} /></div>
          <blockquote>{starterPrompt}</blockquote>
          <div className="prompt-notes"><span>建议素材：人物或氛围参考图</span><span>建议页面：新建任务、助理、项目、专家、自动化、文件</span><span>建议产物：`.wbskin` + 一键启用包</span></div>
        </section>
      </main>

      <footer className="footer container">
        <Logo />
        <p>© 2026 @晓阳的百宝箱 · Source Available · <a href="#/terms">版权与使用条款</a></p>
        <a className="icon-button" href={skillRepo} target="_blank" rel="noreferrer" aria-label="打开 Skill GitHub 仓库"><GithubLogo size={20} /></a>
      </footer>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="site terms-site">
      <header className="nav-shell">
        <nav className="nav container" aria-label="版权条款导航">
          <Logo />
          <a className="nav-download" href="#top"><ArrowLeft size={18} weight="bold" /> 返回首页</a>
        </nav>
      </header>
      <main className="terms-main container">
        <header className="terms-hero">
          <p className="eyebrow">COPYRIGHT & USAGE</p>
          <h1>版权与使用条款</h1>
          <p>生效日期：2026 年 7 月 23 日。不同产品采用不同许可，请按下载内容对应的条款使用。</p>
        </header>
        <section className="terms-owner">
          <strong>统一权利信息</strong>
          <dl>
            <div><dt>署名</dt><dd>@晓阳的百宝箱</dd></div>
            <div><dt>官网</dt><dd>timekeeperxy.github.io/workbuddy-skin-gallery/</dd></div>
            <div><dt>GitHub</dt><dd>github.com/TimekeeperXY</dd></div>
            <div><dt>版权邮箱</dt><dd>timelinex@163.com</dd></div>
          </dl>
        </section>
        <div className="terms-sections">
          <section><span>01</span><h2>皮肤管理器</h2><p>闭源专有软件，仅授权个人非商业使用。未经书面许可，禁止再分发、镜像、转售、出租、重新打包、付费捆绑、提供付费下载或移除署名。完整条款以安装时显示的 EULA 为准。</p></section>
          <section><span>02</span><h2>原创 `.wbskin`</h2><p>允许个人免费下载、导入和使用。禁止销售、付费分发、重新打包、镜像发布、作为课程或会员权益捆绑，以及移除作者、官网、许可文件或来源信息。</p></section>
          <section><span>03</span><h2>第三方 IP 皮肤</h2><p>属于非官方粉丝创作，仅限个人非商业使用。主题适配代码与包装结构归 @晓阳的百宝箱；相关人物肖像、角色、商标、照片及原始素材权利归各自权利人。本站不授予任何第三方 IP 商业权利。</p></section>
          <section><span>04</span><h2>生成 Skill</h2><p>Skill 采用 Source Available 非商业许可，并非 OSI 开源软件。允许个人非商业学习和私下修改；禁止销售、付费服务、付费分发、商业捆绑、再发布和移除署名。商业授权请通过版权邮箱联系。</p></section>
          <section><span>05</span><h2>网站源码</h2><p>网站源码、设计、文案与原创视觉材料保留全部权利。公开访问不代表授予复制、镜像、重新部署、销售或制作商业衍生网站的许可。</p></section>
          <section><span>06</span><h2>官方来源与维权</h2><p>仅本网站和 GitHub 账号 TimekeeperXY 属于官方发布渠道。发现冒充官方、盗卖、移除署名或未经许可的付费分发时，请保存链接、截图、订单与文件哈希，并发送至 timelinex@163.com。</p></section>
        </div>
        <aside className="terms-note">这些条款不授予你未拥有的第三方人物、角色、照片、音乐、商标或其他素材权利。法律另有强制规定的，从其规定。</aside>
      </main>
      <footer className="footer container">
        <Logo />
        <p>© 2026 @晓阳的百宝箱 · All rights reserved.</p>
        <a className="icon-button" href="mailto:timelinex@163.com" aria-label="发送版权邮件"><EnvelopeSimple size={20} /></a>
      </footer>
    </div>
  );
}

function HomePage() {
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
            <a href="#/learn">学习制作</a>
            <a href={skillRepo} target="_blank" rel="noreferrer">公开源码 Skill</a>
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
        <section className="hero-shell" style={{ "--hero-image": `url(${asset("images/themes/baxian.jpg")})` }}>
          <div className="hero container">
            <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <p className="eyebrow"><Sparkle size={15} weight="fill" /> WORKBUDDY SKIN GALLERY</p>
              <h1>让你的 WorkBuddy，拥有自己的样子。</h1>
              <p className="hero-text">下载皮肤，安装管理器，或者让 Agent 学会从零设计一套。</p>
              <div className="hero-actions">
                <a className="primary-button" href="#themes">浏览皮肤 <ArrowDown size={18} weight="bold" /></a>
                <a className="hero-secondary" href="#/learn">学习制作 <ArrowRight size={18} weight="bold" /></a>
              </div>
            </motion.div>
            <div className="hero-proof"><span>Featured skin</span><strong>八仙！星夜归位</strong><small>Dark · v1.0.0</small></div>
          </div>
        </section>

        <section className="launchpad container" aria-label="快速入口">
          <a href="#manager"><Package size={24} weight="duotone" /><span><small>01 · APP</small><strong>下载皮肤管理器</strong><p>导入、预览、启用与恢复。</p></span><ArrowRight size={20} /></a>
          <a href="#themes"><Palette size={24} weight="duotone" /><span><small>02 · GALLERY</small><strong>挑选 `.wbskin`</strong><p>浏览可直接导入的完整主题。</p></span><ArrowRight size={20} /></a>
          <a href="#/learn"><BookOpen size={24} weight="duotone" /><span><small>03 · OPEN SKILL</small><strong>教会 Agent 制作</strong><p>从真实 DOM 到可分发皮肤包。</p></span><ArrowRight size={20} /></a>
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
                <a className="os-button" href={`${releaseBase}/WorkBuddy-Skin-Manager-Setup-0.1.7.exe`}>
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
              <div className="macos-note">
                <strong>macOS 提示“文件损坏”时</strong>
                <p>这是未签名应用触发的隔离保护。下载后可在终端执行下面命令，再打开 DMG 并把应用拖入 Applications。</p>
                <code>xattr -dr com.apple.quarantine ~/Downloads/WorkBuddy-Skin-Manager-0.1.0-arm64.dmg</code>
                <p>如果已经拖入 Applications，但打开仍提示损坏，再执行：</p>
                <code>xattr -dr com.apple.quarantine "/Applications/WorkBuddy Skin Manager.app"</code>
              </div>
              <p className="platform-note">macOS 安装包适用于 Apple 芯片设备。</p>
            </div>
          </div>
        </section>

        <section className="skill-callout" id="skill">
          <div className="container skill-callout-inner">
            <div><BracketsCurly size={34} weight="duotone" /><h2>不只下载，也可以自己创造。</h2><p>公开源码 Skill 会指导 Agent 读取 WorkBuddy 的真实 UI，生成 selector map，并完成设计、测试与打包。</p></div>
            <div className="skill-actions"><a className="primary-button" href="#/learn">学习这个 Skill <BookOpen size={18} /></a><a href={skillRepo} target="_blank" rel="noreferrer"><GithubLogo size={19} /> GitHub 源码</a></div>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <Logo />
        <p>© 2026 @晓阳的百宝箱 · <a href="#/terms">版权与使用条款</a> · timelinex@163.com</p>
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

function App() {
  const [route, setRoute] = useState(window.location.hash);
  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);
  const learnRoutes = new Set(["#/learn", "#install", "#workflow", "#prompt"]);
  if (route === "#/terms") return <TermsPage />;
  return learnRoutes.has(route) ? <LearnPage /> : <HomePage />;
}

export default App;
