// 产品数据
const products = [
    {
        id: 0,
        name: 'QuantumPro X1',
        desc: '量子计算处理器，128核5GHz，256GB缓存，专为AI加速设计。',
        specs: ['5GHz','128核','256GB'],
        price: '¥29,999',
        img: 'https://via.placeholder.com/60x60/667eea/ffffff?text=Q1',
        color: '#667eea',
        hoverColor: '#5a67d8'
    },
    {
        id: 1,
        name: 'NeuroBlade AI',
        desc: '神经网络加速卡，48GB HBM3，1.5TB/s 带宽，300W功耗。',
        specs: ['48GB','1.5TB/s','300W'],
        price: '¥19,999',
        img: 'https://via.placeholder.com/60x60/f093fb/ffffff?text=AI',
        color: '#f093fb',
        hoverColor: '#e879f9'
    },
    {
        id: 2,
        name: 'CloudSync 5.0',
        desc: '1PB 分布式存储，10GB/s 传输，99.999% 可用性，多云同步。',
        specs: ['1PB','10GB/s','5个9'],
        price: '¥59,999',
        img: 'https://via.placeholder.com/60x60/4facfe/ffffff?text=CS',
        color: '#4facfe',
        hoverColor: '#3b82f6'
    },
    {
        id: 3,
        name: 'SecurityGuard Pro',
        desc: '1ms威胁检测，100%拦截，256位量子加密，零信任架构。',
        specs: ['1ms','100%','256位'],
        price: '¥39,999',
        img: 'https://via.placeholder.com/60x60/43e97b/ffffff?text=SG',
        color: '#43e97b',
        hoverColor: '#22c55e'
    }
];

// DOM 元素引用
const productList = document.getElementById('productList');
const titleEl   = document.getElementById('title');
const descEl    = document.getElementById('desc');
const specEls   = [document.getElementById('spec1'),document.getElementById('spec2'),document.getElementById('spec3')];
const priceEl   = document.getElementById('price');

// 当前激活的产品ID
let activeId = 0;

// 渲染产品列表
function renderList(){
    productList.innerHTML = '';
    products.forEach(p=>{
        const item = document.createElement('div');
        item.className = `product-item ${p.id===activeId?'active':''}`;
        item.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <div class="product-info">
                <h4>${p.name}</h4>
                <p>${p.price}</p>
            </div>
        `;
        item.onclick = () => switchProduct(p.id);
        productList.appendChild(item);
    });
}

// 切换产品显示
function switchProduct(id){
    activeId = id;
    const p = products[id];
    titleEl.textContent = p.name;
    descEl.textContent = p.desc;
    p.specs.forEach((s,i)=>specEls[i].textContent=s);
    priceEl.textContent = p.price;
    
    // 更新按钮颜色
    priceEl.style.backgroundColor = p.color;
    priceEl.style.setProperty('--hover-color', p.hoverColor);
    
    renderList();
}

// 初始化页面
renderList();