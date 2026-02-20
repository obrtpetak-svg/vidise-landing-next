"use client";
import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function Reveal({ children, className, delay = 0, direction = "up" }: {
    children: ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right";
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : 0,
            x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
            filter: "blur(8px)",
        },
        visible: { opacity: 1, y: 0, x: 0, filter: "blur(0px)" },
    };
    return (
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
            variants={variants} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
            {children}
        </motion.div>
    );
}

export function MagneticButton({ children, className }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const handleMouse = (e: React.MouseEvent) => {
        const el = ref.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
        el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const reset = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
    return (
        <div ref={ref} className={className} onMouseMove={handleMouse} onMouseLeave={reset}
            style={{ transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)", display: "inline-block" }}>
            {children}
        </div>
    );
}

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const handleMouse = (e: React.MouseEvent) => {
        const el = ref.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
    };
    const reset = () => { if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)"; };
    return (
        <div ref={ref} className={className} onMouseMove={handleMouse} onMouseLeave={reset}
            style={{ transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            {children}
        </div>
    );
}

export function CountUp({ target, suffix = "+", className }: { target: number; suffix?: string; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
        >
            {inView ? (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Counter from={0} to={target} />{suffix}
                </motion.span>
            ) : "0"}
        </motion.div>
    );
}

function Counter({ from, to }: { from: number; to: number }) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true });

    return (
        <motion.span ref={nodeRef}
            initial={{ opacity: 1 }}
            animate={inView ? { opacity: 1 } : {}}
            onAnimationStart={() => {
                if (!nodeRef.current || !inView) return;
                let current = from;
                const step = Math.max(1, Math.floor(to / 60));
                const timer = setInterval(() => {
                    current += step;
                    if (current >= to) { current = to; clearInterval(timer); }
                    if (nodeRef.current) nodeRef.current.textContent = current.toLocaleString();
                }, 20);
            }}
        >{from}</motion.span>
    );
}
