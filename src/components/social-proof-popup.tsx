"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus } from "lucide-react";

const NAMES = [
    { name: "Marko H.", city: "Zagreb" },
    { name: "Ivan P.", city: "Split" },
    { name: "Ana K.", city: "Rijeka" },
    { name: "Pero M.", city: "Osijek" },
    { name: "Tomislav R.", city: "Varaždin" },
    { name: "Luka S.", city: "Dubrovnik" },
    { name: "Maja B.", city: "Pula" },
    { name: "Josip D.", city: "Zadar" },
    { name: "Kristina V.", city: "Sisak" },
    { name: "Davor G.", city: "Karlovac" },
];

const ACTIONS = [
    "se upravo registrirao/la",
    "je dodao/la novi projekt",
    "je evidentirao/la sate",
    "koristi Vi-Di-Sef",
];

export function SocialProofPopup() {
    const [popup, setPopup] = useState<{ name: string; city: string; action: string } | null>(null);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        if (dismissed) return;
        const showPopup = () => {
            const person = NAMES[Math.floor(Math.random() * NAMES.length)];
            const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
            setPopup({ ...person, action });
            setTimeout(() => setPopup(null), 4000);
        };
        const initialDelay = setTimeout(showPopup, 20000);
        const interval = setInterval(showPopup, 25000 + Math.random() * 10000);
        return () => { clearTimeout(initialDelay); clearInterval(interval); };
    }, [dismissed]);

    if (dismissed) return null;

    return (
        <AnimatePresence>
            {popup && (
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-24 left-4 z-40 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl shadow-black/30 p-4 pr-10 max-w-xs backdrop-blur-xl"
                >
                    <button
                        onClick={() => setDismissed(true)}
                        className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        aria-label="Zatvori"
                    >
                        <X size={14} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                            <UserPlus size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-semibold">{popup.name} <span className="text-[var(--text-muted)] font-normal">iz {popup.city}</span></div>
                            <div className="text-xs text-[var(--text-muted)]">{popup.action}</div>
                            <div className="text-[10px] text-accent mt-0.5">Prije par sekundi</div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
