// 全局状态
let currentLanguage = 'zh';
let isMenuOpen = false;
let scrollY = 0;
let mousePosition = { x: 0, y: 0 };
let translations = {}; // 存储翻译数据

// 暴露全局变量供其他脚本使用
window.currentLanguage = currentLanguage;
window.translations = translations;

// 安全保护机制 - 已完全禁用
// function createSecurityOverlay() {
//   // 创建或重新创建遮盖层
//   let overlay = document.getElementById('disable-overlay');
//   if (!overlay) {
//     overlay = document.createElement('div');
//     overlay.id = 'disable-overlay';
//     overlay.style.cssText = `
//       position: fixed !important;
//       top: 0 !important;
//       left: 0 !important;
//       width: 100% !important;
//       height: 100% !important;
//       background: rgba(0, 0, 0, 0.1) !important;
//       z-index: 9999 !important;
//       cursor: not-allowed !important;
//       pointer-events: all !important;
//     `;
//     document.body.appendChild(overlay);
//   }
//   
//   // 创建或重新创建公告栏 - 已隐藏
//   // let banner = document.getElementById('announcement-banner');
//   // if (!banner) {
//   //   banner = document.createElement('div');
//   //   banner.id = 'announcement-banner';
//   //   banner.innerHTML = `
//   //     <div class="announcement-content">
//   //       <h3>网站公告</h3>
//   //       <p>网站正在公安备案中，暂不支持点击访问，详细请联系官方邮箱tensorlinx@tensorlinx.cn</p>
//   //     </div>
//   //   `;
//   //   document.body.appendChild(banner);
//   // }
// }

// 监控DOM变化 - 已完全禁用
// function initSecurityMonitor() {
//   // 初始创建
//   createSecurityOverlay();
//   
//   // 监控DOM变化
//   const observer = new MutationObserver(function(mutations) {
//     mutations.forEach(function(mutation) {
//       if (mutation.type === 'childList') {
//         mutation.removedNodes.forEach(function(node) {
//           if (node.id === 'disable-overlay') {
//             setTimeout(createSecurityOverlay, 10);
//           }
//         });
//       }
//     });
//   });
//   
//   observer.observe(document.body, {
//     childList: true,
//     subtree: true
//   });
//   
//   // 定期检查
//   setInterval(createSecurityOverlay, 1000);
//   
//   // 禁用右键菜单
//   document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
//     return false;
//   });
//   
//   // 禁用开发者工具快捷键
//   document.addEventListener('keydown', function(e) {
//     if (e.key === 'F12' || 
//         (e.ctrlKey && e.shiftKey && e.key === 'I') ||
//         (e.ctrlKey && e.shiftKey && e.key === 'C') ||
//         (e.ctrlKey && e.shiftKey && e.key === 'J') ||
//         (e.ctrlKey && e.key === 'U')) {
//       e.preventDefault();
//       return false;
//     }
//   });
// }

// 页面加载完成后初始化安全监控 - 已禁用
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', initSecurityMonitor);
// } else {
//   initSecurityMonitor();
// }

