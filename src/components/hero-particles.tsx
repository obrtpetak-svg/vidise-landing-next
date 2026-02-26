"use client";
import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    baseAlpha: number;
    hue: number;
}

export function HeroParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -999, y: -999 });
    const particlesRef = useRef<Particle[]>([]);
    const animIdRef = useRef<number>(0);
    const { resolvedTheme } = useTheme();

    const isDark = resolvedTheme !== "light";

    const initParticles = useCallback((width: number, height: number) => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return [];

        const isMobile = width < 768;
        const count = isMobile ? 60 : 150;
        const particles: Particle[] = [];

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2.5 + 0.5,
                alpha: Math.random() * 0.4 + 0.1,
                baseAlpha: Math.random() * 0.4 + 0.1,
                hue: 25 + Math.random() * 15, // orange range
            });
        }
        return particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const dpr = Math.min(window.devicePixelRatio, 2);
            const w = parent.clientWidth;
            const h = parent.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.scale(dpr, dpr);
            if (particlesRef.current.length === 0) {
                particlesRef.current = initParticles(w, h);
            }
        };

        resize();
        const ro = new ResizeObserver(resize);
        if (canvas.parentElement) ro.observe(canvas.parentElement);

        const handleMouse = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -999, y: -999 };
        };

        canvas.addEventListener("mousemove", handleMouse);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        let time = 0;

        const animate = () => {
            const w = canvas.width / (Math.min(window.devicePixelRatio, 2));
            const h = canvas.height / (Math.min(window.devicePixelRatio, 2));
            ctx.clearRect(0, 0, w, h);
            time += 0.005;

            const mouse = mouseRef.current;
            const particles = particlesRef.current;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Organic noise movement
                const noiseX = Math.sin(time + p.x * 0.005 + i * 0.1) * 0.15;
                const noiseY = Math.cos(time + p.y * 0.005 + i * 0.1) * 0.15;
                p.vx += noiseX * 0.01;
                p.vy += noiseY * 0.01;

                // Mouse repel
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120 && dist > 0) {
                    const force = (120 - dist) / 120;
                    p.vx += (dx / dist) * force * 0.3;
                    p.vy += (dy / dist) * force * 0.3;
                }

                // Friction
                p.vx *= 0.98;
                p.vy *= 0.98;

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Boundary wrap
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;

                // Alpha breathing
                p.alpha = p.baseAlpha + Math.sin(time * 2 + i) * 0.1;

                // Draw
                const adjustedAlpha = isDark ? p.alpha : p.alpha * 0.6;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 85%, 50%, ${adjustedAlpha})`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                    if (d < 100) {
                        const lineAlpha = (1 - d / 100) * 0.08 * (isDark ? 1 : 0.5);
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `hsla(25, 85%, 50%, ${lineAlpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animIdRef.current = requestAnimationFrame(animate);
        };

        animIdRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animIdRef.current);
            canvas.removeEventListener("mousemove", handleMouse);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            ro.disconnect();
        };
    }, [isDark, initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-auto"
            aria-hidden="true"
            style={{ opacity: isDark ? 0.7 : 0.45 }}
        />
    );
}
