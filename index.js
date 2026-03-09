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


// Modal functions
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');

// Оставляем глобальной функцией, т.к. она вызывается из кнопок "Заказать"
window.openModal = function(productName) {
    modalTitle.textContent = productName;
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