// 加载翻译文件
async function loadTranslations() {
  try {
    const response = await fetch('translations.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    translations = await response.json();
    window.translations = translations; // 同步更新全局变量
    console.log('翻译文件加载成功');
    // 加载完成后初始化页面
    initializePage();
    setupEventListeners();
    setupLanguageButtons();
    updateContent();
  } catch (error) {
    console.error('加载翻译文件失败:', error);
    // 如果加载失败，使用默认的空对象，页面将显示原始HTML内容
    translations = { zh: {}, en: {} };
    window.translations = translations; // 同步更新全局变量
  }
}

// 开源项目数据
const openSourceProjects = [
  {
    name: "TensorFlow-Lite-Plus",
    description: {
      zh: "轻量级深度学习推理框架，专为移动端和边缘设备优化",
      en: "Lightweight deep learning inference framework optimized for mobile and edge devices"
    },
    language: "Python",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    name: "AI-Pipeline-Kit",
    description: {
      zh: "企业级AI数据处理管道，支持大规模数据流处理",
      en: "Enterprise AI data processing pipeline supporting large-scale data stream processing"
    },
    language: "Go",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    name: "Neural-Optimizer",
    description: {
      zh: "神经网络自动优化工具，智能调参和架构搜索",
      en: "Neural network auto-optimization tool with intelligent hyperparameter tuning"
    },
    language: "C++",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    name: "MLOps-Dashboard",
    description: {
      zh: "机器学习运维监控平台，全生命周期管理",
      en: "Machine learning operations monitoring platform with full lifecycle management"
    },
    language: "TypeScript",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    name: "Distributed-Training",
    description: {
      zh: "分布式模型训练框架，支持多GPU和多节点训练",
      en: "Distributed model training framework supporting multi-GPU and multi-node training"
    },
    language: "Python",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    name: "Edge-AI-Runtime",
    description: {
      zh: "边缘计算AI运行时环境，超低延迟推理引擎",
      en: "Edge computing AI runtime environment with ultra-low latency inference engine"
    },
    language: "Rust",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
  {
    name: "AI-Model-Hub",
    description: {
      zh: "AI模型中心，统一的模型管理和部署平台",
      en: "AI model hub for unified model management and deployment platform"
    },
    language: "JavaScript",
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  },
];

// SVG 图标
const icons = {
  menu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
  x: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  globe: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="m12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12,5 19,12 12,19"></polyline></svg>`,
  zap: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon></svg>`,
  shield: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  code: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16,18 22,12 16,6"></polyline><polyline points="8,6 2,12 8,18"></polyline></svg>`,
  brain: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>`,
  database: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  cpu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
  monitor: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
  chart: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`
};

// Cookie 操作函数
function setCookie(name, value, days = 30) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// 获取当前翻译
function getTranslation() {
  // 如果翻译数据未加载，返回空对象避免错误
  if (!translations || !translations[currentLanguage]) {
    return {};
  }
  return translations[currentLanguage];
}

// 切换语言
function toggleLanguage() {
  currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
  window.currentLanguage = currentLanguage; // 同步更新全局变量
  updateContent();
  updateLanguageButtons();
}

// 更新内容
function updateContent() {
  const t = getTranslation();
  
  // 更新页面标题
  document.title = t.title;
  
  // 更新导航
  const navHome = document.querySelector('[data-nav="home"]');
  const navProducts = document.querySelector('[data-nav="products"]');
  const navNews = document.querySelector('[data-nav="about"]');
  const navFunding = document.querySelector('[data-nav="funding"]');
  const navJobs = document.querySelector('[data-nav="jobs"]');
  const navAbout = document.querySelector('[data-nav="about-us"]');
  const navCommunity = document.querySelector('[data-nav="community"]');
  const navContact = document.querySelector('[data-nav="contact"]');
  
  if (navHome) navHome.textContent = t.nav.home;
  if (navProducts) navProducts.textContent = t.nav.products;
  if (navNews) navNews.textContent = t.nav.news;
  if (navFunding) navFunding.textContent = t.nav.funding || '资助申请';
  if (navJobs) navJobs.textContent = t.nav.jobs;
  if (navAbout) navAbout.textContent = t.nav.about;
  if (navCommunity) navCommunity.textContent = t.nav.community;
  if (navContact) navContact.textContent = t.nav.contact;

  
  // 更新语言切换按钮状态
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    if (btn.dataset.lang === currentLanguage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // 触发语言变化事件，通知其他模块更新内容
  window.dispatchEvent(new CustomEvent('languageChanged'));
  
  // 更新Hero轮播内容
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides && heroSlides.length > 0) {
    t.heroSlides.forEach((slide, index) => {
      if (heroSlides[index]) {
        const titleEl = heroSlides[index].querySelector('h1');
        const descEl = heroSlides[index].querySelector('p');
        const btnEl = heroSlides[index].querySelector('.btn');
        
        if (titleEl) titleEl.textContent = slide.title;
        if (descEl) descEl.textContent = slide.description;
        if (btnEl) btnEl.textContent = slide.cta;
      }
    });
  }
  
  // 更新主页轮播右侧内容 (id="heroText")
  const heroTextElement = document.getElementById('heroText');
  if (heroTextElement) {
    const titleEl = heroTextElement.querySelector('h1[data-translate="hero.slideTitle"]');
    const descEl = heroTextElement.querySelector('p[data-translate="hero.slideDescription"]');
    const btnEl = heroTextElement.querySelector('a[data-translate="hero.cta.secondary"]');
    
    if (titleEl && t.hero && t.hero.slideTitle) {
      titleEl.textContent = t.hero.slideTitle;
    }
    if (descEl && t.hero && t.hero.slideDescription) {
      descEl.textContent = t.hero.slideDescription;
    }
    if (btnEl && t.hero && t.hero.cta && t.hero.cta.secondary) {
      btnEl.textContent = t.hero.cta.secondary;
    }
  }
  
  // 更新产品卡片区域
  const sectionTitle = document.querySelector('.section-title h2');
  if (sectionTitle) sectionTitle.textContent = t.products.title;
  
  const productCards = document.querySelectorAll('.cards .card');
  if (productCards && productCards.length > 0) {
    t.products.items.forEach((product, index) => {
      if (productCards[index]) {
        const titleEl = productCards[index].querySelector('h3');
        const descEl = productCards[index].querySelector('p');
        const dateEl = productCards[index].querySelector('.card-date');
        const linkEl = productCards[index].querySelector('a');
        
        if (titleEl) titleEl.textContent = product.title;
        if (descEl) descEl.textContent = product.description;
        if (dateEl && product.date) dateEl.textContent = product.date;
        if (linkEl) {
          linkEl.textContent = product.cta;
          if (product.url) {
            linkEl.href = product.url;
            linkEl.target = "_blank";
            linkEl.rel = "noopener noreferrer";
          }
        }
      }
    });
  }
  
  // 更新生态社区
  const communityTitle = document.querySelector('.community-section h3');
  const communitySubtitle = document.querySelector('.community-section .subtitle');
  if (communityTitle) communityTitle.textContent = t.community.title;
  if (communitySubtitle) communitySubtitle.textContent = t.community.subtitle;
  
  const communityCards = document.querySelectorAll('.community-layout .community-card');
  if (communityCards && communityCards.length > 0) {
    t.community.items.forEach((item, index) => {
      if (communityCards[index]) {
        const titleEl = communityCards[index].querySelector('.community-title');
        const descEl = communityCards[index].querySelector('.community-description');
        const membersEl = communityCards[index].querySelector('.community-members');
        const typeEl = communityCards[index].querySelector('.community-type');
        const btnEl = communityCards[index].querySelector('.community-join-btn');
        
        if (titleEl) titleEl.textContent = item.name;
        if (descEl) descEl.textContent = item.description;
        if (membersEl) membersEl.textContent = `${item.members} ${currentLanguage === 'zh' ? '成员' : 'Members'}`;
        if (typeEl) typeEl.textContent = item.type;
        if (btnEl) btnEl.textContent = currentLanguage === 'zh' ? '加入社区' : 'Join Community';
      }
    });
  }
  
  // 更新特色展示区域
  const showcaseTitle = document.querySelector('.showcase-content h3');
  const showcaseDesc = document.querySelector('.showcase-content p');
  const showcaseBtn = document.querySelector('.showcase-content .btn');
  if (showcaseTitle) showcaseTitle.textContent = t.showcase.title;
  if (showcaseDesc) showcaseDesc.textContent = t.showcase.subtitle || t.showcase.description;
  if (showcaseBtn) showcaseBtn.textContent = t.showcase.cta;
  
  // 更新最新动态标题区域
  const sectionTitleH2 = document.querySelector('.section-title h2');
  const sectionTitleP = document.querySelector('.section-title p');
  if (sectionTitleH2) sectionTitleH2.textContent = t.sectionTitle?.latest || t.products?.title;
  if (sectionTitleP) sectionTitleP.textContent = t.sectionTitle?.subtitle || '';
  
  // 更新关于我们
  const aboutTitle = document.querySelector('.about h2');
  if (aboutTitle) aboutTitle.textContent = t.about.title;
  
  const aboutPs = document.querySelectorAll('.about-content p');
  if (aboutPs && aboutPs.length >= 2) {
    if (aboutPs[0]) aboutPs[0].textContent = t.about.description1;
    if (aboutPs[1]) aboutPs[1].textContent = t.about.description2;
  }
  
  const aboutCta = document.querySelector('[data-about-cta]');
  if (aboutCta) aboutCta.innerHTML = `${t.about.cta} ${icons.arrowRight}`;
  
  const aboutImageAlt = document.querySelector('.about-image p');
  if (aboutImageAlt) aboutImageAlt.textContent = t.about.imageAlt;
  
  // 更新开源项目
  updateProjects();
  

  
  // 更新公告横幅


  // 更新页脚
  updateFooter();
  
  // 更新所有带data-translate属性的元素
  const translateElements = document.querySelectorAll('[data-translate]');
  translateElements.forEach(element => {
    const key = element.getAttribute('data-translate');
    const keys = key.split('.');
    let value = t;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value[k] !== undefined) {
        value = value[k];
      } else {
        value = null;
        break;
      }
    }
    
    if (value !== null) {
      element.textContent = value;
    }
  });
  
  // 更新导航栏搜索数据和placeholder
  initNavSearchData();
  updateSearchPlaceholder();
}

