// 全局状态
let currentLanguage = 'zh';
let isMenuOpen = false;
let scrollY = 0;
let mousePosition = { x: 0, y: 0 };

// 翻译数据
const translations = {
  zh: {
    nav: {
      home: "首页",
      features: "服务",
      about: "关于我们",
      contact: "联系我们",
      getStarted: "合作咨询",
    },
    hero: {
      badge: "🏢 领先的AI技术企业",
      title: "构建智能未来的",
      highlight: "TensorLinx",
      subtitle: "科技公司",
      description: "TensorLinx致力于为全球企业提供前沿的人工智能解决方案，通过创新技术推动行业数字化转型",
      cta: {
        primary: "了解更多",
        secondary: "合作咨询",
      },
      demo: "开源项目展示",
    },
    features: {
      title: "我们的核心服务",
      subtitle: "为企业提供全方位的AI技术解决方案和专业服务",
      items: [
        {
          title: "AI解决方案",
          description: "为企业量身定制人工智能解决方案，涵盖机器学习、深度学习、自然语言处理等领域",
        },
        {
          title: "技术咨询",
          description: "提供专业的AI技术咨询服务，帮助企业制定数字化转型战略和技术路线图",
        },
        {
          title: "系统集成",
          description: "专业的系统集成服务，确保AI技术与企业现有系统的无缝对接和稳定运行",
        },
      ],
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
    footer: {
      description: "TensorLinx - 专业的人工智能技术服务商，为企业数字化转型提供强有力的技术支撑。",
      product: "服务",
      support: "支持",
      acknowledgments: "鸣谢支持",
      links: {
        kernel: "解决方案",
        docs: "技术白皮书",
        api: "服务介绍",
        community: "客户案例",
        help: "帮助中心",
        tutorials: "技术博客",
      },
      partners: {
        title: "感谢以下合作伙伴的支持",
        items: [
          {
            name: "Vercel",
            logo: "/images/logos/vercel-logo.svg",
            url: "https://vercel.com",
          },
          {
            name: "PyTorch基金会",
            logo: "/images/logos/pytorch-logo.svg",
            url: "https://pytorch.org",
          },
          {
            name: "Rust基金会",
            logo: "/images/logos/rust-logo.svg",
            url: "https://foundation.rust-lang.org",
          },
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
        ],
      },
      copyright: "© 2024 TensorLinx科技有限公司. 保留所有权利。",
    },
  },
  en: {
    nav: {
      home: "Home",
      features: "Services",
      about: "About Us",
      contact: "Contact",
      getStarted: "Partnership",
    },
    hero: {
      badge: "🏢 Leading AI Technology Company",
      title: "Building the Intelligent Future with",
      highlight: "TensorLinx",
      subtitle: "Technology",
      description: "TensorLinx is committed to providing cutting-edge artificial intelligence solutions for global enterprises, driving industry digital transformation through innovative technology",
      cta: {
        primary: "Learn More",
        secondary: "Partnership",
      },
      demo: "Open Source Projects",
    },
    features: {
      title: "Our Core Services",
      subtitle: "Providing comprehensive AI technology solutions and professional services for enterprises",
      items: [
        {
          title: "AI Solutions",
          description: "Customized artificial intelligence solutions for enterprises, covering machine learning, deep learning, natural language processing and more",
        },
        {
          title: "Technical Consulting",
          description: "Professional AI technical consulting services to help enterprises develop digital transformation strategies and technology roadmaps",
        },
        {
          title: "System Integration",
          description: "Professional system integration services ensuring seamless integration and stable operation of AI technology with existing enterprise systems",
        },
      ],
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
    footer: {
      description: "TensorLinx - Professional artificial intelligence technology service provider, providing strong technical support for enterprise digital transformation.",
      product: "Services",
      support: "Support",
      acknowledgments: "Acknowledgments",
      links: {
        kernel: "Solutions",
        docs: "Technical Whitepaper",
        api: "Service Introduction",
        community: "Case Studies",
        help: "Help Center",
        tutorials: "Tech Blog",
      },
      partners: {
        title: "Thanks to our partners for their support",
        items: [
          {
            name: "Vercel",
            logo: "/images/logos/vercel-logo.svg",
            url: "https://vercel.com",
          },
          {
            name: "PyTorch Foundation",
            logo: "/images/logos/pytorch-logo.svg",
            url: "https://pytorch.org",
          },
          {
            name: "Rust Foundation",
            logo: "/images/logos/rust-logo.svg",
            url: "https://foundation.rust-lang.org",
          },
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
  cpu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`
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
  
  // 更新导航
  document.querySelector('[data-nav="home"]').textContent = t.nav.home;
  document.querySelector('[data-nav="features"]').textContent = t.nav.features;
  document.querySelector('[data-nav="about"]').textContent = t.nav.about;
  document.querySelector('[data-nav="contact"]').textContent = t.nav.contact;
  document.querySelector('[data-nav="getStarted"]').textContent = t.nav.getStarted;
  
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
  document.querySelector('[data-cta="secondary"]').textContent = t.hero.cta.secondary;
  
  // 更新核心优势
  document.querySelector('.features h2').textContent = t.features.title;
  document.querySelector('.features .subtitle').textContent = t.features.subtitle;
  
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    if (t.features.items[index]) {
      card.querySelector('h3').textContent = t.features.items[index].title;
      card.querySelector('p').textContent = t.features.items[index].description;
    }
  });
  
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
  const projectsGrid = document.querySelector('.projects-grid');
  
  projectsGrid.innerHTML = openSourceProjects.map(project => `
    <div class="project-card" style="--gradient: ${project.gradient}">
      <div class="project-header">
        <div class="project-icon" style="background: ${project.gradient}">
          ${getProjectIcon(project.language)}
        </div>
        <h3 class="project-title">${project.name}</h3>
      </div>
      <p class="project-description">${project.description[currentLanguage]}</p>
      <span class="project-language">${project.language}</span>
    </div>
  `).join('');
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
  document.querySelector('[data-footer="product"]').textContent = t.footer.product;
  document.querySelector('[data-footer="support"]').textContent = t.footer.support;
  
  const footerLinks = document.querySelectorAll('.footer-links a');
  const linkKeys = ['kernel', 'docs', 'api', 'community', 'help', 'tutorials'];
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
    { size: '9rem', pos: 'top: 66%; right: 10%;', anim: 'liquidFlow3', delay: '2.5s' }
  ];
  
  extraFlows.forEach((flow, index) => {
    const element = document.createElement('div');
    element.className = `liquid-flow-${flow.anim.slice(-1)}`;
    element.style.cssText = `
      position: absolute;
      width: ${flow.size};
      height: ${flow.size};
      background: linear-gradient(135deg, rgba(${index % 2 ? '107, 114, 128' : '55, 65, 81'}, ${0.15 + index * 0.02}), rgba(${index % 2 ? '31, 41, 55' : '0, 0, 0'}, ${0.18 + index * 0.02}));
      border-radius: 50%;
      filter: blur(${index % 2 ? '2rem' : '2.5rem'});
      ${flow.pos}
      animation-delay: ${flow.delay};
      animation-duration: ${18 + index * 2}s;
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
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = `liquid-flow-${(i % 3) + 1}`;
    particle.style.cssText = `
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      filter: blur(1px);
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation-delay: ${i * 2}s;
      animation-duration: ${18 + i * 2}s;
    `;
    particles.appendChild(particle);
  }
  
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
          <img src="/images/tensorlinx-logo.png" alt="TensorLinx" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
          <span style="display: none;">TensorLinx</span>
        </a>
        
        <ul class="nav-links">
          <li><a href="#home" data-nav="home">${t.nav.home}</a></li>
          <li><a href="#features" data-nav="features">${t.nav.features}</a></li>
          <li><a href="#about" data-nav="about">${t.nav.about}</a></li>
          <li><a href="#contact" data-nav="contact">${t.nav.contact}</a></li>
          <li><a href="#" data-nav="getStarted" class="btn btn-secondary">${t.nav.getStarted}</a></li>
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
          <li><a href="#features" data-nav="features" onclick="closeMobileMenu()">${t.nav.features}</a></li>
          <li><a href="#about" data-nav="about" onclick="closeMobileMenu()">${t.nav.about}</a></li>
          <li><a href="#contact" data-nav="contact" onclick="closeMobileMenu()">${t.nav.contact}</a></li>
          <li><a href="#" data-nav="getStarted" class="btn btn-secondary" onclick="closeMobileMenu()">${t.nav.getStarted}</a></li>
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
            <a href="#features" class="btn btn-primary" data-cta="primary">
              ${t.hero.cta.primary} ${icons.arrowRight}
            </a>
            <a href="#contact" class="btn btn-secondary" data-cta="secondary">${t.hero.cta.secondary}</a>
          </div>
        </div>
      </section>
      
      <!-- 核心优势部分 -->
      <section class="features" id="features">
        <div class="features-header">
          <h2>${t.features.title}</h2>
          <p class="subtitle">${t.features.subtitle}</p>
        </div>
        <div class="features-grid">
          ${t.features.items.map((feature, index) => `
            <div class="feature-card">
              <div class="feature-icon">
                ${[icons.zap, icons.shield, icons.code][index]}
              </div>
              <h3>${feature.title}</h3>
              <p>${feature.description}</p>
            </div>
          `).join('')}
        </div>
      </section>
      
      <!-- 关于我们部分 -->
      <section class="about" id="about">
        <div class="about-grid">
          <div class="about-content">
            <h2>${t.about.title}</h2>
            <p>${t.about.description1}</p>
            <p>${t.about.description2}</p>
            <a href="#" class="btn btn-primary" data-about-cta>
              ${t.about.cta} ${icons.arrowRight}
            </a>
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
      </section>
      
      <!-- 开源项目部分 -->
      <section class="projects" id="projects">
        <h2>${t.hero.demo}</h2>
        <p class="subtitle">展示我们的开源贡献和技术实力</p>
        <div class="projects-grid">
          <!-- 项目将通过 JavaScript 动态生成 -->
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
          
          <div style="margin-top: 2rem;">
            <button class="btn btn-primary" data-contact-cta>
              ${t.contact.cta}
            </button>
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
              <img src="/images/tensorlinx-logo.png" alt="TensorLinx" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
              <span style="display: none; font-size: 1.5rem; font-weight: 800;">TensorLinx</span>
            </div>
            <p class="footer-description">${t.footer.description}</p>
          </div>
          
          <div class="footer-section">
            <h3 data-footer="product">${t.footer.product}</h3>
            <ul class="footer-links">
              <li><a href="#">${t.footer.links.kernel}</a></li>
              <li><a href="#">${t.footer.links.docs}</a></li>
              <li><a href="#">${t.footer.links.api}</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 data-footer="support">${t.footer.support}</h3>
            <ul class="footer-links">
              <li><a href="#">${t.footer.links.community}</a></li>
              <li><a href="#">${t.footer.links.help}</a></li>
              <li><a href="#">${t.footer.links.tutorials}</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>${t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  `;
  
  // 初始化项目和页脚
  updateProjects();
  updateFooter();
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