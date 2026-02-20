"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./motion";

const exampleChips = [
    "Koliko sati ima Marko ovaj mjesec?",
    "Koji projekti su aktivni?",
    "Tko je radio prekovremeno ovaj tjedan?",
    "Pokaži troškove za zadnjih 30 dana",
    "Daj sažetak otpremnica za veljaču",
];

const responses: Record<string, string> = {
    "Koliko sati ima Marko ovaj mjesec?": `Marko Horvat ima ukupno <span class="text-accent font-bold">168 sati</span> u veljači 2026. Od toga:
• Redovni sati: <span class="text-accent font-bold">152h</span>
• Prekovremeni: <span class="text-accent font-bold">16h</span>
• Projekti: Gradilište Zapad, Stambeni A3`,
    "Koji projekti su aktivni?": `Trenutno su aktivna <span class="text-accent font-bold">4 projekta</span>:
• Gradilište Zapad — <span class="text-accent font-bold">12 radnika</span>, rok: 15.04.
• Stambeni A3 — <span class="text-accent font-bold">8 radnika</span>, rok: 01.06.
• Infrastruktura Sjever — <span class="text-accent font-bold">5 radnika</span>, rok: 30.03.
• Renovacija Centar — <span class="text-accent font-bold">3 radnika</span>, rok: 28.02.`,
    "Tko je radio prekovremeno ovaj tjedan?": `Ovaj tjedan <span class="text-accent font-bold">3 radnika</span> imaju prekovremene sate:
• Marko H. — <span class="text-accent font-bold">6h</span> prekovremeno
• Ivan P. — <span class="text-accent font-bold">4h</span> prekovremeno
• Ana K. — <span class="text-accent font-bold">2h</span> prekovremeno`,
    "Pokaži troškove za zadnjih 30 dana": `Ukupni troškovi za zadnjih 30 dana: <span class="text-accent font-bold">€24,580</span>
• Materijali: <span class="text-accent font-bold">€14,200</span> (57.8%)
• Goriva: <span class="text-accent font-bold">€3,120</span> (12.7%)
• Smještaj: <span class="text-accent font-bold">€4,500</span> (18.3%)
• Ostalo: <span class="text-accent font-bold">€2,760</span> (11.2%)`,
    "Daj sažetak otpremnica za veljaču": `U veljači izdano <span class="text-accent font-bold">23 otpremnice</span>:
• Ukupna vrijednost: <span class="text-accent font-bold">€18,450</span>
• Potpisane: <span class="text-accent font-bold">21</span> (91.3%)
• Na čekanju: <span class="text-accent font-bold">2</span>
• Projekti s najviše isporuka: Gradilište Zapad (9)`,
};

