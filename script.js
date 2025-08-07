// 全局状态
let currentLanguage = 'zh';
let isMenuOpen = false;
let scrollY = 0;
let mousePosition = { x: 0, y: 0 };

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
//   //       <p>网站正在公安备案中，暂不支持点击访问，详细请联系官方邮箱ym9981@qq.com</p>
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

// 翻译数据
const translations = {
  zh: {
    title: "TensorLinx - 领先的AI通用应用技术企业",
    nav: {
      home: "首页",
      about: "关于我们",
      products: "产品",
      jobs: "岗位招聘",
      contact: "联系我们",
    },
    hero: {
      badge: "🏢BoxUI测试版v.1.0正式发布在GitHub",
      title: "构建智能未来的",
      highlight: "TensorLinx",
      subtitle: "科技公司",
      description: "TensorLinx致力于为全球企业提供前沿的人工智能解决方案，通过创新技术推动行业数字化转型",
      cta: {
        primary: "了解更多",
      },
      demo: "开源项目展示",
    },

    products: {
      title: "最新产品展示",
      subtitle: "探索我们的创新产品解决方案",
      moreText: "更多产品",
      items: [
        {
          title: "TensorFlow 企业版",
          description: "企业级AI开发平台，提供完整的机器学习解决方案",
          features: ["多框架支持", "企业级安全", "云端部署"],
          gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
          title: "AI智能助手",
          description: "基于大语言模型的智能对话系统，支持多轮对话和任务执行",
          features: ["自然语言处理", "多轮对话", "任务自动化"],
          gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
          title: "数据分析平台",
          description: "可视化数据分析工具，支持实时数据处理和智能洞察",
          features: ["实时处理", "可视化图表", "智能分析"],
          gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        },
        {
          title: "边缘计算引擎",
          description: "超低延迟的边缘AI推理引擎，专为物联网设备优化",
          features: ["超低延迟", "边缘部署", "物联网优化"],
          gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        }
      ]
    },
    about: {
      title: "关于TensorLinx",
      description1: "TensorLinx成立于2020年，是一家专注于人工智能技术研发与应用的创新型科技企业。我们拥有一支由资深AI专家和工程师组成的专业团队，致力于为各行业客户提供领先的AI解决方案。",
      description2: "公司总部位于北京，在上海、深圳设有分支机构。我们已为超过200家企业提供AI技术服务，涵盖金融、制造、医疗、教育等多个行业领域。",
      cta: "了解企业文化",
      imageAlt: "企业团队",
    },
    contact: {
      title: "与我们合作",
      subtitle: "欢迎与TensorLinx建立合作关系，共同探索AI技术的无限可能",
      email: "商务合作",
      phone: "客服热线",
      support: "技术支持",
      cta: "立即咨询",
    },
    community: {
      title: "官方生态社区",
      subtitle: "加入我们的技术社区，与全球开发者共同成长",
      items: [
        {
          name: "TensorLinx开发者社区",
          description: "专业的AI开发者交流平台，分享最新技术动态",
          members: "10,000+",
          type: "开发者社区",
          gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
          name: "AI技术论坛",
          description: "深度技术讨论，前沿算法分享，专家在线答疑",
          members: "25,000+",
          type: "技术论坛",
          gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
          name: "开源项目协作",
          description: "参与开源项目开发，贡献代码，共建AI生态",
          members: "5,000+",
          type: "开源协作",
          gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        },
        {
          name: "企业技术支持",
          description: "为企业用户提供专业技术支持和解决方案咨询",
          members: "500+",
          type: "企业服务",
          gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        }
      ]
    },
    footer: {
        description: "TensorLinx - 专业的人工智能技术服务商，为企业数字化转型提供强有力的技术支撑。",
        support: "支持",
      acknowledgments: "鸣谢支持",
      links: {
          help: "帮助中心",
        },
      partners: {
        title: "感谢以下合作伙伴的支持",
        items: [
          {
            name: "GitHub开源社区",
            logo: "/images/logos/github-logo.svg",
            url: "https://github.com",
          },
          {
            name: "哔哩哔哩创作者社区",
            logo: "/images/logos/bilibili-logo.svg",
            url: "https://www.bilibili.com",
          },
          {
            name: "NAVF新世家",
            logo: "/images/logos/navf-logo.svg",
            url: "#",
          },
        ],
      },
      copyright: "© 2024 TensorLinx科技有限公司. 保留所有权利。",
    },
  },
  en: {
    title: "TensorLinx - Leading AI General Application Technology Company",
    nav: {
      home: "Home",
      about: "About Us",
      products: "Products",
      jobs: "Careers",
      contact: "Contact",
    },
    hero: {
      badge: "🏢BoxUI Beta v.1.0 Released on GitHub",
      title: "Building the Intelligent Future with",
      highlight: "TensorLinx",
      subtitle: "Technology",
      description: "TensorLinx is committed to providing cutting-edge artificial intelligence solutions for global enterprises, driving industry digital transformation through innovative technology",
      cta: {
        primary: "Learn More",
      },
      demo: "Open Source Projects",
    },

    products: {
      title: "Latest Product Showcase",
      subtitle: "Explore our innovative product solutions",
      moreText: "More Products",
      items: [
        {
          title: "TensorFlow Enterprise",
          description: "Enterprise-grade AI development platform with complete machine learning solutions",
          features: ["Multi-framework Support", "Enterprise Security", "Cloud Deployment"],
          gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
          title: "AI Assistant",
          description: "Intelligent dialogue system based on large language models with multi-turn conversations",
          features: ["Natural Language Processing", "Multi-turn Dialogue", "Task Automation"],
          gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
          title: "Data Analytics Platform",
          description: "Visual data analysis tool supporting real-time processing and intelligent insights",
          features: ["Real-time Processing", "Visual Charts", "Smart Analytics"],
          gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        },
        {
          title: "Edge Computing Engine",
          description: "Ultra-low latency edge AI inference engine optimized for IoT devices",
          features: ["Ultra-low Latency", "Edge Deployment", "IoT Optimized"],
          gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        }
      ]
    },
    about: {
      title: "About TensorLinx",
      description1: "Founded in 2020, TensorLinx is an innovative technology company focused on artificial intelligence research and application. We have a professional team of senior AI experts and engineers, dedicated to providing leading AI solutions for customers across industries.",
      description2: "Headquartered in Beijing with branches in Shanghai and Shenzhen, we have provided AI technology services to over 200 enterprises across finance, manufacturing, healthcare, education and other industries.",
      cta: "Corporate Culture",
      imageAlt: "Corporate Team",
    },
    contact: {
      title: "Partner with Us",
      subtitle: "Welcome to establish partnerships with TensorLinx and explore the infinite possibilities of AI technology together",
      email: "Business Partnership",
      phone: "Customer Service",
      support: "Technical Support",
      cta: "Contact Now",
    },
    community: {
      title: "Official Ecosystem Community",
      subtitle: "Join our tech community and grow together with global developers",
      items: [
        {
          name: "TensorLinx Developer Community",
          description: "Professional AI developer communication platform sharing latest tech trends",
          members: "10,000+",
          type: "Developer Community",
          gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
          name: "AI Technology Forum",
          description: "In-depth technical discussions, cutting-edge algorithm sharing, expert Q&A",
          members: "25,000+",
          type: "Tech Forum",
          gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
          name: "Open Source Collaboration",
          description: "Participate in open source development, contribute code, build AI ecosystem",
          members: "5,000+",
          type: "Open Source",
          gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        },
        {
          name: "Enterprise Tech Support",
          description: "Professional technical support and solution consulting for enterprise users",
          members: "500+",
          type: "Enterprise Service",
          gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        }
      ]
    },
    footer: {
        description: "TensorLinx - Professional artificial intelligence technology service provider, providing strong technical support for enterprise digital transformation.",
        support: "Support",
      acknowledgments: "Acknowledgments",
      links: {
          help: "Help Center",
        },
      partners: {
        title: "Thanks to our partners for their support",
        items: [
          {
            name: "GitHub Open Source Community",
            logo: "/images/logos/github-logo.svg",
            url: "https://github.com",
          },
          {
            name: "Bilibili Creator Community",
            logo: "/images/logos/bilibili-logo.svg",
            url: "https://www.bilibili.com",
          },
          {
            name: "NAVF New World",
            logo: "/images/logos/navf-logo.svg",
            url: "#",
          },
        ],
      },
      copyright: "© 2024 TensorLinx Technology Co., Ltd. All rights reserved.",
    },
  },
};

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

