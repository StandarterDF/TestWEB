// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Мобильное меню: безопасная логика открытия/закрытия
const navList = document.getElementById('nav-list');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const navLinks = document.querySelectorAll('.nav-link');

function openMenu() {
    navList.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
}

function closeMenu() {
    navList.classList.remove('active');
    document.body.style.overflow = ''; // Возвращаем скролл
}

mobileMenuBtn.addEventListener('click', openMenu);
mobileMenuClose.addEventListener('click', closeMenu);

// Закрываем меню при клике на любую ссылку
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});


// Product data with images
const productsData = {
    'Эко-Оргамин 400г': {
        name: 'Эко-Оргамин Старт',
        subtitle: 'Удобная упаковка для точечного внесения',
        price: '190',
        oldPrice: '250',
        images: [
            'static/images/Products/400/1.webp',
            'static/images/Products/400/2.webp',
            'static/images/Products/400/3.webp',
            'static/images/Products/400/4.webp',
            'static/images/Products/400/5.webp',
            'static/images/Products/400/6.webp',
            'static/images/Products/400/7.webp',
            'static/images/Products/400/8.webp',
            'static/images/Products/400/9.webp',
            'static/images/Products/400/10.webp'
        ],
        specs: [
            { label: 'Тип', value: 'органическое удобрение' },
            { label: 'цвет', value: 'серый' },
            { label: 'вес', value: '400 гр.' },
            { label: 'Класс безопасности', value: '4 (безопасный)' },
            { label: 'Срок годности', value: 'Неограничен' },
            { label: 'Гарантийный срок', value: '12 мес.' }
        ]
    },
    'Эко-Оргамин 3000г': {
        name: 'Эко-Оргамин Профи',
        subtitle: 'Выгодная упаковка для больших огородов',
        price: '2 100',
        oldPrice: '2 800',
        images: [
            'static/images/Products/3000/1.webp',
            'static/images/Products/3000/2.webp',
            'static/images/Products/3000/3.webp',
            'static/images/Products/3000/4.webp',
            'static/images/Products/3000/5.webp',
            'static/images/Products/3000/6.webp',
            'static/images/Products/3000/7.webp',
            'static/images/Products/3000/8.webp'
        ],
        specs: [
            { label: 'Тип', value: 'органическое удобрение' },
            { label: 'цвет', value: 'серый' },
            { label: 'вес', value: '3000 гр. (3 кг)' },
            { label: 'Класс безопасности', value: '4 (безопасный)' },
            { label: 'Срок годности', value: 'Неограничен' },
            { label: 'Гарантийный срок', value: '12 мес.' }
        ]
    }
};

// Modal functions
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalMainImg = document.getElementById('modalMainImg');
const modalThumbnails = document.getElementById('modalThumbnails');
const modalPrice = document.getElementById('modalPrice');
const modalOldPrice = document.getElementById('modalOldPrice');
const modalSpecs = document.getElementById('modalSpecs');
const modalClose = document.getElementById('modalClose');

// Modal slider
const modalSlider = {
    thumbnailsContainer: null,
    thumbnailItems: [],
    currentIndex: 0,
    visibleCount: 5,
    
    init() {
        this.thumbnailsContainer = document.getElementById('modalThumbnails');
        this.updateVisibleCount();
    },
    
    updateVisibleCount() {
        this.visibleCount = window.innerWidth <= 480 ? 3 : 5;
    },
    
    setThumbnails(images) {
        this.thumbnailItems = Array.from(this.thumbnailsContainer.querySelectorAll('.thumbnail-item'));
        this.currentIndex = 0;
        this.updateSlider();
    },
    
    updateSlider() {
        if (!this.thumbnailItems.length) return;
        
        const thumbnailWidth = 60;
        const gap = 12;
        const scrollPosition = this.currentIndex * (thumbnailWidth + gap);
        
        this.thumbnailsContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        this.updateActiveClass();
    },
    
    updateActiveClass() {
        this.thumbnailItems.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
    },
    
    next() {
        if (this.currentIndex < this.thumbnailItems.length - 1) {
            this.currentIndex++;
            this.updateSlider();
        }
    },
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlider();
        }
    },
    
    goTo(index) {
        this.currentIndex = index;
        this.updateSlider();
    }
};

