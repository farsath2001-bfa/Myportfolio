import { useState, useEffect, useRef, useCallback } from "react";
import profilePhoto from "../../assets/profile.jpg";
import "./Portfolio.css";

// ── Data ──────────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const TYPEWRITER_ROLES = [
  "Full Stack Web Developer",
  "MERN Stack Specialist",
  "React & Node.js Expert",
  "Dubai Based Freelancer",
];

const STATS = [
  { value: 3, label: "Projects Shipped", suffix: "+" },
  { value: 3, label: "Years Experience", suffix: "+" },
  { value: 100, label: "Client Satisfaction", suffix: "%" },
  { value: 5, label: "Tech Stack", suffix: "+" },
];

const SKILLS = [
  { name: "React.js",     pct: 92 },
  { name: "Node.js",      pct: 88 },
  { name: "MongoDB",      pct: 85 },
  { name: "Express.js",   pct: 85 },
  { name: "JavaScript",   pct: 90 },
  { name: "HTML / CSS",   pct: 95 },
  { name: "Git & GitHub", pct: 88 },
  { name: "REST APIs",    pct: 82 },
];

const PROJECTS = [
  {
    id: 1,
    category: "crm",
    label: "Real Estate CRM",
    title: "Lazord Real Estate",
    url: "https://lazord-ui.vercel.app",
    short: "lazord-ui.vercel.app",
    desc: "Full-stack CRM for Dubai real estate. Bilingual Arabic & English UI, admin panel, property listings, and lead management.",
    tags: ["React", "Node.js", "MongoDB", "JWT"],
    accent: "#2d5fc4",
  },
  {
    id: 2,
    category: "jobportal",
    label: "Job Portal",
    title: "Blue Collar Jobs",
    url: "https://bluecollarjobs-frontend-1zzj.vercel.app",
    short: "bluecollarjobs-frontend-1zzj.vercel.app",
    desc: "Job listing platform for blue-collar workers in Dubai. Employer panels, worker profiles, and job applications.",
    tags: ["React", "Node.js", "MongoDB", "Render"],
    accent: "#2d5fc4",
  },
  {
    id: 3,
    category: "client",
    label: "Client Website",
    title: "Valet Parking Dubai",
    url: "https://valet-parking-dubai.vercel.app",
    short: "valet-parking-dubai.vercel.app",
    desc: "Premium valet parking service website for a Dubai client. Service pages, gallery, and WhatsApp quote integration.",
    tags: ["React", "Vite", "CSS Variables", "Vercel"],
    accent: "#C8A865",
  },
];

const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "crm", label: "CRM" },
  { key: "jobportal", label: "Job Portal" },
  { key: "client", label: "Client Sites" },
];

const CERTS = [
  { icon: "🏗️", title: "AutoCAD", issuer: "Autodesk Certified" },
  { icon: "📊", title: "Advanced MS Excel", issuer: "Microsoft Office" },
  { icon: "💻", title: "Full Stack Developer", issuer: "Training Certification" },
];

const EXPERIENCE = [
  {
    period: "01/2025 – Present",
    role: "Administrative Assistant",
    company: "Planet Medica Medical Instrument Trading",
    points: [
      "Scheduling meetings and managing calendars",
      "Answering and directing phone calls",
      "Managing databases and records",
    ],
  },
  {
    period: "11/2022 – 12/2024",
    role: "Administrative Support & Messenger",
    company: "Engineer Adnan Saffarini",
    points: [
      "Delivered documents and architectural plans to clients",
      "Printed and managed construction drawings",
      "Data entry and record keeping",
    ],
  },
];

// ── Hooks ─────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 40, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length === 0) {
          setIsDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return displayed;
}

function useCounter(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function scrollTo(id) {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
}

// ── Custom Cursor ─────────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + "px";
        glowRef.current.style.top = e.clientY + "px";
      }
    };
    const over = () => { dotRef.current?.classList.add("hovered"); glowRef.current?.classList.add("hovered"); };
    const out  = () => { dotRef.current?.classList.remove("hovered"); glowRef.current?.classList.remove("hovered"); };
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter", over); el.addEventListener("mouseleave", out); });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div className="pf-cursor-dot" ref={dotRef} />
      <div className="pf-cursor-glow" ref={glowRef} />
    </>
  );
}