// 更新开源项目
function updateProjects() {
  const t = getTranslation();
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselDots = document.querySelector('.carousel-dots');
  
  if (!carouselTrack || !carouselDots) return;
  
  // 生成项目卡片 - 新的三容器布局
  const currentIndex = 0;
  const totalProjects = openSourceProjects.length;
  
  function generateProjectsLayout(startIndex) {
    const mainProject = openSourceProjects[startIndex % totalProjects];
    const leftProject1 = openSourceProjects[(startIndex - 2 + totalProjects) % totalProjects];
    const leftProject2 = openSourceProjects[(startIndex - 1 + totalProjects) % totalProjects];
    const rightProject1 = openSourceProjects[(startIndex + 1) % totalProjects];
    const rightProject2 = openSourceProjects[(startIndex + 2) % totalProjects];
    
    return `
      <div class="projects-layout">
        <div class="side-project far-left-project">
          <div class="project-card extra-small" style="--gradient: ${leftProject1.gradient}">
            <div class="project-header">
              <div class="project-icon" style="background: ${leftProject1.gradient}">
                ${getProjectIcon(leftProject1.language)}
              </div>
              <h3 class="project-title">${leftProject1.name}</h3>
            </div>
            <p class="project-description">${leftProject1.description[currentLanguage]}</p>
            <span class="project-language">${leftProject1.language}</span>
          </div>
        </div>
        
        <div class="side-project left-project">
          <div class="project-card small" style="--gradient: ${leftProject2.gradient}">
            <div class="project-header">
              <div class="project-icon" style="background: ${leftProject2.gradient}">
                ${getProjectIcon(leftProject2.language)}
              </div>
              <h3 class="project-title">${leftProject2.name}</h3>
            </div>
            <p class="project-description">${leftProject2.description[currentLanguage]}</p>
            <span class="project-language">${leftProject2.language}</span>
          </div>
        </div>
        
        <div class="main-project">
          <div class="project-card large" style="--gradient: ${mainProject.gradient}">
            <div class="project-header">
              <div class="project-icon" style="background: ${mainProject.gradient}">
                ${getProjectIcon(mainProject.language)}
              </div>
              <h3 class="project-title">${mainProject.name}</h3>
            </div>
            <p class="project-description">${mainProject.description[currentLanguage]}</p>
            <span class="project-language">${mainProject.language}</span>
          </div>
        </div>
        
        <div class="side-project right-project">
          <div class="project-card small" style="--gradient: ${rightProject1.gradient}">
            <div class="project-header">
              <div class="project-icon" style="background: ${rightProject1.gradient}">
                ${getProjectIcon(rightProject1.language)}
              </div>
              <h3 class="project-title">${rightProject1.name}</h3>
            </div>
            <p class="project-description">${rightProject1.description[currentLanguage]}</p>
            <span class="project-language">${rightProject1.language}</span>
          </div>
        </div>
        
        <div class="side-project far-right-project">
          <div class="project-card extra-small" style="--gradient: ${rightProject2.gradient}">
            <div class="project-header">
              <div class="project-icon" style="background: ${rightProject2.gradient}">
                ${getProjectIcon(rightProject2.language)}
              </div>
              <h3 class="project-title">${rightProject2.name}</h3>
            </div>
            <p class="project-description">${rightProject2.description[currentLanguage]}</p>
            <span class="project-language">${rightProject2.language}</span>
          </div>
        </div>
      </div>
    `;
  }
  
  carouselTrack.innerHTML = generateProjectsLayout(currentIndex);
  
  // 生成分页点（每个项目一个点）
  carouselDots.innerHTML = openSourceProjects.map((_, index) => 
    `<button class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>`
  ).join('');
  
  // 初始化轮播
  initCarousel(generateProjectsLayout);
}

