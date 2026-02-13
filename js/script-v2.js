// ===================================
// CM VENTOR - SCRIPT V2
// Basado en diseño moderno rheab
// ===================================

// Variables globales
let isScrolled = false;
let currentLanguage = localStorage.getItem('cmventor-language') || 'es';

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initScrollHeader();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initLanguage();
    initScrollToTop();
    initActiveSectionIndicator();
    initScrollAnimations();
    initFormValidation();
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
// SCROLL TO TOP BUTTON
// ===================================
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll suave al hacer clic
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// ACTIVE SECTION INDICATOR
// ===================================
function initActiveSectionIndicator() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__nav-link[data-section]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function updateActiveSection() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Llamar al cargar la página
}

// ===================================
// SCROLL ANIMATIONS (FADE-IN)
// ===================================
function initScrollAnimations() {
    // Verificar si el usuario prefiere animaciones reducidas
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Si el usuario prefiere animaciones reducidas, mostrar todo inmediatamente
        const animatedElements = document.querySelectorAll('.card, .producto-card, .service-card, .testimonial-card');
        animatedElements.forEach(el => {
            el.classList.add('visible');
        });
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // No hacer unobserve para mantener visibilidad
            } else {
                // Solo ocultar si realmente sale del viewport hacia arriba
                // Pero mantener visible si ya fue visto
                if (entry.boundingClientRect.top < 0) {
                    // El elemento ya pasó, mantenerlo visible
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);
    
    // Agregar animación a elementos con clase fade-in-up
    const animatedElements = document.querySelectorAll('.card, .producto-card, .service-card, .testimonial-card');
    
    // Verificar qué elementos ya están visibles al cargar
    animatedElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            // Si ya está visible, mostrar inmediatamente
            el.classList.add('fade-in-up', 'visible');
        } else {
            // Si no está visible, agregar clase y observar
            el.classList.add('fade-in-up');
            el.style.transitionDelay = `${Math.min(index * 0.05, 0.5)}s`;
            observer.observe(el);
        }
    });
}

// ===================================
// FORM VALIDATION (REAL-TIME)
// ===================================
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('.form-input-floating');
    
    inputs.forEach(input => {
        // Validación en tiempo real al perder el foco
        input.addEventListener('blur', function() {
            validateField(input);
        });
        
        // Limpiar error al escribir
        input.addEventListener('input', function() {
            if (input.classList.contains('error')) {
                clearFieldError(input);
            }
        });
    });
}

function validateField(input) {
    const fieldName = input.name;
    const value = input.value.trim();
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    // Limpiar error previo
    clearFieldError(input);
    
    // Validar campo requerido
    if (input.hasAttribute('required') && !value) {
        showFieldError(input, errorElement, 'Este campo es obligatorio');
        return false;
    }
    
    // Validar email
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        showFieldError(input, errorElement, 'Por favor ingresa un email válido');
        return false;
    }
    
    // Validar teléfono (básico)
    if (fieldName === 'telefono' && value && value.length < 10) {
        showFieldError(input, errorElement, 'Por favor ingresa un teléfono válido');
        return false;
    }
    
    return true;
}

function showFieldError(input, errorElement, message) {
    input.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldError(input) {
    input.classList.remove('error');
    const errorElement = document.getElementById(`${input.name}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
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
        
        // Validar todos los campos
        let isValid = true;
        const inputs = form.querySelectorAll('.form-input-floating[required]');
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Por favor, completa correctamente todos los campos requeridos.', 'error');
            return;
        }
        
        // Validar email
        if (!isValidEmail(formData.email)) {
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            showFieldError(emailInput, emailError, 'Por favor ingresa un email válido');
            showNotification('Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        // Deshabilitar botón de envío y mostrar loading
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        submitButton.setAttribute('aria-busy', 'true');
        
        // Simular envío (aquí deberías integrar con tu backend)
        setTimeout(function() {
            // Aquí iría la llamada a tu API/backend
            console.log('Datos del formulario:', formData);
            
            // Mostrar mensaje de éxito
            showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            
            // Resetear formulario
            form.reset();
            
            // Resetear labels flotantes y errores
            const inputs = form.querySelectorAll('.form-input-floating');
            inputs.forEach(input => {
                input.classList.remove('error');
                const errorElement = document.getElementById(`${input.name}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
            
            // Restaurar botón
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            submitButton.removeAttribute('aria-busy');
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
function changeProductImage(thumbElement, imageSrc, mainImageId = 'producto-main-image') {
    // Cambiar la imagen principal
    const mainImage = document.getElementById(mainImageId);
    if (mainImage) {
        mainImage.src = imageSrc;
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.style.opacity = '1';
        }, 150);
    }
    
    // Actualizar la clase active solo en las miniaturas del mismo contenedor
    const galleryContainer = thumbElement.closest('.producto-gallery');
    if (galleryContainer) {
        const thumbs = galleryContainer.querySelectorAll('.producto-thumb');
        thumbs.forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbElement.classList.add('active');
    }
}

// ===================================
// LANGUAGE SYSTEM
// ===================================
function initLanguage() {
    // Cargar idioma guardado o usar español por defecto
    changeLanguage(currentLanguage, false);
}

function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    if (menu) {
        menu.classList.toggle('language-menu--open');
    }
}

