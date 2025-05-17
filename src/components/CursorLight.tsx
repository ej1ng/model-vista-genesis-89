import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

const CursorLight = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;
    
    // Particles array
    const particles: Particle[] = [];
    const maxParticles = 300;
    
    // Colors for glitter particles
    const glitterColors = [
      '#FFD700', // Gold
      '#FFFAFA', // Snow white
      '#E6E6FA', // Lavender
      '#B0E0E6', // Powder blue
      '#ADD8E6', // Light blue
      '#87CEEB', // Sky blue
      '#F0F8FF', // Alice blue
      '#FFFFF0'  // Ivory
    ];
    
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create trail particles
      if (Math.random() < 0.5) {
        createParticles(1, false, mouseX, mouseY);
      }
    };
    
    // Handle click to create particle burst
    const handleClick = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create a burst of particles on click
      createParticles(50, true, mouseX, mouseY);
    };
    
    // Create particles
    const createParticles = (count: number, burst = false, x: number, y: number) => {
      for (let i = 0; i < count; i++) {
        if (particles.length >= maxParticles) {
          // Replace oldest particle
          particles.shift();
        }
        
        const size = Math.random() * 4 + 2;
        const speed = burst ? 8 : 2;
        const angle = burst ? Math.random() * Math.PI * 2 : Math.random() * Math.PI * 2;
        
        particles.push({
          x,
          y,
          size,
          speedX: Math.cos(angle) * (Math.random() * speed),
          speedY: Math.sin(angle) * (Math.random() * speed),
          life: 0,
          maxLife: burst ? Math.random() * 40 + 20 : Math.random() * 15 + 5, // Shorter lifespans
          color: glitterColors[Math.floor(Math.random() * glitterColors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    // Animation
    const animate = () => {
      // Smooth cursor following
      lastX += (mouseX - lastX) * 0.2;
      lastY += (mouseY - lastY) * 0.2;
      
      // Clear canvas completely - no residue
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Apply gravity for burst particles
        if (p.maxLife > 15) {
          p.speedY += 0.1;
        }
        
        // Apply friction
        p.speedX *= 0.98;
        p.speedY *= 0.98;
        
        // Update rotation
        p.rotation += p.rotationSpeed;
        
        // Update life
        p.life++;
        
        // Remove dead particles
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        
        // Calculate opacity based on life
        const opacity = 1 - p.life / p.maxLife;
        
        // Draw glitter particle (star shape)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        // Create star shape
        const innerRadius = p.size * 0.5;
        const outerRadius = p.size;
        const spikes = 4;
        
        ctx.beginPath();
        for (let j = 0; j < spikes * 2; j++) {
          const radius = j % 2 === 0 ? outerRadius : innerRadius;
          const angle = (j * Math.PI) / spikes;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        
        // Add shimmer effect
        const shimmer = Math.sin(Date.now() * 0.01 + p.x * 0.1) * 0.3 + 0.7;
        
        // Fill with color
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity * shimmer;
        ctx.fill();
        
        // Add glow
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = opacity * 0.5;
        ctx.fill();
        
        ctx.restore();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-10 pointer-events-none"
    />
  );
};

export default CursorLight;
