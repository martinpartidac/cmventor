// CM Ventor - JavaScript para funcionalidad interactiva

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initProductModals();
    initScrollEffects();
    initMobileMenu();
    initWhatsAppButton();
});

// Navegación activa
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Función para actualizar navegación activa
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                // Actualizar mensaje de WhatsApp según la sección
                updateWhatsAppMessage(current);
            }
        });
    }

    // Actualizar navegación al hacer scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Actualizar navegación al cargar la página
    updateActiveNav();
}

// Scroll suave para enlaces internos
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Compensar header fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Menú móvil
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Efectos de scroll
function initScrollEffects() {
    // Header con efecto de transparencia
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Animaciones al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animateElements = document.querySelectorAll('.servicio-card, .producto-card, .proyecto-card, .value');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validar formulario
            if (validateForm(data)) {
                // Mostrar estado de carga
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                // Simular envío (aquí se conectaría con el backend)
                setTimeout(() => {
                    showNotification('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

// Validación del formulario
function validateForm(data) {
    const requiredFields = ['nombre', 'email', 'telefono', 'mensaje'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!data[field] || data[field].trim() === '') {
            showFieldError(input, 'Este campo es obligatorio');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    // Validar email
    const emailInput = document.getElementById('email');
    if (data.email && !isValidEmail(data.email)) {
        showFieldError(emailInput, 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    return isValid;
}

// Validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar error en campo
function showFieldError(input, message) {
    clearFieldError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    input.style.borderColor = '#ef4444';
    input.parentNode.appendChild(errorDiv);
}

// Limpiar error de campo
function clearFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    input.style.borderColor = '';
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Funcionalidad del botón cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Modales de productos
function initProductModals() {
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Datos de especificaciones de productos
    const productSpecs = {
        torre: {
            title: 'Torre de Enfriamiento',
            image: 'images/torre-enfriamiento-specs.jpg',
            specifications: [
                { label: 'Capacidad', value: '50 - 2000 TR' },
                { label: 'Material', value: 'FRP (Fiber Reinforced Plastic)' },
                { label: 'Certificación', value: 'CTI Certified' },
                { label: 'Eficiencia', value: 'Alta eficiencia térmica' },
                { label: 'Resistencia', value: 'Resistente a la corrosión' },
                { label: 'Mantenimiento', value: 'Bajo mantenimiento' }
            ],
            features: [
                'Diseño modular para fácil instalación',
                'Material FRP resistente a químicos agresivos',
                'Distribución optimizada del agua',
                'Ventiladores de alta eficiencia',
                'Sistema de aspersión uniforme',
                'Estructura reforzada para durabilidad'
            ]
        },
        motor: {
            title: 'Motor y Ventilador',
            image: 'images/motor-ventilador-specs.jpg',
            specifications: [
                { label: 'Eficiencia', value: 'IE3 Premium Efficiency' },
                { label: 'Potencia', value: '0.5 - 100 HP' },
                { label: 'Voltaje', value: '220V, 380V, 440V' },
                { label: 'Frecuencia', value: '50/60 Hz' },
                { label: 'Protección', value: 'IP55' },
                { label: 'Garantía', value: '3 años' }
            ],
            features: [
                'Motores de alta eficiencia energética',
                'Ventiladores aerodinámicamente optimizados',
                'Bajo nivel de ruido y vibración',
                'Protección contra sobrecarga',
                'Fácil mantenimiento y acceso',
                'Diseño resistente a condiciones adversas'
            ]
        },
        relleno: {
            title: 'Relleno Enfriador',
            image: 'images/relleno-enfriador-specs.jpg',
            specifications: [
                { label: 'Tipo', value: 'Film / Splash' },
                { label: 'Material', value: 'PVC, PP' },
                { label: 'Eficiencia', value: 'Alta transferencia térmica' },
                { label: 'Resistencia', value: 'Químicos agresivos' },
                { label: 'Temperatura', value: '-10°C a 70°C' },
                { label: 'Vida útil', value: '15+ años' }
            ],
            features: [
                'Diseño optimizado para máximo intercambio térmico',
                'Resistente a químicos del tratamiento de agua',
                'Baja pérdida de carga',
                'Fácil instalación y mantenimiento',
                'Distribución uniforme del agua',
                'Larga vida útil con mínimo mantenimiento'
            ]
        },
        aspersores: {
            title: 'Sistema de Aspersores',
            image: 'images/aspersores-specs.jpg',
            specifications: [
                { label: 'Tipo', value: 'Spray Nozzles' },
                { label: 'Material', value: 'PVC, ABS, Latón' },
                { label: 'Presión', value: '1.5 - 6 bar' },
                { label: 'Flujo', value: 'Variable según modelo' },
                { label: 'Cobertura', value: 'Distribución uniforme' },
                { label: 'Mantenimiento', value: 'Auto-limpieza' }
            ],
            features: [
                'Distribución uniforme del agua',
                'Bajo consumo de energía',
                'Resistente a obstrucciones',
                'Fácil instalación y ajuste',
                'Diseño auto-limpieza',
                'Compatible con diferentes tipos de agua'
            ]
        }
    };
    
    // Función para abrir modal
    window.openModal = function(productType) {
        const product = productSpecs[productType];
        if (!product) return;
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${product.title}</h2>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                </div>
                <div class="modal-specs">
                    <h3>Especificaciones Técnicas</h3>
                    <div class="specs-grid">
                        ${product.specifications.map(spec => `
                            <div class="spec-item">
                                <span class="spec-label">${spec.label}:</span>
                                <span class="spec-value">${spec.value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-features">
                    <h3>Características Principales</h3>
                    <ul class="features-list">
                        ${product.features.map(feature => `
                            <li><i class="fas fa-check"></i> ${feature}</li>
                        `).join('')}
                    </ul>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="requestQuote('${productType}')">
                        Solicitar Cotización
                    </button>
                    <button class="btn btn-secondary" onclick="closeModal()">
                        Cerrar
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
    
    // Función para cerrar modal
    window.closeModal = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    // Event listeners para cerrar modal
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Función para solicitar cotización desde modal
window.requestQuote = function(productType) {
    closeModal();
    
    // Scroll a la sección de contacto
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-llenar el formulario con el servicio seleccionado
        setTimeout(() => {
            const serviceSelect = document.getElementById('servicio');
            if (serviceSelect) {
                serviceSelect.value = 'cotizacion';
                serviceSelect.focus();
            }
        }, 500);
    }
    
    showNotification('Redirigiendo al formulario de contacto para tu cotización...', 'info');
};

// Lazy loading para imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Contador animado para estadísticas
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/[\d]/g, '');
                let current = 0;
                const increment = target / 100;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 20);
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Inicializar funcionalidades adicionales
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initAnimatedCounters();
});

// Función para manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// Función para optimizar rendimiento
function optimizePerformance() {
    // Preload de imágenes críticas
    const criticalImages = [
        'images/torre-enfriamiento-hero.jpg',
        'images/logo-cmventor.svg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Inicializar optimizaciones
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Funcionalidad del botón de WhatsApp
function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (whatsappBtn) {
        // Mensaje personalizado según la página
        const currentPage = window.location.pathname;
        let message = 'Hola, me interesa conocer más sobre los servicios de torres de enfriamiento de CM Ventor';
        
        if (currentPage.includes('productos-especificaciones')) {
            message = 'Hola, me interesa obtener más información sobre las especificaciones técnicas de sus productos';
        } else if (currentPage.includes('proyectos-detalle')) {
            message = 'Hola, me interesa conocer más sobre sus proyectos y servicios de torres de enfriamiento';
        }
        
        // Actualizar el enlace con el mensaje personalizado
        const encodedMessage = encodeURIComponent(message);
        whatsappBtn.href = `https://wa.me/52818327529?text=${encodedMessage}`;
        
        // Agregar evento de clic para tracking
        whatsappBtn.addEventListener('click', function(e) {
            // Tracking del clic (aquí se puede integrar Google Analytics)
            console.log('WhatsApp button clicked');
            
            // Opcional: Mostrar notificación
            showNotification('Abriendo WhatsApp...', 'info');
        });
        
        // Mostrar/ocultar botón basado en scroll
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const whatsappFloat = document.querySelector('.whatsapp-float');
            
            if (scrollTop > 300) {
                whatsappFloat.style.display = 'block';
            } else {
                whatsappFloat.style.display = 'none';
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Inicialmente oculto hasta hacer scroll
        document.querySelector('.whatsapp-float').style.display = 'none';
    }
}

// Función para generar mensaje dinámico basado en la sección
function generateWhatsAppMessage(section) {
    const messages = {
        'servicios': 'Hola, me interesa conocer más sobre sus servicios de instalación y mantenimiento de torres de enfriamiento',
        'productos': 'Hola, me interesa obtener información sobre sus productos y especificaciones técnicas',
        'proyectos': 'Hola, me interesa conocer más sobre sus proyectos y casos de éxito',
        'contacto': 'Hola, me interesa contactar con ustedes para una cotización',
        'default': 'Hola, me interesa conocer más sobre los servicios de torres de enfriamiento de CM Ventor'
    };
    
    return messages[section] || messages['default'];
}

// Función para actualizar mensaje de WhatsApp dinámicamente
function updateWhatsAppMessage(section) {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        const message = generateWhatsAppMessage(section);
        const encodedMessage = encodeURIComponent(message);
        whatsappBtn.href = `https://wa.me/52818327529?text=${encodedMessage}`;
    }
}