function changeLanguage(lang, save = true) {
    currentLanguage = lang;
    
    // Guardar preferencia
    if (save) {
        localStorage.setItem('cmventor-language', lang);
    }
    
    // Actualizar botón de idioma
    const langBtn = document.getElementById('currentLang');
    if (langBtn) {
        langBtn.textContent = lang.toUpperCase();
    }
    
    // Cerrar menú
    const menu = document.getElementById('languageMenu');
    if (menu) {
        menu.classList.remove('language-menu--open');
    }
    
    // Traducir todos los elementos
    translatePage(lang);
}

function translatePage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    // Traducir elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (t[key]) {
            if (element.tagName === 'INPUT') {
                if (element.type === 'submit' || element.type === 'button') {
                    element.value = t[key];
                } else {
                    // Para inputs, actualizar placeholder si existe
                    if (element.placeholder) {
                        element.placeholder = t[key];
                    }
                }
            } else if (element.tagName === 'SELECT') {
                // Para selects, traducir todas las opciones
                element.querySelectorAll('option[data-translate]').forEach(option => {
                    const optionKey = option.getAttribute('data-translate');
                    if (t[optionKey]) {
                        option.textContent = t[optionKey];
                    }
                });
            } else if (element.tagName === 'TEXTAREA') {
                if (element.placeholder) {
                    element.placeholder = t[key];
                }
            } else if (element.tagName === 'LABEL') {
                // Para labels, mantener el asterisco si existe
                const text = element.textContent.trim();
                if (text.endsWith('*')) {
                    element.textContent = t[key] + ' *';
                } else {
                    element.textContent = t[key];
                }
            } else {
                element.textContent = t[key];
            }
        }
    });
    
    // Actualizar atributo lang del HTML
    const htmlElement = document.getElementById('htmlLang') || document.documentElement;
    htmlElement.setAttribute('lang', lang);
}

// Cerrar menú de idioma al hacer clic fuera
document.addEventListener('click', function(event) {
    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('languageMenu');
    
    if (langBtn && langMenu && !langBtn.contains(event.target) && !langMenu.contains(event.target)) {
        langMenu.classList.remove('language-menu--open');
    }
});

// Log para debugging (remover en producción)
// ===================================
// PRODUCT MODAL
// ===================================

