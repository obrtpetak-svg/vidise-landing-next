"use client";
import { useEffect, useRef } from "react";

export function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const glow = glowRef.current;
        if (!glow) return;

        let raf: number;
        let mx = 0, my = 0, cx = 0, cy = 0;

        const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const tick = () => {
            cx = lerp(cx, mx, 0.08);
            cy = lerp(cy, my, 0.08);
            glow.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`;
            raf = requestAnimationFrame(tick);
        };

        window.addEventListener("mousemove", onMove);
        raf = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div ref={glowRef}
            className="pointer-events-none fixed z-[1] w-[600px] h-[600px] rounded-full opacity-[0.04] dark:opacity-[0.04] light:opacity-[0.02] will-change-transform hidden md:block"
            style={{
                background: "radial-gradient(circle, var(--color-accent, #D95D08) 0%, transparent 70%)",
                filter: "blur(60px)",
            }}
        />
    );
}
