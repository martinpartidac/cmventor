// ===================================
// CM VENTOR - SCRIPT V2
// Basado en diseño moderno rheab
// ===================================

// Variables globales
let isScrolled = false;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initScrollHeader();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
});

// ===================================
// HEADER - Scroll Effect
// ===================================
function initScrollHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            if (!isScrolled) {
                header.classList.add('header--scrolled');
                isScrolled = true;
            }
        } else {
            if (isScrolled) {
                header.classList.remove('header--scrolled');
                isScrolled = false;
            }
        }
    });
}

// ===================================
// MOBILE MENU
// ===================================
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileToggle || !navMenu) return;
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = navMenu.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Cerrar menú al hacer clic en el botón CTA
    const ctaButton = navMenu.querySelector('.btn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            closeMobileMenu();
        });
    }
}

function toggleMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileToggle || !navMenu) return;
    
    mobileToggle.classList.toggle('header__mobile-toggle--open');
    navMenu.classList.toggle('header__nav--open');
    
    // Prevenir scroll del body cuando el menú está abierto
    if (navMenu.classList.contains('header__nav--open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileToggle || !navMenu) return;
    
    mobileToggle.classList.remove('header__mobile-toggle--open');
    navMenu.classList.remove('header__nav--open');
    document.body.style.overflow = '';
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    // Ya está implementado con scroll-behavior: smooth en CSS
    // Esta función es para compatibilidad con navegadores antiguos
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const headerHeight = document.getElementById('header').offsetHeight;
    const targetPosition = section.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    // Cerrar menú móvil si está abierto
    closeMobileMenu();
}

// ===================================
// FORMULARIO DE CONTACTO
// ===================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            empresa: document.getElementById('empresa').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            servicio: document.getElementById('servicio').value,
            mensaje: document.getElementById('mensaje').value
        };
        
        // Validar campos requeridos
        if (!formData.nombre || !formData.email || !formData.telefono || !formData.mensaje) {
            showNotification('Por favor, completa todos los campos requeridos.', 'error');
            return;
        }
        
        // Validar email
        if (!isValidEmail(formData.email)) {
            showNotification('Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        // Deshabilitar botón de envío
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Simular envío (aquí deberías integrar con tu backend)
        setTimeout(function() {
            // Aquí iría la llamada a tu API/backend
            console.log('Datos del formulario:', formData);
            
            // Mostrar mensaje de éxito
            showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            
            // Resetear formulario
            form.reset();
            
            // Restaurar botón
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 1500);
    });
}

// ===================================
// VALIDACIÓN
// ===================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// NOTIFICACIONES
// ===================================
function showNotification(message, type = 'success') {
    // Eliminar notificaciones anteriores
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Estilos en línea (puedes moverlos al CSS)
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        z-index: 9999;
        font-weight: 500;
        max-width: 400px;
        animation: slideInRight 0.3s ease-in-out;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(function() {
        notification.style.animation = 'slideOutRight 0.3s ease-in-out';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 5000);
}

// Agregar animaciones de notificación al CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// ANIMACIONES AL SCROLL (Opcional)
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const animatedElements = document.querySelectorAll('.card, .services__card, .hero__text, .hero__image');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializar animaciones de scroll (opcional)
// Descomenta si quieres activar las animaciones al scroll
// window.addEventListener('load', initScrollAnimations);

// ===================================
// UTILIDADES
// ===================================

// Función para detectar si es dispositivo móvil
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Función para obtener parámetros de URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// ===================================
// PRODUCTO GALLERY - Cambiar imagen principal
// ===================================
function changeProductImage(thumbElement, imageSrc) {
    // Cambiar la imagen principal
    const mainImage = document.getElementById('producto-main-image');
    if (mainImage) {
        mainImage.src = imageSrc;
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.style.opacity = '1';
        }, 150);
    }
    
    // Actualizar la clase active en las miniaturas
    const thumbs = document.querySelectorAll('.producto-thumb');
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbElement.classList.add('active');
}

// Log para debugging (remover en producción)
console.log('CM Ventor V2 - Script inicializado correctamente');
console.log('Versión: 2.0');
console.log('Diseño basado en: Rheab con colores CM Ventor');

