"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FloatingCTA() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const handler = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const nearBottom = scrollY + winHeight > docHeight - 300;
            setVisible(scrollY > 600 && !nearBottom);
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    if (dismissed) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
                >
                    <div className="bg-[var(--bg-primary)]/95 backdrop-blur-2xl border-t border-[var(--border-color)] px-4 py-3 flex items-center gap-3">
                        <a
                            href="https://vi-di-sef.app"
                            target="_blank"
                            rel="noopener"
                            className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-accent/20"
                        >
                            Otvorite aplikaciju
                            <ArrowRight size={16} />
                        </a>
                        <button
                            onClick={() => setDismissed(true)}
                            className="w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-lg"
                            aria-label="Zatvori"
                        >
                            ✕
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
