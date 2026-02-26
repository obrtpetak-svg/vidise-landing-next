"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield } from "lucide-react";

export function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setVisible(false);
    };

    const decline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[55] bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl shadow-black/40 p-5 backdrop-blur-xl"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                            <Cookie size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-sm mb-1.5">Kolačići 🍪</h3>
                            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                                Koristimo kolačiće za poboljšanje korisničkog iskustva i analitiku.
                                Tvoji podaci su sigurni i ne dijele se s trećim stranama.
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={accept}
                                    className="flex-1 bg-accent hover:bg-accent-hover text-white py-2.5 rounded-xl text-xs font-bold transition-all hover:shadow-lg hover:shadow-accent/20"
                                >
                                    Prihvati sve
                                </button>
                                <button
                                    onClick={decline}
                                    className="flex-1 bg-white/[0.04] border border-[var(--border-color)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] py-2.5 rounded-xl text-xs font-semibold transition-all"
                                >
                                    Samo nužni
                                </button>
                            </div>
                            <div className="flex items-center gap-1.5 mt-3 text-[10px] text-[var(--text-muted)]">
                                <Shield size={10} />
                                GDPR compliant — vaši podaci su zaštićeni
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
