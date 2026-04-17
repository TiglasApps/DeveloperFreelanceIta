// Interactive Skills Constellation
class SkillsConstellation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.canvas = null;
    this.ctx = null;
    this.skills = [
      { name: 'React', level: 95, category: 'frontend', x: 0, y: 0, vx: 0, vy: 0, visible: true },
      { name: 'TypeScript', level: 90, category: 'frontend', x: 0, y: 0, vx: 0, vy: 0, visible: true },
      { name: 'Node.js', level: 88, category: 'backend', x: 0, y: 0, vx: 0, vy: 0, visible: true },
      { name: 'Python', level: 85, category: 'backend', x: 0, y: 0, vx: 0, vy: 0, visible: true },
      { name: 'PostgreSQL', level: 82, category: 'database', x: 0, y: 0, vx: 0, vy: 0, visible: true },
      { name: 'MongoDB', level: 80, category: 'database', x: 0, y: 0, vx: 0, vy: 0, visible: true },
      { name: 'Docker', level: 78, category: 'devops', x: 0, y: 0, vx: 0, vy: 0, visible: true },
      { name: 'AWS', level: 75, category: 'devops', x: 0, y: 0, vx: 0, vy: 0, visible: true },
      { name: 'GraphQL', level: 85, category: 'frontend', x: 0, y: 0, vx: 0, vy: 0, visible: true },
      { name: 'Redis', level: 70, category: 'database', x: 0, y: 0, vx: 0, vy: 0, visible: true },
      { name: 'Kubernetes', level: 72, category: 'devops', x: 0, y: 0, vx: 0, vy: 0, visible: true },
      { name: 'Next.js', level: 88, category: 'frontend', x: 0, y: 0, vx: 0, vy: 0, visible: true }
    ];
    this.categories = {
      frontend: { name: 'Frontend', color: '#569cd6', active: true },
      backend: { name: 'Backend', color: '#ce9178', active: true },
      database: { name: 'Database', color: '#9cdcfe', active: true },
      devops: { name: 'DevOps', color: '#b5cea8', active: true }
    };
    this.mouseX = 0;
    this.mouseY = 0;
    this.hoveredSkill = null;
    this.animationId = null;
    this.init();
  }

  init() {
    this.createControls();
    this.createCanvas();
    this.setupEventListeners();
    this.positionSkills();
    this.animate();
  }

  createControls() {
    const controls = document.createElement('div');
    controls.className = 'skills-controls';
    controls.innerHTML = `
      <div class="skills-controls__title">Filtra per categoria:</div>
      <div class="skills-controls__items">
        ${Object.entries(this.categories).map(([key, cat]) => `
          <label class="skills-control">
            <input type="checkbox" class="skills-control__checkbox" data-category="${key}" ${cat.active ? 'checked' : ''}>
            <span class="skills-control__dot" style="background: ${cat.color}"></span>
            <span class="skills-control__label">${cat.name}</span>
          </label>
        `).join('')}
      </div>
    `;
    
    this.container.parentNode.insertBefore(controls, this.container);
    
    controls.querySelectorAll('.skills-control__checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const category = e.target.dataset.category;
        this.toggleCategory(category, e.target.checked);
      });
    });
  }

  toggleCategory(category, isActive) {
    this.categories[category].active = isActive;
    
    this.skills.forEach(skill => {
      if (skill.category === category) {
        skill.visible = isActive;
        if (!isActive) {
          skill.vx = 0;
          skill.vy = 0;
        }
      }
    });
    
    if (isActive) {
      this.positionSkills();
    }
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'skills-canvas';
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    this.container.appendChild(this.canvas);
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.width = rect.width;
    this.height = rect.height;
  }

  positionSkills() {
    const visibleSkills = this.skills.filter(s => s.visible);
    if (visibleSkills.length === 0) return;
    
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const baseRadius = Math.min(this.width, this.height) * 0.25;
    
    const categoryGroups = {};
    Object.keys(this.categories).forEach(cat => {
      categoryGroups[cat] = visibleSkills.filter(s => s.category === cat);
    });
    
    const activeCategories = Object.keys(this.categories).filter(cat => this.categories[cat].active);
    
    activeCategories.forEach((category, catIndex) => {
      const group = categoryGroups[category];
      if (group.length === 0) return;
      
      const catAngle = (catIndex / activeCategories.length) * Math.PI * 2;
      const catRadius = baseRadius * 0.8;
      const catCenterX = centerX + Math.cos(catAngle) * catRadius * 0.3;
      const catCenterY = centerY + Math.sin(catAngle) * catRadius * 0.3;
      
      group.forEach((skill, index) => {
        const angle = catAngle + ((index / (group.length || 1)) - 0.5) * Math.PI * 0.8;
        const radius = catRadius * (0.5 + (skill.level / 200));
        
        skill.x = catCenterX + Math.cos(angle) * radius;
        skill.y = catCenterY + Math.sin(angle) * radius;
        skill.vx = (Math.random() - 0.5) * 0.3;
        skill.vy = (Math.random() - 0.5) * 0.3;
      });
    });
  }

  setupEventListeners() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      this.checkHover();
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredSkill = null;
    });

    // Click to focus
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      this.skills.forEach(skill => {
        const distance = Math.hypot(clickX - skill.x, clickY - skill.y);
        if (distance < 30) {
          this.focusSkill(skill);
        }
      });
    });
  }

  checkHover() {
    this.hoveredSkill = null;
    const visibleSkills = this.skills.filter(s => s.visible);
    
    visibleSkills.forEach(skill => {
      const distance = Math.hypot(this.mouseX - skill.x, this.mouseY - skill.y);
      if (distance < 25) {
        this.hoveredSkill = skill;
      }
    });
    
    this.canvas.style.cursor = this.hoveredSkill ? 'pointer' : 'default';
  }

  focusSkill(skill) {
    const visibleSkills = this.skills.filter(s => s.visible && s !== skill);
    visibleSkills.forEach(otherSkill => {
      const dx = otherSkill.x - skill.x;
      const dy = otherSkill.y - skill.y;
      const distance = Math.hypot(dx, dy);
      
      if (distance < 120) {
        const force = (120 - distance) / 120 * 3;
        otherSkill.vx += (dx / distance) * force;
        otherSkill.vy += (dy / distance) * force;
      }
    });
  }

  update() {
    const visibleSkills = this.skills.filter(s => s.visible);
    
    visibleSkills.forEach(skill => {
      skill.x += skill.vx;
      skill.y += skill.vy;
      skill.vx *= 0.96;
      skill.vy *= 0.96;
      
      const padding = 40;
      if (skill.x < padding) { skill.x = padding; skill.vx *= -0.5; }
      if (skill.x > this.width - padding) { skill.x = this.width - padding; skill.vx *= -0.5; }
      if (skill.y < padding) { skill.y = padding; skill.vy *= -0.5; }
      if (skill.y > this.height - padding) { skill.y = this.height - padding; skill.vy *= -0.5; }
      
      if (skill === this.hoveredSkill) {
        const dx = this.mouseX - skill.x;
        const dy = this.mouseY - skill.y;
        skill.vx += dx * 0.008;
        skill.vy += dy * 0.008;
      }
    });
    
    // Connections by category (web-like)
    this.connections = [];
    Object.keys(this.categories).forEach(category => {
      if (!this.categories[category].active) return;
      
      const categorySkills = visibleSkills.filter(s => s.category === category);
      
      for (let i = 0; i < categorySkills.length; i++) {
        for (let j = i + 1; j < categorySkills.length; j++) {
          const distance = Math.hypot(
            categorySkills[i].x - categorySkills[j].x,
            categorySkills[i].y - categorySkills[j].y
          );
          
          if (distance < 200) {
            this.connections.push({
              from: categorySkills[i],
              to: categorySkills[j],
              opacity: Math.max(0.1, 1 - (distance / 200)),
              category: category
            });
          }
        }
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const visibleSkills = this.skills.filter(s => s.visible);
    
    if (visibleSkills.length === 0) {
      this.ctx.fillStyle = '#888';
      this.ctx.font = '16px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Seleziona almeno una categoria', this.width / 2, this.height / 2);
      return;
    }
    
    // Draw connections with category colors
    this.connections.forEach(conn => {
      this.ctx.beginPath();
      this.ctx.moveTo(conn.from.x, conn.from.y);
      this.ctx.lineTo(conn.to.x, conn.to.y);
      const color = this.categories[conn.category].color;
      this.ctx.strokeStyle = color + Math.floor(conn.opacity * 255).toString(16).padStart(2, '0');
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });
    
    // Draw skills
    visibleSkills.forEach(skill => {
      const isHovered = skill === this.hoveredSkill;
      const radius = isHovered ? 28 : 18 + (skill.level / 100) * 8;
      
      if (isHovered) {
        this.ctx.beginPath();
        this.ctx.arc(skill.x, skill.y, radius + 8, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(247, 147, 26, 0.15)';
        this.ctx.fill();
      }
      
      this.ctx.beginPath();
      this.ctx.arc(skill.x, skill.y, radius, 0, Math.PI * 2);
      
      const catColor = this.categories[skill.category].color;
      const gradient = this.ctx.createRadialGradient(
        skill.x - radius/3, skill.y - radius/3, 0,
        skill.x, skill.y, radius
      );
      
      const r = parseInt(catColor.slice(1, 3), 16);
      const g = parseInt(catColor.slice(3, 5), 16);
      const b = parseInt(catColor.slice(5, 7), 16);
      const darkColor = '#' + 
        Math.max(r - 30, 0).toString(16).padStart(2, '0') +
        Math.max(g - 30, 0).toString(16).padStart(2, '0') +
        Math.max(b - 30, 0).toString(16).padStart(2, '0');
      
      gradient.addColorStop(0, catColor);
      gradient.addColorStop(1, darkColor);
      
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      
      this.ctx.strokeStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
      this.ctx.lineWidth = isHovered ? 3 : 2;
      this.ctx.stroke();
      
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold ' + (isHovered ? 13 : 11) + 'px "Fira Code", monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(skill.name, skill.x, skill.y);
      
      if (isHovered) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.font = '11px sans-serif';
        this.ctx.fillText(skill.level + '%', skill.x, skill.y + radius + 18);
        
        this.ctx.fillStyle = catColor;
        this.ctx.font = '9px sans-serif';
        this.ctx.fillText(this.categories[skill.category].name.toUpperCase(), skill.x, skill.y - radius - 12);
      }
    });
  }

  animate() {
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const skillsContainer = document.getElementById('skills-constellation');
  if (skillsContainer) {
    const constellation = new SkillsConstellation('skills-constellation');
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      constellation.destroy();
    });
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SkillsConstellation;
}
