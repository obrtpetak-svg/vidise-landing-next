"use client";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { features } from "@/lib/features-data";
import {
    Clock, FolderKanban, Receipt, Truck, Car, Users, Building, ListChecks,
    BarChart3, Shield, BookOpen, CloudSun, MapPin, QrCode, Palmtree,
    Calendar, Bell, Search, ArrowRight, Mail, HelpCircle, Rocket
} from "lucide-react";

const featureIcons: Record<string, React.ReactNode> = {
    "/radni-sati": <Clock size={18} />, "/projekti": <FolderKanban size={18} />,
    "/racuni": <Receipt size={18} />, "/otpremnice": <Truck size={18} />,
    "/vozila": <Car size={18} />, "/panel-za-radnike": <Users size={18} />,
    "/smjestaj": <Building size={18} />, "/obaveze": <ListChecks size={18} />,
    "/izvjestaji": <BarChart3 size={18} />, "/sigurnost": <Shield size={18} />,
    "/dnevnik": <BookOpen size={18} />, "/vrijeme": <CloudSun size={18} />,
    "/gps-nadzor": <MapPin size={18} />, "/qr-checkin": <QrCode size={18} />,
    "/odmori": <Palmtree size={18} />, "/kalendar": <Calendar size={18} />,
    "/obavijesti": <Bell size={18} />,
};

const quickActions = [
    { label: "Započni besplatno", href: "https://vi-di-sef.app", icon: <Rocket size={18} /> },
    { label: "Kontaktiraj nas", href: "mailto:info@vi-di.me", icon: <Mail size={18} /> },
    { label: "FAQ — Česta pitanja", href: "#faq", icon: <HelpCircle size={18} /> },
];

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen((o) => !o);
            }
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
        if (open) {
            setQuery("");
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open]);

    const filtered = features.filter(
        (f) => f.title.toLowerCase().includes(query.toLowerCase()) ||
            f.desc.toLowerCase().includes(query.toLowerCase())
    );

    const go = (href: string) => {
        setOpen(false);
        if (href.startsWith("http") || href.startsWith("mailto")) {
            window.open(href, "_blank");
        } else if (href.startsWith("#")) {
            document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push(href);
        }
    };

    return (
        <>
            {/* Trigger hint in navbar */}
            <button onClick={() => setOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-500 hover:text-slate-300 hover:border-white/[0.12] transition-all group">
                <Search size={13} className="text-slate-600 group-hover:text-accent transition-colors" />
                <span>Pretraži...</span>
                <kbd className="ml-2 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono text-slate-600">⌘K</kbd>
            </button>

            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                            onClick={() => setOpen(false)}
                        />
                        {/* Panel */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 400 }}
                            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[101] w-[90vw] max-w-[560px]"
                        >
                            <div className="rounded-2xl border border-white/[0.08] bg-[#111118]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
                                {/* Search Input */}
                                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                                    <Search size={18} className="text-accent flex-shrink-0" />
                                    <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Pretraži module, akcije..."
                                        className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-600 outline-none" />
                                    <kbd className="px-2 py-1 rounded bg-white/[0.06] text-[10px] font-mono text-slate-600">ESC</kbd>
                                </div>

                                {/* Results */}
                                <div className="max-h-[360px] overflow-y-auto p-2">
                                    {/* Quick Actions */}
                                    {query === "" && (
                                        <div className="mb-2">
                                            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-wider">Brze akcije</div>
                                            {quickActions.map((a) => (
                                                <button key={a.label} onClick={() => go(a.href)}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all group text-left">
                                                    <span className="text-accent/60 group-hover:text-accent transition-colors">{a.icon}</span>
                                                    {a.label}
                                                    <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Features */}
                                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                        Moduli {query && `(${filtered.length})`}
                                    </div>
                                    {filtered.length === 0 && (
                                        <div className="px-3 py-8 text-center text-sm text-slate-600">Nema rezultata za &quot;{query}&quot;</div>
                                    )}
                                    {filtered.map((f) => (
                                        <button key={f.href} onClick={() => go(f.href)}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all group text-left">
                                            <span className="text-accent/60 group-hover:text-accent transition-colors">
                                                {featureIcons[f.href] || <FolderKanban size={18} />}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-slate-300 group-hover:text-white transition-colors">{f.title}</div>
                                                <div className="text-xs text-slate-600 truncate">{f.desc}</div>
                                            </div>
                                            <ArrowRight size={14} className="flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity" />
                                        </button>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="px-4 py-2.5 border-t border-white/[0.06] flex items-center gap-4 text-[10px] text-slate-600">
                                    <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white/[0.06] font-mono">↑↓</kbd> navigiraj</span>
                                    <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white/[0.06] font-mono">↵</kbd> otvori</span>
                                    <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white/[0.06] font-mono">esc</kbd> zatvori</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
