document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVBAR SCROLL (Con protezione per pagina Contatti) ---
    const navbar = document.querySelector('.navbar');
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
            if (window.innerWidth <= 920) { // Aumentato a 920 per coprire anche i tablet in verticale
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
        revealOnScroll();
    }

    // --- 5. GESTIONE HOVER CAROUSEL (Card Servizi - Solo PC) ---
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

    // --- 7. FLIP CARD AL TOCCO (Solo Mobile e Tablet) ---
    const flipCards = document.querySelectorAll('.flip-card');
    if (flipCards.length > 0) {
        flipCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Non attivare il flip se clicchi sul player di Spotify o sul link in basso
                if (e.target.tagName.toLowerCase() === 'iframe' || e.target.classList.contains('card-link')) {
                    return;
                }

                // Chiude le altre carte
                flipCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('is-flipped');
                    }
                });
                // Gira/Chiude la carta attuale
                this.classList.toggle('is-flipped');
            });
        });
    }

    // --- 8. MENU A SCOMPARSA EVENTI (Solo Smartphone) ---
    const eventsToggleBtn = document.getElementById('mobile-events-toggle');
    const eventsList = document.getElementById('mobile-events-list');

    if (eventsToggleBtn && eventsList) {
        eventsToggleBtn.addEventListener('click', () => {
            eventsList.classList.toggle('open');
            eventsToggleBtn.classList.toggle('open');
        });
    }

    // --- 9. CAROSELLO CONCEPT (Frecce, Pallini e Autoscroll Intelligente) ---
    const conceptCarousel = document.getElementById('concept-carousel');
    const conceptDots = document.querySelectorAll('.carosello-dots .dot');
    const prevConceptBtn = document.querySelector('.prev-concept');
    const nextConceptBtn = document.querySelector('.next-concept');

    if (conceptCarousel && conceptDots.length > 0) {
        
        // 1. FORZATURA ALL'AVVIO: Rimette fisicamente il carosello alla prima slide a ogni ricaricamento
        conceptCarousel.scrollLeft = 0; 
        
        const slides = Array.from(conceptCarousel.children);
        let autoScrollInterval;

        // Observer interno per i pallini
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = slides.indexOf(entry.target);
                    conceptDots.forEach(dot => dot.classList.remove('active'));
                    if(conceptDots[index]) conceptDots[index].classList.add('active');
                }
            });
        }, { root: conceptCarousel, threshold: 0.6 });

        slides.forEach(slide => observer.observe(slide));

        const goToSlide = (index) => {
            const targetSlide = slides[index];
            const scrollPos = targetSlide.offsetLeft - conceptCarousel.offsetLeft;
            conceptCarousel.scrollTo({ left: scrollPos, behavior: 'smooth' });
        };

        const scrollToNextSlide = () => {
            let currentIndex = 0;
            conceptDots.forEach((dot, index) => { if(dot.classList.contains('active')) currentIndex = index; });
            let nextIndex = (currentIndex + 1) % slides.length;
            goToSlide(nextIndex);
        };

        const scrollToPrevSlide = () => {
            let currentIndex = 0;
            conceptDots.forEach((dot, index) => { if(dot.classList.contains('active')) currentIndex = index; });
            let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
        };

        // Funzioni per accendere e spegnere il motore
        const startAutoScroll = () => { 
            clearInterval(autoScrollInterval); // Pulisce sempre il timer vecchio per evitare impazzimenti
            autoScrollInterval = setInterval(scrollToNextSlide, 4000); 
        };
        const stopAutoScroll = () => { clearInterval(autoScrollInterval); };

        // Clic sulle Frecce
        if(prevConceptBtn && nextConceptBtn) {
            prevConceptBtn.addEventListener('click', () => { scrollToPrevSlide(); stopAutoScroll(); startAutoScroll(); });
            nextConceptBtn.addEventListener('click', () => { scrollToNextSlide(); stopAutoScroll(); startAutoScroll(); });
        }

        // Clic sui Pallini
        conceptDots.forEach((dot, index) => {
            dot.addEventListener('click', () => { goToSlide(index); stopAutoScroll(); startAutoScroll(); });
        });

        // Ferma il carosello se ci metti il mouse o il dito sopra
        conceptCarousel.addEventListener('touchstart', stopAutoScroll, {passive: true});
        conceptCarousel.addEventListener('touchend', startAutoScroll);
        conceptCarousel.addEventListener('mouseenter', stopAutoScroll);
        conceptCarousel.addEventListener('mouseleave', startAutoScroll);

        // 2. LA MAGIA: L'Observer della Sezione
        // Questo controlla se il carosello è attualmente visibile nello schermo dell'utente
        const sectionVisibilityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoScroll(); // Inizia a girare solo se lo stai guardando
                } else {
                    stopAutoScroll();  // Si ferma completamente se scorri su o giù
                }
            });
        }, { threshold: 0.2 }); // Si attiva non appena ne vedi almeno il 20%

        // Attacchiamo la telecamera al carosello
        sectionVisibilityObserver.observe(conceptCarousel);
    }

    // --- PRELOADER & AVVISO CUFFIE ---
    const preloader = document.getElementById('preloader');
    
    // Controlliamo se è la prima volta che l'utente entra
    const hasVisited = sessionStorage.getItem('siteVisited');

    if (preloader) {
        if (!hasVisited) {
            // È la prima volta: Blocchiamo lo scroll
            document.body.classList.add('no-scroll');
            
            // Usiamo window.addEventListener('load') perché aspetta che TUTTE LE IMMAGINI siano scaricate
            window.addEventListener('load', () => {
                
                // Lasciamo il messaggio a schermo per almeno 1.5 secondi extra per farlo leggere bene
                setTimeout(() => {
                    preloader.classList.add('preloader-hidden'); // Fa dissolvere la schermata
                    document.body.classList.remove('no-scroll'); // Sblocca lo scorrimento
                    
                    // Salviamo in memoria che l'utente ha già visto il caricamento
                    sessionStorage.setItem('siteVisited', 'true');
                }, 1500); 
            });
            
        } else {
            // L'utente aveva già caricato il sito in questa sessione. 
            // Nascondiamo istantaneamente il preloader senza fargli perdere tempo.
            preloader.style.display = 'none';
        }
    }

}); // <-- Fine unica e corretta del DOMContentLoaded

