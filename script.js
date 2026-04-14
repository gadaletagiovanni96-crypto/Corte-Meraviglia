document.addEventListener('DOMContentLoaded', () => {
            // Logica per il Menu Mobile
            const mobileMenu = document.getElementById('mobile-menu');
            const navMenu = document.getElementById('nav-menu');

            mobileMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Chiude il menu se clicchi un link (TRANNE il pulsante del sottomenu "Servizi")
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Controlla se il link cliccato NON è quello con la freccina
                if (!link.classList.contains('dropdown-toggle')) {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

            // Logica precedente per le animazioni allo scroll
            const reveals = document.querySelectorAll('.reveal');
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
        });  

        // Aggiungi questo dentro il tuo blocco DOMContentLoaded esistente
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// 4. Gestione Hover Carousel per le Card dei Servizi
        const carousels = document.querySelectorAll('.hover-carousel');

        carousels.forEach(carousel => {
            const images = carousel.querySelectorAll('img');
            let currentIndex = 0;
            let intervalId = null;

            // Se la card ha una sola immagine, non attivare il carosello
            if (images.length <= 1) return;

            // Quando il mouse entra nell'immagine
            carousel.addEventListener('mouseenter', () => {
                intervalId = setInterval(() => {
                    // Togli la classe active all'immagine corrente
                    images[currentIndex].classList.remove('active');
                    
                    // Passa alla prossima immagine (se è l'ultima, torna alla prima)
                    currentIndex = (currentIndex + 1) % images.length;
                    
                    // Dai la classe active alla nuova immagine
                    images[currentIndex].classList.add('active');
                }, 1200); // 1200 millisecondi = l'immagine cambia ogni 1.2 secondi
            });

            // Quando il mouse esce dall'immagine
            carousel.addEventListener('mouseleave', () => {
                // Ferma il timer del carosello
                clearInterval(intervalId);
                
                // (Opzionale ma elegante) Fa tornare visibile la primissima immagine
                images[currentIndex].classList.remove('active');
                currentIndex = 0;
                images[currentIndex].classList.add('active');
            });
        }); 
        // --- 1.5 Gestione Sottomenu Mobile a fisarmonica ---
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const submenu = document.querySelector('.submenu');

        dropdownToggle.addEventListener('click', (e) => {
            // Controlla se siamo su uno schermo piccolo (mobile)
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Impedisce al link di saltare alla sezione #services
                submenu.classList.toggle('open');
                
                // Ruota la freccina
                const arrow = dropdownToggle.querySelector('.arrow');
                if (submenu.classList.contains('open')) {
                    arrow.style.transform = 'rotate(180deg)';
                } else {
                    arrow.style.transform = 'rotate(0)';
                }
            }
        });

        // --- 5. Gestione Carosello Recensioni ---
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        let currentSlideIndex = 0;

        // Funzione per aggiornare la posizione del carosello
        const updateCarousel = () => {
            // Sposta il binario a sinistra in base all'indice
            track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
            
            // Disabilita la freccia sinistra se siamo alla prima slide
            prevBtn.disabled = currentSlideIndex === 0;
            
            // Disabilita la freccia destra se siamo all'ultima slide
            nextBtn.disabled = currentSlideIndex === slides.length - 1;
        };

        // Click freccia destra
        nextBtn.addEventListener('click', () => {
            if (currentSlideIndex < slides.length - 1) {
                currentSlideIndex++;
                updateCarousel();
            }
        });

        // Click freccia sinistra
        prevBtn.addEventListener('click', () => {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                updateCarousel();
            }
        });

        // Inizializza lo stato dei bottoni al caricamento
        updateCarousel();