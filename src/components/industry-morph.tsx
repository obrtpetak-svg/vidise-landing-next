"use client";
import { useState, useEffect } from "react";

const industries = [
    "građevinu",
    "elektroinstalacije",
    "vodovod i plin",
    "infrastrukturu",
    "proizvodnju",
    "energetiku",
    "održavanje zgrada",
];

export function IndustryMorph() {
    const [current, setCurrent] = useState(0);
    const [phase, setPhase] = useState<"in" | "out">("in");

    useEffect(() => {
        const timer = setInterval(() => {
            setPhase("out");
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % industries.length);
                setPhase("in");
            }, 400);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center justify-center gap-3 flex-wrap text-xl sm:text-2xl md:text-[32px] font-light text-[var(--text-secondary)] tracking-tight">
            <span>Izgrađen za</span>
            <span
                className={`inline-block font-extrabold bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent min-w-[160px] sm:min-w-[220px] text-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${phase === "in"
                        ? "opacity-100 blur-0 translate-y-0"
                        : "opacity-0 blur-[8px] -translate-y-4"
                    }`}
            >
                {industries[current]}
            </span>
            <span className="w-[3px] h-[1em] bg-accent rounded-sm animate-pulse" />
        </div>
    );
}
