'use strict';

// ==================== 配置常量 ====================
const CONFIG = {
    CODE_VIEWER: {
        PRE_WIDTH: '400px',
        PRE_HEIGHT: '800px',
        CONTAINER_WIDTH: '420px',
        CONTAINER_HEIGHT: '820px'
    },
    ANIMATION: {
        REMOVE_DELAY: 600,
        REMOVE_DELAY_GAME: 500,
        TRANSITION_DELAY: 800,
        TOGGLE_DELAY: 250
    },
    SIDEBAR_POSITIONS: {
        HOME: '0px',
        C_PY: '100px',
        C_HF: '200px',
        C_JJY: '400px',
        C_AI: '300px',
        C_51: '500px',
        C_YY: '700px'
    }
};

// ==================== 工具函数 ====================
const hasClass = (element, cls) => {
    return element.classList.contains(cls);
};

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

// ==================== 图片展示相关 ====================
function toggleImageSize(element) {
    if (hasClass(element, 'small')) {
        element.classList.add('big');
        element.classList.remove('small');
    } else if (hasClass(element, 'big') || hasClass(element, 'origin')) {
        element.classList.add('small');
        element.classList.remove('big', 'origin');
    }
}

function toggleAllImages(showOriginal) {
    const images = qsa('.bechange');
    images.forEach(img => {
        if (showOriginal) {
            if (hasClass(img, 'small') || hasClass(img, 'big')) {
                img.classList.add('origin');
                img.classList.remove('small', 'big');
            }
        } else {
            if (hasClass(img, 'big') || hasClass(img, 'origin')) {
                img.classList.add('small');
                img.classList.remove('big', 'origin');
            }
        }
    });
}

function addImageClickEvent() {
    const images = qsa('.bechange');
    images.forEach(img => {
        img.addEventListener('click', function() {
            toggleImageSize(this);
        });
        img.style.cursor = 'pointer';
    });
}

function addBigButton() {
    const container = qs('#change-part2');
    const existingButton = qs('#big_b');
    
    if (!existingButton) {
        const buttonDiv = document.createElement('div');
        const buttonText = document.createElement('p');
        const tooltip = document.createElement('span');
        
        tooltip.classList.add('tiptop');
        buttonDiv.classList.add('big_b_div');
        buttonDiv.style.cursor = 'pointer';
        buttonText.textContent = '全部查看原图';
        buttonText.id = 'big_b';
        
        buttonDiv.appendChild(buttonText);
        buttonDiv.appendChild(tooltip);
        container.appendChild(buttonDiv);
        
        addBigButtonEvent();
    }
}

function addBigButtonEvent() {
    const buttonDiv = qs('.big_b_div');
    const buttonText = qs('#big_b');
    
    if (!buttonDiv || !buttonText) return;
    
    buttonDiv.addEventListener('click', function() {
        const showOriginal = buttonText.textContent === '全部查看原图';
        toggleAllImages(showOriginal);
        
        this.classList.toggle('is_small_button');
        this.classList.toggle('is_big_button');
        buttonText.textContent = showOriginal ? '全部查看小图' : '全部查看原图';
    });
}

// ==================== 代码展示相关 ====================
function createCodeElement(filePath, container) {
    const wrapper = document.createElement('div');
    const title = document.createElement('div');
    const codeContainer = document.createElement('div');
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    
    title.textContent = filePath;
    title.classList.add('high_light');
    code.classList.add('language-python');
    
    Object.assign(pre.style, {
        width: CONFIG.CODE_VIEWER.PRE_WIDTH,
        height: CONFIG.CODE_VIEWER.PRE_HEIGHT,
        overflowX: 'auto',
        overflowY: 'scroll',
        backgroundColor: '#f8f8f8',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        fontFamily: 'Courier New, monospace',
        fontSize: '14px',
        lineHeight: '1.4',
        whiteSpace: 'pre',
        boxSizing: 'border-box',
        display: 'block'
    });
    
    pre.appendChild(code);
    codeContainer.appendChild(pre);
    
    Object.assign(codeContainer.style, {
        width: CONFIG.CODE_VIEWER.CONTAINER_WIDTH,
        height: CONFIG.CODE_VIEWER.CONTAINER_HEIGHT,
        overflow: 'visible',
        boxSizing: 'border-box'
    });
    
    wrapper.appendChild(title);
    wrapper.appendChild(codeContainer);
    wrapper.classList.add('py_right_div', 'py_right_made');
    container.appendChild(wrapper);
    
    loadCodeFile(filePath, code);
}

