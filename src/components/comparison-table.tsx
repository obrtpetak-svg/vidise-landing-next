"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./motion";
import { Check, X, Minus } from "lucide-react";

type Val = true | false | "partial" | string;
interface Row { feature: string; vidsef: Val; excel: Val; paper: Val }

const data: Row[] = [
    { feature: "Evidencija radnog vremena", vidsef: true, excel: "partial", paper: true },
    { feature: "Real-time pristup s mobitela", vidsef: true, excel: false, paper: false },
    { feature: "GPS praćenje lokacije", vidsef: true, excel: false, paper: false },
    { feature: "Automatski izvještaji (PDF/Excel)", vidsef: true, excel: "partial", paper: false },
    { feature: "AI asistent za analizu podataka", vidsef: true, excel: false, paper: false },
    { feature: "QR Check-in", vidsef: true, excel: false, paper: false },
    { feature: "Digitalne otpremnice s potpisom", vidsef: true, excel: false, paper: "partial" },
    { feature: "Upravljanje vozilima & gorivom", vidsef: true, excel: "partial", paper: false },
    { feature: "Audit log svih promjena", vidsef: true, excel: false, paper: false },
    { feature: "Kalendar & obavijesti", vidsef: true, excel: false, paper: false },
    { feature: "Vremenska prognoza po gradilištu", vidsef: true, excel: false, paper: false },
    { feature: "Multi-user kolaboracija", vidsef: true, excel: "partial", paper: false },
    { feature: "Vrijeme implementacije", vidsef: "5 min", excel: "2-4 tjedna", paper: "—" },
    { feature: "Mjesečni trošak za 50 radnika", vidsef: "Pristupačno", excel: "Besplatno*", paper: "500€+ papir" },
];

function Cell({ val }: { val: Val }) {
    if (val === true) return <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center"><Check size={15} className="text-emerald-400" /></div>;
    if (val === false) return <div className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center"><X size={15} className="text-red-400/60" /></div>;
    if (val === "partial") return <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center"><Minus size={15} className="text-amber-400/60" /></div>;
    return <span className="text-xs font-semibold text-slate-300">{val}</span>;
}

export function ComparisonTable() {
    const [hoveredCol, setHoveredCol] = useState<number | null>(null);

    return (
        <section className="py-24 border-t border-white/[0.04]">
            <div className="max-w-[900px] mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-16">
                        <div className="section-tag mb-4">Usporedba</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            Zašto ne Excel?<br /><span className="gradient-text">Zašto Vi-Di-Sef.</span>
                        </h2>
                        <p className="text-slate-400 mt-4 max-w-lg mx-auto">
                            Konkretna usporedba. Bez marketinških floskula.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <div className="rounded-2xl border border-white/[0.06] overflow-hidden bg-white/[0.02]">
                        {/* Header */}
                        <div className="grid grid-cols-4 text-center text-xs font-bold uppercase tracking-wider border-b border-white/[0.06]">
                            <div className="p-4 text-left text-slate-500">Funkcija</div>
                            <div className="p-4 text-accent bg-accent/[0.04] border-x border-white/[0.04]"
                                onMouseEnter={() => setHoveredCol(1)} onMouseLeave={() => setHoveredCol(null)}>
                                Vi-Di-Sef
                            </div>
                            <div className="p-4 text-slate-500" onMouseEnter={() => setHoveredCol(2)} onMouseLeave={() => setHoveredCol(null)}>Excel</div>
                            <div className="p-4 text-slate-500" onMouseEnter={() => setHoveredCol(3)} onMouseLeave={() => setHoveredCol(null)}>Papir</div>
                        </div>
                        {/* Rows */}
                        {data.map((row, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.03 }}
                                className="grid grid-cols-4 items-center text-center border-b border-white/[0.03] last:border-b-0 hover:bg-white/[0.02] transition-colors"
                            >
                                <div className="p-3.5 text-left text-sm text-slate-400">{row.feature}</div>
                                <div className={`p-3.5 flex justify-center border-x border-white/[0.04] transition-colors ${hoveredCol === 1 ? "bg-accent/[0.04]" : ""}`}>
                                    <Cell val={row.vidsef} />
                                </div>
                                <div className={`p-3.5 flex justify-center transition-colors ${hoveredCol === 2 ? "bg-white/[0.02]" : ""}`}>
                                    <Cell val={row.excel} />
                                </div>
                                <div className={`p-3.5 flex justify-center transition-colors ${hoveredCol === 3 ? "bg-white/[0.02]" : ""}`}>
                                    <Cell val={row.paper} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-[10px] text-slate-600 mt-3 text-center">* Excel je besplatan, ali skriveni troškovi (greške, izgubljeno vrijeme, dupli unosi) koštaju 10x više.</p>
                </Reveal>
            </div>
        </section>
    );
}
