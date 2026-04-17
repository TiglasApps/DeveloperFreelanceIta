/**
 * System Topology Visualization - High Resolution Professional Version
 * A high-fidelity, scientific visualization for STEM/Academic portfolios.
 */
class SystemViz {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.maxNodes = 10; 
        this.connectionDistance = 180;
        
        this.techNames = [
            'AI_REC_ENGINE', 'FRAUD_DET_ML', 'INV_PREDICT', 'NLP_SEARCH',
            'ORDER_ORCH', 'PRICING_OPT', 'USER_GRAPH', 'VECTOR_DB',
            'PAYMENT_GW', 'LATENCY_MON'
        ];
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.init());
    }

    init() {
        this.resize();
        if (this.nodes.length === 0) this.createNodes();
    }

    resize() {
        const parent = this.canvas.parentElement;
        const dpr = window.devicePixelRatio || 1;
        
        // Logical size
        const width = parent.offsetWidth;
        const height = parent.offsetHeight;
        
        // Physical size scaled for High DPI
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        
        // Scale context back to logical size
        this.ctx.scale(dpr, dpr);
        
        // Store logical dimensions for convenience
        this.logicalWidth = width;
        this.logicalHeight = height;
        
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
    }

    createNodes() {
        this.nodes = [];
        for (let i = 0; i < this.maxNodes; i++) {
            this.nodes.push({
                x: Math.random() * this.logicalWidth,
                y: Math.random() * this.logicalHeight,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                radius: 5, // Larger nodes
                name: this.techNames[i % this.techNames.length]
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);
        
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const orange = getComputedStyle(document.documentElement).getPropertyValue('--bitcoin-orange').trim() || '#f7931a';
        const textCol = isDark ? '#ffffff' : '#1a1a1a';
        const lineCol = isDark ? 'rgba(247, 147, 26, 0.4)' : 'rgba(247, 147, 26, 0.3)';

        // 1. Draw connections with higher visibility
        this.ctx.beginPath();
        this.ctx.strokeStyle = lineCol;
        this.ctx.lineWidth = 1.5;

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.connectionDistance) {
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                }
            }
        }
        this.ctx.stroke();

        // 2. Draw nodes and framed labels
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 10 || node.x > this.logicalWidth - 10) node.vx *= -1;
            if (node.y < 10 || node.y > this.logicalHeight - 10) node.vy *= -1;

            // Node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = node.name === 'KERNEL_CORE' ? orange : (isDark ? '#888' : '#444');
            this.ctx.fill();
            this.ctx.strokeStyle = textCol;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            // Label with thin frame
            const labelText = node.name;
            this.ctx.font = '400 9px "IBM Plex Mono", monospace'; // Thin font
            const textWidth = this.ctx.measureText(labelText).width;
            const padding = 6;
            
            const boxX = node.x + 12;
            const boxY = node.y - 8;
            const boxW = textWidth + padding * 2;
            const boxH = 16;

            // Translucent box background
            this.ctx.fillStyle = isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)';
            this.ctx.fillRect(boxX, boxY, boxW, boxH);

            // Thin frame
            this.ctx.strokeStyle = orange;
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(boxX, boxY, boxW, boxH);

            // Text
            this.ctx.fillStyle = textCol;
            this.ctx.textAlign = 'left';
            this.ctx.fillText(labelText, boxX + padding, boxY + 11);
        });
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SystemViz('hero-viz');
});