function loadCodeFile(filePath, codeElement) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                codeElement.textContent = xhr.responseText;
                if (typeof Prism !== 'undefined') {
                    Prism.highlightElement(codeElement);
                }
            } else {
                codeElement.textContent = `加载失败: ${filePath}`;
                console.error('加载文件失败:', filePath, '状态码:', xhr.status);
            }
        }
    };
    
    xhr.onerror = function() {
        codeElement.textContent = `网络错误: ${filePath}`;
        console.error('网络请求失败:', filePath);
    };
    
    xhr.send();
}

function displayCodeFiles(element, fileList) {
    const container = qs('#change-part');
    container.innerHTML = '';
    
    element.classList.add('py_selected_div');
    element.classList.remove('py_select_div');
    
    fileList.forEach(filePath => {
        createCodeElement(filePath, container);
    });
}

function pushup() {
    const elementsToRemove = qsa('.py_right_div');
    elementsToRemove.forEach(el => {
        el.classList.add('py_right_delete');
        el.classList.remove('py_right_made');
    });
    
    setTimeout(() => {
        elementsToRemove.forEach(el => {
            const parent = el.parentElement;
            if (parent) {
                parent.removeChild(el);
            }
        });
    }, CONFIG.ANIMATION.REMOVE_DELAY);
    
    const leftDivs = qsa('.py_left_div');
    leftDivs.forEach(div => {
        if (hasClass(div, 'py_selected_div')) {
            div.classList.add('py_select_div');
            div.classList.remove('py_selected_div');
        }
    });
}

function addScriptClickEvent(elementId, fileList) {
    const element = qs(`#${elementId}`);
    if (!element) return;
    
    element.addEventListener('click', function() {
        const container = qs('#change-part');
        let delay = 0;
        
        if (hasClass(this, 'py_selected_div')) {
            pushup();
        } else {
            delay = container.innerText === '' ? 0 : CONFIG.ANIMATION.TRANSITION_DELAY;
            if (delay > 0) {
                pushup();
            }
            setTimeout(() => {
                displayCodeFiles(this, fileList);
            }, delay);
        }
    });
}

// ==================== 页面切换相关 ====================
function clearContainers() {
    const cp = qs('#change-part');
    const cp2 = qs('#change-part2');
    if (cp) cp.innerText = '';
    if (cp2) cp2.innerText = '';
}

function moveSlide(position) {
    const slide = qs('.sideline');
    if (slide) {
        slide.style.marginLeft = position;
    }
}

function createImageGallery(imageList) {
    const container = qs('#change-part');
    imageList.forEach(src => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = src;
        div.appendChild(img);
        div.classList.add('small', 'bechange');
        container.appendChild(div);
    });
    
    addImageClickEvent();
    addBigButton();
}

function cpy() {
    clearContainers();
    moveSlide(CONFIG.SIDEBAR_POSITIONS.C_PY);
    
    const cp2 = qs('#change-part2');
    
    const createScriptDiv = (id, imgSrc) => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        const tooltip = document.createElement('span');
        
        tooltip.classList.add('tiptop');
        img.src = imgSrc;
        img.classList.add('middle_img');
        
        div.appendChild(tooltip);
        div.appendChild(img);
        div.id = id;
        div.style.cursor = 'pointer';
        div.classList.add('py_left_div');
        
        return div;
    };
    
    const yysScript = createScriptDiv('yys_script', './static/py_img/yys.jpg');
    const pigScript = createScriptDiv('pig_script', './static/py_img/pig.jpg');
    
    cp2.appendChild(yysScript);
    cp2.appendChild(pigScript);
    
    addScriptClickEvent('yys_script', ['./static/py/yys.py', './static/py/interactt.py', './static/py/radd.py']);
    addScriptClickEvent('pig_script', ['./static/py/pig.py']);
}

