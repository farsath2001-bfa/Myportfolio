import { useState, useEffect, useRef } from "react";
import profilePhoto from "../../assets/profile.jpg";
import "./Portfolio.css";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const TYPEWRITER_ROLES = [
  "Full Stack Web Developer",
  "MERN Stack Specialist",
  "React & Node.js Expert",
  "Dubai Based Freelancer",
];

const STATS = [
  { value: 5,   label: "Projects Shipped",   suffix: "+" },
  { value: 2,   label: "Years Experience",    suffix: "+" },
  { value: 100, label: "Client Satisfaction", suffix: "%" },
  { value: 5,   label: "Tech Stack",          suffix: "+" },
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
    id: 1, category: "crm", label: "Real Estate CRM",
    title: "Lazord Real Estate",
    url: "https://lazord-ui.vercel.app", short: "lazord-ui.vercel.app",
    desc: "Full-stack CRM for Dubai real estate. Bilingual Arabic & English UI, admin panel, property listings, and lead management.",
    tags: ["React", "Node.js", "MongoDB", "JWT"], accent: "#2d5fc4",
  },
  {
    id: 2, category: "realestate", label: "Real Estate Platform",
    title: "Shawahiq Real Estate",
    url: "https://shawahiq-real-estate.vercel.app", short: "shawahiq-real-estate.vercel.app",
    desc: "Full MERN stack real estate platform with CMS admin dashboard. Charcoal & gold branding, property listings and management.",
    tags: ["React", "Node.js", "MongoDB", "Cloudinary"], accent: "#D4A843",
  },
  {
    id: 3, category: "realestate", label: "Real Estate Platform",
    title: "Onera Real Estate",
    url: "https://onera-realestate.vercel.app", short: "onera-realestate.vercel.app",
    desc: "Premium real estate platform for Dubai client. Deep green & orange branding, property sales and investment services.",
    tags: ["React", "Node.js", "MongoDB", "Express"], accent: "#056d5e",
  },
  {
    id: 4, category: "jobportal", label: "Job Portal",
    title: "Blue Collar Jobs",
    url: "https://bluecollarjobs-frontend-1zzj.vercel.app", short: "bluecollarjobs-frontend-1zzj.vercel.app",
    desc: "Job listing platform for blue-collar workers in Dubai. Employer panels, worker profiles, and job applications.",
    tags: ["React", "Node.js", "MongoDB", "Render"], accent: "#2d5fc4",
  },
  {
    id: 5, category: "client", label: "Client Website",
    title: "Valet Parking Dubai",
    url: "https://valet-parking-dubai.vercel.app", short: "valet-parking-dubai.vercel.app",
    desc: "Premium valet parking service website for a Dubai client. Service pages, gallery, and WhatsApp quote integration.",
    tags: ["React", "Vite", "CSS Variables", "Vercel"], accent: "#C8A865",
  },
];

const FILTER_TABS = [
  { key: "all",        label: "All" },
  { key: "realestate", label: "Real Estate" },
  { key: "crm",        label: "CRM" },
  { key: "jobportal",  label: "Job Portal" },
  { key: "client",     label: "Client Sites" },
];

const CERTS = [
  { icon: "🏗️", title: "AutoCAD",             issuer: "Autodesk Certified" },
  { icon: "📊", title: "Advanced MS Excel",    issuer: "Microsoft Office" },
  { icon: "💻", title: "Full Stack Developer", issuer: "Training Certification" },
];

const TESTIMONIALS = [
  {
    name: "Ahmed Al Mansouri", role: "CEO, Shahwiq Real Estate", avatar: "AM",
    text: "Mohamed delivered an exceptional CRM platform for our real estate business. The bilingual Arabic/English interface was exactly what we needed. Professional, fast, and reliable.",
    stars: 5,
  },
  {
    name: "Sarah Johnson", role: "Operations Manager", avatar: "SJ",
    text: "The valet parking website Mohamed built for us is stunning. Clean design, mobile-friendly, and integrated perfectly with our WhatsApp workflow. Highly recommended!",
    stars: 5,
  },
  {
    name: "Khalid Ibrahim", role: "Blue Collar Jobs", avatar: "KI",
    text: "Mohamed built our entire job portal from scratch — front-end, back-end, and database. He understood our vision and delivered beyond expectations. Great MERN stack skills.",
    stars: 5,
  },
];

