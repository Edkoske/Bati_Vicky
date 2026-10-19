        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const loadingScreen = document.getElementById('loadingScreen');

        // Keep the branded intro brief and independent of below-the-fold assets.
        window.setTimeout(() => {
            document.documentElement.classList.remove('loading');
            loadingScreen.setAttribute('aria-hidden', 'true');
        }, prefersReducedMotion ? 100 : 850);

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
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
            mobileToggle.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
            navMenu.classList.toggle('active', !isExpanded);
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.setAttribute('aria-label', 'Open navigation menu');
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
        }, { passive: true });

        // Scroll animations
        if (!prefersReducedMotion && 'IntersectionObserver' in window) {
            document.documentElement.classList.add('motion-ready');
            const observer = new IntersectionObserver((entries, currentObserver) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        currentObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            });

            document.querySelectorAll('.fade-in').forEach(element => {
                observer.observe(element);
            });
        } else {
            document.querySelectorAll('.fade-in').forEach(element => {
                element.classList.add('visible');
            });
        }

        // Support form validation and submission
        const supportForm = document.getElementById('supportForm');
        const supportSuccessMessage = document.getElementById('supportSuccessMessage');

        supportForm.addEventListener('submit', async (e) => {
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
            
            if (!isValid) return;

            const formData = new FormData(supportForm);
            try {
                const response = await fetch(supportForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    supportSuccessMessage.style.display = 'block';
                    supportSuccessMessage.textContent = 'Thank you for joining our movement! We will keep you updated on campaign activities.';
                    supportForm.reset();
                } else {
                    supportSuccessMessage.style.display = 'block';
                    supportSuccessMessage.textContent = 'Something went wrong. Please try again in a moment.';
                }
            } catch (err) {
                supportSuccessMessage.style.display = 'block';
                supportSuccessMessage.textContent = 'Network error. Please try again when you are online.';
            } finally {
                setTimeout(() => {
                    supportSuccessMessage.style.display = 'none';
                }, 5000);
            }
        });

        // Contact form validation and submission
        const contactForm = document.getElementById('contactForm');
        const contactSuccessMessage = document.getElementById('contactSuccessMessage');

        contactForm.addEventListener('submit', async (e) => {
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
            
            if (!isValid) return;

            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactSuccessMessage.style.display = 'block';
                    contactSuccessMessage.textContent = 'Thank you for your message! We will respond to you shortly.';
                    contactForm.reset();
                } else {
                    contactSuccessMessage.style.display = 'block';
                    contactSuccessMessage.textContent = 'Something went wrong. Please try again in a moment.';
                }
            } catch (err) {
                contactSuccessMessage.style.display = 'block';
                contactSuccessMessage.textContent = 'Network error. Please try again when you are online.';
            } finally {
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

        // Pause the carousel while the page is hidden or the visitor prefers less motion.
        let slideTimer;
        function updateHeroSlider() {
            if (!prefersReducedMotion && !document.hidden && heroSlides.length > 1) {
                if (!slideTimer) slideTimer = setInterval(nextSlide, 5000);
            } else {
                clearInterval(slideTimer);
                slideTimer = undefined;
            }
        }

        document.addEventListener('visibilitychange', updateHeroSlider);
        updateHeroSlider();

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
