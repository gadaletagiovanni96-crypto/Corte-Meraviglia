document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVBAR SCROLL (Con protezione per pagina Contatti) ---
    const navbar = document.querySelector('.navbar');
    // Si attiva SOLO se la navbar esiste e NON ha la classe 'navbar-solid'
    if (navbar && !navbar.classList.contains('navbar-solid')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 2. MENU MOBILE E HAMBURGER ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Chiude il menu se clicchi un link (TRANNE il sottomenu)
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (!link.classList.contains('dropdown-toggle')) {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // --- 3. SOTTOMENU MOBILE (Fisarmonica) ---
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const submenu = document.querySelector('.submenu');
    if (dropdownToggle && submenu) {
        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); 
                submenu.classList.toggle('open');
                
                const arrow = dropdownToggle.querySelector('.arrow');
                if (submenu.classList.contains('open')) {
                    arrow.style.transform = 'rotate(180deg)';
                } else {
                    arrow.style.transform = 'rotate(0)';
                }
            }
        });
    }

    // --- 4. ANIMAZIONI ALLO SCROLL (.reveal) ---
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        const revealOnScroll = () => {
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 100;
                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add('active');
                }
            }
        };
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Lancia l'animazione al primo caricamento
    }

    // --- 5. GESTIONE HOVER CAROUSEL (Card Servizi) ---
    const carousels = document.querySelectorAll('.hover-carousel');
    if (carousels.length > 0) {
        carousels.forEach(carousel => {
            const images = carousel.querySelectorAll('img');
            let currentIndex = 0;
            let intervalId = null;

            if (images.length > 1) {
                carousel.addEventListener('mouseenter', () => {
                    intervalId = setInterval(() => {
                        images[currentIndex].classList.remove('active');
                        currentIndex = (currentIndex + 1) % images.length;
                        images[currentIndex].classList.add('active');
                    }, 1200); 
                });

                carousel.addEventListener('mouseleave', () => {
                    clearInterval(intervalId);
                    images[currentIndex].classList.remove('active');
                    currentIndex = 0;
                    images[currentIndex].classList.add('active');
                });
            }
        });
    }

    // --- 6. GESTIONE CAROSELLO RECENSIONI ---
    const track = document.querySelector('.carousel-track');
    // Questo codice si esegue SOLO se la pagina contiene il carosello recensioni
    if (track) {
        const slides = Array.from(track.children);
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        let currentSlideIndex = 0;

        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
            if(prevBtn) prevBtn.disabled = currentSlideIndex === 0;
            if(nextBtn) nextBtn.disabled = currentSlideIndex === slides.length - 1;
        };

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentSlideIndex < slides.length - 1) {
                    currentSlideIndex++;
                    updateCarousel();
                }
            });
        }

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentSlideIndex > 0) {
                    currentSlideIndex--;
                    updateCarousel();
                }
            });
        }

        updateCarousel();
    }

    // --- 8. GESTIONE TAB EVENTI ---
    const eventTabs = document.querySelectorAll('.showcase-tab');
    const eventPanels = document.querySelectorAll('.showcase-panel');

    if (eventTabs.length > 0 && eventPanels.length > 0) {
        eventTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 1. Rimuovi la classe 'active' da tutti i bottoni e pannelli
                eventTabs.forEach(t => t.classList.remove('active'));
                eventPanels.forEach(p => p.classList.remove('active'));

                // 2. Aggiungi la classe 'active' al bottone cliccato
                tab.classList.add('active');

                // 3. Trova il pannello corrispondente tramite il data-target e mostralo
                const targetId = tab.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    // --- FLIP CARD CAROUSEL INTELLIGENTE (SOLO MOBILE) ---
    // Esegue il codice solo se lo schermo è quello di uno smartphone o tablet
    if (window.innerWidth <= 1024) {
        
        const flipCards = document.querySelectorAll('.flip-card');
        const servicesGrid = document.querySelector('.services-grid');

        // Configura l'osservatore
        const flipObserverOptions = {
            root: servicesGrid, // Osserva l'area di scorrimento
            rootMargin: '0px',
            threshold: 0.6 // La carta si gira quando è visibile al 60% (cioè quando è quasi al centro)
        };

        const flipObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Quando la carta arriva al centro, si scopre
                    entry.target.classList.add('is-flipped');
                } else {
                    // Quando la carta esce dal centro, si copre di nuovo
                    entry.target.classList.remove('is-flipped');
                }
            });
        }, flipObserverOptions);

        // Attacca l'osservatore a tutte le tue carte
        flipCards.forEach(card => {
            flipObserver.observe(card);
        });
    }
}); 

