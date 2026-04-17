// Main Application Controller
class App {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.setupPerformanceOptimizations();
    this.setupAnalytics();
  }

  setupEventListeners() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Header scroll effect
    this.setupHeaderScroll();

    // Mobile Navigation Toggle
    this.setupMobileNav();

    // Keyboard navigation
    this.setupKeyboardNavigation();

    // Theme change listener
    window.addEventListener('themeChanged', (e) => {
      console.log(`Theme changed to: ${e.detail.theme}`);
    });
  }

  setupMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('nav-toggle--active');
        navMenu.classList.toggle('nav--active');
        document.body.style.overflow = navMenu.classList.contains('nav--active') ? 'hidden' : '';
      });

      // Close menu when clicking a link
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('nav-toggle--active');
          navMenu.classList.remove('nav--active');
          document.body.style.overflow = '';
        });
      });
    }
  }

  setupHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
      } else {
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    });
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // T for theme toggle
      if (e.key === 't' || e.key === 'T') {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
          themeToggle.click();
        }
      }

      // Escape to close modals
      if (e.key === 'Escape') {
        const tooltips = document.querySelectorAll('.tech-tooltip');
        tooltips.forEach(tooltip => tooltip.remove());
      }

      // Arrow keys for navigation
      if (e.key === 'ArrowDown') {
        const nextSection = this.getNextSection();
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }

      if (e.key === 'ArrowUp') {
        const prevSection = this.getPreviousSection();
        if (prevSection) {
          prevSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  getNextSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentScroll = window.pageYOffset + window.innerHeight / 2;
    
    for (let section of sections) {
      const sectionTop = section.offsetTop;
      if (sectionTop > currentScroll) {
        return section;
      }
    }
    return null;
  }

  getPreviousSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentScroll = window.pageYOffset + window.innerHeight / 2;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      if (sectionTop < currentScroll) {
        return section;
      }
    }
    return null;
  }

  initializeComponents() {
    // Add loading animation
    this.addLoadingAnimation();
    
    // Initialize intersection observers for animations
    this.setupIntersectionObservers();
    
    // Setup lazy loading for images
    this.setupLazyLoading();
  }

  addLoadingAnimation() {
    document.body.classList.add('loading');
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
      }, 500);
    });
  }

  setupIntersectionObservers() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, options);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animateElements.forEach(el => observer.observe(el));
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  setupPerformanceOptimizations() {
    // Debounce scroll events
    this.debounceScroll();
    
    // Optimize animations
    this.optimizeAnimations();
    
    // Setup service worker (if needed)
    this.setupServiceWorker();
  }

  debounceScroll() {
    let scrollTimeout;
    const originalScroll = window.onscroll;
    
    window.onscroll = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      
      scrollTimeout = window.requestAnimationFrame(() => {
        if (originalScroll) originalScroll();
      });
    };
  }

  optimizeAnimations() {
    // Use will-change for performance on heavy elements
    const heavyElements = document.querySelectorAll('.hero__abstract-shape, .skill-card');
    heavyElements.forEach(el => {
      el.style.willChange = 'transform, opacity';
    });
  }

  setupServiceWorker() {
    // Service worker registration for PWA capabilities
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }

  setupAnalytics() {
    // Simple analytics tracking
    this.trackUserInteractions();
    this.trackPagePerformance();
  }

  trackUserInteractions() {
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
      button.addEventListener('click', () => {
        console.log(`CTA clicked: ${button.textContent.trim()}`);
      });
    });
  }

  trackPagePerformance() {
    // Track page load performance
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
      
      // Track Core Web Vitals
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.log(`${entry.name}: ${entry.value.toFixed(2)}`);
          });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'cumulative-layout-shift'] });
      }
    });
  }
}

// Performance monitoring styles
const performanceStyles = `
  body.loading {
    overflow: hidden;
  }
  
  body.loading::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-primary);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  body.loading::after {
    content: '';
    position: fixed;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin: -20px 0 0 -20px;
    border: 3px solid var(--border-color);
    border-top: 3px solid var(--bitcoin-orange);
    border-radius: 0px;
    animation: spin 1s linear infinite;
    z-index: 10000;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .animate-in {
    animation: fadeInUp 0.6s ease forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject performance styles
const performanceStyleSheet = document.createElement('style');
performanceStyleSheet.textContent = performanceStyles;
document.head.appendChild(performanceStyleSheet);

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  console.log('Portfolio application initialized');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
