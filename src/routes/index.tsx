import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Orb } from "@/components/Orb";
import { useReveal } from "@/hooks/use-reveal";
import {
  Globe2,
  Lock,
  Brain,
  MessageSquare,
  Search,
  Link2,
  Tags,
  Bell,
  Sun,
  Mic,
  FileText,
  Github,
  Linkedin,
  Download,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LIA · Tu segundo cerebro de escritorio" },
      {
        name: "description",
        content:
          "Asistente de escritorio con IA local. Captura ideas desde cualquier app y las convierte en notas que se conectan solas.",
      },
      { property: "og:title", content: "LIA · Tu segundo cerebro de escritorio" },
      {
        property: "og:description",
        content: "Asistente de escritorio con IA local. Tus notas siempre tuyas.",
      },
    ],
  }),
  component: Index,
});

const features = [
  { icon: MessageSquare, title: "Chat real", desc: "Burbujas reales y respuestas en Markdown." },
  {
    icon: Search,
    title: "Búsqueda semántica",
    desc: "Encuentra notas por significado, no por palabra.",
  },
  { icon: Link2, title: "Auto-enlazado", desc: "Las notas relacionadas se conectan solas." },
  { icon: Tags, title: "Auto-etiquetado", desc: "Personas, proyectos y lugares, sin esfuerzo." },
  {
    icon: Bell,
    title: "Recordatorios proactivos",
    desc: "Aprenden de tu feedback y se callan si molestan.",
  },
  { icon: Sun, title: "Resumen diario", desc: "Conecta lo de hoy con lo que ya sabías." },
  { icon: Mic, title: "Voz y visión", desc: "Transcripción local y captura desde tu pantalla." },
  { icon: FileText, title: "Tus archivos .md", desc: "Markdown normal. Obsidian opcional." },
];

