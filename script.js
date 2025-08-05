// 语言切换功能
class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'zh';
        this.init();
    }

    init() {
        // 绑定语言切换按钮事件
        document.getElementById('lang-zh').addEventListener('click', () => this.switchLanguage('zh'));
        document.getElementById('lang-en').addEventListener('click', () => this.switchLanguage('en'));
        
        // 初始化语言
        this.updateContent();
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        
        // 更新按钮状态
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`lang-${lang}`).classList.add('active');
        
        // 更新页面内容
        this.updateContent();
        
        // 更新页面语言属性
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }

    updateContent() {
        const elements = document.querySelectorAll('[data-zh][data-en]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLanguage}`);
            if (text) {
                element.textContent = text;
            }
        });
    }
}

// 功能幻灯片控制
class FeatureSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.feature-slide');
        this.dots = document.querySelectorAll('.dot');
        this.totalSlides = this.slides.length;
        this.init();
    }

    init() {
        // 绑定控制按钮事件
        document.querySelector('.prev-btn').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next-btn').addEventListener('click', () => this.nextSlide());
        
        // 绑定圆点事件
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // 自动播放
        this.startAutoPlay();
        
        // 鼠标悬停时暂停自动播放
        const slider = document.querySelector('.feature-slider');
        slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    goToSlide(index) {
        // 移除当前活动状态
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // 设置新的活动状态
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 每5秒切换一次
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// 平滑滚动功能
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // 为所有内部链接添加平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// 页面加载动画
class PageAnimations {
    constructor() {
        this.init();
    }

    init() {
        // 监听滚动事件，为元素添加动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // 观察需要动画的元素
        document.querySelectorAll('.step, .feature-slide').forEach(el => {
            observer.observe(el);
        });
    }
}

// 添加动画样式
const animationStyles = `
    .step, .feature-slide {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .step.animate-in, .feature-slide.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;

// 将动画样式添加到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
    new FeatureSlider();
    new SmoothScroll();
    new PageAnimations();
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    const slider = document.querySelector('.feature-slider');
    if (!slider) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            if (e.target.closest('.feature-slider')) {
                document.querySelector('.prev-btn').click();
            }
            break;
        case 'ArrowRight':
            if (e.target.closest('.feature-slider')) {
                document.querySelector('.next-btn').click();
            }
            break;
    }
});

// 响应式处理
function handleResize() {
    // 在移动设备上调整某些功能
    if (window.innerWidth <= 768) {
        // 移动设备上的特殊处理
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);