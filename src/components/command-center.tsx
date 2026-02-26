"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, FileCheck, Truck, Activity, ChevronUp, Users, FolderKanban, X } from "lucide-react";

/* ─── Feed data (reused logic from live-feed) ─── */
interface FeedItem { icon: React.ReactNode; color: string; text: string; time: string; id: number }

const names = ["Marko H.", "Ivan P.", "Ana K.", "Pero M.", "Josip R.", "Luka B.", "Davor S."];
const projects = ["Arena Zagreb", "Most Pelješac", "Hotel Marjan", "Stambeni Dubrava", "Centar Vukovar"];

function randomFeed(id: number): FeedItem {
    const templates = [
        () => ({
            icon: <Clock size={13} />, color: "text-blue-400",
            text: `${names[Math.floor(Math.random() * names.length)]} evidentirao ${6 + Math.floor(Math.random() * 4)}h`,
            time: `${1 + Math.floor(Math.random() * 5)}m`,
        }),
        () => ({
            icon: <MapPin size={13} />, color: "text-emerald-400",
            text: `Check-in: ${names[Math.floor(Math.random() * names.length)]} na ${projects[Math.floor(Math.random() * projects.length)]}`,
            time: `${1 + Math.floor(Math.random() * 10)}m`,
        }),
        () => ({
            icon: <FileCheck size={13} />, color: "text-amber-400",
            text: `Otpremnica #${2800 + Math.floor(Math.random() * 100)} generirana`,
            time: `${1 + Math.floor(Math.random() * 15)}m`,
        }),
        () => ({
            icon: <Truck size={13} />, color: "text-purple-400",
            text: `Kombi MAN — ${10 + Math.floor(Math.random() * 130)}km danas`,
            time: `${1 + Math.floor(Math.random() * 30)}m`,
        }),
    ];
    const t = templates[Math.floor(Math.random() * templates.length)]();
    return { ...t, id };
}

/* ─── Ticker (scrolling text in collapsed bar) ─── */
function Ticker({ items }: { items: FeedItem[] }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % items.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [items.length]);

    if (items.length === 0) return null;
    const item = items[current];

    return (
        <div className="flex-1 overflow-hidden mx-4">
            <AnimatePresence mode="wait">
                <motion.div key={current}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span className={item.color}>{item.icon}</span>
                    <span className="truncate">{item.text}</span>
                    <span className="text-[10px] text-[var(--text-muted)] flex-shrink-0">prije {item.time}</span>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

/* ─── Main Command Center ─── */
export function CommandCenter() {
    const [expanded, setExpanded] = useState(false);
    const [visible, setVisible] = useState(true);
    const [items, setItems] = useState<FeedItem[]>([]);
    const [workersOnline, setWorkersOnline] = useState(32);
    const [activeProjects, setActiveProjects] = useState(4);
    const counter = useRef(0);
    const lastScroll = useRef(0);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Generate feed items
    useEffect(() => {
        const initial = Array.from({ length: 6 }, () => {
            counter.current++;
            return randomFeed(counter.current);
        });
        setItems(initial);

        const interval = setInterval(() => {
            counter.current++;
            setItems(prev => [randomFeed(counter.current), ...prev.slice(0, 7)]);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Randomize workers/projects
    useEffect(() => {
        const interval = setInterval(() => {
            setWorkersOnline(prev => Math.max(20, Math.min(50, prev + Math.floor((Math.random() - 0.5) * 5))));
            setActiveProjects(prev => Math.max(2, Math.min(8, prev + (Math.random() > 0.5 ? 1 : -1))));
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    // Hide on scroll down, show on scroll up
    const handleScroll = useCallback(() => {
        const current = window.scrollY;
        if (current > lastScroll.current + 50) {
            setVisible(false);
            setExpanded(false);
        } else if (current < lastScroll.current - 20) {
            setVisible(true);
        }
        lastScroll.current = current;
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    if (isMobile) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    className="fixed bottom-0 left-0 right-0 z-40"
                >
                    <div className="cc-glass mx-auto max-w-[1200px] mx-4 md:mx-auto mb-3 rounded-2xl border border-[var(--border-color)] overflow-hidden">
                        {/* Collapsed bar */}
                        <button onClick={() => setExpanded(!expanded)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.02] transition-colors cursor-pointer">
                            {/* Left: workers online */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <Users size={13} className="text-emerald-400" />
                                <span className="text-xs font-bold text-emerald-400">{workersOnline}</span>
                                <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline">online</span>
                            </div>

                            <div className="w-px h-4 bg-[var(--border-color)]" />

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                <FolderKanban size={13} className="text-blue-400" />
                                <span className="text-xs font-bold text-blue-400">{activeProjects}</span>
                                <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline">projekata</span>
                            </div>

                            <div className="w-px h-4 bg-[var(--border-color)]" />

                            {/* Center: ticker */}
                            <Ticker items={items} />

                            {/* Right: expand icon */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-[10px] text-[var(--text-muted)]">
                                    {items.length} događaja
                                </span>
                                <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                    <ChevronUp size={14} className="text-[var(--text-muted)]" />
                                </motion.div>
                            </div>
                        </button>

                        {/* Expanded feed */}
                        <AnimatePresence>
                            {expanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="border-t border-[var(--border-color)] px-4 py-3">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <Activity size={14} className="text-accent" />
                                                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Live aktivnost</span>
                                            </div>
                                            <button onClick={() => setExpanded(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                                                <X size={14} />
                                            </button>
                                        </div>
                                        <div className="space-y-1 max-h-[200px] overflow-y-auto">
                                            <AnimatePresence mode="popLayout">
                                                {items.map(item => (
                                                    <motion.div key={item.id}
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.02] transition-colors">
                                                        <span className={item.color}>{item.icon}</span>
                                                        <span className="text-xs text-[var(--text-secondary)] flex-1 truncate">{item.text}</span>
                                                        <span className="text-[10px] text-[var(--text-muted)] flex-shrink-0">prije {item.time}</span>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
