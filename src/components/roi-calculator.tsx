"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, CountUp } from "./motion";
import {
    Calculator, TrendingDown, Clock, Users, FolderKanban,
    FileText, Share2, Link2, ArrowRight, Sparkles, Check
} from "lucide-react";

type Stage = "input" | "paper" | "timeline" | "result";

function PaperStackAnimation({ papers }: { papers: number }) {
    const count = Math.min(papers, 24);
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="relative w-32 h-40">
                {Array.from({ length: count }).map((_, i) => (
                    <motion.div key={i}
                        className="absolute rounded-lg border border-[var(--border-color)]"
                        style={{
                            width: 80 + Math.random() * 10,
                            height: 100 + Math.random() * 10,
                            left: `${50 + (Math.random() - 0.5) * 20}%`,
                            top: `${50 - i * 2}%`,
                            transform: `translateX(-50%) rotate(${(Math.random() - 0.5) * 8}deg)`,
                            background: "var(--bg-secondary)",
                            zIndex: i,
                        }}
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{ opacity: 0, y: -80, scale: 0.5, rotate: (Math.random() - 0.5) * 40 }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="p-2 space-y-1">
                            {[0, 1, 2].map(j => (
                                <div key={j} className="h-1 rounded-full bg-[var(--border-color)]"
                                    style={{ width: `${50 + Math.random() * 40}%` }} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
                className="text-center">
                <div className="text-4xl font-black gradient-text">{papers}</div>
                <div className="text-sm text-[var(--text-muted)]">papira mjesečno ušteđeno</div>
            </motion.div>
        </div>
    );
}

function TimelineAnimation({ savedHours }: { savedHours: number }) {
    const hours = [
        { time: "07:00", label: "Dolazak", saved: false },
        { time: "08:00", label: "Ručni unos sati", saved: true },
        { time: "09:00", label: "Excel tablice", saved: true },
        { time: "10:00", label: "Rad na projektu", saved: false },
        { time: "12:00", label: "Pozivi za potvrdu sati", saved: true },
        { time: "14:00", label: "Rad na projektu", saved: false },
        { time: "15:00", label: "Ručni izvještaji", saved: true },
        { time: "16:00", label: "Odlazak", saved: false },
    ];

    return (
        <div className="flex flex-col h-full justify-center px-4">
            <div className="space-y-2">
                {hours.map((h, i) => (
                    <motion.div key={i}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm ${h.saved ? "bg-emerald-500/[0.06] border border-emerald-500/20" : "bg-[var(--bg-card)]"
                            }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-xs font-mono text-[var(--text-muted)] w-10">{h.time}</span>
                        <span className={`text-xs flex-1 ${h.saved ? "text-emerald-400 font-semibold line-through" : "text-[var(--text-secondary)]"}`}>
                            {h.label}
                        </span>
                        {h.saved && (
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.12, type: "spring" }}
                                className="text-emerald-400">
                                <Check size={14} />
                            </motion.span>
                        )}
                    </motion.div>
                ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                className="text-center mt-4">
                <span className="text-xs text-emerald-400 font-semibold">
                    +{savedHours}h mjesečno ti se vraća
                </span>
            </motion.div>
        </div>
    );
}

function ResultSlide({ workers, projects, savedMonthly, savedYearly, savedHours }: {
    workers: number; projects: number; savedMonthly: number; savedYearly: number; savedHours: number;
}) {
    const [copied, setCopied] = useState(false);
    const shareUrl = typeof window !== "undefined"
        ? `${window.location.origin}?w=${workers}&p=${projects}#roi`
        : "";

    const shareText = `S Vi-Di-Sef platformom, tvrtka s ${workers} radnika i ${projects} projekata može uštedjeti ${savedYearly.toLocaleString()}€ godišnje! 🚀`;

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-6 py-4">
            {/* Big number */}
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-center">
                <div className="text-6xl md:text-7xl font-black gradient-text">
                    <CountUp target={savedYearly} suffix="€" />
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-2">godišnja ušteda</div>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-3 w-full max-w-md">
                <div className="bento-card p-3 text-center">
                    <TrendingDown size={16} className="text-accent mx-auto mb-1" />
                    <div className="text-lg font-black">{savedMonthly.toLocaleString()}€</div>
                    <div className="text-[10px] text-[var(--text-muted)]">mjesečno</div>
                </div>
                <div className="bento-card p-3 text-center">
                    <Clock size={16} className="text-blue-400 mx-auto mb-1" />
                    <div className="text-lg font-black">{savedHours}h</div>
                    <div className="text-[10px] text-[var(--text-muted)]">manje admin/mj</div>
                </div>
                <div className="bento-card p-3 text-center">
                    <FileText size={16} className="text-emerald-400 mx-auto mb-1" />
                    <div className="text-lg font-black">{Math.round(workers * 4.3)}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">papira manje/mj</div>
                </div>
            </motion.div>

            {/* Share buttons */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="flex flex-col items-center gap-3">
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Podijeli svoju uštedu</div>
                <div className="flex items-center gap-2">
                    <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                        target="_blank" rel="noopener"
                        className="bento-card px-4 py-2 text-xs font-semibold hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                        <Share2 size={13} /> WhatsApp
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                        target="_blank" rel="noopener"
                        className="bento-card px-4 py-2 text-xs font-semibold hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        <Share2 size={13} /> LinkedIn
                    </a>
                    <button onClick={copyLink}
                        className="bento-card px-4 py-2 text-xs font-semibold hover:text-accent transition-colors flex items-center gap-1.5">
                        <Link2 size={13} /> {copied ? "Kopirano!" : "Kopiraj link"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export function RoiCalculator() {
    const [workers, setWorkers] = useState(30);
    const [projects, setProjects] = useState(5);
    const [adminHours, setAdminHours] = useState(15);
    const [stage, setStage] = useState<Stage>("input");
    const containerRef = useRef<HTMLDivElement>(null);

    const hoursPerWeekAdmin = workers * 0.3 + projects * 0.5;
    const costPerHourAdmin = 15;
    const weeksPerMonth = 4.3;
    const savedMonthly = Math.round(hoursPerWeekAdmin * costPerHourAdmin * weeksPerMonth);
    const savedYearly = savedMonthly * 12;
    const savedHours = Math.round(hoursPerWeekAdmin * weeksPerMonth);
    const papersSaved = Math.round(workers * 4.3);

    const startAnimation = () => {
        setStage("paper");
        setTimeout(() => setStage("timeline"), 2800);
        setTimeout(() => setStage("result"), 5200);
    };

    const reset = () => setStage("input");

    return (
        <section id="roi" className="py-24 border-t border-[var(--border-color)]">
            <div className="max-w-[900px] mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-16">
                        <div className="section-tag mb-4">ROI Kalkulator</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            Koliko ti <span className="gradient-text">ušteda</span> donosi?
                        </h2>
                        <p className="text-[var(--text-muted)] mt-4 max-w-lg mx-auto">
                            Unesi podatke i pogledaj personaliziranu animaciju uštede.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <div ref={containerRef} className="bento-card bento-card-glow p-8 md:p-10 relative overflow-hidden min-h-[420px]">
                        <div className="hero-glow absolute -top-20 right-0 w-[300px] h-[300px] opacity-30" />

                        <AnimatePresence mode="wait">
                            {stage === "input" && (
                                <motion.div key="input"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -60 }}
                                    transition={{ duration: 0.4 }} className="relative z-10">
                                    {/* Workers Slider */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-sm font-semibold text-[var(--text-secondary)] flex items-center gap-2">
                                                <Users size={16} className="text-accent" />
                                                Broj radnika
                                            </label>
                                            <div className="text-3xl font-black gradient-text">{workers}</div>
                                        </div>
                                        <input type="range" min={5} max={200} step={5} value={workers}
                                            onChange={e => setWorkers(Number(e.target.value))}
                                            className="w-full h-2 rounded-full appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, #D95D08 0%, #D95D08 ${((workers - 5) / 195) * 100}%, rgba(255,255,255,0.06) ${((workers - 5) / 195) * 100}%, rgba(255,255,255,0.06) 100%)`,
                                            }} />
                                        <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-1">
                                            <span>5 radnika</span><span>200 radnika</span>
                                        </div>
                                    </div>

                                    {/* Projects Slider */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-sm font-semibold text-[var(--text-secondary)] flex items-center gap-2">
                                                <FolderKanban size={16} className="text-blue-400" />
                                                Broj aktivnih projekata
                                            </label>
                                            <div className="text-3xl font-black text-blue-400">{projects}</div>
                                        </div>
                                        <input type="range" min={1} max={30} step={1} value={projects}
                                            onChange={e => setProjects(Number(e.target.value))}
                                            className="w-full h-2 rounded-full appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, #60A5FA 0%, #60A5FA ${((projects - 1) / 29) * 100}%, rgba(255,255,255,0.06) ${((projects - 1) / 29) * 100}%, rgba(255,255,255,0.06) 100%)`,
                                            }} />
                                        <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-1">
                                            <span>1 projekt</span><span>30 projekata</span>
                                        </div>
                                    </div>

                                    {/* Admin Hours Slider */}
                                    <div className="mb-8">
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-sm font-semibold text-[var(--text-secondary)] flex items-center gap-2">
                                                <Clock size={16} className="text-emerald-400" />
                                                Sati administracije tjedno
                                            </label>
                                            <div className="text-3xl font-black text-emerald-400">{adminHours}h</div>
                                        </div>
                                        <input type="range" min={2} max={40} step={1} value={adminHours}
                                            onChange={e => setAdminHours(Number(e.target.value))}
                                            className="w-full h-2 rounded-full appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, #10B981 0%, #10B981 ${((adminHours - 2) / 38) * 100}%, rgba(255,255,255,0.06) ${((adminHours - 2) / 38) * 100}%, rgba(255,255,255,0.06) 100%)`,
                                            }} />
                                        <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-1">
                                            <span>2h tjedno</span><span>40h tjedno</span>
                                        </div>
                                    </div>

                                    {/* Generate button */}
                                    <button onClick={startAnimation}
                                        className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-2xl text-base font-bold transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(217,93,8,0.4)]">
                                        <Sparkles size={18} />
                                        Generiraj moju uštedu
                                        <ArrowRight size={18} />
                                    </button>

                                    <div className="mt-4 text-center text-[10px] text-[var(--text-muted)]">
                                        Izračun na temelju prosjeka: {costPerHourAdmin}€/h admin rad
                                    </div>
                                </motion.div>
                            )}

                            {stage === "paper" && (
                                <motion.div key="paper"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="relative z-10 h-[360px]">
                                    <div className="text-center mb-2">
                                        <span className="text-xs font-bold text-accent uppercase tracking-widest">Korak 1/3</span>
                                        <h3 className="text-lg font-bold mt-1">Toliko papira nestaje...</h3>
                                    </div>
                                    <PaperStackAnimation papers={papersSaved} />
                                </motion.div>
                            )}

                            {stage === "timeline" && (
                                <motion.div key="timeline"
                                    initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
                                    className="relative z-10">
                                    <div className="text-center mb-4">
                                        <span className="text-xs font-bold text-accent uppercase tracking-widest">Korak 2/3</span>
                                        <h3 className="text-lg font-bold mt-1">Tvoj dan — bez administracije</h3>
                                    </div>
                                    <TimelineAnimation savedHours={savedHours} />
                                </motion.div>
                            )}

                            {stage === "result" && (
                                <motion.div key="result"
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <span className="text-xs font-bold text-accent uppercase tracking-widest">Korak 3/3</span>
                                            <h3 className="text-lg font-bold mt-1">Tvoja ušteda</h3>
                                        </div>
                                        <button onClick={reset}
                                            className="text-xs text-[var(--text-muted)] hover:text-accent transition-colors font-semibold">
                                            ← Izračunaj ponovo
                                        </button>
                                    </div>
                                    <ResultSlide workers={workers} projects={projects}
                                        savedMonthly={savedMonthly} savedYearly={savedYearly} savedHours={savedHours} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Progress dots */}
                        {stage !== "input" && (
                            <div className="flex items-center justify-center gap-2 mt-4 relative z-10">
                                {(["paper", "timeline", "result"] as Stage[]).map((s, i) => (
                                    <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${stage === s ? "w-8 bg-accent" :
                                        (["paper", "timeline", "result"].indexOf(stage) > i ? "w-3 bg-accent/40" : "w-3 bg-[var(--border-color)]")
                                        }`} />
                                ))}
                            </div>
                        )}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