const EXPERIENCE = [
  {
    period: "01/2025 – Present",
    role: "Administrative Assistant & Web Developer",
    company: "Planet Medica Medical Instrument Trading",
    points: [
      "Scheduling meetings and managing calendars",
      "Answering and directing phone calls",
      "Managing databases and records",
      "Connect user interface (front-end) with server-side logic and databases (back-end)",
      "Monitor website traffic, manage hosting, and provide routine updates",
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

const FOOTER_LINKS = [
  { label: "About",    id: "about" },
  { label: "Skills",   id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact",  id: "contact" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohamed-parsath-ali-456961253", 
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: "GitHub", href: "https://github.com/farsath2001-bfa",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg> },
  { label: "WhatsApp", href: "https://wa.me/971561119233",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { label: "Email", href: "mailto:mdparsathali@gmail.com",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg> },
];

// ── Hooks ─────────────────────────────────────────────────
function useInView(threshold = 0.12) {
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
        if (displayed.length + 1 === current.length) setTimeout(() => setIsDeleting(true), pause);
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length === 0) { setIsDeleting(false); setWordIndex(i => i + 1); }
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
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
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

// ── Page Loader ───────────────────────────────────────────
function PageLoader({ done }) {
  return (
    <div className={`pf-loader${done ? " pf-loader--done" : ""}`}>
      <div className="pf-loader__inner">
        <div className="pf-loader__letters"><span>M</span><span>P</span></div>
        <div className="pf-loader__bar"><div className="pf-loader__fill" /></div>
        <div className="pf-loader__text">Loading portfolio...</div>
      </div>
    </div>
  );
}

// ── Scroll Progress ───────────────────────────────────────
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return <div className="pf-scroll-progress" style={{ width: `${width}%` }} />;
}

// ── Back to Top ───────────────────────────────────────────
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <button className={`pf-backtop${show ? " pf-backtop--show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">↑</button>
  );
}

// ── Particles ─────────────────────────────────────────────
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId, W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*1.8+0.4,
      vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3,
      o: Math.random()*0.4+0.1,
    }));
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      dots.forEach(d => {
        d.x+=d.vx; d.y+=d.vy;
        if(d.x<0)d.x=W; if(d.x>W)d.x=0; if(d.y<0)d.y=H; if(d.y>H)d.y=0;
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(74,144,217,${d.o})`; ctx.fill();
      });
      for(let i=0;i<dots.length;i++) for(let j=i+1;j<dots.length;j++){
        const dx=dots[i].x-dots[j].x, dy=dots[i].y-dots[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<100){
          ctx.beginPath(); ctx.moveTo(dots[i].x,dots[i].y); ctx.lineTo(dots[j].x,dots[j].y);
          ctx.strokeStyle=`rgba(74,144,217,${0.1*(1-dist/100)})`; ctx.lineWidth=0.6; ctx.stroke();
        }
      }
      animId=requestAnimationFrame(draw);
    };
    draw();
    const resize=()=>{W=canvas.offsetWidth;H=canvas.offsetHeight;canvas.width=W;canvas.height=H;};
    window.addEventListener("resize",resize);
    return ()=>{cancelAnimationFrame(animId);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={canvasRef} className="pf-particles"/>;
}

// ── Cursor ────────────────────────────────────────────────
function Cursor() {
  const dotRef=useRef(null), glowRef=useRef(null);
  useEffect(()=>{
    const move=(e)=>{
      if(dotRef.current){dotRef.current.style.left=e.clientX+"px";dotRef.current.style.top=e.clientY+"px";}
      if(glowRef.current){glowRef.current.style.left=e.clientX+"px";glowRef.current.style.top=e.clientY+"px";}
    };
    const over=()=>{dotRef.current?.classList.add("hovered");glowRef.current?.classList.add("hovered");};
    const out=()=>{dotRef.current?.classList.remove("hovered");glowRef.current?.classList.remove("hovered");};
    window.addEventListener("mousemove",move);
    document.querySelectorAll("a,button").forEach(el=>{el.addEventListener("mouseenter",over);el.addEventListener("mouseleave",out);});
    return ()=>window.removeEventListener("mousemove",move);
  },[]);
  return(<><div className="pf-cursor-dot" ref={dotRef}/><div className="pf-cursor-glow" ref={glowRef}/></>);
}

// ── Theme Toggle ──────────────────────────────────────────
function ThemeToggle({dark,onToggle}){
  return(
    <button className={`pf-theme-toggle${dark?" pf-theme-toggle--dark":""}`} onClick={onToggle} aria-label="Toggle dark mode">
      <span className="pf-theme-toggle__track"><span className="pf-theme-toggle__thumb">{dark?"🌙":"☀️"}</span></span>
    </button>
  );
}

// ── Navbar ────────────────────────────────────────────────
function Navbar({active,dark,onToggle}){
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",h);
    return ()=>window.removeEventListener("scroll",h);
  },[]);
  return(
    <nav className={`pf-nav${scrolled?" pf-nav--scrolled":""}`}>
      <span className="pf-nav__logo" onClick={()=>scrollTo("hero")}>
        <img src={profilePhoto} alt="MP" className="pf-nav__logo-img"/><span>MP</span>
      </span>
      <ul className={`pf-nav__links${open?" pf-nav__links--open":""}`}>
        {NAV_LINKS.map(l=>(
          <li key={l}><button className={`pf-nav__link${active===l?" active":""}`} onClick={()=>{setOpen(false);scrollTo(l);}}>{l}</button></li>
        ))}
        <li><a className="pf-nav__cta" href="mailto:mdparsathali@gmail.com">Hire me</a></li>
        <li><ThemeToggle dark={dark} onToggle={onToggle}/></li>
      </ul>
      <div className="pf-nav__right-mobile">
        <ThemeToggle dark={dark} onToggle={onToggle}/>
        <button className="pf-nav__burger" onClick={()=>setOpen(!open)} aria-label="Toggle menu">
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────
function Hero(){
  const typed=useTypewriter(TYPEWRITER_ROLES);
  return(
    <section className="pf-hero" id="hero">
      <Particles/>
      <div className="pf-hero__grid" aria-hidden="true"/>
      <div className="pf-hero__orb pf-hero__orb--1" aria-hidden="true"/>
      <div className="pf-hero__orb pf-hero__orb--2" aria-hidden="true"/>
      <div className="pf-hero__inner">
        <div className="pf-hero__photo-wrap">
          <div className="pf-hero__photo-ring"/>
          <img src={profilePhoto} alt="Mohamed Parsath Ali" className="pf-hero__photo"/>
        </div>
        <div className="pf-hero__badges">
          <div className="pf-hero__badge">Based in Dubai, UAE 🇦🇪</div>
          <div className="pf-availability"><span className="pf-availability__dot"/>Available for work</div>
        </div>
        <h1 className="pf-hero__name">
          <span className="pf-hero__name--line1">Mohamed</span>
          <span className="pf-hero__name--accent">Parsath Ali</span>
        </h1>
        <div className="pf-hero__typewriter">
          <span className="pf-hero__typewriter--text">{typed}</span>
          <span className="pf-cursor-blink">|</span>
        </div>
        <p className="pf-hero__sub">
          I build complete web products — CRMs, real estate platforms, job portals, and client websites — using the MERN stack. Clean code, polished UI.
        </p>
        <div className="pf-hero__actions">
          <button className="pf-btn-hero-primary" onClick={()=>scrollTo("projects")}>
            <span>View projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <a className="pf-btn-hero-ghost" href="/Mohamed_Parsath_Ali_CV.pdf" download>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Download CV</span>
          </a>
        </div>
        <div className="pf-hero__stack">
          {["React","Node.js","MongoDB","Express","JavaScript"].map(t=>(
            <span key={t} className="pf-hero__chip">{t}</span>
          ))}
        </div>
      </div>
      <div className="pf-hero__scroll-hint" aria-hidden="true">
        <div className="pf-hero__scroll-line"/><span>Scroll</span>
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────
function StatCard({value,label,suffix,start}){
  const count=useCounter(value,1400,start);
  return(
    <div className="pf-stat">
      <div className="pf-stat__num">{count}{suffix}</div>
      <div className="pf-stat__label">{label}</div>
    </div>
  );
}
function Stats(){
  const [ref,visible]=useInView(0.3);
  return(
    <div className="pf-stats" ref={ref}>
      {STATS.map(s=><StatCard key={s.label} {...s} start={visible}/>)}
    </div>
  );
}

// ── Stagger wrapper ───────────────────────────────────────
function Stagger({children,className="",delay=0}){
  const [ref,visible]=useInView(0.1);
  return(
    <div ref={ref} className={`pf-stagger${visible?" pf-stagger--in":""} ${className}`}
      style={{"--stagger-delay":`${delay}ms`}}>
      {children}
    </div>
  );
}

// ── About ─────────────────────────────────────────────────
function About(){
  const [ref,visible]=useInView();
  return(
    <section className="pf-section pf-about" id="about" ref={ref}>
      <div className={`pf-section__inner pf-fade${visible?" pf-fade--in":""}`}>
        <div className="pf-eyebrow">About</div>
        <div className="pf-about__grid">
          <Stagger delay={0}>
            <div className="pf-about__text">
              <h2 className="pf-title">Building things that<br/>work, and look great.</h2>
              <p>I'm a full-stack developer based in Dubai, specialising in the MERN stack. I started as an admin professional, learned programming, and built my way to shipping complete web products for real clients.</p>
              <p>My background in administration means I understand how businesses actually operate — which makes me better at building the software they need.</p>
              <div className="pf-about__meta">
                <div><span>Degree</span>Bachelor of Computer Applications — Bharathidasan University</div>
                <div><span>Based</span>Dubai, UAE</div>
                <div><span>Languages</span>English · Tamil</div>
                <div><span>LinkedIn</span><a href="https://www.linkedin.com/in/mohamed-parsath-ali-456961253" target="_blank" rel="noreferrer">linkedin.com/in/mohamed-parsath-ali</a></div>
              </div>
            </div>
          </Stagger>
          <Stagger delay={120}>
            <div className="pf-about__exp">
              <div className="pf-about__exp-title">Experience Timeline</div>
              <div className="pf-timeline">
                {EXPERIENCE.map((e,i)=>(
                  <div className={`pf-timeline__item pf-fade${visible?" pf-fade--in":""}`} key={i} style={{transitionDelay:`${i*150}ms`}}>
                    <div className="pf-timeline__dot"/>
                    <div className="pf-timeline__line"/>
                    <div className="pf-timeline__content">
                      <div className="pf-timeline__period">{e.period}</div>
                      <div className="pf-timeline__role">{e.role}</div>
                      <div className="pf-timeline__company">{e.company}</div>
                      <ul className="pf-timeline__points">
                        {e.points.map((p,j)=><li key={j}>{p}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Stagger>
        </div>
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────
const SKILL_SVGS = {
  "React.js":     <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.3" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/></svg>,
  "Node.js":      <svg viewBox="0 0 24 24"><path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="#539E43" opacity=".9"/><path d="M12 2l9 5-9 5-9-5 9-5z" fill="#5ab552"/><path d="M12 12l9-5v10l-9 5V12z" fill="#3d7a34"/></svg>,
  "MongoDB":      <svg viewBox="0 0 24 24"><path d="M12 2C12 2 7 8 7 13a5 5 0 0 0 4.5 4.97V21h1v-3.03A5 5 0 0 0 17 13C17 8 12 2 12 2z" fill="#4FAA41"/><path d="M12 2C12 2 17 8 17 13a5 5 0 0 1-4.5 4.97V21h-.5V6.5L12 2z" fill="#3D8A34"/></svg>,
  "Express.js":   <svg viewBox="0 0 24 24"><text x="2" y="17" fontSize="10" fontWeight="bold" fill="currentColor" fontFamily="monospace">Ex</text></svg>,
  "JavaScript":   <svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><text x="3" y="19" fontSize="11" fontWeight="bold" fill="#000" fontFamily="monospace">JS</text></svg>,
  "HTML / CSS":   <svg viewBox="0 0 24 24"><path d="M4 2l1.5 17L12 21l6.5-2L20 2H4z" fill="#E44D26"/><path d="M12 3.5v16l5.3-1.6 1.3-14.4H12z" fill="#F16529"/><path d="M12 10h-2.5l-.2-2H12V6H7.2l.5 6H12v-2zm0 4.5l-2.6-.7-.2-2h-2l.4 4 4.4 1.2v-2.5z" fill="#fff"/></svg>,
  "Git & GitHub": <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/></svg>,
  "REST APIs":    <svg viewBox="0 0 24 24"><path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="8" cy="8" r="2" fill="#2d5fc4"/><circle cx="16" cy="16" r="2" fill="#2d5fc4"/><path d="M8 10v4M16 10v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2"/></svg>,
};

function Skills(){
  const [ref,visible]=useInView();
  return(
    <section className="pf-section pf-skills" id="skills" ref={ref}>
      <div className={`pf-section__inner pf-fade${visible?" pf-fade--in":""}`}>
        <div className="pf-eyebrow">Skills</div>
        <h2 className="pf-title">Tech I work with</h2>
        <div className="pf-skills__grid">
          {SKILLS.map((s,i)=>(
            <Stagger key={s.name} delay={i*60}>
              <div className="pf-skill-card" style={{"--delay":`${i*70}ms`}}>
                <div className="pf-skill-card__icon">{SKILL_SVGS[s.name]}</div>
                <div className="pf-skill-card__name">{s.name}</div>
                <div className="pf-skill-card__bar">
                  <div className="pf-skill-card__fill" style={{width:visible?`${s.pct}%`:"0%"}}/>
                </div>
                <div className="pf-skill-card__pct">{s.pct}%</div>
              </div>
            </Stagger>
          ))}
        </div>
        <div className="pf-skills__extras">
          {["AutoCAD","Advanced MS-Excel","Microsoft Office"].map(t=>(
            <span key={t} className="pf-chip pf-chip--outline">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Certifications ────────────────────────────────────────
function Certs(){
  const [ref,visible]=useInView();
  return(
    <section className="pf-section pf-certs" id="certs" ref={ref}>
      <div className={`pf-section__inner pf-fade${visible?" pf-fade--in":""}`}>
        <div className="pf-eyebrow">Certifications</div>
        <h2 className="pf-title">Credentials</h2>
        <div className="pf-certs__grid">
          {CERTS.map((c,i)=>(
            <Stagger key={i} delay={i*80}>
              <div className="pf-cert-card">
                <div className="pf-cert-card__icon">{c.icon}</div>
                <div className="pf-cert-card__title">{c.title}</div>
                <div className="pf-cert-card__issuer">{c.issuer}</div>
              </div>
            </Stagger>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────
function Projects(){
  const [ref,visible]=useInView();
  const [activeFilter,setActiveFilter]=useState("all");
  const filtered=PROJECTS.filter(p=>activeFilter==="all"||p.category===activeFilter);
  return(
    <section className="pf-section pf-projects" id="projects" ref={ref}>
      <div className={`pf-section__inner pf-fade${visible?" pf-fade--in":""}`}>
        <div className="pf-eyebrow">Projects</div>
        <h2 className="pf-title">What I've shipped</h2>
        <div className="pf-filter-tabs">
          {FILTER_TABS.map(tab=>(
            <button key={tab.key} className={`pf-filter-tab${activeFilter===tab.key?" active":""}`} onClick={()=>setActiveFilter(tab.key)}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="pf-projects__grid">
          {filtered.map((p,i)=>(
            <Stagger key={p.id} delay={i*80}>
              <a className="pf-card" href={p.url} target="_blank" rel="noreferrer" style={{"--accent":p.accent}}>
                <div className="pf-card__bar"/>
                <div className="pf-card__label">{p.label}</div>
                <h3 className="pf-card__title">{p.title}</h3>
                <p className="pf-card__desc">{p.desc}</p>
                <div className="pf-card__tags">{p.tags.map(t=><span key={t} className="pf-chip pf-chip--sm">{t}</span>)}</div>
                <div className="pf-card__footer">
                  <span className="pf-card__url">{p.short}</span>
                  <svg className="pf-card__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </div>
              </a>
            </Stagger>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────
function Testimonials(){
  const [ref,visible]=useInView();
  return(
    <section className="pf-section pf-testimonials" ref={ref}>
      <div className={`pf-section__inner pf-fade${visible?" pf-fade--in":""}`}>
        <div className="pf-eyebrow">Testimonials</div>
        <h2 className="pf-title">What clients say</h2>
        <div className="pf-testimonials__grid">
          {TESTIMONIALS.map((t,i)=>(
            <Stagger key={i} delay={i*100}>
              <div className="pf-testimonial-card">
                <div className="pf-testimonial-card__stars">{"★".repeat(t.stars)}</div>
                <p className="pf-testimonial-card__text">"{t.text}"</p>
                <div className="pf-testimonial-card__author">
                  <div className="pf-testimonial-card__avatar">{t.avatar}</div>
                  <div>
                    <div className="pf-testimonial-card__name">{t.name}</div>
                    <div className="pf-testimonial-card__role">{t.role}</div>
                  </div>
                </div>
              </div>
            </Stagger>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── GitHub Activity ───────────────────────────────────────
function GitHubActivity(){
  const [ref,visible]=useInView();
  const weeks = 26;
  const days = 7;
  const grid = Array.from({length:weeks},()=>
    Array.from({length:days},()=>Math.floor(Math.random()*5))
  );
  const levels = ["#1a2332","#0e4429","#006d32","#26a641","#39d353"];
  return(
    <section className="pf-section pf-github" ref={ref}>
      <div className={`pf-section__inner pf-fade${visible?" pf-fade--in":""}`}>
        <div className="pf-eyebrow">GitHub</div>
        <h2 className="pf-title">Coding activity</h2>
        <div className="pf-github__card">
          <div className="pf-github__header">
            <a href="https://github.com/farsath2001-bfa" target="_blank" rel="noreferrer" className="pf-github__link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              github.com/farsath2001-bfa
            </a>
            <span className="pf-github__label">Last 6 months</span>
          </div>
          <div className="pf-github__grid">
            {grid.map((week,wi)=>(
              <div key={wi} className="pf-github__week">
                {week.map((level,di)=>(
                  <div key={di} className="pf-github__cell" style={{background:levels[level]}} title={`${level} contributions`}/>
                ))}
              </div>
            ))}
          </div>
          <div className="pf-github__legend">
            <span>Less</span>
            {levels.map((c,i)=><div key={i} className="pf-github__cell" style={{background:c}}/>)}
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────
function Contact(){
  const [ref,visible]=useInView();
  const [form,setForm]=useState({name:"",email:"",message:""});
  const [status,setStatus]=useState("idle");

  const handleSubmit=async(e)=>{
    e.preventDefault(); setStatus("sending");
    try{
      const res=await fetch("https://api.emailjs.com/api/v1.0/email/send",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          service_id:"service_fw2yxla",template_id:"template_eah3i6b",user_id:"0y4eS0bXbkp8sNvRi",
          template_params:{from_name:form.name,from_email:form.email,message:form.message,to_name:"Mohamed",reply_to:form.email},
        }),
      });
      if(res.ok){setStatus("sent");setForm({name:"",email:"",message:""});}
      else setStatus("error");
    }catch{setStatus("error");}
  };

  return(
    <section className="pf-section pf-contact" id="contact" ref={ref}>
      <div className={`pf-section__inner pf-fade${visible?" pf-fade--in":""}`}>
        <div className="pf-eyebrow">Contact</div>
        <h2 className="pf-title">Let's work together</h2>
        <p className="pf-contact__sub">Open to freelance projects and full-time opportunities in Dubai, UAE.</p>
        <div className="pf-contact__layout">
          <div className="pf-contact__cards">
            {[
              {icon:"✉️",label:"Email",val:"mdparsathali@gmail.com",href:"mailto:mdparsathali@gmail.com"},
              {icon:"💬",label:"WhatsApp",val:"+971 56 111 9233",href:"https://wa.me/971561119233"},
              {icon:"💼",label:"LinkedIn",val:"linkedin.com/in/mohamed-parsath-ali",href:"https://www.linkedin.com/in/mohamed-parsath-ali-456961253"},
            ].map(c=>(
              <a key={c.label} className="pf-contact-card" href={c.href} target="_blank" rel="noreferrer">
                <div className="pf-contact-card__icon">{c.icon}</div>
                <div><div className="pf-contact-card__label">{c.label}</div><div className="pf-contact-card__val">{c.val}</div></div>
              </a>
            ))}
          </div>
          <form className="pf-form" onSubmit={handleSubmit}>
            <div className="pf-form__row">
              <div className="pf-form__field">
                <label>Name</label>
                <input required placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              </div>
              <div className="pf-form__field">
                <label>Email</label>
                <input required type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              </div>
            </div>
            <div className="pf-form__field">
              <label>Message</label>
              <textarea required rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
            </div>
            <button type="submit" className="pf-form__submit" disabled={status==="sending"}>
              {status==="sending"?"Sending...":status==="sent"?"✓ Message sent!":"Send message"}
            </button>
            {status==="error"&&<p className="pf-form__error">Something went wrong. Try WhatsApp instead.</p>}
            {status==="sent"&&<p className="pf-form__success">Thanks! I'll get back to you soon.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

// ── WhatsApp ──────────────────────────────────────────────
function WhatsAppButton(){
  return(
    <a className="pf-whatsapp" href="https://wa.me/971561119233" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

// ── Premium Footer ────────────────────────────────────────
function Footer(){
  return(
    <footer className="pf-footer-premium">
      <div className="pf-footer-premium__inner">
        <div className="pf-footer-premium__top">
          <div className="pf-footer-premium__brand">
            <div className="pf-footer-premium__logo">MP</div>
            <div>
              <div className="pf-footer-premium__name">Mohamed Parsath Ali</div>
              <div className="pf-footer-premium__tagline">Full Stack Web Developer · Dubai, UAE</div>
            </div>
          </div>
          <div className="pf-footer-premium__nav">
            <div className="pf-footer-premium__nav-title">Navigate</div>
            {FOOTER_LINKS.map(l=>(
              <button key={l.id} className="pf-footer-premium__nav-link" onClick={()=>scrollTo(l.id)}>{l.label}</button>
            ))}
          </div>
          <div className="pf-footer-premium__contact-col">
            <div className="pf-footer-premium__nav-title">Contact</div>
            <a href="mailto:mdparsathali@gmail.com" className="pf-footer-premium__contact-item">mdparsathali@gmail.com</a>
            <a href="https://wa.me/971561119233" className="pf-footer-premium__contact-item">+971 56 111 9233</a>
            <a href="https://github.com/farsath2001-bfa" target="_blank" rel="noreferrer" className="pf-footer-premium__contact-item">github.com/farsath2001-bfa</a>
          </div>
        </div>
        <div className="pf-footer-premium__bottom">
          <span>© {new Date().getFullYear()} Mohamed Parsath Ali. All rights reserved.</span>
          <div className="pf-footer-premium__socials">
            {SOCIAL_LINKS.map(s=>(
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="pf-footer-premium__social">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Root ──────────────────────────────────────────────────
export default function Portfolio(){
  const [active,setActive]=useState("");
  const [dark,setDark]=useState(false);
  const [loaded,setLoaded]=useState(false);

  useEffect(()=>{
    const saved=localStorage.getItem("pf-theme");
    if(saved==="dark") setDark(true);
    const t=setTimeout(()=>setLoaded(true),1800);
    return ()=>clearTimeout(t);
  },[]);

  useEffect(()=>{
    document.documentElement.setAttribute("data-pf-theme",dark?"dark":"light");
    localStorage.setItem("pf-theme",dark?"dark":"light");
  },[dark]);

  useEffect(()=>{
    const sections=[...NAV_LINKS].map(l=>document.getElementById(l.toLowerCase())).filter(Boolean);
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase()+e.target.id.slice(1));
      });
    },{threshold:0.4});
    sections.forEach(s=>obs.observe(s));
    return ()=>obs.disconnect();
  },[]);

  return(
    <>
      <PageLoader done={loaded}/>
      <div className={`pf-root${dark?" pf-dark":""}`}>
        <ScrollProgress/>
        <Cursor/>
        <Navbar active={active} dark={dark} onToggle={()=>setDark(!dark)}/>
        <Hero/>
        <Stats/>
        <About/>
        <Skills/>
        <Certs/>
        <Projects/>
        <Testimonials/>
        {/* <GitHubActivity/> */}
        <Contact/>
        <Footer/>
        <WhatsAppButton/>
        <BackToTop/>
      </div>
    </>
  );
}