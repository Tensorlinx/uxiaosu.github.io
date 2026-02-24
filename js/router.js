// 路由混淆系统 - 动态加载内容 (Hash模式，兼容静态服务器)
const routeMap = {
  'a1': { url: 'index.html', title: '首页', hash: '#/home', translation: 'translations.json' },
  'b2': { url: 'about.html', title: '关于我们', hash: '#/about', translation: 'about-translations.json' },
  'c3': { url: 'news.html', title: '新闻动态', hash: '#/news', translation: 'news-translations.json?v=2' },
  'd4': { url: 'news-wuxiang.html', title: '新闻详情', hash: '#/article/1', translation: 'news-wuxiang-translations.json' },
  'e5': { url: 'news-redox.html', title: '新闻详情', hash: '#/article/2', translation: 'news-redox-translations.json' },
  'f6': { url: 'compliance-news.html', title: '新闻详情', hash: '#/article/3', translation: 'compliance-news-translations.json' },
  'g7': { url: 'products.html', title: '产品文档', hash: '#/products', translation: 'products-translations.json' },
  'h8': { url: 'NAVFIO.html', title: '岗位招聘', hash: '#/careers', translation: null, static: true },
  'i9': { url: 'funding-application.html', title: '资助申请', hash: '#/funding', translation: null },
  'j0': { url: 'privacy-policy.html', title: '隐私政策', hash: '#/privacy', translation: null },
  'k1': { url: 'cookie-policy.html', title: 'Cookie政策', hash: '#/cookies', translation: null }
};

// 当前是否使用动态加载模式
let useDynamicLoad = true;

// 导航函数
function navigate(hash) {
  const route = routeMap[hash];
  if (!route) {
    console.error('未知路由:', hash);
    return;
  }

  // 如果是静态页面，直接跳转
  if (route.static) {
    window.location.href = route.url;
    return;
  }

  if (useDynamicLoad) {
    // 动态加载模式
    loadContent(route, hash);
  } else {
    // 传统跳转模式
    window.location.href = route.url;
  }
}

// 动态加载内容
async function loadContent(route, hash) {
  try {
    // 显示加载状态
    showLoading();

    // 获取页面内容
    const response = await fetch(route.url);
    if (!response.ok) throw new Error('加载失败');

    const html = await response.text();

    // 提取主要内容
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // 加载页面特有的CSS
    loadPageStyles(doc, route.url);

    // 提取 body 内容（排除 header 和 footer）
    const mainContent = extractMainContent(doc, route.url);

    // 更新当前页面内容
    updatePageContent(mainContent, route, doc);

    // 更新地址栏（使用hash，兼容静态服务器）
    updateUrl(route.hash, route.title);

    // 保存当前路由状态
    sessionStorage.setItem('currentRoute', hash);

    // 滚动到顶部
    window.scrollTo(0, 0);

    // 加载对应页面的翻译文件
    if (route.translation) {
      await loadPageTranslation(route.translation);
    }

    // 重新初始化翻译
    setTimeout(() => {
      if (typeof updateContent === 'function') {
        updateContent();
      }
      if (typeof updateFooter === 'function') {
        updateFooter();
      }
      // 触发翻译更新事件
      window.dispatchEvent(new CustomEvent('contentUpdated'));
    }, 100);

  } catch (error) {
    console.error('加载失败:', error);
    // 失败时回退到传统跳转
    window.location.href = route.url;
  } finally {
    hideLoading();
  }
}

// 深度合并对象
function deepMerge(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        // 如果值是对象，递归合并
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {};
        }
        deepMerge(target[key], source[key]);
      } else {
        // 否则直接赋值
        target[key] = source[key];
      }
    }
  }
  return target;
}

// 加载页面特有的翻译文件
async function loadPageTranslation(translationFile) {
  try {
    console.log('加载翻译文件:', translationFile);
    const response = await fetch(translationFile);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const translations = await response.json();
    
    // 合并到全局 translations 对象
    if (window.translations) {
      // 深度合并翻译数据
      Object.keys(translations).forEach(lang => {
        if (!window.translations[lang]) {
          window.translations[lang] = {};
        }
        deepMerge(window.translations[lang], translations[lang]);
      });
    } else {
      window.translations = translations;
    }
    
    console.log('翻译文件加载成功:', translationFile);
  } catch (error) {
    console.error('加载翻译文件失败:', translationFile, error);
  }
}

