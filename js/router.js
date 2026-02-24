// 路由混淆系统 - 将真实URL映射为短哈希
const routeMap = {
  // 哈希 -> 真实页面
  'a1': 'index.html',
  'b2': 'about.html',
  'c3': 'news.html',
  'd4': 'news-wuxiang.html',
  'e5': 'news-redox.html',
  'f6': 'compliance-news.html',
  'g7': 'products.html',
  'h8': 'NAVFIO.html',
  'i9': 'funding-application.html',
  'j0': 'privacy-policy.html',
  'k1': 'cookie-policy.html'
};

// 反向映射
const reverseMap = {};
for (const [hash, url] of Object.entries(routeMap)) {
  reverseMap[url] = hash;
}

// 编码URL为哈希
function encodeUrl(url) {
  return reverseMap[url] || url;
}

// 解码哈希为URL
function decodeUrl(hash) {
  return routeMap[hash] || hash + '.html';
}

// 跳转函数
function navigate(hash) {
  const url = decodeUrl(hash);
  window.location.href = url;
}

// 获取链接函数（用于href属性）
function link(hash) {
  return 'javascript:navigate("' + hash + '")';
}

// 处理页面加载时的哈希路由
function handleHashRoute() {
  const hash = window.location.hash.slice(1);
  if (hash && routeMap[hash]) {
    // 替换URL为真实页面，不显示哈希
    window.history.replaceState(null, null, routeMap[hash]);
  }
}

// 页面加载时处理
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleHashRoute);
} else {
  handleHashRoute();
}

// 导出函数供其他脚本使用
window.Router = {
  encode: encodeUrl,
  decode: decodeUrl,
  navigate: navigate,
  link: link,
  map: routeMap
};
