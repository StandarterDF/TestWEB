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
            'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/07dd671f-963f-4168-80e6-a6d1c5d2dec1.jpg',
            'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/6763e6a4-6794-4eb7-8d60-e1d4ba33213d.jpg',
            'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/4ed6a88e-f106-46b6-8acc-e3f85b314b26.jpg',
            'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/646cf045-0958-4f6b-82d5-1a7568312809.jpg'
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
            'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/6500e5c6-ef92-4ee8-9ed7-91116330eaa0.jpg',
            'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/fce7774f-a9e4-42ef-9272-93b8165ea1d7.jpg',
            'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/c5a0457a-817a-4abb-bbff-7e810f4da1f8.jpg'
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
        
        // Add click handlers to thumbnails
        document.querySelectorAll('.thumbnail-item').forEach(item => {
            item.addEventListener('click', function() {
                const index = this.dataset.index;
                modalMainImg.src = product.images[index];
                
                // Update active class
                document.querySelectorAll('.thumbnail-item').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
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


// Form submit
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Ваше сообщение отправлено! Мы скоро свяжемся с вами.');
    e.target.reset();
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
    'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/55450d06-1ae1-44a3-af1a-d4503267ecfd.jpg',
    'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/3103ef77-6bc7-4425-965c-24dcecd7f46b.jpg',
    'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/630c0481-0779-4473-bb10-c360e671a4c1.jpg'
];

let currentImageIndex = 0;

// Production Gallery
const productionGalleryImages = [
    'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/c16d3c1e-70c6-4e59-9628-70ee2da00c2f.jpg',
    'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/bf29379a-1373-434a-a690-4a396bb5a4a9.jpg',
    'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/baaea6c8-2aaf-413b-be06-adcad426dfca.jpg',
    'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/04993ab3-fda7-4f62-9867-017014af9274.jpg',
    'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/340714/d24d8c1b-3e19-45cf-a63e-2b602686631c.jpg'
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