// 更新生态社区
function updateCommunity() {
  const t = getTranslation();
  const communityLayout = document.querySelector('.community-layout');
  
  if (!communityLayout) return;
  
  // 更新标题和副标题
  const communityTitle = document.querySelector('.community-section h3');
  const communitySubtitle = document.querySelector('.community-section .subtitle');
  if (communityTitle) communityTitle.textContent = t.community.title;
  if (communitySubtitle) communitySubtitle.textContent = t.community.subtitle;
  
  // 生成社区矩阵布局
  function generateCommunityMatrix() {
    const items = t.community.items;
    
    return items.map(item => `
      <div class="community-card" style="--gradient: ${item.gradient}">
        <div class="community-header">
          <div class="community-icon" style="background: ${item.gradient}">
            ${icons.users}
          </div>
          <h4 class="community-title">${item.name}</h4>
        </div>
        <p class="community-description">${item.description}</p>
        <div class="community-stats">
          <span class="community-type">${item.type}</span>
        </div>
        ${(index === 0) ? `<a href="https://zenodo.org/communities/nvaf/records?q=&l=list&p=1&s=10&sort=newest" target="_blank" rel="noopener noreferrer" class="community-join-btn-link">${currentLanguage === 'zh' ? '加入社区' : 'Join Community'}</a>` : (index === 2) ? `<a href="https://github.com/orgs/Tensorlinx/repositories" target="_blank" rel="noopener noreferrer" class="community-join-btn-link">${currentLanguage === 'zh' ? '加入社区' : 'Join Community'}</a>` : (item.url) ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="community-join-btn-link">${currentLanguage === 'zh' ? '加入社区' : 'Join Community'}</a>` : `<button class="community-join-btn">${currentLanguage === 'zh' ? '加入社区' : 'Join Community'}</button>`}
      </div>
    `).join('');
  }
  
  communityLayout.innerHTML = generateCommunityMatrix();
}

// 初始化社区轮播功能


// 初始化轮播功能
function initCarousel(generateLayoutFn) {
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-next');
  const prevBtn = document.querySelector('.carousel-prev');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (!track) return;
  
  let currentIndex = 0;
  const totalProjects = openSourceProjects.length;
  
  // 更新轮播内容
  function updateCarousel() {
    track.innerHTML = generateLayoutFn(currentIndex);
    
    // 更新分页点
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // 下一个项目
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalProjects;
    updateCarousel();
  }
  
  // 上一个项目
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    updateCarousel();
  }
  
  // 跳转到指定项目
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }
  
  // 绑定事件
  nextBtn?.addEventListener('click', nextSlide);
  prevBtn?.addEventListener('click', prevSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // 自动播放
  let autoplayInterval = setInterval(nextSlide, 5000);
  
  // 鼠标悬停时暂停自动播放
  const carousel = document.querySelector('.projects-carousel');
  carousel?.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  carousel?.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
  });
  
  // 响应式处理
  function handleResize() {
    updateCarousel();
  }
  
  window.addEventListener('resize', handleResize);
  
  // 初始化位置
  updateCarousel();
}

// 获取项目图标
function getProjectIcon(language) {
  const iconMap = {
    'Python': icons.brain,
    'Go': icons.database,
    'C++': icons.zap,
    'TypeScript': icons.shield,
    'Rust': icons.cpu,
    'JavaScript': icons.globe
  };
  return iconMap[language] || icons.code;
}

// 导航栏搜索功能
let navSearchData = [];
let isNavSearchOpen = false;

// 初始化导航栏搜索数据
function initNavSearchData() {
  const t = getTranslation();
  
  // 中文搜索数据
  const zhContent = [
    { title: '首页', url: 'index.html', content: 'Tensorlinx 上海灵兮矩阵 AI 人工智能' },
    { title: '产品系列', url: 'products.html', content: '乌托邦AI内核 BoxIDE AI解决方案' },
    { title: '新闻动态', url: 'news.html', content: '最新新闻 技术白皮书 行业分析' },
    { title: '岗位招聘', url: 'NAVFIO.html', content: '技术岗位 产品岗位 管理岗位 招聘' },
    { title: '关于我们', url: 'about.html', content: '公司简介 发展历程 企业文化 联系我们' },
    { title: '吴翔接任联席主席', url: 'news-wuxiang.html', content: '吴翔 2月25日 新世家 香港 联席主席 投票' },
    { title: 'Redox资助', url: 'news.html', content: 'Tensorlinx redox 开发小组 资助 开源' },
    { title: '乌托邦3操作系统', url: 'products.html', content: '乌托邦3 x64 操作系统 AI WSL Linux' }
  ];
  
  // 英文搜索数据
  const enContent = [
    { title: 'Home', url: 'index.html', content: 'Tensorlinx Shanghai Lingxi Matrix AI Artificial Intelligence' },
    { title: 'Products', url: 'products.html', content: 'Utopia AI Kernel BoxIDE AI Solutions' },
    { title: 'News', url: 'news.html', content: 'Latest News Technical Whitepapers Industry Analysis' },
    { title: 'Careers', url: 'NAVFIO.html', content: 'Tech Positions Product Positions Management Positions Jobs' },
    { title: 'About Us', url: 'about.html', content: 'Company Profile History Culture Contact' },
    { title: 'Wu Xiang Assumes Co-Chairman', url: 'news-wuxiang.html', content: 'Wu Xiang February 25 New Shijia Hong Kong Co-Chairman Vote' },
    { title: 'Redox Funding', url: 'news.html', content: 'Tensorlinx redox development team funding open source' },
    { title: 'Utopia 3 Operating System', url: 'products.html', content: 'Utopia 3 x64 OS AI WSL Linux' }
  ];
  
  // 根据当前语言选择搜索数据
  navSearchData = currentLanguage === 'zh' ? zhContent : enContent;
}

// 导航栏搜索功能
function handleNavSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  const resultsDiv = document.getElementById('navSearchResults');
  
  if (!resultsDiv) return;
  
  if (query.length === 0) {
    resultsDiv.innerHTML = '';
    return;
  }
  
  const results = navSearchData.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.content.toLowerCase().includes(query)
  );
  
  if (results.length === 0) {
    const noResultText = currentLanguage === 'zh' ? '未找到相关结果' : 'No results found';
    resultsDiv.innerHTML = `<div class="nav-no-results">${noResultText}</div>`;
  } else {
    resultsDiv.innerHTML = results.map(item => `
      <div class="nav-search-result-item" onclick="window.location.href='${item.url}'">
        <div class="nav-result-title">${item.title}</div>
        <div class="nav-result-content">${item.content}</div>
      </div>
    `).join('');
  }
}

// 切换导航栏搜索
function toggleNavSearch() {
  const searchBox = document.getElementById('navSearchBox');
  const searchInput = document.getElementById('navSearchInput');
  
  if (!searchBox || !searchInput) return;
  
  isNavSearchOpen = !isNavSearchOpen;
  
  if (isNavSearchOpen) {
    searchBox.classList.add('active');
    searchInput.focus();
    // 更新placeholder文本
    updateSearchPlaceholder();
  } else {
    searchBox.classList.remove('active');
    searchInput.value = '';
    if (document.getElementById('navSearchResults')) {
      document.getElementById('navSearchResults').innerHTML = '';
    }
  }
}

// 更新搜索框placeholder
function updateSearchPlaceholder() {
  const searchInput = document.getElementById('navSearchInput');
  if (searchInput) {
    const placeholderText = currentLanguage === 'zh' ? '搜索...' : 'Search...';
    searchInput.placeholder = placeholderText;
  }
}

// 创建背景装饰
function createBackgroundDecorations() {
  // 背景装饰 - 已移除所有浮动动画
  const decorations = document.createElement('div');
  decorations.className = 'background-decorations';
  decorations.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  `;
  return decorations;
}

// 初始化页面
function initializePage() {
  const root = document.getElementById('root');
  
  // 如果没有 root 元素，说明是静态页面，跳过动态生成
  if (!root) {
    console.log('静态页面模式：跳过动态页面生成');
    return;
  }
  
  const t = getTranslation();
  
  root.innerHTML = `
    <!-- 背景装饰 - 已移除 -->
    
    <!-- 导航栏 -->
    <header>
      <nav>
        <a href="#" class="logo">
          <img src="img/remove.photos-removed-background.png" alt="TensorLinx" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
          <span style="display: none;">TensorLinx</span>
        </a>
        
        <ul class="nav-links">
          <li><a href="#home" data-nav="home">${t.nav.home}</a></li>
          <li><a href="#home" data-nav="home">${t.nav.home}</a></li>
          <li><a href="#products" data-nav="products">${t.nav.products}</a></li>
          <li><a href="#about" data-nav="about">${t.nav.news}</a></li>
          <li><a href="NAVFIO.html" data-nav="jobs">${t.nav.jobs}</a></li>
          <li><a href="#about-us" data-nav="about-us">${t.nav.about}</a></li>
          <li><a href="#community" data-nav="community">${t.nav.community}</a></li>
          <li><a href="#contact" data-nav="contact">${t.nav.contact}</a></li>
        </ul>
        
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button class="language-toggle" onclick="toggleLanguage()">
            ${icons.globe}
            ${currentLanguage === 'zh' ? 'EN' : '中文'}
          </button>
          
          <button class="mobile-menu-button" onclick="toggleMobileMenu()">
            ${icons.menu}
          </button>
        </div>
      </nav>
      
      <div class="mobile-menu" id="mobileMenu">
        <ul class="nav-links">
         <li><a href="#home" data-nav="home" onclick="closeMobileMenu()">${t.nav.home}</a></li>
         <li><a href="#products" data-nav="products" onclick="closeMobileMenu()">${t.nav.products}</a></li>
         <li><a href="#about" data-nav="about" onclick="closeMobileMenu()">${t.nav.news}</a></li>
         <li><a href="NAVFIO.html" data-nav="jobs" onclick="closeMobileMenu()">${t.nav.jobs}</a></li>
         <li><a href="#about-us" data-nav="about-us" onclick="closeMobileMenu()">${t.nav.about}</a></li>
         <li><a href="#community" data-nav="community" onclick="closeMobileMenu()">${t.nav.community}</a></li>
         <li><a href="#contact" data-nav="contact" onclick="closeMobileMenu()">${t.nav.contact}</a></li>
       </ul>
      </div>
    </header>
    
    <!-- 主要内容 -->
    <main>
      <!-- Hero 部分 -->
      <section class="hero" id="home">
        <div class="hero-content">
          <div class="hero-badge">${t.hero.badge}</div>
          <h1>${t.hero.title} <span class="highlight">${t.hero.highlight}</span> ${t.hero.subtitle}</h1>
          <p>${t.hero.description}</p>
          <div class="hero-buttons">
            <a href="#about" class="btn btn-primary" data-cta="primary">
              ${t.hero.cta.primary} ${icons.arrowRight}
            </a>

          </div>
        </div>
      </section>
      

      <!-- 开源项目部分 -->
      <section class="projects" id="projects">
        <div class="projects-header">
          <button class="carousel-btn carousel-prev" aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <div class="projects-title-section">
            <h2>${t.hero.demo}</h2>
            <p class="subtitle">展示我们的开源贡献和技术实力</p>
          </div>
          <button class="carousel-btn carousel-next" aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
          <div class="mobile-carousel-controls">
            <button class="carousel-btn carousel-prev mobile-btn" aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button class="carousel-btn carousel-next mobile-btn" aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
        </div>
        <div class="projects-carousel">
          <div class="carousel-container">
            <div class="carousel-track">
              <!-- 项目将通过 JavaScript 动态生成 -->
            </div>
          </div>
          <div class="carousel-controls">
            <div class="carousel-dots"></div>
          </div>
        </div>
      </section>
      
      <!-- 名人名言部分 -->
      <section class="quote-section">
        <div class="quote-container">
          <div class="quote-avatar">
            <img src="https://youke1.picui.cn/s1/2025/07/23/6880dff2d4686.jpg" alt="名人头像" class="avatar-image">
          </div>
          <div class="quote-content">
            <blockquote class="quote-text">
             我们会陪伴并托举每个人、每个家庭、每个公司的梦想
            </blockquote>
            <cite class="quote-author">— 吴翔，灵兮矩阵创始人</cite>
          </div>
        </div>
      </section>
      
      <!-- 关于我们部分 -->
      <section class="about" id="about">
        <div class="about-grid">
          <div class="about-content">
            <h2>${t.about.title}</h2>
            <p>${t.about.description1}</p>
            <p>${t.about.description2}</p>

          </div>
          <div class="about-image">
            <div class="about-image-content">
              <div class="about-image-inner">
                <div class="about-image-icon">
                  ${icons.brain}
                </div>
                <p>${t.about.imageAlt}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 生态社区部分 -->
        <div class="community-section">
          <h3>${t.community.title}</h3>
          <p class="subtitle">${t.community.subtitle}</p>
          <div class="community-layout">
            <!-- 社区项目将通过 JavaScript 动态生成 -->
          </div>
        </div>
      </section>
      

      <!-- 联系我们部分 -->
      <section class="contact" id="contact">
        <h2>${t.contact.title}</h2>
        <p class="subtitle">${t.contact.subtitle}</p>
        
        <div class="contact-card">
          <div class="contact-info">
            <div class="contact-item">
              <h3>${t.contact.email}</h3>
              <p>tensorlinx@tensorlinx.cn</p>
            </div>

            <div class="contact-item">
              <h3>${t.contact.support}</h3>
              <p>24/7 ${currentLanguage === 'zh' ? '开发者支持' : 'Developer Support'}</p>
            </div>
          </div>
          

        </div>
      </section>
    </main>
    
    <!-- 页脚 -->
    <footer>
      <div class="footer-content">
        <!-- 鸣谢部分 -->
        <div class="acknowledgments">
          <h3>${t.footer.acknowledgments}</h3>
          <p class="subtitle">${t.footer.partners.title}</p>
          <div class="partners-grid">
            <!-- 合作伙伴将通过 JavaScript 动态生成 -->
          </div>
        </div>
        
        <div class="footer-main">
          <div>
            <div class="footer-brand">
              <img src="img/remove.photos-removed-background.png" alt="TensorLinx" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
              <span style="display: none; font-size: 1.5rem; font-weight: 800;">TensorLinx</span>
            </div>
            <p class="footer-description">${t.footer.description}</p>
            <div class="social-links">
            <a href="https://github.com/NVAF-A" class="social-link" aria-label="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Discord">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="X (Twitter)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="哔哩哔哩">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .356-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.789 1.894v7.52c.02.764.283 1.395.789 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.789-1.893v-7.52c-.02-.765-.283-1.396-.789-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
              </svg>
            </a>
          </div>
          </div>
          

          
          <div class="footer-section">
             <h3 data-footer="support">${t.footer.support}</h3>
             <ul class="footer-links">
               <li><a href="#">${t.footer.links.help}</a></li>
             </ul>
           </div>
        </div>
        
        <div class="footer-bottom">
          <p>${t.footer.copyright} | 沪ICP备2025137506号-1 <a href="#" style="color: #0066cc !important;" onclick="alert('我们已经将该网站服务器迁至美国，根据中国法律规定，我们已经不再适合ICP备案'); return false;">(已废弃)</a></p>
        </div>
      </div>
    </footer>
  `;
  
  // 初始化项目、社区和页脚
  updateProjects();
  updateCommunity();
  updateFooter();
}

function updateFooter() {
  const t = getTranslation();
  
  // 更新页脚关于我们
  const footerAboutTitle = document.querySelector('.footer-section h3');
  const footerAboutDesc = document.querySelector('.footer-section p');
  if (footerAboutTitle && t.footer?.about) footerAboutTitle.textContent = t.footer.about;
  if (footerAboutDesc && t.footer?.aboutDesc) footerAboutDesc.textContent = t.footer.aboutDesc;
  
  // 更新产品服务
  const productServicesTitle = document.querySelector('[data-translate="footer.productServices"]');
  if (productServicesTitle && t.footer?.productServices) {
    productServicesTitle.textContent = t.footer.productServices;
  }
  
  // 更新快速链接
  const quickLinksTitle = document.querySelector('.footer-section h3:nth-of-type(2)');
  if (quickLinksTitle && t.footer?.quickLinks) {
    quickLinksTitle.textContent = t.footer.quickLinks;
  }
  
  // 更新联系方式
  const contactInfoTitle = document.querySelector('.footer-section h3:nth-of-type(3)');
  if (contactInfoTitle && t.footer?.contactInfo) {
    contactInfoTitle.textContent = t.footer.contactInfo;
  }
  
  // 更新联系信息列表 - 更精确地更新各个部分而不是整个元素
  const emailElement = document.querySelector('.footer-section:last-child ul li:first-child span[data-translate="footer.emailLabel"]');
  const emailTextElement = document.querySelector('.footer-section:last-child ul li:first-child');
  
  if (t.footer && emailTextElement) {
    // 更新邮箱标签
    if (emailElement && t.footer.emailLabel) {
      emailElement.textContent = t.footer.emailLabel;
    }
  }
  
  // 更新合作伙伴网格
  const partnersGrid = document.querySelector('.partners-grid');
  if (partnersGrid && t.footer?.partners) {
    partnersGrid.innerHTML = t.footer.partners.items.map(item => `
      <a href="${item.url}" class="partner-card" target="_blank" rel="noopener noreferrer">
        <div class="partner-logo">
          <img src="${item.logo}" alt="${item.name}">
        </div>
        <p class="partner-name">${item.name}</p>
      </a>
    `).join('');
  }
  
  // 更新版权信息
  const copyrightCn = document.querySelector('.copyright-cn');
  const copyrightEn = document.querySelector('.copyright-en');
  if (copyrightCn && copyrightEn) {
    if (currentLanguage === 'zh') {
      copyrightCn.style.display = 'block';
      copyrightEn.style.display = 'none';
    } else {
      copyrightCn.style.display = 'none';
      copyrightEn.style.display = 'block';
    }
  }
  
  // 更新Cookie政策、Cookie管理和隐私政策链接
  const cookiePolicyLink = document.querySelector('[data-translate="footer.cookiePolicy"]');
  const manageCookiesLink = document.querySelector('[data-translate="footer.manageCookies"]');
  const privacyPolicyLink = document.querySelector('[data-translate="footer.privacyPolicy"]');
  
  if (cookiePolicyLink && t.footer?.cookiePolicy) {
    cookiePolicyLink.textContent = t.footer.cookiePolicy;
  }
  if (manageCookiesLink && t.footer?.manageCookies) {
    manageCookiesLink.textContent = t.footer.manageCookies;
  }
  if (privacyPolicyLink && t.footer?.privacyPolicy) {
    privacyPolicyLink.textContent = t.footer.privacyPolicy;
  }
}

// 移动端菜单控制
function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  const mobileMenu = document.getElementById('mobileMenu');
  const menuButton = document.querySelector('.mobile-menu-button');
  
  if (!mobileMenu || !menuButton) return;
  
  if (isMenuOpen) {
    mobileMenu.classList.add('open');
    menuButton.innerHTML = icons.x;
  } else {
    mobileMenu.classList.remove('open');
    menuButton.innerHTML = icons.menu;
  }
}