function chf() {
    clearContainers();
    moveSlide(CONFIG.SIDEBAR_POSITIONS.C_HF);
    
    const cp2 = qs('#change-part2');
    
    const gameDiv = document.createElement('div');
    gameDiv.id = 'hf_left_div1';
    gameDiv.classList.add('hf_left_div1');
    gameDiv.textContent = '互动';
    
    const mvDiv = document.createElement('div');
    mvDiv.id = 'hf_left_div2';
    mvDiv.classList.add('hf_left_div2');
    mvDiv.textContent = 'MV';
    
    const leftDiv1 = document.createElement('div');
    const leftDiv2 = document.createElement('div');
    
    leftDiv1.classList.add('hf_left');
    leftDiv1.id = 'hf_left1';
    leftDiv1.appendChild(gameDiv);
    
    leftDiv2.classList.add('hf_left');
    leftDiv2.id = 'hf_left2';
    leftDiv2.appendChild(mvDiv);
    
    cp2.appendChild(leftDiv1);
    cp2.appendChild(leftDiv2);
    
    setTimeout(() => {
        const gameDivEl = qs('#hf_left_div1');
        const mvDivEl = qs('#hf_left_div2');
        if (gameDivEl) gameDivEl.classList.add('close');
        if (mvDivEl) mvDivEl.classList.add('close');
    }, 1000);
    
    addGameButtonEvent();
    addMVButtonEvent();
}

function cai() {
    clearContainers();
    moveSlide(CONFIG.SIDEBAR_POSITIONS.C_AI);
    createImageGallery(['./static/aimer/aimer1.jpg', './static/aimer/aimer2.jpg', './static/aimer/aimer3.jpg']);
}

function c51() {
    clearContainers();
    moveSlide(CONFIG.SIDEBAR_POSITIONS.C_51);
    createImageGallery([
        './static/51/fiveone1.jpg',
        './static/51/fiveone2.jpg',
        './static/51/fiveone3.jpg',
        './static/51/fiveone4.jpg'
    ]);
}

function cjjy() {
    clearContainers();
    moveSlide(CONFIG.SIDEBAR_POSITIONS.C_JJY);
    createImageGallery(['./static/jjy/0040jbadly1h9bej7163ej60u0140qd802.jpg']);
}

function cyy() {
    clearContainers();
    moveSlide(CONFIG.SIDEBAR_POSITIONS.C_YY);
    createImageGallery(['./static/yy/YY1.jpg', './static/yy/YY2.jpg']);
}

function home() {
    clearContainers();
    moveSlide(CONFIG.SIDEBAR_POSITIONS.HOME);
    
    const cp2 = qs('#change-part2');
    const yellDiv = document.createElement('div');
    yellDiv.classList.add('hm_left_div');
    yellDiv.id = 'yellow-site';
    yellDiv.textContent = '黄网';
    cp2.appendChild(yellDiv);
    
    addYellowSiteEvent();
}

// ==================== 黄网跳转相关 ====================
function addYellowSiteEvent() {
    const yellowSite = qs('#yellow-site');
    if (yellowSite) {
        yellowSite.addEventListener('click', toMonkey);
    }
}

function toMonkey() {
    alert('悟空,你又调皮了!');
    const newWindow = window.open('_blank');
    setTimeout(() => {
        if (newWindow) {
            newWindow.location = './static/yellow.html';
        }
    }, CONFIG.ANIMATION.TOGGLE_DELAY);
}

// ==================== 游戏相关 ====================
function hf_push_div(element, className) {
    const elements = qsa(`.${className}`);
    elements.forEach(el => {
        el.classList.add('game_push');
        el.classList.remove('game_pull');
    });
    
    element.classList.add('close');
    element.classList.remove('open');
    
    setTimeout(() => {
        for (let i = elements.length - 1; i >= 0; i--) {
            const parent = elements[i].parentElement;
            if (parent) {
                parent.removeChild(elements[i]);
            }
        }
    }, CONFIG.ANIMATION.REMOVE_DELAY_GAME);
}

