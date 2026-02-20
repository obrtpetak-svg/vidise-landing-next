"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./motion";
import { Building2, HardHat, Wrench, BarChart3, Clock, Shield, FileText, Smartphone, MapPin, Users } from "lucide-react";

interface Persona {
    id: string;
    label: string;
    icon: React.ReactNode;
    tagline: string;
    headline: string;
    highlight: string;
    description: string;
    benefits: { icon: React.ReactNode; title: string; desc: string }[];
}

const personas: Persona[] = [
    {
        id: "director",
        label: "Za direktore",
        icon: <Building2 size={18} />,
        tagline: "STRATEŠKI PREGLED",
        headline: "Cijela tvrtka",
        highlight: "na dlanu.",
        description: "Vidi sve projekte, radnike i troškove na jednom mjestu. Donosi odluke na temelju podataka, ne pretpostavki.",
        benefits: [
            { icon: <BarChart3 size={18} />, title: "Izvještaji u realnom vremenu", desc: "KPI-evi, profitabilnost po projektu, pregled sati — sve dostupno odmah." },
            { icon: <Shield size={18} />, title: "Potpuna kontrola", desc: "Audit log svake promjene. Tko je što napravio, kada i zašto." },
            { icon: <FileText size={18} />, title: "Automatski dokumenti", desc: "PDF izvještaji, računi i otpremnice generiraju se jednim klikom." },
        ],
    },
    {
        id: "manager",
        label: "Za voditelje",
        icon: <HardHat size={18} />,
        tagline: "OPERATIVNA MOĆNOST",
        headline: "Gradilište pod",
        highlight: "kontrolom.",
        description: "Rasporedi radnike, prati napredak projekata i upravljaj dokumentacijom bez papira i Excel tablica.",
        benefits: [
            { icon: <Users size={18} />, title: "Pregled svih radnika", desc: "Tko je na kojem gradilištu, koliko sati ima, koji je status — sve na jednom ekranu." },
            { icon: <MapPin size={18} />, title: "GPS & QR Check-in", desc: "Potvrdi prisutnost radnika na lokaciji automatski. Bez poziva i provjera." },
            { icon: <Clock size={18} />, title: "Odobravanje sati", desc: "Radnici pošalju sate, ti odobriš jednim klikom. Gotovo za 2 minute." },
        ],
    },
    {
        id: "worker",
        label: "Za radnike",
        icon: <Wrench size={18} />,
        tagline: "JEDNOSTAVNO KAO PORUKA",
        headline: "Otvori, unesi,",
        highlight: "gotovo.",
        description: "Nema kompliciranih formi. Otvoriš app na mobitelu, upišeš sate i projekt — šef vidi odmah.",
        benefits: [
            { icon: <Smartphone size={18} />, title: "Mobitel je dovoljan", desc: "Radi na svakom mobitelu, tabletu ili računalu. Nema instalacije." },
            { icon: <Clock size={18} />, title: "30 sekundi za unos", desc: "Odaberi projekt, upiši sate, pošalji. Brže od SMS poruke." },
            { icon: <Shield size={18} />, title: "Tvoji podaci su zaštićeni", desc: "Samo ti i admin vidite tvoje podatke. PIN zaštita za svaki pristup." },
        ],
    },
];

export function PersonaTabs() {
    const [active, setActive] = useState("director");
    const persona = personas.find((p) => p.id === active)!;

    return (
        <section className="py-24 border-t border-white/[0.04]">
            <div className="max-w-[1200px] mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-12">
                        <div className="section-tag mb-4">Za koga je Vi-Di-Sef</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            Jedan alat.<br /><span className="gradient-text">Tri perspektive.</span>
                        </h2>
                    </div>
                </Reveal>

                {/* Tab Buttons */}
                <Reveal delay={0.1}>
                    <div className="flex justify-center gap-2 mb-12">
                        {personas.map((p) => (
                            <button key={p.id} onClick={() => setActive(p.id)}
                                className={`relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${active === p.id
                                        ? "text-white"
                                        : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
                                    }`}>
                                {active === p.id && (
                                    <motion.div layoutId="persona-pill"
                                        className="absolute inset-0 rounded-xl bg-accent/15 border border-accent/30"
                                        transition={{ type: "spring", damping: 25, stiffness: 400 }} />
                                )}
                                <span className="relative z-10">{p.icon}</span>
                                <span className="relative z-10">{p.label}</span>
                            </button>
                        ))}
                    </div>
                </Reveal>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div key={active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left: Text */}
                            <div>
                                <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3">{persona.tagline}</div>
                                <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">
                                    {persona.headline}<br /><span className="gradient-text">{persona.highlight}</span>
                                </h3>
                                <p className="text-slate-400 leading-relaxed mb-8">{persona.description}</p>
                            </div>
                            {/* Right: Benefits */}
                            <div className="space-y-4">
                                {persona.benefits.map((b, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className="card-base p-5 flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                                            {b.icon}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm mb-1">{b.title}</div>
                                            <div className="text-xs text-slate-500 leading-relaxed">{b.desc}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
