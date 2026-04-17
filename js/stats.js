// Animated Counter for Statistics
class StatsCounter {
  constructor() {
    this.stats = document.querySelectorAll('.stat-number');
    this.animated = false;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animateStats();
          this.animated = true;
        }
      });
    }, options);

    const statsSection = document.querySelector('.hero__stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  animateStats() {
    this.stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      };

      updateCounter();
    });
  }
}

// Initialize stats counter
const statsCounter = new StatsCounter();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StatsCounter;
}