function game_div_in(element) {
    const parent = element.parentElement;
    element.classList.add('open');
    element.classList.remove('close');
    
    const gameDiv1 = document.createElement('div');
    gameDiv1.id = 'game1';
    gameDiv1.textContent = '星座图';
    gameDiv1.classList.add('game', 'game_pull');
    
    const gameDiv2 = document.createElement('div');
    gameDiv2.id = 'game2';
    gameDiv2.classList.add('game', 'game_pull');
    
    parent.appendChild(gameDiv1);
    parent.appendChild(gameDiv2);
    
    if (typeof addGame1Event === 'function') {
        addGame1Event();
    } else {
        console.error('addGame1Event 函数未定义');
    }
    
    if (typeof addGame2Event === 'function') {
        addGame2Event();
    } else {
        console.error('addGame2Event 函数未定义');
    }
}

function addGameButtonEvent() {
    const gameDiv = qs('#hf_left_div1');
    if (!gameDiv) return;
    
    gameDiv.addEventListener('click', function() {
        if (hasClass(this, 'close')) {
            game_div_in(this);
        } else {
            hf_push_div(this, 'game');
        }
    });
}

// ==================== MV相关 ====================
function addMVButtonEvent() {
    const mvDiv = qs('#hf_left_div2');
    const hfLeft2 = qs('#hf_left2');
    if (!mvDiv || !hfLeft2) return;
    
    const mv1Div = document.createElement('div');
    mv1Div.classList.add('mv');
    mv1Div.id = 'mv1';
    mv1Div.textContent = 'Aimer';
    
    const mv2Div = document.createElement('div');
    mv2Div.classList.add('mv');
    mv2Div.id = 'mv2';
    mv2Div.textContent = '春茶';
    
    const removeMV = () => {
        if (hfLeft2.contains(mv1Div)) {
            hfLeft2.removeChild(mv1Div);
        }
        if (hfLeft2.contains(mv2Div)) {
            hfLeft2.removeChild(mv2Div);
        }
    };
    
    mvDiv.addEventListener('click', function() {
        if (hasClass(this, 'close')) {
            mv1Div.classList.add('game_pull');
            mv1Div.classList.remove('game_push');
            hfLeft2.appendChild(mv1Div);
            addMv1Event();
            
            mv2Div.classList.add('game_pull');
            mv2Div.classList.remove('game_push');
            hfLeft2.appendChild(mv2Div);
            addMv2Event();
            
            this.classList.add('open');
            this.classList.remove('close');
        } else {
            mv1Div.classList.add('game_push');
            mv1Div.classList.remove('game_pull');
            mv2Div.classList.add('game_push');
            mv2Div.classList.remove('game_pull');
            
            setTimeout(removeMV, CONFIG.ANIMATION.REMOVE_DELAY_GAME);
            
            this.classList.add('close');
            this.classList.remove('open');
        }
    });
}

function addMv1Event() {
    const mv1 = qs('#mv1');
    if (!mv1) return;
    
    mv1.addEventListener('click', function() {
        const container = qs('#change-part');
        container.innerText = '';
        
        const videoDiv = document.createElement('div');
        const video = document.createElement('video');
        const source = document.createElement('source');
        
        source.src = './static/LAST_STARDUST.mp4';
        source.type = 'video/mp4';
        video.preload = 'auto';
        video.controls = 'controls';
        video.appendChild(source);
        videoDiv.appendChild(video);
        container.appendChild(videoDiv);
    });
}

function addMv2Event() {
    const mv2 = qs('#mv2');
    if (!mv2) return;
    
    mv2.addEventListener('click', function() {
        window.open('https://www.bilibili.com/video/av22551705');
    });
}

