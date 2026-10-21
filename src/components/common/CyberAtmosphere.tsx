import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export const CyberAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Keep particle count controlled for buttery 60fps performance
    const particleCount = Math.min(Math.floor(width / 32), 42);
    const particles: Particle[] = [];
    const colors = [
      'rgba(0, 240, 255, ', // Cyan
      'rgba(0, 112, 243, ', // Electric blue
      'rgba(16, 185, 129, ', // Subtle neon green
      'rgba(229, 9, 32, ',  // Crimson accent
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.3 + 0.12,
        color: colors[i % colors.length],
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const maxDistance = 145;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle nodes and connecting network lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Connect nearby nodes with subtle vector links
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Subtle interactive mouse reaction
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          const mAlpha = (1 - mdist / 150) * 0.3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(0, 240, 255, ${mAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* High-tech ambient network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(10,14,24,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-35" />

      {/* Binary Matrix Code Glimmers on Left Side */}
      <div className="hidden lg:block absolute top-0 left-2 w-10 h-full overflow-hidden opacity-15 select-none text-[10px] font-mono leading-3 text-cyan-400">
        {Array.from({ length: 45 }).map((_, i) => (
          <div key={i} className="animate-pulse" style={{ animationDelay: `${(i % 6) * 0.35}s` }}>
            {((i * 19 + 31) % 2 === 0 ? '011010' : '100101')}
          </div>
        ))}
      </div>

      {/* Binary Matrix Code Glimmers on Right Side */}
      <div className="hidden lg:block absolute top-0 right-2 w-10 h-full overflow-hidden opacity-15 select-none text-[10px] font-mono leading-3 text-cyan-400 text-right">
        {Array.from({ length: 45 }).map((_, i) => (
          <div key={i} className="animate-pulse" style={{ animationDelay: `${((i + 3) % 7) * 0.3}s` }}>
            {((i * 13 + 17) % 2 === 0 ? '110011' : '001110')}
          </div>
        ))}
      </div>

      {/* Cyber Corner Grid Accents (Electric Cyan / Blue) */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-cyan-500/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-cyan-500/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-cyan-500/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-cyan-500/20 pointer-events-none" />
    </div>
  );
};
