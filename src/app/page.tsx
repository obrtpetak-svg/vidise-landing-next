import Link from "next/link";
import Image from "next/image";
import { Reveal, MagneticButton, TiltCard, CountUp } from "@/components/motion";
import { AiDemo } from "@/components/ai-demo";
import { features } from "@/lib/features-data";
import { FAQ } from "@/components/faq";

export default function Home() {
  return (
    <>
      {/* ═══════ Hero ═══════ */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="spotlight" />
        <div className="hero-glow -right-32 top-0" />
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Nova verzija — Sigurnost & Performanse
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-3px] leading-[1.05] mb-6">
                Upravljaj<br />radnom snagom<br />
                <span className="gradient-text">bez kompromisa.</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                Vi-Di-Sef je platforma koja donosi red u kaos građevine.
                Evidencija sati, projekti, računi, otpremnice — sve na jednom mjestu,
                u realnom vremenu, s bilo kojeg uređaja.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton>
                  <a href="https://vi-di-sef.app" target="_blank" rel="noopener"
                    className="inline-flex items-center gap-2.5 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-2xl text-base font-bold transition-all hover:shadow-[0_12px_40px_rgba(217,93,8,0.4)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    Započni besplatno
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a href="#features"
                    className="inline-flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white px-8 py-4 rounded-2xl text-base font-bold transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    Saznaj više
                  </a>
                </MagneticButton>
              </div>
            </Reveal>
            <Reveal delay={0.2} direction="right">
              <div className="relative">
                <div className="hero-glow absolute -inset-10" />
                <Image src="/hero-app.png" alt="Vi-Di-Sef Dashboard" width={800} height={600}
                  className="rounded-2xl border border-white/[0.06] shadow-2xl shadow-black/40 relative z-10"
                  priority />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════ Trusted By ═══════ */}
      <section className="py-12 border-y border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="text-center text-xs font-medium text-slate-600 uppercase tracking-widest mb-8">
              Pouzdani partneri iz građevinskog sektora
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {["🏗️ GradCo", "🏢 BuildPro", "🔨 Konstrukt d.o.o.", "🏠 Domex", "⚡ ElektroGrad"].map((name, i) => (
                <span key={i} className="text-slate-500/50 text-sm font-semibold hover:text-slate-400 transition-colors cursor-default whitespace-nowrap">{name}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ Stats ═══════ */}
      <section id="stats" className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ val: 500, label: "Aktivnih radnika", suffix: "+" },
            { val: 12000, label: "Evidentiranih sati/mj", suffix: "+" },
            { val: 98, label: "% točnost evidencije", suffix: "%" },
            { val: 75, label: "% manje administracije", suffix: "%" }
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-base p-6 text-center">
                  <CountUp target={s.val} suffix={s.suffix}
                    className="text-3xl md:text-4xl font-black gradient-text" />
                  <div className="text-xs text-slate-500 mt-2 font-medium">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Features ═══════ */}
      <section id="features" className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <div className="section-tag mb-4">Mogućnosti</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Sve što trebaš.<br />Ništa što ne trebaš.
              </h2>
              <p className="text-slate-400 mt-4 max-w-lg mx-auto">
                Izgrađen za stvarne probleme građevinskih tvrtki — od terena do ureda.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Reveal key={f.href} delay={(i % 6) * 0.08}>
                <TiltCard>
                  <Link href={f.href} className="card-base block p-6 group relative overflow-hidden h-full">
                    <span className="absolute top-4 right-4 text-accent/0 group-hover:text-accent/60 text-lg transition-all duration-300 translate-x-2 group-hover:translate-x-0">→</span>
                    <div className="text-3xl mb-3">{f.icon}</div>
                    <div className="font-bold mb-2">{f.title}</div>
                    <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
                    <div className="text-xs text-accent font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">Saznaj više →</div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ AI Demo ═══════ */}
      <AiDemo />

      {/* ═══════ How It Works ═══════ */}
      <section id="how" className="py-24 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <div className="section-tag mb-4">Kako radi</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Spreman za 5 minuta.</h2>
              <p className="text-slate-400 mt-4 max-w-lg mx-auto">Nema instalacije, nema kompliciranih postavki. Samo otvori i koristi.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ n: "1", t: "Kreiraj račun", d: "Postavi Firebase bazu i admin PIN. Traje 2 minute." },
            { n: "2", t: "Dodaj projekte & radnike", d: "Unesi podatke o projektima i radnicima. Dodijeli uloge." },
            { n: "3", t: "Radnici unose sate", d: "Svaki radnik otvara app s mobitela i evidentira rad." },
            { n: "4", t: "Analiziraj & izvezi", d: "Pregledaj izvještaje, odobri sate, izvezi PDF-ove." }
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="card-base p-6 relative">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent font-black text-lg mb-4">{step.n}</div>
                  <div className="font-bold mb-2">{step.t}</div>
                  <div className="text-sm text-slate-500 leading-relaxed">{step.d}</div>
                  {i < 3 && <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-accent/30 text-2xl">→</div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Testimonials ═══════ */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <div className="section-tag mb-4">Recenzije</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Što kažu korisnici</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "Prije Vi-Di-Sefa imali smo Excel tablice i papire po svim gradilištima. Sad sve vidim u realnom vremenu s mobitela. Ušteda vremena je ogromna — barem 15 sati tjedno u administraciji.", a: "Marko H.", r: "Direktor, građevinska tvrtka — 45 radnika", icon: "👷" },
              { q: "Otpremnice su nam bile noćna mora — papir, potpisi, skeniranja... Sad radnik fotografira robu, potpiše na ekranu i gotovo. PDF nastane automatski. Za nas je ovo bio game-changer.", a: "Ivan P.", r: "Voditelj gradilišta, Konstrukt d.o.o.", icon: "🏗️" },
              { q: "Imamo radnike raspoređene na 6 lokacija i stalno smo gubili pregled tko je gdje. Otkad koristimo Vi-Di-Sef, svako jutro u 2 minute imam pregled svih radnika, sati i projekata. Preporučujem svima u branši.", a: "Ana K.", r: "Administrativa, ElektroGrad — 80+ radnika", icon: "📋" }
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="card-base p-6 h-full flex flex-col">
                  <div className="text-accent text-sm mb-3">★★★★★</div>
                  <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-6">„{t.q}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-xl">{t.icon}</div>
                    <div>
                      <div className="font-bold text-sm">{t.a}</div>
                      <div className="text-xs text-slate-600">{t.r}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Security ═══════ */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <div className="section-tag mb-4">Sigurnost & Privatnost</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Tvoji podaci.<br />Naša odgovornost.</h2>
              <p className="text-slate-400 mt-4 max-w-lg mx-auto">Industrijski standardi zaštite podataka. Svaki element sustava dizajniran s privatnošću na prvom mjestu.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[{ icon: "🔐", t: "SHA-256 enkripcija", d: "Svi PIN-ovi i osjetljivi podaci enkriptirani industrijskim standardom." },
            { icon: "📝", t: "Audit log", d: "Svaka akcija u sustavu je zapisana, pretraživa i reverzibilna." },
            { icon: "🛡️", t: "Rate limiting", d: "Zaštita od brute-force napada. Automatsko blokiranje sumnjivih pokušaja." },
            { icon: "🔒", t: "HTTPS + Session", d: "Sva komunikacija enkriptirana. Session timeout za neaktivne korisnike." }
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-base p-6 text-center">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="font-bold text-sm mb-2">{s.t}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{s.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <FAQ />

      {/* ═══════ CTA ═══════ */}
      <section id="contact" className="py-24 border-t border-white/[0.04]">
        <div className="max-w-[700px] mx-auto px-6">
          <Reveal>
            <div className="card-base p-12 text-center relative overflow-hidden">
              <div className="hero-glow absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px]" />
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 relative">
                Spreman digitalizirati<br />svoje poslovanje?
              </h2>
              <p className="text-slate-400 mb-8 relative">
                Prijavi se besplatno i pokreni prvu evidenciju danas. Bez kreditne kartice, bez obaveze.
              </p>
              <MagneticButton>
                <a href="mailto:info@vi-di.me"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all hover:shadow-[0_12px_40px_rgba(217,93,8,0.4)] relative">
                  📧 Kontaktiraj nas
                </a>
              </MagneticButton>
              <div className="mt-5 text-sm text-slate-600 relative">
                <a href="https://www.vi-di.me" className="text-accent font-semibold hover:underline">www.vi-di.me</a>
                &nbsp;•&nbsp; info@vi-di.me
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
