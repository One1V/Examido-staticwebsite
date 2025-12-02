// Main JavaScript for Examido

document.addEventListener('DOMContentLoaded', function() {
    console.log('Examido website loaded successfully!');
    
    // Mobile menu toggle
    const burgerButton = document.querySelector('.burger-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (burgerButton) {
        burgerButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Contribute button functionality
    const contributeBtn = document.getElementById('contribute-btn');
    if (contributeBtn) {
        contributeBtn.addEventListener('click', function() {
            // Google Form URL - replace with actual form link
            const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfEXAMPLE/viewform';
            window.open(formUrl, '_blank');
            
            // Add animation feedback
            this.classList.add('pulse-cta');
            setTimeout(() => {
                this.classList.remove('pulse-cta');
            }, 1000);
        });
    }
    
    // WhatsApp booking buttons - robust selector (avoid :has)
    const mentorButtons = document.querySelectorAll('.mentor-card button');
    mentorButtons.forEach(button => {
        // only attach if button has a whatsapp icon or data-phone
        if (!button.querySelector('.fa-whatsapp') && !button.dataset.phone) return;

        button.addEventListener('click', function() {
            const mentorCard = this.closest('.mentor-card');
            const mentorNameEl = mentorCard ? mentorCard.querySelector('h3') : null;
            const mentorName = mentorNameEl ? mentorNameEl.textContent.trim() : 'the mentor';

            // Try to get phone from data attribute (button or card), otherwise warn and skip
            const phoneNumber = this.dataset.phone || (mentorCard && mentorCard.dataset.phone) || '';
            if (!phoneNumber) {
                console.warn('WhatsApp phone number not provided for', mentorName);
                return;
            }

            const message = `Hi, I would like to book a session with ${mentorName} from Examido.`;
            const whatsappUrl = `https://wa.me/${phoneNumber.replace(/^\+/, '')}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 opacity-0 invisible z-40 flex items-center justify-center';
    backToTop.id = 'back-to-top';
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.remove('opacity-0', 'invisible');
            backToTop.classList.add('opacity-100', 'visible');
        } else {
            backToTop.classList.remove('opacity-100', 'visible');
            backToTop.classList.add('opacity-0', 'invisible');
        }
    });
});