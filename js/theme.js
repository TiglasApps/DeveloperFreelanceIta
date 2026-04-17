// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    // Set initial theme
    this.setTheme(this.currentTheme);
    
    // Add event listener
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    // Add transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    
    // Add animation class
    this.themeToggle.classList.add('theme-toggle--switching');
    setTimeout(() => {
      this.themeToggle.classList.remove('theme-toggle--switching');
    }, 300);
  }

  getTheme() {
    return this.currentTheme;
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
