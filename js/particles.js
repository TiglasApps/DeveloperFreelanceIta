// Particle System for Hero Background
class ParticleSystem {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.particles = [];
    this.particleCount = 50;
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
    this.setupEventListeners();
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: var(--bitcoin-orange);
        border-radius: 50%;
        opacity: ${Math.random() * 0.5 + 0.3};
        pointer-events: none;
        transition: all 0.3s ease;
      `;
      
      this.container.appendChild(particle);
      
      this.particles.push({
        element: particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  animate() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Mouse interaction
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx -= (dx / distance) * force * 0.02;
        particle.vy -= (dy / distance) * force * 0.02;
      }
      
      // Apply velocity damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = window.innerWidth;
      if (particle.x > window.innerWidth) particle.x = 0;
      if (particle.y < 0) particle.y = window.innerHeight;
      if (particle.y > window.innerHeight) particle.y = 0;
      
      // Update DOM
      particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
      particle.element.style.opacity = particle.opacity;
    });
    
    requestAnimationFrame(() => this.animate());
  }

  setupEventListeners() {
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    
    window.addEventListener('resize', () => {
      this.particles.forEach(particle => {
        particle.x = Math.min(particle.x, window.innerWidth);
        particle.y = Math.min(particle.y, window.innerHeight);
      });
    });
  }
}

// Initialize particle system
const particleSystem = new ParticleSystem('particles');

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParticleSystem;
}