// ── Theme Toggle ──────────────────────────────────────────
function ThemeToggle({ dark, onToggle }) {
  return (
    <button className={`pf-theme-toggle${dark ? " pf-theme-toggle--dark" : ""}`} onClick={onToggle} aria-label="Toggle dark mode">
      <span className="pf-theme-toggle__track">
        <span className="pf-theme-toggle__thumb">{dark ? "🌙" : "☀️"}</span>
      </span>
    </button>
  );
}

// ── Navbar ────────────────────────────────────────────────
function Navbar({ active, dark, onToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={`pf-nav${scrolled ? " pf-nav--scrolled" : ""}`}>
      <span className="pf-nav__logo" onClick={() => scrollTo("hero")}>
        <img src={profilePhoto} alt="MP" className="pf-nav__logo-img" />
        <span>MP</span>
      </span>
      <ul className={`pf-nav__links${open ? " pf-nav__links--open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <button className={`pf-nav__link${active === l ? " active" : ""}`} onClick={() => { setOpen(false); scrollTo(l); }}>
              {l}
            </button>
          </li>
        ))}
        <li><a className="pf-nav__cta" href="mailto:farsathali7@gmail.com">Hire me</a></li>
        <li><ThemeToggle dark={dark} onToggle={onToggle} /></li>
      </ul>
      <div className="pf-nav__right-mobile">
        <ThemeToggle dark={dark} onToggle={onToggle} />
        <button className="pf-nav__burger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────
function Hero() {
  const typed = useTypewriter(TYPEWRITER_ROLES);
  return (
    <section className="pf-hero" id="hero">
      <div className="pf-hero__inner">
        <div className="pf-hero__photo-wrap">
          <img src={profilePhoto} alt="Mohamed Parsath Ali" className="pf-hero__photo" />
        </div>
        <div className="pf-hero__badge">Based in Dubai, UAE 🇦🇪</div>
        <h1 className="pf-hero__name">
          Mohamed<br />
          <span className="pf-hero__name--accent">Parsath Ali</span>
        </h1>
        <div className="pf-hero__typewriter">
          <span>{typed}</span>
          <span className="pf-cursor-blink">|</span>
        </div>
        <p className="pf-hero__sub">
          I build complete web products — CRMs, job platforms, and client websites
          — using the MERN stack. Clean code, polished UI.
        </p>
        <div className="pf-hero__actions">
          <button className="pf-btn pf-btn--primary" onClick={() => scrollTo("projects")}>
            View projects
          </button>
          <a className="pf-btn pf-btn--ghost" href="/Mohamed_Parsath_Ali_CV.pdf" download>
            ⬇ Download CV
          </a>
        </div>
        <div className="pf-hero__stack">
          {["React", "Node.js", "MongoDB", "Express", "JavaScript"].map((t) => (
            <span key={t} className="pf-chip">{t}</span>
          ))}
        </div>
      </div>
      <div className="pf-hero__scroll-hint" aria-hidden="true"><span /></div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────
function StatCard({ value, label, suffix, start }) {
  const count = useCounter(value, 1400, start);
  return (
    <div className="pf-stat">
      <div className="pf-stat__num">{count}{suffix}</div>
      <div className="pf-stat__label">{label}</div>
    </div>
  );
}

function Stats() {
  const [ref, visible] = useInView(0.3);
  return (
    <div className="pf-stats" ref={ref}>
      {STATS.map((s) => (
        <StatCard key={s.label} {...s} start={visible} />
      ))}
    </div>
  );
}

// ── About / Timeline ──────────────────────────────────────
function About() {
  const [ref, visible] = useInView();
  return (
    <section className="pf-section pf-about" id="about" ref={ref}>
      <div className={`pf-section__inner pf-fade${visible ? " pf-fade--in" : ""}`}>
        <div className="pf-eyebrow">About</div>
        <div className="pf-about__grid">
          <div className="pf-about__text">
            <h2 className="pf-title">Building things that<br />work, and look great.</h2>
            <p>I'm a full-stack developer based in Dubai, specialising in the MERN stack. I started as an admin professional, learned programming, and built my way to shipping complete web products for real clients.</p>
            <p>My background in administration means I understand how businesses actually operate — which makes me better at building the software they need.</p>
            <div className="pf-about__meta">
              <div><span>Degree</span> Bachelor of Computer Applications — Bharathidasan University</div>
              <div><span>Based</span> Dubai, UAE</div>
              <div><span>Languages</span> English · Tamil</div>
              <div><span>LinkedIn</span><a href="https://www.linkedin.com/in/mohamed-parsath-ali-456961253" target="_blank" rel="noreferrer">linkedin.com/in/mohamed-parsath-ali</a></div>
            </div>
          </div>
          <div className="pf-about__exp">
            <div className="pf-about__exp-title">Experience Timeline</div>
            <div className="pf-timeline">
              {EXPERIENCE.map((e, i) => (
                <div className={`pf-timeline__item pf-fade${visible ? " pf-fade--in" : ""}`} key={i} style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="pf-timeline__dot" />
                  <div className="pf-timeline__line" />
                  <div className="pf-timeline__content">
                    <div className="pf-timeline__period">{e.period}</div>
                    <div className="pf-timeline__role">{e.role}</div>
                    <div className="pf-timeline__company">{e.company}</div>
                    <ul className="pf-timeline__points">
                      {e.points.map((p, j) => <li key={j}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────
const SKILL_SVGS = {
  "React.js": <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.3" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/></svg>,
  "Node.js": <svg viewBox="0 0 24 24"><path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="#539E43" opacity=".9"/><path d="M12 2l9 5-9 5-9-5 9-5z" fill="#5ab552"/><path d="M12 12l9-5v10l-9 5V12z" fill="#3d7a34"/></svg>,
  "MongoDB": <svg viewBox="0 0 24 24"><path d="M12 2C12 2 7 8 7 13a5 5 0 0 0 4.5 4.97V21h1v-3.03A5 5 0 0 0 17 13C17 8 12 2 12 2z" fill="#4FAA41"/><path d="M12 2C12 2 17 8 17 13a5 5 0 0 1-4.5 4.97V21h-.5V6.5L12 2z" fill="#3D8A34"/></svg>,
  "Express.js": <svg viewBox="0 0 24 24"><text x="2" y="17" fontSize="10" fontWeight="bold" fill="currentColor" fontFamily="monospace">Ex</text></svg>,
  "JavaScript": <svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><text x="3" y="19" fontSize="11" fontWeight="bold" fill="#000" fontFamily="monospace">JS</text></svg>,
  "HTML / CSS": <svg viewBox="0 0 24 24"><path d="M4 2l1.5 17L12 21l6.5-2L20 2H4z" fill="#E44D26"/><path d="M12 3.5v16l5.3-1.6 1.3-14.4H12z" fill="#F16529"/><path d="M12 10h-2.5l-.2-2H12V6H7.2l.5 6H12v-2zm0 4.5l-2.6-.7-.2-2h-2l.4 4 4.4 1.2v-2.5z" fill="#fff"/></svg>,
  "Git & GitHub": <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/></svg>,
  "REST APIs": <svg viewBox="0 0 24 24"><path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="8" cy="8" r="2" fill="#2d5fc4"/><circle cx="16" cy="16" r="2" fill="#2d5fc4"/><path d="M8 10v4M16 10v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2"/></svg>,
};

function Skills() {
  const [ref, visible] = useInView();
  return (
    <section className="pf-section pf-skills" id="skills" ref={ref}>
      <div className={`pf-section__inner pf-fade${visible ? " pf-fade--in" : ""}`}>
        <div className="pf-eyebrow">Skills</div>
        <h2 className="pf-title">Tech I work with</h2>
        <div className="pf-skills__grid">
          {SKILLS.map((s, i) => (
            <div className="pf-skill-card" key={s.name} style={{ "--delay": `${i * 70}ms` }}>
              <div className="pf-skill-card__icon">{SKILL_SVGS[s.name]}</div>
              <div className="pf-skill-card__name">{s.name}</div>
              <div className="pf-skill-card__bar">
                <div className="pf-skill-card__fill" style={{ width: visible ? `${s.pct}%` : "0%" }} />
              </div>
              <div className="pf-skill-card__pct">{s.pct}%</div>
            </div>
          ))}
        </div>
        <div className="pf-skills__extras">
          {["AutoCAD", "Advanced MS-Excel", "Microsoft Office"].map((t) => (
            <span key={t} className="pf-chip pf-chip--outline">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Certifications ────────────────────────────────────────
function Certs() {
  const [ref, visible] = useInView();
  return (
    <section className="pf-section pf-certs" id="certs" ref={ref}>
      <div className={`pf-section__inner pf-fade${visible ? " pf-fade--in" : ""}`}>
        <div className="pf-eyebrow">Certifications</div>
        <h2 className="pf-title">Credentials</h2>
        <div className="pf-certs__grid">
          {CERTS.map((c, i) => (
            <div className="pf-cert-card" key={i} style={{ "--delay": `${i * 80}ms` }}>
              <div className="pf-cert-card__icon">{c.icon}</div>
              <div className="pf-cert-card__title">{c.title}</div>
              <div className="pf-cert-card__issuer">{c.issuer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────
function Projects() {
  const [ref, visible] = useInView();
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered = PROJECTS.filter(p => activeFilter === "all" || p.category === activeFilter);

  return (
    <section className="pf-section pf-projects" id="projects" ref={ref}>
      <div className={`pf-section__inner pf-fade${visible ? " pf-fade--in" : ""}`}>
        <div className="pf-eyebrow">Projects</div>
        <h2 className="pf-title">What I've shipped</h2>
        <div className="pf-filter-tabs">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              className={`pf-filter-tab${activeFilter === tab.key ? " active" : ""}`}
              onClick={() => setActiveFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="pf-projects__grid">
          {filtered.map((p) => (
            <a key={p.id} className="pf-card" href={p.url} target="_blank" rel="noreferrer" style={{ "--accent": p.accent }}>
              <div className="pf-card__bar" />
              <div className="pf-card__label">{p.label}</div>
              <h3 className="pf-card__title">{p.title}</h3>
              <p className="pf-card__desc">{p.desc}</p>
              <div className="pf-card__tags">{p.tags.map(t => <span key={t} className="pf-chip pf-chip--sm">{t}</span>)}</div>
              <div className="pf-card__footer">
                <span className="pf-card__url">{p.short}</span>
                <svg className="pf-card__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact Form ──────────────────────────────────────────
function Contact() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_fw2yxla",
          template_id: "template_eah3i6b",
          user_id: "0y4eS0bXbkp8sNvRi",
          template_params: {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
            to_name: "Mohamed",
          },
        }),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <section className="pf-section pf-contact" id="contact" ref={ref}>
      <div className={`pf-section__inner pf-fade${visible ? " pf-fade--in" : ""}`}>
        <div className="pf-eyebrow">Contact</div>
        <h2 className="pf-title">Let's work together</h2>
        <p className="pf-contact__sub">Open to freelance projects and full-time opportunities in Dubai, UAE.</p>

        <div className="pf-contact__layout">
          <div className="pf-contact__cards">
            {[
              { icon: "✉️", label: "Email", val: "mdparsathali@gmail.com", href: "mailto:mdparsathali@gmail.com" },
              { icon: "💬", label: "WhatsApp", val: "+971 56 119 233", href: "https://wa.me/971561192330" },
              { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/mohamed-parsath-ali", href: "https://www.linkedin.com/in/mohamed-parsath-ali-456961253" },
            ].map((c) => (
              <a key={c.label} className="pf-contact-card" href={c.href} target="_blank" rel="noreferrer">
                <div className="pf-contact-card__icon">{c.icon}</div>
                <div className="pf-contact-card__label">{c.label}</div>
                <div className="pf-contact-card__val">{c.val}</div>
              </a>
            ))}
          </div>

          <form className="pf-form" onSubmit={handleSubmit}>
            <div className="pf-form__row">
              <div className="pf-form__field">
                <label>Name</label>
                <input required placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="pf-form__field">
                <label>Email</label>
                <input required type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="pf-form__field">
              <label>Message</label>
              <textarea required rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <button type="submit" className="pf-btn pf-btn--primary pf-form__submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : status === "sent" ? "✓ Message sent!" : "Send message"}
            </button>
            {status === "error" && <p className="pf-form__error">Something went wrong. Try WhatsApp instead.</p>}
            {status === "sent" && <p className="pf-form__success">Thanks! I'll get back to you soon.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

// ── WhatsApp Button ───────────────────────────────────────
function WhatsAppButton() {
  return (
    <a className="pf-whatsapp" href="https://wa.me/971561192330" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

// ── Footer ────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="pf-footer">
      <span>Mohamed Parsath Ali</span>
      <span className="pf-footer__dot">·</span>
      <span>Full Stack Developer, Dubai UAE</span>
      <span className="pf-footer__dot">·</span>
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
}

// ── Root ──────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pf-theme");
    if (saved === "dark") setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-pf-theme", dark ? "dark" : "light");
    localStorage.setItem("pf-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const sections = [...NAV_LINKS].map(l => document.getElementById(l.toLowerCase())).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
      });
    }, { threshold: 0.4 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`pf-root${dark ? " pf-dark" : ""}`}>
      <Cursor />
      <Navbar active={active} dark={dark} onToggle={() => setDark(!dark)} />
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Certs />
      <Projects />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}