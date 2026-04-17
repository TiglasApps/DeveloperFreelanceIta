// Hero Section Interactions
class HeroSection {
  constructor() {
    this.heroSection = document.querySelector('.hero');
    this.ctaButtons = {
      primary: document.getElementById('cta-primary'),
      secondary: document.getElementById('cta-secondary')
    };
    this.init();
  }

  init() {
    this.setupCTAButtons();
    this.setupScrollEffects();
    this.setupParallaxEffect();
  }

  setupCTAButtons() {
    if (this.ctaButtons.primary) {
      this.ctaButtons.primary.addEventListener('click', () => {
        this.scrollToSection('about');
      });
    }

    if (this.ctaButtons.secondary) {
      this.ctaButtons.secondary.addEventListener('click', () => {
        this.scrollToSection('contact');
      });
    }
  }


  setupScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      // Parallax effect for hero content
      if (this.heroSection) {
        const rect = this.heroSection.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const speed = 0.5;
          const yPos = -(currentScrollY * speed);
          this.heroSection.style.transform = `translateY(${yPos}px)`;
        }
      }
      
      lastScrollY = currentScrollY;
    });
  }

  setupParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero__gradient, .hero__grid');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

}


// Initialize hero section
const heroSection = new HeroSection();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeroSection;
}