// ==================== 星座相关 ====================
const starData = {
    "白羊座": [
        [[0.30, 0.78], [0.34, 0.66], [0.28, 0.48], [0.60, 0.26], [0.65, 0.20], [0.71, 0.23], [0.70, 0.32], [0.72, 0.36]],
        [[0, 1, 2, 3, 4, 5], [3, 6, 7]]
    ],
    "天秤座": [
        [[0.16, 0.67], [0.34, 0.60], [0.60, 0.27], [0.75, 0.23], [0.84, 0.47], [0.63, 0.74], [0.51, 0.78]],
        [[0, 1, 2, 3, 4, 5, 6]]
    ],
    "摩羯座": [
        [[0.78, 0.21], [0.78, 0.34], [0.75, 0.45], [0.75, 0.70], [0.69, 0.78], [0.31, 0.66], [0.22, 0.49], [0.30, 0.53], [0.53, 0.54]],
        [[0, 1, 2, 3, 4, 5, 6, 7, 8, 1]]
    ],
    "水瓶座": [
        [[0.45, 0.21], [0.37, 0.35], [0.27, 0.51], [0.30, 0.58], [0.29, 0.64], [0.48, 0.79], [0.51, 0.71], [0.58, 0.68], [0.73, 0.74], [0.43, 0.53], [0.53, 0.47]],
        [[0, 1, 2, 3, 4, 5, 6, 7, 8], [2, 9, 10]]
    ],
    "双鱼座": [
        [[0.28, 0.43], [0.28, 0.53], [0.36, 0.73], [0.43, 0.78], [0.50, 0.70], [0.53, 0.62], [0.57, 0.58], [0.63, 0.43], [0.67, 0.39], [0.74, 0.39], [0.77, 0.34], [0.72, 0.30], [0.75, 0.22], [0.23, 0.50], [0.66, 0.33]],
        [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [0, 13, 1], [8, 14, 11]]
    ],
    "金牛座": [
        [[0.29, 0.21], [0.39, 0.36], [0.50, 0.51], [0.50, 0.57], [0.61, 0.63], [0.77, 0.71], [0.79, 0.79], [0.22, 0.43], [0.39, 0.57], [0.60, 0.71], [0.67, 0.76]],
        [[0, 1, 2, 3, 4, 5, 6], [7, 8, 3], [4, 9, 10]]
    ],
    "双子座": [
        [[0.18, 0.37], [0.25, 0.45], [0.35, 0.55], [0.39, 0.68], [0.49, 0.77], [0.51, 0.63], [0.57, 0.78], [0.28, 0.29], [0.42, 0.32], [0.61, 0.49], [0.72, 0.60], [0.83, 0.59], [0.69, 0.75], [0.22, 0.54], [0.35, 0.43], [0.48, 0.21]],
        [[0, 1, 2, 3, 4], [2, 5, 6], [7, 8, 9, 10, 11], [9, 12], [13, 1, 14, 8, 15]]
    ],
    "巨蟹座": [
        [[0.16, 0.39], [0.27, 0.36], [0.52, 0.49], [0.57, 0.65], [0.83, 0.78], [0.44, 0.21]],
        [[0, 1, 2, 3, 4], [2, 5]]
    ],
    "狮子座": [
        [[0.16, 0.75], [0.23, 0.67], [0.39, 0.77], [0.71, 0.53], [0.64, 0.39], [0.55, 0.37], [0.47, 0.27], [0.54, 0.24], [0.60, 0.27], [0.85, 0.56]],
        [[0, 1, 2, 3, 4, 5, 6, 7, 8], [3, 9]]
    ],
    "处女座": [
        [[0.16, 0.59], [0.35, 0.63], [0.44, 0.70], [0.62, 0.51], [0.77, 0.46], [0.84, 0.37], [0.60, 0.42], [0.65, 0.26], [0.34, 0.75]],
        [[0, 1, 2, 3, 4, 5], [3, 6, 7], [2, 8]]
    ],
    "天蝎座": [
        [[0.17, 0.50], [0.28, 0.63], [0.19, 0.70], [0.28, 0.78], [0.41, 0.77], [0.49, 0.72], [0.57, 0.55], [0.59, 0.44], [0.69, 0.31], [0.74, 0.21], [0.82, 0.29], [0.79, 0.44], [0.73, 0.50], [0.38, 0.47]],
        [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 13], [8, 11]]
    ],
    "射手座": [
        [[0.22, 0.66], [0.24, 0.51], [0.45, 0.40], [0.54, 0.37], [0.59, 0.43], [0.66, 0.50], [0.63, 0.60], [0.66, 0.67], [0.74, 0.53], [0.77, 0.39], [0.49, 0.47], [0.29, 0.68], [0.30, 0.78], [0.48, 0.21], [0.52, 0.27], [0.59, 0.29]],
        [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 10, 11, 12], [10, 4], [13, 14, 15, 3], [14, 3]]
    ]
};

