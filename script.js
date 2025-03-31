document.addEventListener('DOMContentLoaded', function() {
    const celebrateButton = document.getElementById('celebrate');
    
    // 添加点击事件
    celebrateButton.addEventListener('click', function() {
        // 播放庆祝音效
        playSound();
        
        // 触发彩带效果
        triggerConfetti();
        
        // 添加一些额外的动画效果
        addSpecialEffects();
    });
    
    // 页面加载时的初始动画
    setTimeout(function() {
        document.querySelector('h1').classList.add('animate__animated', 'animate__bounce');
        setTimeout(function() {
            document.querySelector('h1').classList.remove('animate__bounce');
            document.querySelector('h1').classList.add('animate__pulse');
        }, 1000);
    }, 500);
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

// 触发彩带效果
function triggerConfetti() {
    // 使用 canvas-confetti 库
    const duration = 5 * 1000;
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
        
        const particleCount = 50 * (timeLeft / duration);
        
        // 发射彩带
        confetti({
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });
        
        confetti({
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });
        
        // 请求下一帧
        requestAnimationFrame(frame);
    }());
    
    // 创建更多炫酷效果
    setTimeout(function() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 500);
    
    setTimeout(function() {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 70,
            origin: { x: 0 }
        });
        
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 70,
            origin: { x: 1 }
        });
    }, 1000);
}

// 添加额外的动画效果
function addSpecialEffects() {
    // 让蛋糕上的蜡烛火焰更加活跃
    const flame = document.querySelector('.flame');
    flame.style.animation = 'flicker 0.5s infinite alternate';
    
    // 添加更多的气球
    const balloons = document.querySelector('.balloons');
    const colors = ['#FF4384', '#5BC0EB', '#9BC53D', '#FFD166', '#A64AC9'];
    
    for (let i = 0; i < 5; i++) {
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
    
    // 让消息部分的文字变大
    const messages = document.querySelectorAll('.message p');
    messages.forEach(function(message, index) {
        setTimeout(function() {
            message.classList.add('animate__animated', 'animate__pulse');
            message.style.fontSize = '1.3rem';
            message.style.color = colors[index % colors.length];
        }, index * 300);
    });
} 