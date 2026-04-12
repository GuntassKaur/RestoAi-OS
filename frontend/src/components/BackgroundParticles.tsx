"use client";

import { useEffect, useRef } from "react";

export function BackgroundParticles({
  className = "",
  quantity = 50,
  color = "#a78bfa", // violet-400
}: {
  className?: string;
  quantity?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      alpha: number;
    }> = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = wrapper.offsetWidth;
      canvas.height = wrapper.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < quantity; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 0.5,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          alpha: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        
        // Use the color prop and append alpha
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener("resize", resize);
    resize();
    drawParticles();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [quantity, color]);

  return (
    <div ref={wrapperRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