function closeMobileMenu() {
  isMenuOpen = false;
  const mobileMenu = document.getElementById('mobileMenu');
  const menuButton = document.querySelector('.mobile-menu-button');
  
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
  }
  if (menuButton) {
    menuButton.innerHTML = icons.menu;
  }
}

// 滚动事件处理
function handleScroll() {
  scrollY = window.scrollY;
  const header = document.querySelector('header');
  const grayBanner = document.querySelector('.gray-banner');
  const hero = document.querySelector('.hero');
  
  if (scrollY > 50) {
    header.classList.add('scrolled');
    // 向下滚动时隐藏横幅
    if (grayBanner) {
      grayBanner.style.transform = 'translateY(-100%)';
      grayBanner.style.opacity = '0';
    }
    // 轮播图 margin 调整为导航栏高度
    if (hero) {
      hero.style.marginTop = '64px';
    }
  } else {
    header.classList.remove('scrolled');
    // 回到顶部时显示横幅
    if (grayBanner) {
      grayBanner.style.transform = 'translateY(0)';
      grayBanner.style.opacity = '1';
    }
    // 轮播图 margin 恢复为导航栏 + 横幅高度
    if (hero) {
      hero.style.marginTop = '102px';
    }
  }
}

// 鼠标移动事件处理 - 已移除背景装饰相关代码
function handleMouseMove(e) {
  mousePosition = { x: e.clientX, y: e.clientY };
  // 背景装饰动画已移除
}

