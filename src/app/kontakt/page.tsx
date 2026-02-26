"use client";
import { useState } from "react";
import { Reveal, MagneticButton } from "@/components/motion";
import { Send, Building2, Mail, User, MessageSquare, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function KontaktPage() {
    const [form, setForm] = useState({ ime: "", email: "", tvrtka: "", poruka: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const valid = form.ime.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.poruka.trim().length > 5;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!valid) return;
        setSending(true);

        // mailto fallback
        const subject = encodeURIComponent(`Kontakt: ${form.tvrtka || form.ime}`);
        const body = encodeURIComponent(`Ime: ${form.ime}\nEmail: ${form.email}\nTvrtka: ${form.tvrtka}\n\n${form.poruka}`);
        window.open(`mailto:info@vi-di.me?subject=${subject}&body=${body}`, "_blank");

        await new Promise(r => setTimeout(r, 800));
        setSending(false);
        setSent(true);
        toast.success("Poruka poslana! Javit ćemo se u roku 24h.");
    };

    return (
        <>
            <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
                <div className="spotlight" />
                <div className="max-w-[700px] mx-auto px-6">
                    <Reveal>
                        <div className="text-center mb-12">
                            <div className="section-tag mb-4">Kontakt</div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-[-2px] leading-[1.1]">
                                Javite nam <span className="gradient-text">se</span>
                            </h1>
                            <p className="text-[var(--text-muted)] mt-4 text-lg">
                                Pitanja, prijedlozi ili demo? Pišite nam — odgovaramo u roku 24h.
                            </p>
                        </div>
                    </Reveal>

                    {sent ? (
                        <Reveal>
                            <div className="card-base p-12 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                                    <CheckCircle size={32} />
                                </div>
                                <h2 className="text-2xl font-black mb-3">Hvala! 🎉</h2>
                                <p className="text-[var(--text-muted)]">Primili smo vašu poruku. Javit ćemo se u roku 24 sata.</p>
                            </div>
                        </Reveal>
                    ) : (
                        <Reveal delay={0.15}>
                            <form onSubmit={handleSubmit} className="card-base p-8 md:p-10 space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-xs font-semibold text-[var(--text-muted)] mb-2 flex items-center gap-2">
                                            <User size={14} /> Ime i prezime *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.ime}
                                            onChange={e => setForm({ ...form, ime: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all placeholder:text-[var(--text-muted)]"
                                            placeholder="Vaše ime"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-[var(--text-muted)] mb-2 flex items-center gap-2">
                                            <Mail size={14} /> Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all placeholder:text-[var(--text-muted)]"
                                            placeholder="vas@email.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-[var(--text-muted)] mb-2 flex items-center gap-2">
                                        <Building2 size={14} /> Tvrtka
                                    </label>
                                    <input
                                        type="text"
                                        value={form.tvrtka}
                                        onChange={e => setForm({ ...form, tvrtka: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all placeholder:text-[var(--text-muted)]"
                                        placeholder="Naziv tvrtke (opcionalno)"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-[var(--text-muted)] mb-2 flex items-center gap-2">
                                        <MessageSquare size={14} /> Poruka *
                                    </label>
                                    <textarea
                                        value={form.poruka}
                                        onChange={e => setForm({ ...form, poruka: e.target.value })}
                                        rows={5}
                                        className="w-full bg-white/[0.03] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all resize-none placeholder:text-[var(--text-muted)]"
                                        placeholder="Recite nam kako vam možemo pomoći..."
                                        required
                                    />
                                </div>
                                <MagneticButton>
                                    <button
                                        type="submit"
                                        disabled={!valid || sending}
                                        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-accent/20"
                                    >
                                        {sending ? (
                                            <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Pošalji poruku
                                                <Send size={16} />
                                            </>
                                        )}
                                    </button>
                                </MagneticButton>
                            </form>
                        </Reveal>
                    )}

                    <Reveal delay={0.3}>
                        <div className="mt-8 grid md:grid-cols-3 gap-4">
                            {[
                                { icon: <Mail size={18} />, label: "Email", value: "info@vi-di.me" },
                                { icon: <Building2 size={18} />, label: "Sjedište", value: "Zagreb, Hrvatska" },
                                { icon: <MessageSquare size={18} />, label: "Odgovor", value: "Unutar 24h" },
                            ].map((c, i) => (
                                <div key={i} className="card-base p-5 text-center">
                                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent mx-auto mb-2">{c.icon}</div>
                                    <div className="text-xs text-[var(--text-muted)] mb-1">{c.label}</div>
                                    <div className="font-semibold text-sm">{c.value}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