function Index() {
  return (
    <div className="min-h-screen text-foreground">
      <Aurora />
      <Nav />
      <Hero />
      <WhyDifferent />
      <Features />
      <HowItWorks />
      <Privacy />
      <Stack />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__blob aurora__blob--a" />
      <div className="aurora__blob aurora__blob--b" />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md border-b border-border/40 bg-background/60">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <span
            className="relative grid h-7 w-7 place-items-center rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #C7D2FE 0%, #6366F1 60%, #3730A3 100%)",
              boxShadow: "0 0 14px rgba(99,102,241,0.6)",
            }}
          />
          <span className="font-semibold tracking-tight text-base">LIA</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#por-que" className="link-underline hover:text-foreground transition-colors">
            Por qué
          </a>
          <a href="#features" className="link-underline hover:text-foreground transition-colors">
            Features
          </a>
          <a
            href="#como-funciona"
            className="link-underline hover:text-foreground transition-colors"
          >
            Cómo funciona
          </a>
          <a href="#privacidad" className="link-underline hover:text-foreground transition-colors">
            Privacidad
          </a>
        </nav>
        <a
          href="https://github.com/HugoCatl/LIAwebsite/releases/latest/download/LIA.exe"
          className="btn-primary-anim text-sm font-medium px-3.5 py-2 rounded-lg bg-[var(--primary)] text-primary-foreground glow-indigo"
        >
          Descargar
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const orbWrapRef = useRef<HTMLDivElement | null>(null);

  // Subtle cursor parallax for the orb (max ~10px)
  useEffect(() => {
    const el = orbWrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 2; // -1..1
      const y = (e.clientY / h - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--px", `${x * 10}px`);
        el.style.setProperty("--py", `${y * 8}px`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const headline = ["Tu", "segundo", "cerebro"];
  const headlineAccent = ["de", "escritorio."];

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full glass mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-bright)] animate-pulse" />
            <span className="text-muted-foreground">Beta pública para Windows</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            {headline.map((w, i) => (
              <span
                key={`h-${i}`}
                className="word"
                style={{ "--word-delay": `${i * 110}ms` } as React.CSSProperties}
              >
                {w}&nbsp;
              </span>
            ))}
            <span className="text-gradient-indigo">
              {headlineAccent.map((w, i) => (
                <span
                  key={`ha-${i}`}
                  className="word"
                  style={
                    {
                      "--word-delay": `${(headline.length + i) * 110}ms`,
                    } as React.CSSProperties
                  }
                >
                  {w}
                  {i < headlineAccent.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </span>
          </h1>
          <p
            className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed word"
            style={{ "--word-delay": "650ms" } as React.CSSProperties}
          >
            LIA vive en tu pantalla y convierte tus ideas —dichas, copiadas o vistas— en notas que
            se conectan solas. IA local, tus datos siempre tuyos.
          </p>
          <div
            className="mt-8 flex flex-wrap gap-3 word"
            style={{ "--word-delay": "800ms" } as React.CSSProperties}
          >
            <a
              href="https://github.com/HugoCatl/LIAwebsite/releases/latest/download/LIA.exe"
              className="btn-primary-anim inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--primary)] text-primary-foreground font-medium glow-indigo"
            >
              <Download className="w-4 h-4" />
              Descargar para Windows
            </a>
            <a
              href="https://github.com/HugoCatl/LiaAssistant"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-anim inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-foreground hover:bg-[var(--accent)]"
              style={{ borderColor: "var(--border-strong)" }}
            >
              <Github className="w-4 h-4" />
              Ver en GitHub
            </a>
          </div>
          <p
            className="mt-5 text-sm text-muted-foreground word"
            style={{ "--word-delay": "950ms" } as React.CSSProperties}
          >
            Gratis · Windows 10/11 · Sin instalar Python ni nada
          </p>
        </div>

        <div className="relative flex items-center justify-center animate-float">
          <div ref={orbWrapRef} className="orb-parallax orb-enter">
            <Orb size={420} className="max-w-full" withOrbits />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyDifferent() {
  const items = [
    {
      icon: Globe2,
      title: "Captura desde cualquier app",
      desc: "Voz, portapapeles o pantalla, sin cambiar de contexto.",
    },
    {
      icon: Lock,
      title: "Local-first de verdad",
      desc: "Búsqueda, clustering y aprendizaje corren en tu máquina. Solo el chat sale a la nube.",
    },
    {
      icon: Brain,
      title: "Aprende de ti",
      desc: "Los avisos proactivos se callan cuando ve que no te aportan.",
    },
  ];

  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section id="por-que" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div ref={headRef} className="reveal text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Por qué es diferente</h2>
          <p className="mt-4 text-muted-foreground">No es otro bloc de notas con IA encima.</p>
        </div>
        <div ref={gridRef} className="reveal stagger grid md:grid-cols-3 gap-5">
          {items.map((it) => (
            <div key={it.title} className="glass card-hover p-7">
              <div
                className="w-11 h-11 rounded-xl grid place-items-center mb-5"
                style={{
                  background: "rgba(99,102,241,0.15)",
                  boxShadow: "inset 0 0 0 1px rgba(99,102,241,0.25)",
                }}
              >
                <it.icon className="feature-icon w-5 h-5 text-[var(--primary-bright)]" />
              </div>
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div ref={headRef} className="reveal max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Todo lo que hace LIA</h2>
          <p className="mt-4 text-muted-foreground">
            Pensado para que pares de organizar y empieces a pensar.
          </p>
        </div>
        <div ref={gridRef} className="reveal stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="glass card-hover p-5">
              <f.icon className="feature-icon w-5 h-5 text-[var(--primary-bright)] mb-4" />
              <h3 className="font-semibold text-[15px]">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Descárgala y ábrela", desc: "Un doble clic. Se instala sola." },
    {
      n: "02",
      title: "Pon tu nombre y tu clave de Gemini",
      desc: "Gratuita, de Google. Te dejamos el enlace.",
    },
    { n: "03", title: "Empieza a soltar ideas", desc: "LIA las captura y las conecta por ti." },
  ];
  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const lineRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div ref={headRef} className="reveal text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Cómo funciona</h2>
          <p className="mt-4 text-muted-foreground">En tres pasos. Literalmente.</p>
        </div>
        <div ref={gridRef} className="reveal stagger relative grid md:grid-cols-3 gap-5">
          {/* Drawn connecting line — only meaningful on md+ */}
          <svg
            className="hidden md:block absolute inset-x-0 top-12 w-full h-8 pointer-events-none"
            viewBox="0 0 600 20"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="lia-line" x1="0" x2="1">
                <stop offset="0%" stopColor="rgba(99,102,241,0)" />
                <stop offset="20%" stopColor="rgba(129,140,248,0.7)" />
                <stop offset="80%" stopColor="rgba(165,180,252,0.7)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0)" />
              </linearGradient>
            </defs>
            <path
              ref={lineRef}
              className="draw-path"
              d="M 20 10 Q 200 0, 300 10 T 580 10"
              fill="none"
              stroke="url(#lia-line)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {steps.map((s) => (
            <div key={s.n} className="glass card-hover p-7 relative">
              <div className="text-5xl font-bold text-gradient-indigo opacity-90 mb-4">{s.n}</div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="privacidad" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <div ref={ref} className="reveal glass p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle, #6366F1, transparent 70%)" }}
          />
          <div className="relative flex flex-col md:flex-row items-start gap-6">
            <div
              className="w-12 h-12 shrink-0 rounded-xl grid place-items-center"
              style={{
                background: "rgba(99,102,241,0.15)",
                boxShadow: "inset 0 0 0 1px rgba(99,102,241,0.3)",
              }}
            >
              <ShieldCheck className="w-6 h-6 text-[var(--primary-bright)]" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Lo sensible nunca sale de tu equipo.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed md:text-lg">
                La voz, los embeddings y el aprendizaje corren en local. Nunca enviamos tu colección
                de notas a la nube.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const badges = ["Python", "PyQt6", "Google Gemini", "Whisper", "ONNX"];
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-16">
      <div ref={ref} className="reveal mx-auto max-w-5xl px-5 text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground mb-6">Hecho con</p>
        <div className="stagger is-visible flex flex-wrap items-center justify-center gap-2.5">
          {badges.map((b) => (
            <span
              key={b}
              className="px-3.5 py-1.5 rounded-full text-sm text-muted-foreground border border-border bg-[var(--muted)]"
            >
              {b}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground max-w-xl mx-auto">
          Un proyecto de ingeniería: IA en local + arquitectura limpia + ~100 tests.
        </p>
      </div>
    </section>
  );
}

function FinalCTA() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-24 md:py-32">
      <div
        ref={ref}
        className="reveal mx-auto max-w-3xl px-5 text-center flex flex-col items-center"
      >
        <Orb size={140} className="mb-8" />
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Empieza a construir tu <span className="text-gradient-indigo">segundo cerebro.</span>
        </h2>
        <div className="mt-8">
          <a
            href="https://github.com/HugoCatl/LIAwebsite/releases/latest/download/LIA.exe"
            className="btn-primary-anim cta-pulse inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--primary)] text-primary-foreground font-medium glow-indigo"
          >
            <Download className="w-4 h-4" />
            Descargar LIA
          </a>
        </div>
        <p className="mt-6 text-xs text-muted-foreground max-w-md leading-relaxed">
          Al abrirla, Windows mostrará un aviso de "editor desconocido" (la app no está firmada) →
          Más información → Ejecutar. Necesitas una clave gratuita de Google Gemini.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hugocaiba@gmail.com");
    toast.success("Correo electrónico copiado al portapapeles: hugocaiba@gmail.com");
  };

  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span
            className="h-5 w-5 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 30%, #C7D2FE, #6366F1 60%, #3730A3)",
              boxShadow: "0 0 10px rgba(99,102,241,0.5)",
            }}
          />
          <span className="font-semibold text-foreground">LIA</span>
          <button
            onClick={handleCopyEmail}
            className="ml-2 hover:text-foreground transition-colors cursor-pointer text-left focus:outline-none"
            title="Copiar correo electrónico"
          >
            · Hecho por Hugo Catalán
          </button>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/HugoCatl"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/hugocatalanibañez"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