// 平滑滚动
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// 事件监听器
function setupEventListeners() {
  // 滚动事件
  window.addEventListener('scroll', handleScroll);
  
  // 鼠标移动事件
  window.addEventListener('mousemove', handleMouseMove);
  
  // 导航链接点击事件
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const target = e.target.getAttribute('href');
      if (target !== '#') {
        smoothScroll(target);
      }
      closeMobileMenu();
    }
  });
  
  // 窗口大小改变事件
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 加载翻译文件，加载完成后会自动初始化页面
  loadTranslations();
  
  // 添加加载动画
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
  
  // 延迟启动背景动画，确保页面完全加载
  setTimeout(() => {
    document.body.classList.add('animations-ready');
  }, 500);
});

// 设置语言切换按钮事件
function setupLanguageButtons() {
  const langBtns = document.querySelectorAll('.lang-btn');
  
  langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.dataset.lang;
      
      // 如果点击的是当前语言，不做任何操作
      if (lang === currentLanguage) return;
      
      // 直接设置为指定的语言
      currentLanguage = lang;
      window.currentLanguage = currentLanguage; // 同步更新全局变量
      window.userMadeSelection = true;  // 标记用户已做选择
      updateContent();
      updateLanguageButtons();
      
      // 添加切换动画效果
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  // 加载保存的语言偏好（优先检查cookie，然后是localStorage）
  // 仅在页面首次加载时应用保存的偏好，后续用户手动选择的语言优先
  const savedLang = getCookie('preferredLanguage') || localStorage.getItem('preferredLanguage');
  if (savedLang && typeof window.userMadeSelection === 'undefined') {
    currentLanguage = savedLang;
    window.currentLanguage = currentLanguage; // 同步更新全局变量
    updateContent();
  }
  
  // 同步按钮状态
  updateLanguageButtons();
}

