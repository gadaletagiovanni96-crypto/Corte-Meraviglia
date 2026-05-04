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

}); // <-- Fine unica e corretta del DOMContentLoaded

