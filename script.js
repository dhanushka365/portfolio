// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
    
    // Reset form
    contactForm.reset();
    
    // You can integrate with services like:
    // - Formspree
    // - EmailJS
    // - Your own backend API
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const nameElement = document.querySelector('.name');
// if (nameElement) {
//     const originalText = nameElement.textContent;
//     typeWriter(nameElement, originalText, 100);
// }

// Slow down video playback speed
document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.playbackRate = 0.5; // Set to 50% speed (0.5 = half speed, 1.0 = normal speed)
    }

    // PDF Viewer Modal functionality
    const pdfModal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');
    const pdfModalClose = document.getElementById('pdfModalClose');
    const pdfViewerLinks = document.querySelectorAll('.pdf-viewer-link');

    // Open PDF viewer when link is clicked
    pdfViewerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pdfPath = link.getAttribute('data-pdf');
            if (pdfPath) {
                pdfViewer.src = pdfPath;
                pdfModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close PDF viewer
    pdfModalClose.addEventListener('click', () => {
        pdfModal.classList.remove('active');
        pdfViewer.src = ''; // Clear the iframe source
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            pdfModal.classList.remove('active');
            pdfViewer.src = '';
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
            pdfModal.classList.remove('active');
            pdfViewer.src = '';
            document.body.style.overflow = '';
        }
    });

    // Gallery Viewer functionality
    const galleryModal = document.getElementById('galleryModal');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryModalClose = document.getElementById('galleryModalClose');
    const galleryViewerLinks = document.querySelectorAll('.gallery-viewer-link');

    // Define gallery items for each company
    const galleryData = {
        huex: [
            {
                type: 'image',
                path: 'experince/Huex/LayOff.png',
                title: 'Lay Off Letter',
                name: 'LayOff.png'
            },
            {
                type: 'image',
                path: 'experince/Huex/Offer of employement.png',
                title: 'Offer of Employment',
                name: 'Offer of employement.png'
            },
            {
                type: 'pdf',
                path: 'experince/Huex/huex GmbH - Uduwelage Don Pasindu Dhanushka Uduwela - Contract.pdf',
                title: 'Contract - huex GmbH',
                name: 'huex GmbH - Uduwelage Don Pasindu Dhanushka Uduwela - Contract.pdf'
            },
            {
                type: 'pdf',
                path: 'experince/Huex/Uduwelage Don Pasindu Dhanushka Uduwela - Contract.pdf',
                title: 'Contract',
                name: 'Uduwelage Don Pasindu Dhanushka Uduwela - Contract.pdf'
            }
        ]
    };

    // Function to render gallery items
    function renderGallery(galleryName) {
        const items = galleryData[galleryName] || [];
        galleryGrid.innerHTML = '';

        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';

            if (item.type === 'image') {
                galleryItem.innerHTML = `
                    <img src="${item.path}" alt="${item.title}" class="gallery-item-image">
                    <div class="gallery-item-info">
                        <h4 class="gallery-item-title">${item.title}</h4>
                        <p class="gallery-item-type">Image</p>
                    </div>
                `;
                galleryItem.addEventListener('click', () => {
                    // Open image in new tab or create image viewer
                    window.open(item.path, '_blank');
                });
            } else if (item.type === 'pdf') {
                galleryItem.innerHTML = `
                    <div class="gallery-item-pdf">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10 9 9 9 8 9"/>
                        </svg>
                    </div>
                    <div class="gallery-item-info">
                        <h4 class="gallery-item-title">${item.title}</h4>
                        <p class="gallery-item-type">PDF Document</p>
                    </div>
                `;
                galleryItem.addEventListener('click', () => {
                    pdfViewer.src = item.path;
                    pdfModal.classList.add('active');
                    galleryModal.classList.remove('active');
                    document.body.style.overflow = 'hidden';
                });
            }

            galleryGrid.appendChild(galleryItem);
        });
    }

    // Open gallery viewer when link is clicked
    galleryViewerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const galleryName = link.getAttribute('data-gallery');
            if (galleryName && galleryData[galleryName]) {
                renderGallery(galleryName);
                galleryModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close gallery viewer
    galleryModalClose.addEventListener('click', () => {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close gallery when clicking outside
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close gallery with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});