// 加载页面特有的CSS
function loadPageStyles(doc, baseUrl) {
  // 获取源页面中的所有CSS链接
  const links = doc.querySelectorAll('link[rel="stylesheet"]');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    // 跳过已加载的通用样式
    if (href && !href.includes('style.css') && !isStyleLoaded(href)) {
      const newLink = document.createElement('link');
      newLink.rel = 'stylesheet';
      
      // 修复路径
      if (baseUrl.includes('/') && href.startsWith('../')) {
        newLink.href = href.replace('../', '');
      } else {
        newLink.href = href;
      }
      
      newLink.setAttribute('data-dynamic-style', 'true');
      document.head.appendChild(newLink);
      console.log('动态加载CSS:', newLink.href);
    }
  });
  
  // 加载内联样式
  const styles = doc.querySelectorAll('style');
  styles.forEach((style, index) => {
    const styleId = 'dynamic-style-' + baseUrl.replace(/[^a-zA-Z0-9]/g, '-') + '-' + index;
    
    // 检查是否已存在
    if (!document.getElementById(styleId)) {
      const newStyle = document.createElement('style');
      newStyle.id = styleId;
      newStyle.setAttribute('data-dynamic-style', 'true');
      newStyle.textContent = style.textContent;
      document.head.appendChild(newStyle);
      console.log('动态加载内联样式:', styleId);
    }
  });
}

// 禁用 style.css
function disableStyleCSS() {
  const styleLinks = document.querySelectorAll('link[rel="stylesheet"]');
  styleLinks.forEach(link => {
    if (link.href && link.href.includes('style.css')) {
      link.disabled = true;
      link.setAttribute('data-was-disabled', 'true');
      console.log('禁用 style.css');
    }
  });
}

// 启用 style.css
function enableStyleCSS() {
  const styleLinks = document.querySelectorAll('link[rel="stylesheet"]');
  styleLinks.forEach(link => {
    if (link.href && link.href.includes('style.css') && link.getAttribute('data-was-disabled') === 'true') {
      link.disabled = false;
      link.removeAttribute('data-was-disabled');
      console.log('启用 style.css');
    }
  });
}

// 检查样式是否已加载
function isStyleLoaded(href) {
  const styles = document.querySelectorAll('link[rel="stylesheet"]');
  const cleanHref = href.replace('../', '');
  for (const style of styles) {
    if (style.href) {
      // 检查完整路径或文件名
      if (style.href.includes(cleanHref) || style.href.endsWith('/' + cleanHref)) {
        return true;
      }
    }
  }
  return false;
}

// 提取主要内容
function extractMainContent(doc, baseUrl) {
  // 首先尝试从 body 中提取，排除 nav/header/footer
  const body = doc.body;
  if (body) {
    const clone = body.cloneNode(true);
    
    // 排除 header、footer 和 nav
    const header = clone.querySelector('header, .header');
    const footer = clone.querySelector('footer, .footer');
    const nav = clone.querySelector('nav, .nav');
    if (header) header.remove();
    if (footer) footer.remove();
    if (nav) nav.remove();
    
    // 如果 body 中有 main 元素，返回 main 的内容
    const mainElement = clone.querySelector('main');
    if (mainElement) {
      return mainElement.innerHTML;
    }
    
    // 否则返回 body 的内容（已排除 nav/header/footer）
    return clone.innerHTML;
  }
  
  // 备选方案：尝试其他选择器
  const selectors = [
    'main',
    '.main-content',
    '.content-wrapper',
    '.news-content-wrapper',
    '.container'
  ];

  for (const selector of selectors) {
    const element = doc.querySelector(selector);
    if (element) {
      let html = element.innerHTML;
      // 修复相对路径
      html = fixRelativePaths(html, baseUrl);
      return html;
    }
  }
  
  // 最后 fallback 到整个 body
  let html = doc.body ? doc.body.innerHTML : '';
  // 修复相对路径
  html = fixRelativePaths(html, baseUrl);
  return html;
}

