"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./motion";

const testimonials = [
    { name: "Marko H.", role: "Direktor, Gradnja Plus", text: "Od kad koristimo Vi-Di-Sef, imamo potpuni pregled nad svim projektima. Uštedili smo minimalno 15 sati tjedno na administraciji.", stars: 5 },
    { name: "Ivana P.", role: "Voditeljica, Betonara Zagreb", text: "Konačno alat koji razumije građevinu. Radnici ga koriste bez problema — jednostavno kao WhatsApp.", stars: 5 },
    { name: "Pero M.", role: "Vlasnik, PM Inženjering", text: "AI asistent mi je dao insight koji Excel nikad ne bi mogao. Sada donosim odluke na temelju podataka, ne pretpostavki.", stars: 5 },
];

export function TestimonialCarousel() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
    }, []);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [paused, next]);

    return (
        <section className="py-24 border-t border-[var(--border-color)]">
            <div className="max-w-[700px] mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-12">
                        <div className="section-tag mb-4">Recenzije</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            Što kažu <span className="gradient-text">korisnici?</span>
                        </h2>
                    </div>
                </Reveal>
                <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="card-base p-8 md:p-10 text-center">
                                <div className="flex items-center justify-center gap-0.5 text-amber-400 mb-5 text-lg">
                                    {Array.from({ length: testimonials[active].stars }).map((_, j) => <span key={j}>★</span>)}
                                </div>
                                <p className="text-lg md:text-xl text-[var(--text-secondary)] italic leading-relaxed mb-8">
                                    &ldquo;{testimonials[active].text}&rdquo;
                                </p>
                                <div className="border-t border-[var(--border-color)] pt-5">
                                    <div className="font-bold">{testimonials[active].name}</div>
                                    <div className="text-sm text-[var(--text-muted)]">{testimonials[active].role}</div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    {/* Navigation dots */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === active ? "bg-accent w-8" : "bg-white/10 hover:bg-white/20"}`}
                                aria-label={`Testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