// 更新语言按钮状态
function updateLanguageButtons() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    if (btn.dataset.lang === currentLanguage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // 保存语言偏好到 localStorage 和 cookie
  localStorage.setItem('preferredLanguage', currentLanguage);
  setCookie('preferredLanguage', currentLanguage);
  
  // 更新页面语言属性
  document.documentElement.lang = currentLanguage;
}

// Cookie 政策相关函数
function showCookieConsent() {
  // 检查用户是否已经同意过
  const cookieConsent = getCookie('cookie_consent');
  if (!cookieConsent) {
    // 显示Cookie同意弹窗
    const cookieConsentElement = document.getElementById('cookie-consent');
    if (cookieConsentElement) {
      cookieConsentElement.style.display = 'block';
    }
  }
}

function handleCookieConsent(consentType) {
  // 设置Cookie同意状态
  setCookie('cookie_consent', consentType, 365); // 保存一年
  
  // 隐藏Cookie同意弹窗
  const cookieConsentElement = document.getElementById('cookie-consent');
  if (cookieConsentElement) {
    cookieConsentElement.style.display = 'none';
  }
  
  // 根据用户选择执行相应操作
  if (consentType === 'accept_all') {
    // 用户接受所有Cookie
    console.log('用户接受了所有Cookie');
  } else if (consentType === 'reject') {
    // 用户拒绝Cookie，可能需要清除某些Cookie
    console.log('用户拒绝了Cookie');
  } else if (consentType === 'customize') {
    // 用户选择自定义，显示详细的Cookie设置面板
    showCustomizeCookiePanel();
  } else if (consentType === 'customize_saved') {
    // 用户已保存自定义设置
    console.log('用户已保存自定义Cookie设置');
  }
}