// 修复相对路径
function fixRelativePaths(html, baseUrl) {
  if (!baseUrl.includes('/')) return html;
  
  // 使用正则替换 ../ 路径
  return html
    .replace(/src="\.\.\//g, 'src="')
    .replace(/href="\.\.\//g, 'href="');
}

// 更新页面内容
function updatePageContent(content, route, sourceDoc) {
  // 找到当前页面的主要内容区域
  const targetElement = document.getElementById('main-content');
  const bodyElement = document.body;

  if (targetElement) {
    // 从源文档获取main元素的类名
    const sourceMain = sourceDoc.querySelector('main');
    if (sourceMain) {
      // 保留id，更新className
      targetElement.className = sourceMain.className;
    }
    
    // 为特定页面添加 body class（用于隔离样式）
    bodyElement.className = '';
    if (route.url === 'NAVFIO.html') {
      bodyElement.classList.add('navfio-page');
      // 禁用 style.css 以避免样式冲突
      disableStyleCSS();
    } else {
      // 重新启用 style.css
      enableStyleCSS();
    }

    // 添加淡入动画
    targetElement.style.opacity = '0';
    
    // 为 NAVFIO 页面添加特定包装器以隔离样式
    if (route.url === 'NAVFIO.html') {
      targetElement.innerHTML = '<div class="navfio-wrapper">' + content + '</div>';
    } else {
      targetElement.innerHTML = content;
    }

    // 重新执行脚本
    executeScripts(targetElement);

    // 淡入
    setTimeout(() => {
      targetElement.style.transition = 'opacity 0.3s ease';
      targetElement.style.opacity = '1';
    }, 50);
  }

  // 更新页面标题
  document.title = route.title + ' - Tensorlinx';
}

// 执行新内容中的脚本
function executeScripts(container) {
  const scripts = container.querySelectorAll('script');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    if (script.src) {
      newScript.src = script.src;
    } else {
      newScript.textContent = script.textContent;
    }
    document.head.appendChild(newScript);
    document.head.removeChild(newScript);
  });
}

// 更新地址栏
function updateUrl(hash, title) {
  // 使用 replaceState 修改地址栏，隐藏 index.html，只显示 hash
  const cleanHash = hash.startsWith('#') ? hash : '#' + hash;
  history.replaceState(null, title, '/' + cleanHash);
}

// 显示加载状态
function showLoading() {
  let loader = document.getElementById('page-loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, transparent, #007bff, transparent);
        z-index: 9999;
        animation: loading-progress 1s infinite;
      "></div>
    `;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes loading-progress {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(loader);
  }
  loader.style.display = 'block';
}

// 隐藏加载状态
function hideLoading() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.style.display = 'none';
  }
}

// 处理hash变化（浏览器前进/后退）
window.addEventListener('hashchange', function(event) {
  handleHashRoute();
});

// 处理页面加载时的hash
function handleInitialRoute() {
  handleHashRoute();
}

// 处理hash路由
function handleHashRoute() {
  // 从 URL 中提取 hash（支持 /#/news 和 index.html#/news 两种格式）
  const fullUrl = window.location.href;
  const hashMatch = fullUrl.match(/#.+$/);
  const hash = hashMatch ? hashMatch[0] : '';
  console.log('处理hash路由:', hash);

  // 检查是否是已知路由
  for (const [routeHash, route] of Object.entries(routeMap)) {
    if (route.hash === hash) {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      console.log('找到路由:', routeHash, '当前页面:', currentPage, '目标页面:', route.url);
      
      // 如果当前已经在目标页面，不需要加载
      if (route.url === currentPage) {
        console.log('已在目标页面，跳过加载');
        return;
      }
      
      // 加载对应内容
      console.log('开始加载内容:', route.url);
      loadContent(route, routeHash);
      return;
    }
  }
  
  console.log('未找到匹配的路由');
}

// 页面加载时处理初始路由
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleInitialRoute);
} else {
  handleInitialRoute();
}

// 导出函数
window.Router = {
  navigate: navigate,
  map: routeMap,
  setDynamicLoad: (enabled) => { useDynamicLoad = enabled; }
};
