// 维护公告遮罩层 - 简化版（无闪烁）
(function() {
    'use strict';

    // 创建遮罩层元素
    const overlay = document.createElement('div');
    overlay.id = 'maintenance-overlay';
    overlay.innerHTML = `
        <div class="maintenance-content">
            <div class="maintenance-icon">🔧</div>
            <h1 class="maintenance-title">网站正在维护中</h1>
            <p class="maintenance-message">
                我们正在对网站进行重要升级和维护，<br>
                预计维护时间：正在进行中...<br>
                给您带来的不便，敬请谅解。
            </p>
        </div>
    `;

    // 添加样式 - 简化版，移除动画
    const style = document.createElement('style');
    style.textContent = `
        #maintenance-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .maintenance-content {
            text-align: center;
            color: #fff;
            max-width: 500px;
            padding: 40px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .maintenance-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }

        .maintenance-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 15px;
            color: #fff;
        }

        .maintenance-message {
            font-size: 16px;
            line-height: 1.6;
            opacity: 0.9;
        }

        /* 防止滚动和选择 */
        body {
            overflow: hidden !important;
            user-select: none !important;
        }

        html {
            overflow: hidden !important;
        }
    `;

    // 简化版阻止功能
    function preventBasic() {
        // 阻止滚动
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        // 阻止右键菜单
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // 阻止F12等快捷键
        document.addEventListener('keydown', function(e) {
            if (e.keyCode === 123) { // F12
                e.preventDefault();
                return false;
            }
        });
    }

    // 初始化简化版阻止功能
    function initBlockers() {
        document.head.appendChild(style);
        document.body.appendChild(overlay);
        preventBasic();
    }

    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBlockers);
    } else {
        initBlockers();
    }

    // 立即执行阻止
    initBlockers();
})();