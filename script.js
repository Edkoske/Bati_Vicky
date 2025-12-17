        // Loading screen management
        window.addEventListener('load', () => {
            const loadingScreen = document.getElementById('loadingScreen');
            const body = document.body;
            
            // Ensure minimum loading time for smooth experience (1.2 seconds)
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                body.classList.remove('loading');
            }, 1200);
        });

        // Default configuration for editable features
        const defaultConfig = {
            hero_headline: "Together, We Can Build a Stronger Kericho County",
            hero_subtitle: "I humbly ask for your support and your vote as your County Woman Representative in 2027. With your trust, we can work together to shape a stronger, more inclusive, and prosperous future for our beloved Kericho County. Together, we can make the change we all desire.",
            cta_button_text: "Join the Movement",
            about_heading: "About Bati Vicky Chepkorir",
            vision_heading: "Our Development Agenda for Kericho County",
            footer_slogan: "Together, We Can Build a Better Future"
        };

        // Mobile menu toggle functionality
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll animations
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

        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });

        // Support form validation and submission
        const supportForm = document.getElementById('supportForm');
        const supportSuccessMessage = document.getElementById('supportSuccessMessage');

        supportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('supportName');
            const nameError = document.getElementById('supportNameError');
            if (name.value.trim().length < 3) {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
            
            // Validate email
            const email = document.getElementById('supportEmail');
            const emailError = document.getElementById('supportEmailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }
            
            // Validate phone
            const phone = document.getElementById('supportPhone');
            const phoneError = document.getElementById('supportPhoneError');
            const phoneRegex = /^[0-9+\-\s()]{10,}$/;
            if (!phoneRegex.test(phone.value)) {
                phoneError.style.display = 'block';
                isValid = false;
            } else {
                phoneError.style.display = 'none';
            }
            
            // Validate area
            const area = document.getElementById('supportArea');
            const areaError = document.getElementById('supportAreaError');
            if (area.value.trim().length < 2) {
                areaError.style.display = 'block';
                isValid = false;
            } else {
                areaError.style.display = 'none';
            }
            
            if (isValid) {
                supportSuccessMessage.style.display = 'block';
                supportForm.reset();
                setTimeout(() => {
                    supportSuccessMessage.style.display = 'none';
                }, 5000);
            }
        });

        // Contact form validation and submission
        const contactForm = document.getElementById('contactForm');
        const contactSuccessMessage = document.getElementById('contactSuccessMessage');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('contactName');
            const nameError = document.getElementById('contactNameError');
            if (name.value.trim().length < 2) {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
            
            // Validate email
            const email = document.getElementById('contactEmail');
            const emailError = document.getElementById('contactEmailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }
            
            // Validate message
            const message = document.getElementById('contactMessage');
            const messageError = document.getElementById('contactMessageError');
            if (message.value.trim().length < 10) {
                messageError.style.display = 'block';
                isValid = false;
            } else {
                messageError.style.display = 'none';
            }
            
            if (isValid) {
                contactSuccessMessage.style.display = 'block';
                contactForm.reset();
                setTimeout(() => {
                    contactSuccessMessage.style.display = 'none';
                }, 5000);
            }
        });

        // Set copyright year dynamically
        document.getElementById('copyrightYear').textContent = new Date().getFullYear();

        // Hero slider functionality
        const heroSlides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;

        function nextSlide() {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }

        // Change slide every 5 seconds
        setInterval(nextSlide, 5000);

        // Element SDK configuration
        async function onConfigChange(config) {
            const heroHeadline = document.getElementById('heroHeadline');
            const heroSubtitle = document.getElementById('heroSubtitle');
            const ctaButton = document.getElementById('ctaButton');
            const aboutHeading = document.getElementById('aboutHeading');
            const visionHeading = document.getElementById('visionHeading');
            const footerSlogan = document.getElementById('footerSlogan');

            if (heroHeadline) heroHeadline.textContent = config.hero_headline || defaultConfig.hero_headline;
            if (heroSubtitle) heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
            if (ctaButton) ctaButton.textContent = config.cta_button_text || defaultConfig.cta_button_text;
            if (aboutHeading) aboutHeading.textContent = config.about_heading || defaultConfig.about_heading;
            if (visionHeading) visionHeading.textContent = config.vision_heading || defaultConfig.vision_heading;
            if (footerSlogan) footerSlogan.textContent = config.footer_slogan || defaultConfig.footer_slogan;
        }

        function mapToCapabilities(config) {
            return {
                recolorables: [],
                borderables: [],
                fontEditable: undefined,
                fontSizeable: undefined
            };
        }

        function mapToEditPanelValues(config) {
            return new Map([
                ["hero_headline", config.hero_headline || defaultConfig.hero_headline],
                ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
                ["cta_button_text", config.cta_button_text || defaultConfig.cta_button_text],
                ["about_heading", config.about_heading || defaultConfig.about_heading],
                ["vision_heading", config.vision_heading || defaultConfig.vision_heading],
                ["footer_slogan", config.footer_slogan || defaultConfig.footer_slogan]
            ]);
        }

        // Initialize Element SDK
        if (window.elementSdk) {
            window.elementSdk.init({
                defaultConfig,
                onConfigChange,
                mapToCapabilities,
                mapToEditPanelValues
            });
        }

 (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9af335bf669b8a61',t:'MTc2NTk0MDg0My4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