// Оставляем глобальной функцией, т.к. она вызывается из кнопок "Заказать"
window.openModal = function(productKey) {
    const product = productsData[productKey];
    if (!product) return;

    // Set main info
    modalTitle.textContent = product.name;
    modalSubtitle.textContent = product.subtitle;
    modalPrice.textContent = `Акция : ${product.price}`;
    modalOldPrice.textContent = product.oldPrice;

    // Set specs
    modalSpecs.innerHTML = product.specs.map(spec => `
        <li>
            <span class="spec-label">${spec.label}</span>
            <span class="spec-value">${spec.value}</span>
        </li>
    `).join('');

    // Set images
    if (product.images.length > 0) {
        modalMainImg.src = product.images[0];

        // Create thumbnails
        modalThumbnails.innerHTML = product.images.map((img, index) => `
            <div class="thumbnail-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${img}" alt="thumbnail ${index + 1}">
            </div>
        `).join('');

        // Initialize slider
        modalSlider.init();
        modalSlider.setThumbnails(product.images);

        // Add click handlers to thumbnails
        document.querySelectorAll('.thumbnail-item').forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                modalMainImg.src = product.images[index];
                modalSlider.goTo(index);
            });
        });
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function closeModalDirect() {
    modalOverlay.classList.remove('active');
    // Восстанавливаем скролл, только если не открыто мобильное меню
    if (!navList.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

// Закрытие по клику на фон
modalOverlay.addEventListener('click', function(event) {
    if (event.target === modalOverlay) {
        closeModalDirect();
    }
});

// Закрытие по клику на крестик
modalClose.addEventListener('click', closeModalDirect);

// Modal slider buttons
const modalSliderPrev = document.getElementById('modalSliderPrev');
const modalSliderNext = document.getElementById('modalSliderNext');

if (modalSliderPrev) {
    modalSliderPrev.addEventListener('click', () => modalSlider.prev());
}

if (modalSliderNext) {
    modalSliderNext.addEventListener('click', () => modalSlider.next());
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModalDirect();
        closeImageGallery();
        closeProductionGallery();
    }
    if (e.key === 'ArrowLeft') {
        changeImage(-1);
        changeProductionImage(-1);
    }
    if (e.key === 'ArrowRight') {
        changeImage(1);
        changeProductionImage(1);
    }
});


// Form submit - открывает почтовый клиент с заполненными данными
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const message = document.getElementById('contactMessage').value;
    
    const subject = encodeURIComponent(`Вопрос от ${name}`);
    const body = encodeURIComponent(
        `Здравствуйте!\n\n` +
        `Меня зовут: ${name}\n\n` +
        `Сообщение:\n${message}`
    );
    
    window.location.href = `mailto:info@eco-orgamin.ru?subject=${subject}&body=${body}`;
});


// Scroll animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Research items toggle function
window.toggleResearch = function(element) {
    const researchItem = element.closest('.research-item');
    const isActive = researchItem.classList.contains('active');
    
    // Close all other items
    document.querySelectorAll('.research-item.active').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        researchItem.classList.add('active');
    }
};

