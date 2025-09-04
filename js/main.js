// ===== 页面加载完成后执行 =====
document.addEventListener('DOMContentLoaded', function() {
    // Hero轮播功能
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    let autoplayInterval;
    
    // 显示指定幻灯片
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    // 下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // 开始自动播放
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
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
        heroCarousel.addEventListener('mouseenter', stopAutoplay);
        heroCarousel.addEventListener('mouseleave', startAutoplay);
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
    startAutoplay();
    
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-links a, .card a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('导航到:', this.textContent);
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
    
    // ===== 语言切换功能 =====
    setupLanguageToggle();
});

// ===== 语言切换功能 =====
function setupLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            
            // 移除所有活跃状态
            langBtns.forEach(b => b.classList.remove('active'));
            
            // 添加当前活跃状态
            this.classList.add('active');
            
            // 切换语言
            switchLanguage(lang);
            
            // 添加切换动画效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function switchLanguage(lang) {
    // 使用script.js中的toggleLanguage函数
    if (typeof toggleLanguage === 'function') {
        // 设置script.js中的当前语言
        if (typeof window.currentLanguage !== 'undefined') {
            window.currentLanguage = lang;
        }
        // 调用script.js的更新函数
        if (typeof updateContent === 'function') {
            updateContent();
        }
        
        // 同步main.js中的按钮状态
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // 保存用户偏好
        localStorage.setItem('preferredLanguage', lang);
        
        console.log(`语言已切换为: ${lang === 'zh' ? '中文' : 'English'}`);
    } else {
        console.error('script.js翻译系统未加载');
    }
    
    // 切换版权信息
    const copyrightCn = document.querySelector('.copyright-cn');
    const copyrightEn = document.querySelector('.copyright-en');
    
    if (lang === 'zh') {
        if (copyrightCn) copyrightCn.style.display = 'block';
        if (copyrightEn) copyrightEn.style.display = 'none';
    } else {
        if (copyrightCn) copyrightCn.style.display = 'none';
        if (copyrightEn) copyrightEn.style.display = 'block';
    }
    
    // 更新页面语言属性
    document.documentElement.lang = lang;
    
    // 保存用户偏好
    localStorage.setItem('preferredLanguage', lang);
    
    console.log(`语言已切换为: ${lang === 'zh' ? '中文' : 'English'}`);
}

// 加载保存的语言偏好
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'zh';
    const langBtns = document.querySelectorAll('.lang-btn');
    
    // 设置初始语言状态
    langBtns.forEach(btn => {
        if (btn.dataset.lang === savedLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 应用保存的语言
    switchLanguage(savedLang);
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