// 新闻页面专用翻译功能
let newsTranslations = {};
let currentNewsLanguage = 'zh';

// 加载新闻页面翻译文件
async function loadNewsTranslations() {
  try {
    const response = await fetch('news-translations.json?v=4', { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    newsTranslations = await response.json();
    console.log('新闻翻译文件加载成功');
    updateNewsContent();
    updateNewsLanguageButtons();
  } catch (error) {
    console.error('加载新闻翻译文件失败:', error);
    newsTranslations = { zh: {}, en: {} };
  }
}

// 更新新闻页面内容
function updateNewsContent() {
  if (!newsTranslations || !newsTranslations[currentNewsLanguage]) {
    return;
  }

  const t = newsTranslations[currentNewsLanguage];

  // 更新页面标题
  if (t.title) {
    document.title = t.title;
  }

  // 更新导航栏
  const navHome = document.querySelector('a[data-nav="home"]');
  const navProducts = document.querySelector('a[data-nav="products"]');
  const navNews = document.querySelector('a[data-nav="news"]');
  const navJobs = document.querySelector('a[data-nav="jobs"]');
  const navAbout = document.querySelector('a[data-nav="about"]');

  if (navHome) navHome.textContent = t.nav?.home || '首页';
  if (navProducts) navProducts.textContent = t.nav?.products || '产品文档';
  if (navNews) navNews.textContent = t.nav?.news || '新闻动态';
  if (navJobs) navJobs.textContent = t.nav?.jobs || '岗位招聘';
  if (navAbout) navAbout.textContent = t.nav?.about || '关于我们';

  // 更新新闻英雄区域
  const newsHeroTitle = document.querySelector('.news-hero h1');
  const newsHeroSubtitle = document.querySelector('.news-hero p');

  if (newsHeroTitle) newsHeroTitle.textContent = t.pageTitle || '新闻动态';
  if (newsHeroSubtitle) newsHeroSubtitle.textContent = t.pageSubtitle || '了解Tensorlinx的最新动态、行业资讯和企业公告';

  // 更新新闻卡片内容
  if (t.newsList && Array.isArray(t.newsList)) {
    t.newsList.forEach((newsItem, index) => {
      const newsCard = document.querySelector(`article[data-news-index="${index}"]`);
      if (newsCard) {
        const categoryEl = newsCard.querySelector('.news-category');
        const dateEl = newsCard.querySelector('.news-date');
        const authorEl = newsCard.querySelector('.news-author');
        const titleEl = newsCard.querySelector('.news-title');
        const excerptEl = newsCard.querySelector('.news-excerpt');
        const readMoreEl = newsCard.querySelector('.read-more');

        if (categoryEl && newsItem.category) categoryEl.textContent = newsItem.category;
        if (dateEl && newsItem.date) dateEl.textContent = newsItem.date;
        if (authorEl && newsItem.author) authorEl.textContent = newsItem.author;
        if (titleEl && newsItem.title) titleEl.textContent = newsItem.title;
        if (excerptEl && newsItem.excerpt) excerptEl.textContent = newsItem.excerpt;
        if (readMoreEl && newsItem.readMore) readMoreEl.textContent = newsItem.readMore;
      }
    });
  }

  // 更新分页按钮
  const prevBtn = document.querySelector('.page-btn.prev');
  const nextBtn = document.querySelector('.page-btn.next');
  if (prevBtn && t.pagination?.prev) prevBtn.textContent = t.pagination.prev;
  if (nextBtn && t.pagination?.next) nextBtn.textContent = t.pagination.next;
}

// 更新语言按钮状态
function updateNewsLanguageButtons() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    if (btn.dataset.lang === currentNewsLanguage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// 切换语言
function toggleNewsLanguage() {
  currentNewsLanguage = currentNewsLanguage === 'zh' ? 'en' : 'zh';
  updateNewsContent();
  updateNewsLanguageButtons();

  // 保存语言偏好到 localStorage 和 cookie
  localStorage.setItem('preferredLanguage', currentNewsLanguage);
  document.cookie = `preferredLanguage=${currentNewsLanguage};path=/`;
}

// 设置语言切换按钮事件
function setupNewsLanguageButtons() {
  const langBtns = document.querySelectorAll('.lang-btn');

  langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.dataset.lang;

      // 如果点击的是当前语言，不做任何操作
      if (lang === currentNewsLanguage) return;

      // 切换语言
      toggleNewsLanguage();

      // 添加切换动画效果
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });

  // 加载保存的语言偏好
  const savedLang = localStorage.getItem('preferredLanguage') ||
                   (navigator.language.startsWith('zh') ? 'zh' : 'en');
  if (savedLang && savedLang !== currentNewsLanguage) {
    currentNewsLanguage = savedLang;
    updateNewsLanguageButtons();
  }
}

// 分页功能
function setupPagination() {
  const prevBtn = document.querySelector('.page-btn.prev');
  const nextBtn = document.querySelector('.page-btn.next');
  const newsCards = document.querySelectorAll('.news-list .news-card');

  // 计算总页数 - 第一页显示7篇，后续每页显示6篇
  const firstPageCount = 7;
  const otherPageCount = 6;
  const totalArticles = newsCards.length;
  let totalPages;
  if (totalArticles <= firstPageCount) {
    totalPages = 1;
  } else {
    totalPages = 1 + Math.ceil((totalArticles - firstPageCount) / otherPageCount);
  }

  let currentPage = 1; // 当前页

  // 显示指定页的文章
  function showPage(page) {
    // 第一页显示7个新闻卡
    // 其他页：每页显示6篇普通文章
    let startIndex, endIndex;

    if (page === 1) {
      startIndex = 0;
      endIndex = Math.min(firstPageCount, totalArticles);
    } else {
      startIndex = firstPageCount + (page - 2) * otherPageCount;
      endIndex = Math.min(startIndex + otherPageCount, totalArticles);
    }

    newsCards.forEach((card, index) => {
      if (index >= startIndex && index < endIndex) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // 更新页码按钮显示
  function updatePageButtons() {
    const pageNumbersContainer = document.querySelector('.page-numbers');
    if (!pageNumbersContainer) return;

    // 清空现有内容
    pageNumbersContainer.innerHTML = '';

    // 生成新的页码按钮
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.className = 'page-number';
      button.textContent = i;
      if (i === currentPage) button.classList.add('active');
      button.addEventListener('click', function() {
        goToPage(parseInt(this.textContent));
      });
      pageNumbersContainer.appendChild(button);
    }

    // 添加省略号（如果页数超过5页且当前页不是最后一页）
    if (totalPages > 5 && currentPage < totalPages - 2) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'page-ellipsis';
      ellipsis.textContent = '...';
      pageNumbersContainer.appendChild(ellipsis);

      const lastPageButton = document.createElement('button');
      lastPageButton.className = 'page-number';
      lastPageButton.textContent = totalPages;
      if (currentPage === totalPages) lastPageButton.classList.add('active');
      lastPageButton.addEventListener('click', function() {
        goToPage(parseInt(this.textContent));
      });
      pageNumbersContainer.appendChild(lastPageButton);
    }
  }

  // 跳转到指定页
  function goToPage(newPage) {
    if (newPage < 1 || newPage > totalPages) return;

    currentPage = newPage;

    // 显示对应页的文章
    showPage(currentPage);

    // 更新页码按钮
    updatePageButtons();

    // 滚动到新闻列表顶部
    const newsList = document.querySelector('.news-list');
    if (newsList) {
      newsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    console.log(`切换到第 ${currentPage} 页，共 ${totalPages} 页`);
  }

  // 上一页按钮事件
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      if (currentPage > 1) {
        goToPage(currentPage - 1);
      }
    });
  }

  // 下一页按钮事件
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (currentPage < totalPages) {
        goToPage(currentPage + 1);
      }
    });
  }

  // 初始化
  showPage(currentPage);
  updatePageButtons();
}

// 初始化新闻页面翻译
document.addEventListener('DOMContentLoaded', () => {
  loadNewsTranslations();
  setupNewsLanguageButtons();
  setupPagination();
});

// 如果页面已加载，则直接初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadNewsTranslations();
    setupNewsLanguageButtons();
    setupPagination();
  });
} else {
  loadNewsTranslations();
  setupNewsLanguageButtons();
  setupPagination();
}
