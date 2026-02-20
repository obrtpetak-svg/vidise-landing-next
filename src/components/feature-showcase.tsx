"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, FolderKanban, Receipt, Truck, MapPin, BarChart3 } from "lucide-react";

const showcaseItems = [
    {
        icon: <Clock size={24} />,
        title: "Evidencija radnog vremena",
        description: "Radnik otvori app → odabere projekt → unese sate → šef odobri. 30 sekundi za cijeli proces. Bez papira, bez poziva.",
        features: ["Dolazak / odlazak", "Pauze i prekovremeni", "Odobravanje jednim klikom", "Automatski obračun"],
        gradient: "from-blue-500/20 to-cyan-500/20",
        accent: "text-blue-400",
    },
    {
        icon: <FolderKanban size={24} />,
        title: "Upravljanje projektima",
        description: "Svaki projekt ima svoj dashboard. Vidi koliko sati je utrošeno, tko radi, koliki je budžet i koliko je preostalo.",
        features: ["Budžet tracking", "Raspodjela radnika", "Timeline i milestones", "Profitabilnost po projektu"],
        gradient: "from-purple-500/20 to-pink-500/20",
        accent: "text-purple-400",
    },
    {
        icon: <Receipt size={24} />,
        title: "Digitalni računi",
        description: "Kreiraj račun u 60 sekundi. Automatski popuni podatke iz projekta, dodaj stavke, generiraj PDF i pošalji.",
        features: ["Auto-fill iz projekta", "PDF generiranje", "Status praćenje", "Podsjetnici za plaćanje"],
        gradient: "from-emerald-500/20 to-teal-500/20",
        accent: "text-emerald-400",
    },
    {
        icon: <Truck size={24} />,
        title: "Digitalne otpremnice",
        description: "Fotografiraj robu, potpis na ekranu, PDF nastane automatski. Nema papira, nema skenova, nema izgubljenih dokumenata.",
        features: ["Foto dokumentacija", "Digitalni potpis", "Auto PDF", "QR verifikacija"],
        gradient: "from-amber-500/20 to-orange-500/20",
        accent: "text-amber-400",
    },
    {
        icon: <MapPin size={24} />,
        title: "GPS praćenje",
        description: "Vidi gdje su tvoji radnici i vozila u realnom vremenu. Automatski check-in na gradilište. Geofencing upozorenja.",
        features: ["Real-time lokacije", "Geofencing zone", "Ruta vozila", "Automatski check-in"],
        gradient: "from-red-500/20 to-rose-500/20",
        accent: "text-red-400",
    },
    {
        icon: <BarChart3 size={24} />,
        title: "Napredni izvještaji",
        description: "Sve u jednom kliku: sati po radniku, troškovi po projektu, produktivnost po timu. PDF ili Excel export.",
        features: ["Dashboard s KPI-ima", "Filtri i drill-down", "PDF & Excel export", "Automatski tjedni report"],
        gradient: "from-indigo-500/20 to-violet-500/20",
        accent: "text-indigo-400",
    },
];

export function FeatureShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const progress = useTransform(scrollYProgress, [0, 1], [0, showcaseItems.length - 1]);

    progress.on("change", (v) => setActiveIdx(Math.round(v)));

    return (
        <section ref={containerRef} className="relative border-t border-white/[0.04]"
            style={{ height: `${showcaseItems.length * 100}vh` }}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6 w-full">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left: Nav dots + active content */}
                        <div>
                            <div className="section-tag mb-6">Showcase</div>
                            <div className="flex gap-8">
                                {/* Dots */}
                                <div className="flex flex-col items-center gap-2 py-2">
                                    {showcaseItems.map((_, i) => (
                                        <motion.div key={i}
                                            className={`w-2 rounded-full transition-all duration-500 ${i === activeIdx ? "h-8 bg-accent" : "h-2 bg-white/10"
                                                }`}
                                        />
                                    ))}
                                </div>
                                {/* Content */}
                                <div className="flex-1">
                                    {showcaseItems.map((item, i) => (
                                        <motion.div key={i}
                                            className="absolute"
                                            initial={false}
                                            animate={{
                                                opacity: i === activeIdx ? 1 : 0,
                                                y: i === activeIdx ? 0 : i < activeIdx ? -30 : 30,
                                            }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            style={{ pointerEvents: i === activeIdx ? "auto" : "none" }}
                                        >
                                            <div className={`${item.accent} mb-4`}>{item.icon}</div>
                                            <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{item.title}</h3>
                                            <p className="text-slate-400 leading-relaxed mb-6 max-w-md">{item.description}</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {item.features.map((f, j) => (
                                                    <motion.div key={j}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: i === activeIdx ? 1 : 0, x: i === activeIdx ? 0 : -10 }}
                                                        transition={{ delay: j * 0.05 + 0.2 }}
                                                        className="flex items-center gap-2 text-xs text-slate-500"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                                        {f}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Visual card */}
                        <div className="relative aspect-[4/3]">
                            {showcaseItems.map((item, i) => {
                                const IconMap = { "Evidencija radnog vremena": Clock, "Upravljanje projektima": FolderKanban, "Digitalni računi": Receipt, "Digitalne otpremnice": Truck, "GPS praćenje": MapPin, "Napredni izvještaji": BarChart3 };
                                const IconComp = IconMap[item.title as keyof typeof IconMap] || Clock;
                                return (
                                    <motion.div key={i}
                                        className="absolute inset-0"
                                        initial={false}
                                        animate={{
                                            opacity: i === activeIdx ? 1 : 0,
                                            scale: i === activeIdx ? 1 : 0.9,
                                            rotateY: i === activeIdx ? 0 : 15,
                                        }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className={`card-base p-8 h-full flex flex-col items-center justify-center bg-gradient-to-br ${item.gradient}`}>
                                            <motion.div
                                                className={`${item.accent} mb-4 opacity-60`}
                                                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            >
                                                <IconComp size={64} />
                                            </motion.div>
                                            <div className="text-2xl font-black text-center">{item.title}</div>
                                            <div className="text-xs text-slate-400 mt-2 text-center max-w-xs">{item.features.join("  •  ")}</div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
