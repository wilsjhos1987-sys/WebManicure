// Inicializar el carrusel de Bootstrap y funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrusel de Bootstrap
    const trendsCarousel = document.querySelector('#trendsCarousel');
    if (trendsCarousel) {
        const carousel = new bootstrap.Carousel(trendsCarousel, {
            interval: 5000,
            wrap: true,
            pause: 'hover'
        });
        
        // Agregar eventos personalizados al carrusel
        trendsCarousel.addEventListener('slide.bs.carousel', function(event) {
            console.log(`Deslizando a la diapositiva ${event.to}`);
        });
    }
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // No prevenir el comportamiento por defecto si es un enlace vacío
            if(this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                // Calcular posición con offset para el navbar fijo
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if(navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
    
    // Cambiar clase activa en navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100;
        
        // Encontrar la sección actual
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Actualizar enlaces activos
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if(href === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Efecto hover mejorado para tarjetas de tendencias
    const trendCards = document.querySelectorAll('.trend-card');
    trendCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animación para los swatches de color
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Crear efecto de onda
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size/2;
            const y = event.clientY - rect.top - size/2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            this.appendChild(ripple);
            
            // Remover el elemento después de la animación
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Añadir estilos para la animación de ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .color-swatch {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Función para mostrar año actual en el footer
    function updateCurrentYear() {
        const yearElements = document.querySelectorAll('.current-year');
        const currentYear = new Date().getFullYear();
        
        yearElements.forEach(element => {
            if(element.textContent.includes('2026')) {
                // Mantener el año 2026 como parte del diseño de tendencias
                console.log('Año de tendencias: 2026');
            }
        });
    }
    
    // Llamar a la función para actualizar el año
    updateCurrentYear();
    
    // Mostrar mensaje de consola de bienvenida
    console.log('%c💅 Manicura Digital 2026', 'color: #7a1c3f; font-size: 18px; font-weight: bold;');
    console.log('%cTendencias de "lujo silencioso" cargadas correctamente', 'color: #9caf88;');
    
    // Detectar preferencia de color del sistema
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDarkScheme.matches) {
        console.log('Modo oscuro detectado en el sistema');
    }
});