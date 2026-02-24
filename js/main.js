// ===== 页面加载完成后执行 =====
document.addEventListener('DOMContentLoaded', function() {
    // Hero轮播功能
    const slideImages = document.querySelectorAll('.hero-slide-image');
    const indicators = document.querySelectorAll('.indicator');
    const heroText = document.getElementById('heroText');
    
    // 轮播内容数据 - 使用全局翻译对象
    function getSlideContents() {
        // 获取当前语言的翻译
        const currentLang = window.currentLanguage || 'zh';
        const translations = window.translations || {};
        const langData = translations[currentLang] || translations['zh'];
        
        if (!langData || !langData.hero) {
            // 默认内容（中文）
            return [
                {
                    title: '"吴翔"于2月25日正式接任NAVF（香港）联席主席',
                    desc: '17日联席举行投票，右派候选人"吴翔"获得BTC赞成票0.81枚，ETH赞成票0.3枚，获票数领先左派候选人。意味着右派长达3年的治理结束，NAVF将步入新的秩序治理中。',
                    btn: '查看新闻',
                    link: 'news-wuxiang.html'
                },
                {
                    title: 'Tensorlinx正在向redox开发小组进行资助',
                    desc: 'Tensorlinx正在使用NAVF流动储备向redox开发小组进行资助，包括参与维护。这一行为不代表政治目的，是我们社会使命的一部分。',
                    btn: '查看详情',
                    link: 'news-redox.html'
                },
                {
                    title: '即将发布乌托邦3的x64平台操作系统',
                    desc: '为AI全新定制的操作系统将改变您的生活，我们通过增加类WSL来兼容Linux的软件生态，将应用程序与内核施行更加安全的设计！',
                    btn: '预约下载',
                    link: 'https://github.com/Tensorlinx/utopia'
                }
            ];
        }
        
        // 返回基于当前语言的翻译内容
        return [
            {
                title: langData.hero.slideTitle || '"吴翔"于2月25日正式接任NAVF（香港）联席主席',
                desc: langData.hero.slideDescription || '17日联席举行投票，右派候选人"吴翔"获得BTC赞成票0.81枚，ETH赞成票0.3枚，获票数领先左派候选人。意味着右派长达3年的治理结束，NAVF将步入新的秩序治理中。',
                btn: langData.hero.cta.secondary || '查看新闻',
                link: 'news-wuxiang.html'
            },
            {
                title: langData.hero.slide2Title || 'Tensorlinx正在向redox开发小组进行资助',
                desc: langData.hero.slide2Description || 'Tensorlinx正在使用NAVF流动储备向redox开发小组进行资助，包括参与维护。这一行为不代表政治目的，是我们社会使命的一部分。',
                btn: langData.hero.cta.viewDetails || '查看详情',
                link: 'news-redox.html'
            },
            {
                title: langData.hero.slide3Title || '即将发布乌托邦3的x64平台操作系统',
                desc: langData.hero.slide3Description || '为AI全新定制的操作系统将改变您的生活，我们通过增加类WSL来兼容Linux的软件生态，将应用程序与内核施行更加安全的设计！',
                btn: langData.hero.cta.download || '预约下载',
                link: 'https://github.com/Tensorlinx/utopia'
            }
        ];
    }
    
    let slideContents = getSlideContents();
    
    // 添加语言切换监听，更新轮播内容
    function updateSlideContentsOnLanguageChange() {
        slideContents = getSlideContents();
        // 如果当前是这个幻灯片，更新显示内容
        if (heroText) {
            heroText.innerHTML = `
                <h1>${slideContents[currentSlide].title}</h1>
                <p>${slideContents[currentSlide].desc}</p>
                <a href="${slideContents[currentSlide].link}" class="btn">${slideContents[currentSlide].btn}</a>
            `;
        }
    }
    
    // 监听语言变化事件
    window.addEventListener('languageChanged', updateSlideContentsOnLanguageChange);
    
    let currentSlide = 0;
    let autoplayInterval;
    
    // 显示指定幻灯片
    function showSlide(index) {
        slideImages.forEach(img => img.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slideImages[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // 更新右侧内容框
          if (heroText) {
              heroText.innerHTML = `
                  <h1>${slideContents[index].title}</h1>
                  <p>${slideContents[index].desc}</p>
                  <a href="${slideContents[index].link}" class="btn">${slideContents[index].btn}</a>
              `;
          }
    }
    
    // 下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideImages.length;
        showSlide(currentSlide);
    }
    
    // 开始自动播放
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 10000);
    }
    
    // 停止自动播放
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // 鼠标悬停时暂停自动播放
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', () => {
            console.log('鼠标进入轮播，停止自动播放');
            stopAutoplay();
        });
        heroCarousel.addEventListener('mouseleave', () => {
            console.log('鼠标离开轮播，开始自动播放');
            startAutoplay();
        });
    }
    
    // Hero按钮点击事件
    const heroBtns = document.querySelectorAll('.hero-slide .btn');
    heroBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const urls = [
                'https://www.microsoft.com/zh-cn/store/buy/surface-pro',
                'https://www.microsoft.com/zh-cn/microsoft-365',
                'https://www.xbox.com/zh-CN/consoles/xbox-series-x'
            ];
            window.location.href = urls[index];
        });
    });
    
    // 启动轮播
    console.log('启动轮播自动播放');
    startAutoplay();
    
    // 确保页面加载后开始自动播放（延迟1秒确保DOM完全就绪）
    setTimeout(() => {
        console.log('延迟启动轮播');
        startAutoplay();
    }, 1000);
    
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-links a, .card a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('导航到:', this.textContent);
            
            // 处理关于我们链接的平滑滚动
            if (this.getAttribute('href') === '#about-us') {
                e.preventDefault();
                const aboutUsSection = document.getElementById('about-us');
                if (aboutUsSection) {
                    aboutUsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 平滑滚动效果
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // 添加页面滚动监听
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 可以在这里添加滚动时的动画效果
        if (scrollTop > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // 卡片悬停效果增强
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });
    });

    // 响应式菜单（未来扩展）
    function setupResponsiveMenu() {
        // 这里可以添加移动端菜单逻辑
        console.log('响应式菜单已初始化');
    }

    // 初始化
    setupResponsiveMenu();
});

// ===== 工具函数 =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 性能优化：使用防抖处理滚动事件
const debouncedScroll = debounce(function() {
    // 滚动相关的性能优化逻辑
}, 16);

window.addEventListener('scroll', debouncedScroll);

// ===== 错误处理 =====
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// ===== 页面可见性API =====
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面变为可见时的逻辑
        console.log('页面变为可见');
    }
});