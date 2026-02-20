"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, CountUp } from "./motion";
import { Calculator, TrendingDown, Clock, Users } from "lucide-react";

export function RoiCalculator() {
    const [workers, setWorkers] = useState(30);

    const hoursPerWeekAdmin = workers * 0.3;
    const costPerHourAdmin = 15;
    const weeksPerMonth = 4.3;
    const savedMonthly = Math.round(hoursPerWeekAdmin * costPerHourAdmin * weeksPerMonth);
    const savedYearly = savedMonthly * 12;
    const errorRate = Math.max(1, Math.round(workers * 0.1));
    const savedHours = Math.round(hoursPerWeekAdmin * weeksPerMonth);

    return (
        <section className="py-24 border-t border-white/[0.04]">
            <div className="max-w-[900px] mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-16">
                        <div className="section-tag mb-4">ROI Kalkulator</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            Koliko ti <span className="gradient-text">ušteda</span> donosi?
                        </h2>
                        <p className="text-slate-400 mt-4 max-w-lg mx-auto">
                            Pomakni slider i vidi koliko vremena i novca možeš uštedjeti s Vi-Di-Sef.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <div className="card-base p-8 md:p-10 relative overflow-hidden">
                        <div className="hero-glow absolute -top-20 right-0 w-[300px] h-[300px] opacity-30" />

                        {/* Slider */}
                        <div className="relative z-10 mb-10">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                    <Users size={16} className="text-accent" />
                                    Broj radnika
                                </label>
                                <div className="text-3xl font-black gradient-text">{workers}</div>
                            </div>
                            <input type="range" min={5} max={200} step={5} value={workers}
                                onChange={(e) => setWorkers(Number(e.target.value))}
                                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #D95D08 0%, #D95D08 ${((workers - 5) / 195) * 100}%, rgba(255,255,255,0.06) ${((workers - 5) / 195) * 100}%, rgba(255,255,255,0.06) 100%)`,
                                }}
                            />
                            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                                <span>5 radnika</span>
                                <span>200 radnika</span>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="grid sm:grid-cols-3 gap-4 relative z-10">
                            <motion.div layout className="card-base !bg-accent/[0.06] !border-accent/20 p-5 text-center">
                                <TrendingDown size={20} className="text-accent mx-auto mb-2" />
                                <div className="text-2xl md:text-3xl font-black text-white">
                                    <CountUp target={savedMonthly} suffix="€" />
                                </div>
                                <div className="text-xs text-slate-400 mt-1">ušteda / mjesec</div>
                            </motion.div>
                            <motion.div layout className="card-base p-5 text-center">
                                <Calculator size={20} className="text-emerald-400 mx-auto mb-2" />
                                <div className="text-2xl md:text-3xl font-black text-white">
                                    <CountUp target={savedYearly} suffix="€" />
                                </div>
                                <div className="text-xs text-slate-400 mt-1">ušteda / godinu</div>
                            </motion.div>
                            <motion.div layout className="card-base p-5 text-center">
                                <Clock size={20} className="text-blue-400 mx-auto mb-2" />
                                <div className="text-2xl md:text-3xl font-black text-white">
                                    <CountUp target={savedHours} suffix="h" />
                                </div>
                                <div className="text-xs text-slate-400 mt-1">manje administracije / mj</div>
                            </motion.div>
                        </div>

                        <div className="mt-6 text-center text-[10px] text-slate-600 relative z-10">
                            Izračun na temelju prosjeka: {costPerHourAdmin}€/h admin rad, ~18 min/radnik/tjedan ručne evidencije.
                            Eliminira ~{errorRate} grešaka mjesečno u evidenciji.
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