// 获取当前翻译
function getTranslation() {
  return translations[currentLanguage];
}

// 切换语言
function toggleLanguage() {
  currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
  updateContent();
}

// 更新内容
function updateContent() {
  const t = getTranslation();
  
  // 更新页面标题
  document.title = t.title;
  
  // 更新导航
  document.querySelector('[data-nav="home"]').textContent = t.nav.home;
  document.querySelector('[data-nav="about"]').textContent = t.nav.about;
document.querySelector('[data-nav="jobs"]').textContent = t.nav.jobs;
  document.querySelector('[data-nav="contact"]').textContent = t.nav.contact;

  
  // 更新语言切换按钮
  document.querySelector('.language-toggle').innerHTML = `
    ${icons.globe}
    ${currentLanguage === 'zh' ? 'EN' : '中文'}
  `;
  
  // 更新Hero部分
  document.querySelector('.hero-badge').textContent = t.hero.badge;
  document.querySelector('.hero h1').innerHTML = `
    ${t.hero.title} <span class="highlight">${t.hero.highlight}</span> ${t.hero.subtitle}
  `;
  document.querySelector('.hero p').textContent = t.hero.description;
  document.querySelector('[data-cta="primary"]').innerHTML = `
    ${t.hero.cta.primary} ${icons.arrowRight}
  `;

  

  
  
  // 更新关于我们
  document.querySelector('.about h2').textContent = t.about.title;
  const aboutPs = document.querySelectorAll('.about-content p');
  aboutPs[0].textContent = t.about.description1;
  aboutPs[1].textContent = t.about.description2;
  document.querySelector('[data-about-cta]').innerHTML = `
    ${t.about.cta} ${icons.arrowRight}
  `;
  document.querySelector('.about-image p').textContent = t.about.imageAlt;
  
  // 更新开源项目
  updateProjects();
  
  // 更新生态社区
  updateCommunity();
  
  // 更新联系我们
  document.querySelector('.contact h2').textContent = t.contact.title;
  document.querySelector('.contact .subtitle').textContent = t.contact.subtitle;
  
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems[0].querySelector('h3').textContent = t.contact.email;
  contactItems[1].querySelector('h3').textContent = t.contact.phone;
  contactItems[2].querySelector('h3').textContent = t.contact.support;
  
  document.querySelector('[data-contact-cta]').textContent = t.contact.cta;
  
  // 更新页脚
  updateFooter();
  

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
          <span class="community-members">${item.members} ${currentLanguage === 'zh' ? '成员' : 'Members'}</span>
          <span class="community-type">${item.type}</span>
        </div>
        <button class="community-join-btn">${currentLanguage === 'zh' ? '加入社区' : 'Join Community'}</button>
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

// 更新页脚
function updateFooter() {
  const t = getTranslation();
  
  // 更新鸣谢部分
  document.querySelector('.acknowledgments h3').textContent = t.footer.acknowledgments;
  document.querySelector('.acknowledgments .subtitle').textContent = t.footer.partners.title;
  
  // 更新合作伙伴
  const partnersGrid = document.querySelector('.partners-grid');
  partnersGrid.innerHTML = t.footer.partners.items.map(partner => `
    <a href="${partner.url}" target="_blank" rel="noopener noreferrer" class="partner-card">
      <div class="partner-logo">
        <img src="${partner.logo}" alt="${partner.name} Logo" onerror="this.style.display='none'">
      </div>
      <p class="partner-name">${partner.name}</p>
    </a>
  `).join('');
  
  // 更新页脚描述
  document.querySelector('.footer-description').textContent = t.footer.description;
  
  // 更新页脚链接
  document.querySelector('[data-footer="support"]').textContent = t.footer.support;
  
  const footerLinks = document.querySelectorAll('.footer-links a');
  const linkKeys = ['community', 'help'];
  footerLinks.forEach((link, index) => {
    if (linkKeys[index] && t.footer.links[linkKeys[index]]) {
      link.textContent = t.footer.links[linkKeys[index]];
    }
  });
  
  // 更新版权信息
  document.querySelector('.footer-bottom').textContent = t.footer.copyright;
}

// 创建背景装饰
function createBackgroundDecorations() {
  const decorations = document.createElement('div');
  decorations.className = 'background-decorations';
  
  // 主要流动装饰
  const flow1 = document.createElement('div');
  flow1.className = 'liquid-flow-1';
  flow1.style.cssText = `
    position: absolute;
    width: 24rem;
    height: 24rem;
    background: linear-gradient(135deg, rgba(31, 41, 55, 0.3), rgba(0, 0, 0, 0.3));
    border-radius: 50%;
    filter: blur(3rem);
    top: -10rem;
    right: -10rem;
  `;
  
  const flow2 = document.createElement('div');
  flow2.className = 'liquid-flow-2';
  flow2.style.cssText = `
    position: absolute;
    width: 20rem;
    height: 20rem;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.25), rgba(55, 65, 81, 0.25));
    border-radius: 50%;
    filter: blur(3rem);
    bottom: -10rem;
    left: -10rem;
    animation-delay: 1s;
  `;
  
  const flow3 = document.createElement('div');
  flow3.className = 'liquid-flow-3';
  flow3.style.cssText = `
    position: absolute;
    width: 18rem;
    height: 18rem;
    background: linear-gradient(135deg, rgba(107, 114, 128, 0.2), rgba(31, 41, 55, 0.2));
    border-radius: 50%;
    filter: blur(3rem);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;
  
  // 额外的流动元素
  const extraFlows = [
    { size: '16rem', pos: 'top: 25%; left: 25%;', anim: 'liquidFlow1', delay: '0s' },
    { size: '12rem', pos: 'top: 75%; right: 25%;', anim: 'liquidFlow2', delay: '2s' },
    { size: '14rem', pos: 'top: 50%; left: 33%;', anim: 'liquidFlow3', delay: '1s' },
    { size: '10rem', pos: 'top: 10%; right: 33%;', anim: 'liquidFlow2', delay: '3s' },
    { size: '13rem', pos: 'bottom: 20%; left: 50%;', anim: 'liquidFlow1', delay: '1.5s' },
    { size: '9rem', pos: 'top: 66%; right: 10%;', anim: 'liquidFlow3', delay: '2.5s' },
    { size: '22rem', pos: 'top: 15%; right: 15%;', anim: 'liquidFlow4', delay: '0.5s' },
    { size: '18rem', pos: 'bottom: 30%; left: 20%;', anim: 'liquidFlow5', delay: '1.8s' },
    { size: '15rem', pos: 'top: 80%; left: 60%;', anim: 'liquidFlow4', delay: '3.2s' },
    { size: '11rem', pos: 'top: 40%; right: 40%;', anim: 'liquidFlow5', delay: '2.7s' },
    { size: '19rem', pos: 'bottom: 10%; right: 30%;', anim: 'liquidFlow4', delay: '4s' },
    { size: '8rem', pos: 'top: 5%; left: 70%;', anim: 'liquidFlow5', delay: '1.2s' }
  ];
  
  extraFlows.forEach((flow, index) => {
    const element = document.createElement('div');
    element.className = `liquid-flow-${flow.anim.slice(-1)}`;
    const colorVariants = [
      ['107, 114, 128', '31, 41, 55'],
      ['55, 65, 81', '0, 0, 0'],
      ['75, 85, 99', '17, 24, 39'],
      ['156, 163, 175', '55, 65, 81']
    ];
    const colorSet = colorVariants[index % 4];
    element.style.cssText = `
      position: absolute;
      width: ${flow.size};
      height: ${flow.size};
      background: linear-gradient(135deg, rgba(${colorSet[0]}, ${0.12 + index * 0.015}), rgba(${colorSet[1]}, ${0.15 + index * 0.015}));
      border-radius: 50%;
      filter: blur(${1.5 + (index % 3) * 0.5}rem);
      ${flow.pos}
      animation-delay: ${flow.delay};
      animation-duration: ${18 + index * 1.5}s;
    `;
    decorations.appendChild(element);
  });
  
  // 波浪效果
  const waveContainer = document.createElement('div');
  waveContainer.style.cssText = `
    position: absolute;
    inset: 0;
    opacity: 0.3;
    pointer-events: none;
  `;
  
  const waves = [
    { gradient: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)', skew: '-12deg', delay: '0s', duration: '15s' },
    { gradient: 'linear-gradient(270deg, transparent, rgba(255, 255, 255, 0.03), transparent)', skew: '12deg', delay: '2s', duration: '15s' },
    { gradient: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent)', skew: '-6deg', delay: '4s', duration: '18s' }
  ];
  
  waves.forEach(wave => {
    const waveElement = document.createElement('div');
    waveElement.className = 'wave-animation';
    waveElement.style.cssText = `
      position: absolute;
      inset: 0;
      background: ${wave.gradient};
      transform: skewY(${wave.skew});
      animation-delay: ${wave.delay};
      animation-duration: ${wave.duration};
    `;
    waveContainer.appendChild(waveElement);
  });
  
  // 涟漪效果
  const rippleContainer = document.createElement('div');
  rippleContainer.style.cssText = `
    position: absolute;
    inset: 0;
    opacity: 0.2;
    pointer-events: none;
  `;
  
  const ripples = [
    { size: '8rem', pos: 'top: 25%; left: 25%;', delay: '0s' },
    { size: '6rem', pos: 'top: 66%; right: 33%;', delay: '3s' },
    { size: '7rem', pos: 'bottom: 25%; left: 50%;', delay: '6s' },
    { size: '5rem', pos: 'top: 50%; right: 25%;', delay: '9s' }
  ];
  
  ripples.forEach(ripple => {
    const rippleElement = document.createElement('div');
    rippleElement.className = 'ripple-animation';
    rippleElement.style.cssText = `
      position: absolute;
      width: ${ripple.size};
      height: ${ripple.size};
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      ${ripple.pos}
      animation-delay: ${ripple.delay};
    `;
    rippleContainer.appendChild(rippleElement);
  });
  
  // 流动路径
  const pathContainer = document.createElement('div');
  pathContainer.style.cssText = `
    position: absolute;
    inset: 0;
    opacity: 0.25;
    pointer-events: none;
  `;
  
  const paths = [
    { width: '0.5rem', height: '24rem', pos: 'top: 10%; left: 20%;', anim: 'liquidFlow1' },
    { width: '0.25rem', height: '20rem', pos: 'top: 30%; right: 25%;', anim: 'liquidFlow2' },
    { width: '0.75rem', height: '16rem', pos: 'bottom: 20%; left: 60%;', anim: 'liquidFlow3' }
  ];
  
  paths.forEach(path => {
    const pathElement = document.createElement('div');
    pathElement.className = 'flow-path-animation';
    pathElement.style.cssText = `
      position: absolute;
      width: ${path.width};
      height: ${path.height};
      background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent);
      border-radius: 9999px;
      ${path.pos}
    `;
    pathContainer.appendChild(pathElement);
  });
  
  // 浮动粒子
  const particles = document.createElement('div');
  particles.className = 'floating-particles';
  particles.style.cssText = `
    position: absolute;
    inset: 0;
    opacity: 0.4;
    pointer-events: none;
  `;
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = `liquid-flow-${(i % 5) + 1}`;
    const size = 0.3 + Math.random() * 0.4;
    particle.style.cssText = `
      position: absolute;
      width: ${size}rem;
      height: ${size}rem;
      background: rgba(255, 255, 255, ${0.15 + Math.random() * 0.1});
      border-radius: 50%;
      filter: blur(${0.5 + Math.random() * 1}px);
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation-delay: ${i * 1.5}s;
      animation-duration: ${16 + i * 1.2}s;
    `;
    particles.appendChild(particle);
  }
  
  // 螺旋流动元素
  const spiralElements = [
    { size: '6rem', pos: 'top: 20%; left: 80%;', delay: '0s' },
    { size: '8rem', pos: 'bottom: 40%; left: 15%;', delay: '2s' },
    { size: '5rem', pos: 'top: 70%; right: 20%;', delay: '4s' },
    { size: '7rem', pos: 'top: 45%; left: 45%;', delay: '1s' }
  ];
  
  spiralElements.forEach((spiral, index) => {
    const element = document.createElement('div');
    element.className = 'spiral-flow';
    element.style.cssText = `
      position: absolute;
      width: ${spiral.size};
      height: ${spiral.size};
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 50%;
      ${spiral.pos}
      animation-delay: ${spiral.delay};
    `;
    decorations.appendChild(element);
  });
  
  // 变形液态元素
  const morphingBlobs = [
    { size: '12rem', pos: 'top: 35%; left: 10%;', delay: '0s' },
    { size: '16rem', pos: 'bottom: 25%; right: 15%;', delay: '3s' },
    { size: '10rem', pos: 'top: 60%; left: 75%;', delay: '6s' }
  ];
  
  morphingBlobs.forEach((blob, index) => {
    const element = document.createElement('div');
    element.className = 'morphing-blob';
    element.style.cssText = `
      position: absolute;
      width: ${blob.size};
      height: ${blob.size};
      background: linear-gradient(45deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08));
      filter: blur(2rem);
      ${blob.pos}
      animation-delay: ${blob.delay};
    `;
    decorations.appendChild(element);
  });
  
  decorations.appendChild(flow1);
  decorations.appendChild(flow2);
  decorations.appendChild(flow3);
  decorations.appendChild(waveContainer);
  decorations.appendChild(rippleContainer);
  decorations.appendChild(pathContainer);
  decorations.appendChild(particles);
  
  return decorations;
}

// 初始化页面
function initializePage() {
  const root = document.getElementById('root');
  const t = getTranslation();
  
  root.innerHTML = `
    <!-- 背景装饰 -->
    ${createBackgroundDecorations().outerHTML}
    
    <!-- 导航栏 -->
    <header>
      <nav>
        <a href="#" class="logo">
          <img src="img/remove.photos-removed-background.png" alt="TensorLinx" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
          <span style="display: none;">TensorLinx</span>
        </a>
        
        <ul class="nav-links">
          <li><a href="#home" data-nav="home">${t.nav.home}</a></li>
          <li><a href="#about" data-nav="about">${t.nav.about}</a></li>
          <li><a href="products-split.html">${t.nav.products}</a></li>
