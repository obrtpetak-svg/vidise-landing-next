"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, MagneticButton } from "./motion";
import {
    Play, FolderKanban, Clock, CheckCircle, FileText,
    ArrowRight, ChevronRight, RotateCcw, Sparkles, X
} from "lucide-react";

interface TourStep {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

/* ─── Step 1: Select Project ─── */
function ProjectSelectStep({ onComplete }: { onComplete: () => void }) {
    const [selected, setSelected] = useState<number | null>(null);
    const projects = [
        { name: "Arena Zagreb", status: "Aktivan", workers: 12 },
        { name: "Most Pelješac", status: "Aktivan", workers: 28 },
        { name: "Hotel Marjan Split", status: "Aktivan", workers: 8 },
    ];

    useEffect(() => {
        const t1 = setTimeout(() => setSelected(1), 800);
        const t2 = setTimeout(() => onComplete(), 2000);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [onComplete]);

    return (
        <div className="space-y-2">
            {projects.map((p, i) => (
                <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${selected === i
                        ? "bg-accent/10 border border-accent/30"
                        : "bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--border-hover)]"
                        }`}
                    onClick={() => setSelected(i)}
                >
                    <FolderKanban size={16} className={selected === i ? "text-accent" : "text-[var(--text-muted)]"} />
                    <div className="flex-1">
                        <div className="text-sm font-semibold">{p.name}</div>
                        <div className="text-[10px] text-[var(--text-muted)]">{p.workers} radnika • {p.status}</div>
                    </div>
                    {selected === i && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                            <CheckCircle size={16} className="text-accent" />
                        </motion.div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}

/* ─── Step 2: Enter Hours ─── */
function EnterHoursStep({ onComplete }: { onComplete: () => void }) {
    const [dateTyped, setDateTyped] = useState("");
    const [startTyped, setStartTyped] = useState("");
    const [endTyped, setEndTyped] = useState("");
    const [descTyped, setDescTyped] = useState("");

    useEffect(() => {
        const typeText = (text: string, setter: (v: string) => void, start: number) => {
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setter(text.slice(0, i));
                if (i >= text.length) clearInterval(interval);
            }, 60);
            return setTimeout(() => {
                /* timer already started */
            }, start);
        };

        const t1 = setTimeout(() => {
            let i = 0;
            const text = "20.02.2026";
            const iv = setInterval(() => { i++; setDateTyped(text.slice(0, i)); if (i >= text.length) clearInterval(iv); }, 50);
        }, 300);

        const t2 = setTimeout(() => {
            let i = 0;
            const text = "07:00";
            const iv = setInterval(() => { i++; setStartTyped(text.slice(0, i)); if (i >= text.length) clearInterval(iv); }, 60);
        }, 1000);

        const t3 = setTimeout(() => {
            let i = 0;
            const text = "15:30";
            const iv = setInterval(() => { i++; setEndTyped(text.slice(0, i)); if (i >= text.length) clearInterval(iv); }, 60);
        }, 1600);

        const t4 = setTimeout(() => {
            let i = 0;
            const text = "Armiranje temelja, 2. etaža";
            const iv = setInterval(() => { i++; setDescTyped(text.slice(0, i)); if (i >= text.length) clearInterval(iv); }, 40);
        }, 2200);

        const t5 = setTimeout(onComplete, 4000);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [onComplete]);

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
                <div>
                    <label className="text-[10px] text-[var(--text-muted)] font-semibold mb-1 block">Datum</label>
                    <div className="px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm font-mono min-h-[36px]">
                        {dateTyped}<span className="animate-pulse text-accent">|</span>
                    </div>
                </div>
                <div>
                    <label className="text-[10px] text-[var(--text-muted)] font-semibold mb-1 block">Dolazak</label>
                    <div className="px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm font-mono min-h-[36px]">
                        {startTyped}{startTyped.length < 5 && <span className="animate-pulse text-accent">|</span>}
                    </div>
                </div>
                <div>
                    <label className="text-[10px] text-[var(--text-muted)] font-semibold mb-1 block">Odlazak</label>
                    <div className="px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm font-mono min-h-[36px]">
                        {endTyped}{endTyped.length > 0 && endTyped.length < 5 && <span className="animate-pulse text-accent">|</span>}
                    </div>
                </div>
            </div>
            <div>
                <label className="text-[10px] text-[var(--text-muted)] font-semibold mb-1 block">Opis radova</label>
                <div className="px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm min-h-[36px]">
                    {descTyped}{descTyped.length > 0 && descTyped.length < 26 && <span className="animate-pulse text-accent">|</span>}
                </div>
            </div>
            {endTyped.length >= 5 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                    <Clock size={12} /> Ukupno: 8h 30min
                </motion.div>
            )}
        </div>
    );
}

/* ─── Step 3: Manager Approves ─── */
function ApproveStep({ onComplete }: { onComplete: () => void }) {
    const [notifShown, setNotifShown] = useState(false);
    const [approved, setApproved] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setNotifShown(true), 600);
        const t2 = setTimeout(() => setApproved(true), 2000);
        const t3 = setTimeout(onComplete, 3000);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-4">
            <AnimatePresence>
                {notifShown && !approved && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bento-card p-4 w-full max-w-sm"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center">
                                <Clock size={14} className="text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-bold">Novi zahtjev za odobrenje</div>
                                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                                    Ivan P. — 8h 30min — Most Pelješac
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {approved && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex flex-col items-center gap-3"
                >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                            <CheckCircle size={32} className="text-emerald-400" />
                        </motion.div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-bold text-emerald-400">Odobreno!</div>
                        <div className="text-[10px] text-[var(--text-muted)]">Šef je odobrio sate jednim klikom</div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

/* ─── Step 4: Report Generated ─── */
function ReportStep({ onComplete }: { onComplete: () => void }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setVisible(true), 500);
        const t2 = setTimeout(onComplete, 2500);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-2">
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="bento-card p-5 w-full max-w-sm relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-[100px] h-[100px] rounded-full bg-accent/[0.04] blur-[40px]" />
                    <div className="flex items-center gap-2 mb-3">
                        <FileText size={16} className="text-accent" />
                        <span className="text-xs font-bold text-accent uppercase tracking-wider">PDF Izvještaj</span>
                    </div>
                    <div className="space-y-2 text-xs text-[var(--text-secondary)]">
                        <div className="flex justify-between"><span>Projekt:</span><span className="font-bold text-[var(--text-primary)]">Most Pelješac</span></div>
                        <div className="flex justify-between"><span>Radnik:</span><span className="font-bold text-[var(--text-primary)]">Ivan P.</span></div>
                        <div className="flex justify-between"><span>Datum:</span><span className="font-bold">20.02.2026</span></div>
                        <div className="flex justify-between"><span>Sati:</span><span className="font-bold text-emerald-400">8h 30min</span></div>
                        <div className="flex justify-between"><span>Status:</span>
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <CheckCircle size={10} /> Odobreno
                            </span>
                        </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[var(--border-color)] flex justify-between items-center">
                        <span className="text-[10px] text-[var(--text-muted)]">Generiran automatski</span>
                        <div className="flex gap-1">
                            <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[10px] font-bold">PDF</span>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">Excel</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

/* ─── Main Product Tour Component ─── */
export function ProductTour() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [completed, setCompleted] = useState(false);
    const stepCallbackRef = useRef<(() => void) | null>(null);

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1);
        } else {
            setCompleted(true);
        }
    };

    const reset = () => {
        setCurrentStep(0);
        setCompleted(false);
    };

    const steps: TourStep[] = [
        {
            id: 0, title: "Odaberi projekt", description: "Klikni na projekt za koji unesiš sate",
            icon: <FolderKanban size={16} />,
            content: <ProjectSelectStep onComplete={nextStep} />,
        },
        {
            id: 1, title: "Unesi sate", description: "Popuni evidenciju radnog vremena",
            icon: <Clock size={16} />,
            content: <EnterHoursStep onComplete={nextStep} />,
        },
        {
            id: 2, title: "Šef odobrava", description: "Šef vidi zahtjev i odobrava jednim klikom",
            icon: <CheckCircle size={16} />,
            content: <ApproveStep onComplete={nextStep} />,
        },
        {
            id: 3, title: "Izvještaj gotov", description: "PDF i Excel izvještaj generiran automatski",
            icon: <FileText size={16} />,
            content: <ReportStep onComplete={nextStep} />,
        },
    ];

    return (
        <section className="py-24 border-t border-[var(--border-color)]">
            <div className="max-w-[1200px] mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-12">
                        <div className="section-tag mb-4">Interaktivni demo</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            Probaj <span className="gradient-text">prije nego se prijaviš.</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
                            Pogledaj kako Vi-Di-Sef radi — u 4 koraka, bez registracije.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <div className="max-w-lg mx-auto">
                        {!isOpen ? (
                            <motion.button
                                onClick={() => setIsOpen(true)}
                                className="w-full bento-card bento-card-glow p-8 text-center group cursor-pointer"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Play size={28} />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Pokreni interaktivni tour</h3>
                                <p className="text-xs text-[var(--text-muted)]">
                                    Pogledaj evidenciju od početka do kraja — 30 sekundi
                                </p>
                            </motion.button>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bento-card bento-card-glow overflow-hidden"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border-color)]">
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={14} className="text-accent" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                                            Interaktivni Demo
                                        </span>
                                    </div>
                                    <button onClick={() => { setIsOpen(false); reset(); }}
                                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                                        <X size={14} />
                                    </button>
                                </div>

                                {/* Progress */}
                                <div className="px-5 pt-4">
                                    <div className="flex items-center gap-1 mb-4">
                                        {steps.map((s, i) => (
                                            <div key={i} className="flex items-center flex-1">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${i < currentStep ? "bg-emerald-500/15 text-emerald-400" :
                                                    i === currentStep ? "bg-accent/15 text-accent border border-accent/30" :
                                                        "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-color)]"
                                                    }`}>
                                                    {i < currentStep ? <CheckCircle size={12} /> : i + 1}
                                                </div>
                                                {i < steps.length - 1 && (
                                                    <div className={`flex-1 h-0.5 mx-1 rounded-full transition-all ${i < currentStep ? "bg-emerald-400/30" : "bg-[var(--border-color)]"
                                                        }`} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Step content */}
                                <div className="px-5 pb-5">
                                    <AnimatePresence mode="wait">
                                        {!completed ? (
                                            <motion.div key={currentStep}
                                                initial={{ opacity: 0, x: 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -30 }}
                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-accent">{steps[currentStep].icon}</span>
                                                    <h4 className="text-sm font-bold">{steps[currentStep].title}</h4>
                                                </div>
                                                <p className="text-[10px] text-[var(--text-muted)] mb-4">{steps[currentStep].description}</p>
                                                {steps[currentStep].content}
                                            </motion.div>
                                        ) : (
                                            <motion.div key="complete"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="text-center py-6"
                                            >
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                    className="w-16 h-16 rounded-2xl bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                                                    <CheckCircle size={32} className="text-emerald-400" />
                                                </motion.div>
                                                <h3 className="text-lg font-bold mb-2">To je to! 🎉</h3>
                                                <p className="text-xs text-[var(--text-muted)] mb-6">
                                                    Ovo je samo 5% mogućnosti. Otvori pravi app i vidi sve.
                                                </p>
                                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                                    <MagneticButton>
                                                        <a href="https://vi-di-sef.app" target="_blank" rel="noopener"
                                                            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5">
                                                            Otvori Vi-Di-Sef <ArrowRight size={16} />
                                                        </a>
                                                    </MagneticButton>
                                                    <button onClick={reset}
                                                        className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-accent transition-colors font-semibold">
                                                        <RotateCcw size={12} /> Ponovi tour
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