export function AiDemo() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
    const [typing, setTyping] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);

    const sendMessage = (text: string) => {
        setInput("");
        setMessages(prev => [...prev, { role: "user", text }]);
        setTyping(true);
        setTimeout(() => {
            const response = responses[text] || `Analiziram podatke za: "${text}"...
• Sustav je pronašao <span class="text-accent font-bold">relevantne podatke</span>
• Isprobajte aplikaciju za puni odgovor.`;
            setMessages(prev => [...prev, { role: "bot", text: response }]);
            setTyping(false);
        }, 1200 + Math.random() * 800);
    };

    useEffect(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages, typing]);

    return (
        <section id="ai" className="py-24 relative z-10">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <Reveal>
                        <div className="section-tag mb-4">AI Asistent</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-5">
                            Vaše je samo<br /><span className="gradient-text">da pitate...</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Vi-Di-Sef AI agent razumije tvoje podatke. Pitaj ga koliko radnik ima sati, gdje su radnici, koji projekt kasni — on odgovara iz tvoje baze u realnom vremenu.
                        </p>
                        <ul className="space-y-3">
                            {["Odgovori iz tvoje baze — ne generički", "Razumije radnike, projekte, sate, troškove", "Na hrvatskom — prirodni jezik", "Realtimedata — uvijek ažurno", "Izvještaji i grafovi on-demand"].map((text, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-400">
                                    <span className="w-6 h-6 rounded-md bg-accent/15 flex items-center justify-center text-accent text-xs flex-shrink-0 mt-0.5">✓</span>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                            {/* Header */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-xl">🤖</div>
                                <div>
                                    <div className="font-bold text-sm">Vi-Di-Sef AI</div>
                                    <div className="text-xs text-slate-500">Pametni asistent za gradilište</div>
                                </div>
                                <div className="ml-auto flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[10px] text-emerald-400 font-medium">Online</span>
                                </div>
                            </div>
                            {/* Chips */}
                            <div className="px-4 py-3 border-b border-white/[0.06] flex flex-wrap gap-2">
                                {exampleChips.map((chip, i) => (
                                    <button key={i} onClick={() => sendMessage(chip)}
                                        className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all cursor-pointer whitespace-nowrap">
                                        {chip.length > 35 ? chip.slice(0, 32) + "..." : chip}
                                    </button>
                                ))}
                            </div>
                            {/* Chat */}
                            <div ref={chatRef} className="h-[320px] overflow-y-auto p-4 space-y-3 scrollbar-thin">
                                {messages.length === 0 && (
                                    <div className="text-center text-slate-600 text-sm py-12">
                                        <div className="text-3xl mb-3">💬</div>
                                        Klikni na primjer pitanja ili napiši svoje
                                    </div>
                                )}
                                <AnimatePresence>
                                    {messages.map((msg, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                                            className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                                ? "ml-auto bg-accent/15 text-slate-200 rounded-br-md"
                                                : "mr-auto bg-white/[0.05] text-slate-300 rounded-bl-md border border-white/[0.06]"}`}
                                            dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, "<br/>") }} />
                                    ))}
                                </AnimatePresence>
                                {typing && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="mr-auto bg-white/[0.05] border border-white/[0.06] px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
                                        <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:0ms]" />
                                        <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:150ms]" />
                                        <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:300ms]" />
                                    </motion.div>
                                )}
                            </div>
                            {/* Input */}
                            <div className="px-4 py-3 border-t border-white/[0.06] flex gap-2">
                                <input value={input} onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === "Enter" && input.trim()) sendMessage(input.trim()); }}
                                    placeholder="Pitaj o radnicima, projektima, satima..."
                                    className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-accent/40 transition-colors" />
                                <button onClick={() => { if (input.trim()) sendMessage(input.trim()); }}
                                    className="bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all">▶</button>
                            </div>
                            {/* Report button */}
                            {messages.length > 0 && (
                                <div className="px-4 pb-4">
                                    <button onClick={() => setShowReport(true)}
                                        className="w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-400 hover:text-white hover:border-accent/30 transition-all flex items-center justify-center gap-2">
                                        📊 Pokaži izvještaj
                                    </button>
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>
            </div>
            {/* Report Modal */}
            <AnimatePresence>
                {showReport && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowReport(false)}>
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#12121A] border border-white/[0.08] rounded-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold">📊 Demo Izvještaj — Veljača 2026</h3>
                                <button onClick={() => setShowReport(false)} className="text-slate-500 hover:text-white">✕</button>
                            </div>
                            {/* Mock charts */}
                            <div className="space-y-6">
                                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
                                    <div className="text-sm font-medium mb-3">Radni sati po projektu</div>
                                    <div className="space-y-2">
                                        {[{ name: "Gradilište Zapad", pct: 85, h: "672h" }, { name: "Stambeni A3", pct: 60, h: "480h" }, { name: "Infrastruktura Sjever", pct: 40, h: "320h" }, { name: "Renovacija Centar", pct: 25, h: "200h" }].map((p, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="text-xs text-slate-500 w-40 truncate">{p.name}</div>
                                                <div className="flex-1 h-5 bg-white/[0.04] rounded-full overflow-hidden">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: `${p.pct}%` }} transition={{ duration: 1, delay: i * 0.15 }}
                                                        className="h-full bg-gradient-to-r from-accent to-amber-500 rounded-full" />
                                                </div>
                                                <div className="text-xs text-slate-400 w-12 text-right">{p.h}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {[{ label: "Ukupni sati", val: "1,672h", icon: "⏱️" }, { label: "Troškovi", val: "€24,580", icon: "💰" }, { label: "Otpremnice", val: "23", icon: "📦" }].map((s, i) => (
                                        <div key={i} className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06] text-center">
                                            <div className="text-2xl mb-1">{s.icon}</div>
                                            <div className="text-lg font-bold text-accent">{s.val}</div>
                                            <div className="text-[11px] text-slate-500">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center text-xs text-slate-600 pt-2">
                                    Demo podatci • <a href="https://vi-di-sef.app" target="_blank" className="text-accent hover:underline">Isprobaj s pravim podatcima →</a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
