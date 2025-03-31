document.addEventListener('DOMContentLoaded', function() {
    const celebrateButton = document.getElementById('celebrate');
    
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 为移动设备设置特定类
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    
    // 添加点击事件
    celebrateButton.addEventListener('click', function() {
        // 播放庆祝音效
        playSound();
        
        // 触发彩带效果
        triggerConfetti();
        
        // 添加一些额外的动画效果
        addSpecialEffects();
        
        // 强制应用文本颜色（解决移动端颜色不显示问题）
        applyTextColors();
    });
    
    // 页面加载时的初始动画
    setTimeout(function() {
        document.querySelector('h1').classList.add('animate__animated', 'animate__bounce');
        setTimeout(function() {
            document.querySelector('h1').classList.remove('animate__bounce');
            document.querySelector('h1').classList.add('animate__pulse');
        }, 1000);
    }, 500);
    
    // 在页面加载完成后预加载礼花库
    if (typeof confetti === 'function') {
        // 预热礼花效果（小型隐藏初始化）
        confetti({
            particleCount: 1,
            spread: 1,
            origin: { y: -10 }, // 屏幕外初始化
            disableForReducedMotion: false
        });
    }
});

// 播放音效
function playSound() {
    // 创建音频元素
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-party-horn-sound-530.mp3');
    audio.volume = 0.5;
    
    // 尝试播放音效
    const playPromise = audio.play();
    
    // 处理自动播放限制
    if (playPromise !== undefined) {
        playPromise.catch(function(error) {
            console.log('音频自动播放受到浏览器限制。');
        });
    }
}

// 触发彩带效果 - 优化移动端
function triggerConfetti() {
    // 检测confetti库是否可用
    if (typeof confetti !== 'function') {
        console.error('Confetti library not loaded!');
        // 显示备用礼花效果
        showFallbackConfetti();
        return;
    }
    
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 根据设备调整参数
    const duration = isMobile ? 3 * 1000 : 5 * 1000; // 移动设备缩短持续时间
    const particleMultiplier = isMobile ? 20 : 50; // 移动设备减少粒子数量
    const animationEnd = Date.now() + duration;
    
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // 创建彩带效果
    (function frame() {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
            return;
        }
        
        const particleCount = particleMultiplier * (timeLeft / duration);
        
        // 发射彩带 - 调整移动设备的参数
        confetti({
            particleCount: Math.floor(particleCount),
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
            disableForReducedMotion: false, // 强制在移动设备上启用
            gravity: isMobile ? 2 : 1, // 移动设备上加大重力
            scalar: isMobile ? 0.7 : 1 // 移动设备缩小粒子大小
        });
        
        confetti({
            particleCount: Math.floor(particleCount),
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
            disableForReducedMotion: false,
            gravity: isMobile ? 2 : 1,
            scalar: isMobile ? 0.7 : 1
        });
        
        // 在移动设备上降低帧率以提高性能
        if (isMobile) {
            setTimeout(() => requestAnimationFrame(frame), 50); // 每50ms请求一帧
        } else {
            requestAnimationFrame(frame);
        }
    }());
    
    // 创建更多炫酷效果
    setTimeout(function() {
        confetti({
            particleCount: isMobile ? 50 : 100,
            spread: 70,
            origin: { y: 0.6 },
            disableForReducedMotion: false
        });
    }, 500);
    
    setTimeout(function() {
        confetti({
            particleCount: isMobile ? 50 : 100,
            angle: 60,
            spread: 70,
            origin: { x: 0 },
            disableForReducedMotion: false
        });
        
        confetti({
            particleCount: isMobile ? 50 : 100,
            angle: 120,
            spread: 70,
            origin: { x: 1 },
            disableForReducedMotion: false
        });
    }, 1000);
}

// 移动设备备用礼花效果
function showFallbackConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    
    // 清空容器
    confettiContainer.innerHTML = '';
    
    // 创建CSS礼花效果
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'fallback-confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)];
        
        confettiContainer.appendChild(confetti);
    }
}

// 添加额外的动画效果
function addSpecialEffects() {
    // 让蛋糕上的蜡烛火焰更加活跃
    const flame = document.querySelector('.flame');
    flame.style.animation = 'flicker 0.5s infinite alternate';
    
    // 添加更多的气球
    const balloons = document.querySelector('.balloons');
    const colors = ['#FF4384', '#5BC0EB', '#9BC53D', '#FFD166', '#A64AC9'];
    
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const balloonCount = isMobile ? 3 : 5; // 移动设备减少气球数量
    
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.left = Math.random() * 80 + 10 + '%';
        balloon.style.bottom = '-100px';
        balloon.style.width = Math.random() * 20 + 30 + 'px';
        balloon.style.height = Math.random() * 30 + 40 + 'px';
        balloon.style.animationDelay = Math.random() * 5 + 's';
        balloon.style.animationDuration = Math.random() * 5 + 8 + 's';
        balloon.style.animationName = 'float-' + (Math.floor(Math.random() * 4) + 1);
        
        balloons.appendChild(balloon);
    }
    
    // 让标题旋转
    document.querySelector('h1').classList.add('animate__animated', 'animate__tada');
    
    // 让消息部分的文字变大并添加文字颜色
    applyTextColors();
}

// 强制应用文本颜色（解决移动端颜色不显示问题）
function applyTextColors() {
    const messages = document.querySelectorAll('.message p');
    const colors = ['#FF4384', '#5BC0EB', '#9BC53D', '#FFD166', '#A64AC9'];
    
    messages.forEach(function(message, index) {
        // 立即应用基本颜色
        message.style.color = colors[index % colors.length];
        
        setTimeout(function() {
            // 确保颜色应用且添加脉冲动画
            message.classList.add('animate__animated', 'animate__pulse');
            message.style.fontSize = '1.3rem';
            
            // 再次强制应用颜色（解决某些移动浏览器的问题）
            message.style.color = colors[index % colors.length];
            // 添加内联重要标记
            message.setAttribute('style', 
                `color: ${colors[index % colors.length]} !important; 
                 font-size: 1.3rem !important;`
            );
            
            // 创建并应用动态样式表（最终解决方案）
            const colorId = `message-color-${index}`;
            let style = document.getElementById(colorId);
            if (!style) {
                style = document.createElement('style');
                style.id = colorId;
                document.head.appendChild(style);
            }
            style.innerHTML = `.message p:nth-child(${index + 1}) { 
                color: ${colors[index % colors.length]} !important; 
                font-size: 1.3rem !important;
            }`;
        }, index * 300);
    });
} 
