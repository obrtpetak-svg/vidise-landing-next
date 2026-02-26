"use client";
import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);
    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[var(--bg-primary)]/90 backdrop-blur-2xl border-b border-[var(--border-color)] shadow-2xl shadow-black/20" : "bg-transparent"}`}>
            <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-3 group">
                    <Image src="/logo.png" alt="Vi-Di-Sef" width={38} height={38} className="rounded-[10px] group-hover:scale-105 transition-transform" />
                    <span className="text-xl font-extrabold tracking-tight">Vi-Di-Sef</span>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <NavLink href="/#features">Mogućnosti</NavLink>
                    <NavLink href="/#ai">AI Agent</NavLink>
                    <NavLink href="/#how">Kako radi</NavLink>
                    <NavLink href="/#faq">FAQ</NavLink>
                    <NavLink href="/cijene">Cijene</NavLink>
                    <NavLink href="/kontakt">Kontakt</NavLink>
                    <NavLink href="/novosti">Novosti</NavLink>
                    {/* ⌘K hint rendered from CommandPalette component */}
                    {/* Theme toggle */}
                    {mounted && (
                        <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                            className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.06] hover:border-accent/30 hover:bg-white/[0.08] transition-all"
                            aria-label="Toggle theme">
                            <AnimatePresence mode="wait">
                                <motion.div key={resolvedTheme}
                                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}>
                                    {resolvedTheme === "dark" ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-400" />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    )}
                    <a href="https://vi-di-sef.app" target="_blank" rel="noopener"
                        className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(217,93,8,0.4)]">
                        Otvori app →
                    </a>
                </div>
                <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[var(--bg-primary)]/95 backdrop-blur-2xl border-t border-[var(--border-color)] px-6 pb-6">
                        <div className="flex flex-col gap-4 pt-4">
                            <NavLink href="/#features" onClick={() => setMobileOpen(false)}>Mogućnosti</NavLink>
                            <NavLink href="/#ai" onClick={() => setMobileOpen(false)}>AI Agent</NavLink>
                            <NavLink href="/#how" onClick={() => setMobileOpen(false)}>Kako radi</NavLink>
                            <NavLink href="/#faq" onClick={() => setMobileOpen(false)}>FAQ</NavLink>
                            <NavLink href="/cijene" onClick={() => setMobileOpen(false)}>Cijene</NavLink>
                            <NavLink href="/kontakt" onClick={() => setMobileOpen(false)}>Kontakt</NavLink>
                            <NavLink href="/novosti" onClick={() => setMobileOpen(false)}>Novosti</NavLink>
                            <a href="https://vi-di-sef.app" target="_blank" rel="noopener"
                                className="bg-accent text-white px-6 py-3 rounded-xl text-sm font-bold text-center mt-2">Otvori app →</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

function NavLink({ href, children, onClick }: { href: string; children: ReactNode; onClick?: () => void }) {
    return <Link href={href} onClick={onClick} className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{children}</Link>;
}

export function Footer() {
    return (
        <footer className="border-t border-[var(--border-color)] py-12 relative z-10">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Vi-Di-Sef" width={32} height={32} className="rounded-lg" />
                        <div>
                            <div className="font-extrabold">Vi-Di-Sef</div>
                            <div className="text-xs text-[var(--text-muted)]">Workforce Management Platform</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
                        <Link href="/#features" className="hover:text-[var(--text-primary)] transition-colors">Mogućnosti</Link>
                        <Link href="/#how" className="hover:text-[var(--text-primary)] transition-colors">Kako radi</Link>
                        <Link href="/kontakt" className="hover:text-[var(--text-primary)] transition-colors">Kontakt</Link>
                        <Link href="/novosti" className="hover:text-[var(--text-primary)] transition-colors">Novosti</Link>
                        <a href="https://www.vi-di.me" target="_blank" className="hover:text-[var(--text-primary)] transition-colors">Vi-Di.me</a>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-muted)]">
                    © 2026 <a href="https://www.vi-di.me" target="_blank" className="text-accent font-semibold hover:underline">Vi-Di.me</a> — Sva prava pridržana.
                </div>
            </div>
        </footer>
    );
}

export function ProgressBar() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const handler = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);
    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
            <motion.div className="h-full bg-gradient-to-r from-accent via-amber-500 to-accent rounded-r-full"
                style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
        </div>
    );
}