function getStarSign(timestamp) {
    const date = new Date(timestamp);
    const sign = date.getMonth() * 100 + date.getDate();
    
    const signs = [
        { value: 20, name: '摩羯座' },
        { value: 119, name: '水瓶座' },
        { value: 221, name: '双鱼座' },
        { value: 320, name: '白羊座' },
        { value: 421, name: '金牛座' },
        { value: 522, name: '双子座' },
        { value: 623, name: '巨蟹座' },
        { value: 723, name: '狮子座' },
        { value: 823, name: '处女座' },
        { value: 923, name: '天秤座' },
        { value: 1022, name: '天蝎座' },
        { value: 1122, name: '射手座' }
    ];
    
    for (const s of signs) {
        if (sign < s.value) {
            return s.name;
        }
    }
    return '摩羯座';
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r || Math.round(Math.random() * 8 + 4);
    }
    
    draw(ctx) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
            this.x, this.y, Math.round(Math.random() * 1 + 1),
            this.x, this.y, Math.round(Math.random() * 3 + 6)
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, .9)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, .1)');
        
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.fillStyle = gradient;
        ctx.closePath();
        ctx.fill();
        return this;
    }
}

function drawConstellation(ctx, data, width, height) {
    const [points, lines] = data;
    
    ctx.strokeStyle = "#FFF";
    ctx.beginPath();
    
    for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];
        const startPoint = points[line[0]];
        ctx.moveTo(startPoint[0] * width, startPoint[1] * height);
        
        for (let j = 1; j < line.length; j++) {
            const point = points[line[j]];
            ctx.lineTo(point[0] * width, point[1] * height);
        }
    }
    
    ctx.stroke();
    
    for (const point of points) {
        new Circle(point[0] * width, point[1] * height).draw(ctx);
    }
}

let constellationTimer = null;

function initConstellationDrawing(canvas, birthInput, button) {
    const ctx = canvas.getContext("2d");
    ctx.font = "30px Courier New";
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (constellationTimer) {
            clearInterval(constellationTimer);
        }
        
        if (!birthInput.value) {
            alert("请选择您的出生日期");
            return;
        }
        
        canvas.style.display = "block";
        const date = new Date(birthInput.value.replace(/-/g, '/')).getTime();
        
        try {
            constellationTimer = setInterval(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const starSign = getStarSign(date);
                ctx.strokeText(starSign, 50, 50);
                drawConstellation(ctx, starData[starSign], canvas.width, canvas.height);
            }, 500);
        } catch (error) {
            if (constellationTimer) {
                clearInterval(constellationTimer);
            }
            console.error('星座绘制失败:', error);
        }
    });
}

function addGame1Event() {
    const game1 = qs('#game1');
    if (!game1) return;
    
    game1.addEventListener('click', function() {
        const container = qs('#change-part');
        container.innerHTML = '';
        
        const box = document.createElement('div');
        box.id = 'box';
        
        const paragraph = document.createElement('p');
        paragraph.textContent = '请选择或输入你的生日';
        paragraph.id = 'p_bir';
        
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.id = 'birth';
        
        const button = document.createElement('input');
        button.type = 'button';
        button.id = 'btn';
        button.value = '展示星空图';
        
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.width = '550';
        canvas.height = '550';
        
        box.appendChild(paragraph);
        box.appendChild(dateInput);
        box.appendChild(button);
        
        container.appendChild(box);
        container.appendChild(canvas);
        
        initConstellationDrawing(canvas, dateInput, button);
    });
}

function addGame2Event() {
    const game2 = qs('#game2');
    if (!game2) return;
    
    game2.addEventListener('click', function() {
        alert('come soon...');
    });
}

// ==================== 旧函数别名（向后兼容） ====================
const AddBigButton = addBigButton;
const AddBigButtonEvent = addBigButtonEvent;
const AddDivClickEvent = addImageClickEvent;
const AddYYSscriptevent = () => addScriptClickEvent('yys_script', ['./static/py/yys.py', './static/py/interactt.py', './static/py/radd.py']);
const AddPIGscriptevent = () => addScriptClickEvent('pig_script', ['./static/py/pig.py']);
const AddYelEvent = addYellowSiteEvent;
const AddGameButtonEvent = addGameButtonEvent;
const AddMVButtonEvent = addMVButtonEvent;
const Addgame1Event = addGame1Event;
const Addgame2Event = addGame2Event;
const Addmv1Event = addMv1Event;
const Addmv2Event = addMv2Event;