// Galerías de productos
const productGalleries = {
    torres: {
        title: 'Torres de Enfriamiento',
        images: [
            'images/torres enfriamiento/torre de enfriamiento-1.webp',
            'images/torres enfriamiento/torre de enfriamiento-2.webp',
            'images/torres enfriamiento/torre de enfriamiento-3.webp',
            'images/torres enfriamiento/torre de enfriamiento-4.webp',
            'images/torres enfriamiento/torre de enfriamiento-5.webp',
            'images/torres enfriamiento/torre de enfriamiento-6.webp',
            'images/torres enfriamiento/torre de enfriamiento-7.webp',
            'images/torres enfriamiento/torre de enfriamiento-8.webp',
            'images/torres enfriamiento/torre de enfriamiento-10.webp',
            'images/torres enfriamiento/torre de enfriamiento-11.webp',
            'images/torres enfriamiento/torre de enfriamiento-12.webp',
            'images/torres enfriamiento/torre de enfriamiento-13.webp',
            'images/torres enfriamiento/torre de enfriamiento-14.webp',
            'images/torres enfriamiento/1-2torre de enfriamiento-14.webp',
            'images/torres enfriamiento/torre de enfriamiento-15.webp',
            'images/torres enfriamiento/torre de enfriamiento-16.webp',
            'images/torres enfriamiento/3-1.webp'
        ],
        description: 'Amplia variedad de modelos de acuerdo a los requerimientos y necesidades de nuestros clientes. Fabricadas en: Fibra de vidrio, Acero galvanizado, Acero inoxidable. Capacidad: 50-2000 TR. Certificado CTI.'
    },
    ventiladores: {
        title: 'Ventiladores',
        images: [
            'images/ventilador/Imagen1.webp',
            'images/ventilador/Imagen2.webp',
            'images/ventilador/Imagen3.webp',
            'images/ventilador/Imagen4.webp',
            'images/ventilador/Imagen5.webp',
            'images/ventilador/Imagen6.webp',
            'images/ventilador/17.webp',
            'images/ventilador/18.webp'
        ],
        description: 'Diseños personalizados para su aplicación, fabricados en poliamida reforzada con fibra de vidrio (PAG), centro en aluminio inyectado, alta eficiencia, resistencia mecánica, bajo ruido sonoro, consumo de energía inferior, resistente a la corrosión y ligero.'
    },
    rellenos: {
        title: 'Rellenos Enfriadores',
        images: [
            'images/relleno/Relleno-Splash-Film.webp',
            'images/relleno/CF1900-Cross-Fluted-Film-Fill-Media-For.webp',
            'images/relleno/610mm.webp',
            'images/relleno/610mm-width1.webp',
            'images/relleno/Louver.webp'
        ],
        description: 'Tipos: Splash Fill que logra un alto rendimiento térmico en torres de enfriamiento de contraflujo y flujo cruzado. Film Fill que cuenta con una entrada/salida vertical que promueve el flujo libre de escombros. Madera tratada.'
    },
    espreas: {
        title: 'Espreas',
        images: [
            'images/espreas/Espera-tipo-1.webp',
            'images/espreas/Espreas-tipo-2.webp',
            'images/espreas/esprera-tipo-3.webp'
        ],
        description: 'Diseño único que provee la dispersión de agua de forma uniforme en todas las direcciones, previniendo fugas y asegurando un amplio contacto con el relleno, para conseguir el mejor funcionamiento de las Torres de Enfriamiento.'
    },
    louvers: {
        title: 'Louvers',
        images: [
            'images/Louvers/Louvers.png',
            'images/Louvers/Louvers1.png'
        ],
        description: 'Louvers en PVC de alta eficiencia para ventanas de Torre de Enfriamiento. Fabricado en PVC rígido contra rayos UV. Reduce el salpiqueo minimizando la reposición de agua. Reduce el ruido y mantiene baja la caída de presión.'
    }
};

function openProductModal(productId) {
    const gallery = productGalleries[productId];
    if (!gallery) return;
    
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMainImage = document.getElementById('modalMainImage');
    const modalThumbs = document.getElementById('modalThumbs');
    const modalDescription = document.getElementById('modalDescription');
    
    // Traducir título
    const t = translations[currentLanguage];
    const titleKey = productId === 'torres' ? 'torresTitle' : 
                     productId === 'ventiladores' ? 'ventiladoresTitle' :
                     productId === 'rellenos' ? 'rellenosTitle' :
                     productId === 'espreas' ? 'espreasTitle' : 'louversTitle';
    modalTitle.textContent = t ? t[titleKey] : gallery.title;
    
    // Establecer primera imagen
    modalMainImage.src = gallery.images[0];
    modalMainImage.alt = gallery.title;
    
    // Crear thumbnails
    modalThumbs.innerHTML = '';
    gallery.images.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.alt = `${gallery.title} ${index + 1}`;
        thumb.className = index === 0 ? 'active' : '';
        thumb.onclick = () => changeModalImage(imgSrc, index);
        modalThumbs.appendChild(thumb);
    });
    
    // Traducir descripción
    const descKey = productId === 'torres' ? 'torresVariedad' :
                    productId === 'ventiladores' ? 'ventiladoresDesc' :
                    productId === 'rellenos' ? 'rellenosTipos' :
                    productId === 'espreas' ? 'espreasDesc' : 'louversDesc';
    modalDescription.textContent = t ? t[descKey] : gallery.description;
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function changeModalImage(imgSrc, index) {
    const modalMainImage = document.getElementById('modalMainImage');
    const thumbs = document.querySelectorAll('.product-modal__thumbs img');
    
    // Cambiar imagen principal
    modalMainImage.style.opacity = '0';
    setTimeout(() => {
        modalMainImage.src = imgSrc;
        modalMainImage.style.opacity = '1';
    }, 150);
    
    // Actualizar thumbnails activos
    thumbs.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Cerrar modal con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

console.log('CM Ventor V2 - Script inicializado correctamente');
console.log('Versión: 2.0');
console.log('Diseño basado en: Rheab con colores CM Ventor');
console.log('Idioma actual:', currentLanguage);