// Production Slider
const productionSlider = {
    track: null,
    dotsContainer: null,
    slides: [],
    currentIndex: 0,
    slidesPerView: 3,
    isMobile: false,
    autoplayInterval: null,
    autoplayDelay: 4000,
    touchStartX: 0,
    touchEndX: 0,

    init() {
        this.track = document.getElementById('productionSliderTrack');
        this.dotsContainer = document.getElementById('productionSliderDots');
        this.slides = document.querySelectorAll('.slide-item');
        
        if (!this.track || !this.slides.length) return;

        this.updateSlidesPerView();
        this.createDots();
        this.updateSlider();
        this.addEventListeners();
        this.startAutoplay();
    },

    updateSlidesPerView() {
        this.isMobile = window.innerWidth <= 768;
        this.slidesPerView = this.isMobile ? 1 : 3;
    },

    createDots() {
        if (!this.dotsContainer) return;
        this.dotsContainer.innerHTML = '';
        
        const totalDots = this.slides.length - this.slidesPerView + 1;
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    },

    updateSlider() {
        if (!this.track) return;
        
        const slideWidth = this.isMobile ? 100 : (100 / this.slidesPerView);
        const offset = -(this.currentIndex * slideWidth);
        this.track.style.transform = `translateX(${offset}%)`;
        
        this.updateDots();
    },

    updateDots() {
        if (!this.dotsContainer) return;
        const dots = this.dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    },

    nextSlide() {
        const maxIndex = this.slides.length - this.slidesPerView;
        if (this.currentIndex >= maxIndex) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.updateSlider();
    },

    prevSlide() {
        if (this.currentIndex <= 0) {
            this.currentIndex = this.slides.length - this.slidesPerView;
        } else {
            this.currentIndex--;
        }
        this.updateSlider();
    },

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
        this.resetAutoplay();
    },

    addEventListeners() {
        const prevBtn = document.getElementById('productionSliderPrev');
        const nextBtn = document.getElementById('productionSliderNext');
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoplay();
        });
        
        if (nextBtn) nextBtn.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoplay();
        });

        // Touch events for swipe
        this.track.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.stopAutoplay();
        }, { passive: true });

        this.track.addEventListener('touchmove', (e) => {
            this.touchEndX = e.touches[0].clientX;
        }, { passive: true });

        this.track.addEventListener('touchend', () => {
            this.handleSwipe();
            this.startAutoplay();
        });

        // Mouse drag events
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;

        this.track.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            currentTranslate = this.currentIndex * (this.isMobile ? 100 : (100 / this.slidesPerView));
            this.track.style.transition = 'none';
            this.stopAutoplay();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const diff = e.clientX - startX;
            const slideWidth = this.isMobile ? 100 : (100 / this.slidesPerView);
            const newTranslate = currentTranslate - (diff / (this.isMobile ? window.innerWidth : window.innerWidth)) * 100;
            this.track.style.transform = `translateX(${-newTranslate}%)`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            this.track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            
            const diff = startX - event.clientX;
            const threshold = this.isMobile ? 50 : 100;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            } else {
                this.updateSlider();
            }
            this.startAutoplay();
        });

        // Resize handler
        window.addEventListener('resize', () => {
            this.updateSlidesPerView();
            this.createDots();
            this.currentIndex = Math.min(this.currentIndex, this.slides.length - this.slidesPerView);
            this.updateSlider();
        });
    },

    handleSwipe() {
        const diff = this.touchStartX - this.touchEndX;
        const threshold = this.isMobile ? 50 : 100;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    },

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    },

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    },

    resetAutoplay() {
        this.startAutoplay();
    }
};

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    productionSlider.init();
});

// Image Gallery
const galleryImages = [
    'static/images/Life/1.jpg',
    'static/images/Life/2.jpg',
    'static/images/Life/3.jpg'
];

let currentImageIndex = 0;

// Production Gallery
const productionGalleryImages = [
    'static/images/Factory/1.jpg',
    'static/images/Factory/2.jpg',
    'static/images/Factory/3.jpg',
    'static/images/Factory/4.jpg',
    'static/images/Factory/5.jpg'
];

let currentProductionImageIndex = 0;

window.openImageGallery = function(element, index) {
    currentImageIndex = index;
    const overlay = document.getElementById('imageGalleryOverlay');
    const mainImage = document.getElementById('imageGalleryMain');
    const counter = document.getElementById('imageGalleryCounter');
    
    mainImage.src = galleryImages[index];
    counter.textContent = `${index + 1} / ${galleryImages.length}`;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeImageGallery = function() {
    const overlay = document.getElementById('imageGalleryOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
};

window.changeImage = function(direction) {
    const mainImage = document.getElementById('imageGalleryMain');
    const counter = document.getElementById('imageGalleryCounter');
    
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    mainImage.src = galleryImages[currentImageIndex];
    counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
};

// Production Gallery functions
window.openProductionGallery = function(element, index) {
    currentProductionImageIndex = index;
    const overlay = document.getElementById('productionGalleryOverlay');
    const mainImage = document.getElementById('productionGalleryMain');
    const counter = document.getElementById('productionGalleryCounter');
    
    mainImage.src = productionGalleryImages[index];
    counter.textContent = `${index + 1} / ${productionGalleryImages.length}`;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeProductionGallery = function() {
    const overlay = document.getElementById('productionGalleryOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
};

window.changeProductionImage = function(direction) {
    const mainImage = document.getElementById('productionGalleryMain');
    const counter = document.getElementById('productionGalleryCounter');
    
    currentProductionImageIndex += direction;
    
    if (currentProductionImageIndex < 0) {
        currentProductionImageIndex = productionGalleryImages.length - 1;
    } else if (currentProductionImageIndex >= productionGalleryImages.length) {
        currentProductionImageIndex = 0;
    }
    
    mainImage.src = productionGalleryImages[currentProductionImageIndex];
    counter.textContent = `${currentProductionImageIndex + 1} / ${productionGalleryImages.length}`;
};