// 显示自定义Cookie设置面板
function showCustomizeCookiePanel() {
  // 创建自定义Cookie设置面板
  const existingPanel = document.getElementById('cookie-customize-panel');
  if (existingPanel) {
    existingPanel.remove();
  }
  
  const t = getTranslation();
  
  const customizePanel = document.createElement('div');
  customizePanel.id = 'cookie-customize-panel';
  customizePanel.className = 'cookie-customize-panel';
  customizePanel.innerHTML = `
    <div class="cookie-customize-content">
      <div class="cookie-customize-header">
        <h4>\${t.cookie?.customizeTitle || '自定义 Cookie 设置'}</h4>
        <button id="close-cookie-panel" class="close-cookie-panel-btn">×</button>
      </div>
      <div class="cookie-options">
        <div class="cookie-option">
          <input type="checkbox" id="necessary-cookies" checked disabled>
          <label for="necessary-cookies">\${t.cookie?.necessaryLabel || '必要 Cookie'} <small>\${t.cookie?.necessaryDesc || '(无法关闭)'}</small></label>
        </div>
        <div class="cookie-option">
          <input type="checkbox" id="analytics-cookies" checked>
          <label for="analytics-cookies">\${t.cookie?.analyticsLabel || '分析 Cookie'}</label>
        </div>
        <div class="cookie-option">
          <input type="checkbox" id="marketing-cookies">
          <label for="marketing-cookies">\${t.cookie?.marketingLabel || '营销 Cookie'}</label>
        </div>
        <div class="cookie-option">
          <input type="checkbox" id="language-preferences" checked>
          <label for="language-preferences">\${t.cookie?.languageLabel || '语言偏好 Cookie'}</label>
        </div>
      </div>
      <div class="cookie-customize-actions">
        <button id="save-cookie-settings" class="btn btn-primary">\${t.cookie?.saveSettings || t.cookie?.customize || '保存设置'}</button>
        <button id="accept-all-from-customize" class="btn btn-secondary">\${t.cookie?.acceptAll || '接受全部'}</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(customizePanel);
  
  // 添加事件监听器
  document.getElementById('close-cookie-panel').addEventListener('click', function() {
    document.getElementById('cookie-customize-panel').remove();
  });
  
  document.getElementById('save-cookie-settings').addEventListener('click', function() {
    saveCustomizedCookieSettings();
  });
  
  document.getElementById('accept-all-from-customize').addEventListener('click', function() {
    handleCookieConsent('accept_all');
  });
}

// 保存自定义Cookie设置
function saveCustomizedCookieSettings() {
  const analyticsChecked = document.getElementById('analytics-cookies').checked;
  const marketingChecked = document.getElementById('marketing-cookies').checked;
  const languageChecked = document.getElementById('language-preferences').checked;
  
  // 保存详细的Cookie偏好
  const cookiePreferences = {
    necessary: true, // 必要Cookie总是启用
    analytics: analyticsChecked,
    marketing: marketingChecked,
    language: languageChecked
  };
  
  setCookie('cookie_preferences', JSON.stringify(cookiePreferences), 365);
  
  // 隐藏自定义面板
  const customizePanel = document.getElementById('cookie-customize-panel');
  if (customizePanel) {
    customizePanel.remove();
  }
  
  // 记录用户选择
  handleCookieConsent('customize_saved');
}

// 页面加载完成后显示Cookie政策
document.addEventListener('DOMContentLoaded', function() {
  // 延迟显示Cookie同意弹窗，让用户先看到主要内容
  setTimeout(showCookieConsent, 2000);
});

// 为Cookie同意按钮添加事件监听器
document.addEventListener('DOMContentLoaded', function() {
  const acceptAllBtn = document.getElementById('accept-all-cookies');
  const rejectBtn = document.getElementById('reject-cookies');
  const customizeBtn = document.getElementById('customize-cookies');
  
  if (acceptAllBtn) {
    acceptAllBtn.addEventListener('click', function() {
      handleCookieConsent('accept_all');
    });
  }
  
  if (rejectBtn) {
    rejectBtn.addEventListener('click', function() {
      handleCookieConsent('reject');
    });
  }
  
  if (customizeBtn) {
    customizeBtn.addEventListener('click', function() {
      handleCookieConsent('customize');
    });
  }
});

// 导出函数供全局使用
window.toggleLanguage = toggleLanguage;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;