<li><a href="NAVFIO.html" data-nav="jobs">${t.nav.jobs}</a></li>
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
         <li><a href="#about" data-nav="about" onclick="closeMobileMenu()">${t.nav.about}</a></li>
         <li><a href="products-split.html" onclick="closeMobileMenu()">${t.nav.products}</a></li>
<li><a href="NAVFIO.html" data-nav="jobs" onclick="closeMobileMenu()">${t.nav.jobs}</a></li>
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
              人工智能将是人类历史上最重要的技术革命，它将改变我们工作、生活和思考的方式。
            </blockquote>
            <cite class="quote-author">— 李开复，创新工场创始人</cite>
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
              <p>hello@tensorlinx.ai</p>
            </div>
            <div class="contact-item">
              <h3>${t.contact.phone}</h3>
              <p>+86 400-KERNEL</p>
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
            <a href="#" class="social-link" aria-label="GitHub">
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
          <p>${t.footer.copyright} | 沪ICP备2025137506号-1</p>
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
  const t = translations[currentLanguage];
  const partnersGrid = document.querySelector('.partners-grid');
  if (partnersGrid) {
    partnersGrid.innerHTML = t.footer.partners.items.map(item => `
      <a href="${item.url}" class="partner-card" target="_blank" rel="noopener noreferrer">
        <div class="partner-logo">
          <img src="${item.logo}" alt="${item.name}">
        </div>
        <p class="partner-name">${item.name}</p>
      </a>
    `).join('');
  }


}

// 移动端菜单控制
function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  const mobileMenu = document.getElementById('mobileMenu');
  const menuButton = document.querySelector('.mobile-menu-button');
  
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
  
  mobileMenu.classList.remove('open');
  menuButton.innerHTML = icons.menu;
}

// 滚动事件处理
function handleScroll() {
  scrollY = window.scrollY;
  const header = document.querySelector('header');
  
  if (scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// 鼠标移动事件处理
function handleMouseMove(e) {
  mousePosition = { x: e.clientX, y: e.clientY };
  
  // 更新背景装饰位置
  const decorations = document.querySelectorAll('.background-decorations > div');
  decorations.forEach((decoration, index) => {
    if (index < 3) { // 只更新前三个流动装饰
      const factor = (index + 1) * 0.01;
      const x = mousePosition.x * factor;
      const y = mousePosition.y * factor;
      decoration.style.transform += ` translate(${x}px, ${y}px)`;
    }
  });
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
  initializePage();
  setupEventListeners();
  
  // 添加加载动画
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
  
  // 延迟启动背景动画，确保页面完全加载
  setTimeout(() => {
    document.body.classList.add('animations-ready');
  }, 500);
});

// 导出函数供全局使用
window.toggleLanguage = toggleLanguage;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;