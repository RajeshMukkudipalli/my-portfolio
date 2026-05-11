import { useState, useEffect, useRef } from "react";

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCounter(end, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// ─── Intersection observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ value, suffix = "%", label, delay = 0 }) {
  const [ref, inView] = useInView();
  const count = useCounter(value, 2000, inView);
  return (
    <div ref={ref} className="stat-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-number">{count}<span className="stat-suffix">{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ─── Project Card ────────────────────────────────────────────────────────────
function ProjectCard({ index, title, stack, situation, action, result, tags, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`project-card ${inView ? "visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="project-index">{String(index).padStart(2, "0")}</div>
      <div className="project-body">
        <h3 className="project-title">{title}</h3>
        <div className="project-stack">{stack}</div>
        <div className="star-grid">
          <div className="star-item"><span className="star-label">Situation</span><p>{situation}</p></div>
          <div className="star-item"><span className="star-label">Action</span><p>{action}</p></div>
          <div className="star-item"><span className="star-label accent">Result</span><p className="accent">{result}</p></div>
        </div>
        <div className="tag-row">{tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Portfolio() {
  const [heroReady, setHeroReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const projects = [
    {
      title: "Zero-Downtime Multi-Region EKS Migration",
      stack: "Kubernetes · Terraform · ArgoCD · GitHub Actions",
      situation: "Monolithic app causing 8–12 hrs/month downtime across 3 global regions.",
      action: "Designed a blue-green migration pipeline with Terraform modules for EKS, implemented ArgoCD GitOps with progressive delivery, and wired HPA + KEDA for event-driven scaling.",
      result: "99.97% uptime SLA achieved. Deployment frequency increased 10× (weekly → multiple per day). Zero production incidents post-migration.",
      tags: ["EKS", "Terraform", "ArgoCD", "HPA", "KEDA", "Blue-Green"],
    },
    {
      title: "GDPR-Compliant Cloud Infrastructure (EU)",
      stack: "Terraform · AWS Frankfurt · IAM · KMS · VPC",
      situation: "FinTech client faced €2M+ GDPR risk from US-hosted workloads processing EU citizen data.",
      action: "Rebuilt entire AWS infrastructure in eu-central-1 using Terraform. Enforced data residency via SCPs, automated encryption at rest/transit with KMS, and integrated compliance checks into CI.",
      result: "100% GDPR data residency compliance. Security audit time reduced 50%. Passed Big-4 external audit with zero findings.",
      tags: ["Terraform", "AWS", "GDPR", "KMS", "IAM", "Security"],
    },
    {
      title: "Observability Platform from Scratch",
      stack: "Prometheus · Grafana · ELK Stack · PagerDuty",
      situation: "Engineering team had zero visibility into production — debugging relied on SSH access and log grepping.",
      action: "Built a full observability stack: Prometheus + Alertmanager for metrics, ELK for centralized logging, Grafana dashboards, and PagerDuty escalations with noise-suppressed alerts.",
      result: "MTTR dropped from 4.5 hrs to 22 mins (92% reduction). Reduced alert fatigue 70%. On-call load cut in half within 30 days.",
      tags: ["Prometheus", "Grafana", "ELK", "PagerDuty", "SRE"],
    },
  ];

  const skills = [
    { group: "Container & Orchestration", items: ["Kubernetes (EKS / GKE)", "Helm", "Docker", "Service Mesh (Istio)"] },
    { group: "Infrastructure as Code", items: ["Terraform", "Ansible", "Pulumi", "CloudFormation"] },
    { group: "CI/CD & GitOps", items: ["GitHub Actions", "ArgoCD", "Jenkins", "FluxCD"] },
    { group: "Cloud Platforms", items: ["AWS (10+ services)", "GCP", "Azure", "Multi-Cloud"] },
    { group: "Observability", items: ["Prometheus", "Grafana", "ELK Stack", "Datadog"] },
    { group: "Security & Compliance", items: ["DevSecOps", "GDPR", "IAM", "Vault (HashiCorp)"] },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #050508;
          --surface: #0d0d14;
          --surface2: #13131e;
          --border: rgba(255,255,255,0.07);
          --text: #e8e8f0;
          --muted: #7070a0;
          --accent: #4af0a0;
          --accent2: #4a9fff;
          --accent3: #ff6b4a;
          --heading-font: 'Bebas Neue', sans-serif;
          --body-font: 'DM Mono', monospace;
          --serif-font: 'Fraunces', serif;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--body-font);
          font-size: 14px;
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 60px;
          background: rgba(5,5,8,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          transition: padding 0.3s;
        }
        .nav-logo {
          font-family: var(--heading-font);
          font-size: 22px;
          letter-spacing: 3px;
          color: var(--text);
        }
        .nav-logo span { color: var(--accent); }
        .nav-links { display: flex; gap: 32px; align-items: center; }
        .nav-links a {
          color: var(--muted); text-decoration: none; font-size: 11px;
          letter-spacing: 2px; text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--accent); }
        .nav-cta {
          background: var(--accent) !important; color: #050508 !important;
          padding: 8px 20px !important; border-radius: 4px;
          font-weight: 500 !important; letter-spacing: 1px !important;
        }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 0 60px 80px;
          position: relative; overflow: hidden;
        }

        .hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 70% 30%, rgba(74,240,160,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 80%, rgba(74,159,255,0.05) 0%, transparent 70%);
        }

        .hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: linear-gradient(180deg, transparent 0%, black 30%, black 70%, transparent 100%);
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--accent); margin-bottom: 24px;
          opacity: 0; transform: translateY(20px);
          animation: fadeUp 0.6s 0.2s ease forwards;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 3px rgba(74,240,160,0.2);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(74,240,160,0.2); }
          50% { box-shadow: 0 0 0 6px rgba(74,240,160,0.05); }
        }

        .hero-name {
          font-family: var(--heading-font);
          font-size: clamp(80px, 12vw, 180px);
          line-height: 0.9;
          letter-spacing: -2px;
          color: var(--text);
          opacity: 0; transform: translateY(40px);
          animation: fadeUp 0.8s 0.35s ease forwards;
        }
        .hero-name .accent-word { color: var(--accent); }

        .hero-sub {
          font-family: var(--serif-font);
          font-style: italic;
          font-size: clamp(18px, 2.5vw, 28px);
          color: var(--muted);
          margin-top: 20px;
          max-width: 680px;
          opacity: 0; transform: translateY(30px);
          animation: fadeUp 0.8s 0.5s ease forwards;
        }
        .hero-sub strong { color: var(--text); font-style: normal; }

        .hero-meta {
          display: flex; gap: 40px; margin-top: 48px; flex-wrap: wrap;
          opacity: 0; transform: translateY(20px);
          animation: fadeUp 0.8s 0.65s ease forwards;
        }
        .hero-meta-item { display: flex; flex-direction: column; gap: 2px; }
        .hero-meta-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
        .hero-meta-value { font-size: 14px; color: var(--text); }

        .hero-actions {
          display: flex; gap: 16px; margin-top: 40px; flex-wrap: wrap;
          opacity: 0; transform: translateY(20px);
          animation: fadeUp 0.8s 0.8s ease forwards;
        }
        .btn-primary {
          background: var(--accent); color: #050508;
          padding: 14px 32px; border-radius: 4px;
          font-family: var(--body-font); font-size: 12px;
          font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
          text-decoration: none; border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(74,240,160,0.3); }

        .btn-secondary {
          background: transparent; color: var(--text);
          padding: 14px 32px; border-radius: 4px;
          font-family: var(--body-font); font-size: 12px;
          letter-spacing: 2px; text-transform: uppercase;
          text-decoration: none; border: 1px solid var(--border); cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-secondary:hover { border-color: var(--accent2); color: var(--accent2); }

        .hero-scroll {
          position: absolute; right: 60px; bottom: 80px;
          writing-mode: vertical-lr; font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase; color: var(--muted);
          display: flex; align-items: center; gap: 12px;
          opacity: 0; animation: fadeUp 0.8s 1.2s ease forwards;
        }
        .hero-scroll::after {
          content: ''; width: 1px; height: 60px;
          background: linear-gradient(to bottom, var(--muted), transparent);
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── SECTION LAYOUT ── */
        .section {
          padding: 120px 60px;
          border-top: 1px solid var(--border);
          max-width: 1400px; margin: 0 auto;
        }
        .section-label {
          font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
          color: var(--accent); margin-bottom: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::before {
          content: ''; width: 24px; height: 1px; background: var(--accent);
        }
        .section-title {
          font-family: var(--heading-font);
          font-size: clamp(48px, 6vw, 96px);
          line-height: 0.95; letter-spacing: 1px;
          color: var(--text); margin-bottom: 64px;
        }

        /* ── STATS ── */
        .stats-strip {
          background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          padding: 60px;
        }
        .stats-inner { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
        .stat-card {
          text-align: center; padding: 32px;
          border: 1px solid var(--border); border-radius: 8px;
          background: var(--surface2);
          transition: border-color 0.3s, transform 0.3s;
        }
        .stat-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        .stat-number {
          font-family: var(--heading-font);
          font-size: 72px; line-height: 1;
          color: var(--accent);
        }
        .stat-suffix { font-size: 40px; }
        .stat-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-top: 8px; }

        /* ── PROJECTS ── */
        .projects-list { display: flex; flex-direction: column; gap: 2px; }
        .project-card {
          display: grid; grid-template-columns: 80px 1fr;
          gap: 40px;
          padding: 48px 40px;
          border: 1px solid var(--border);
          background: var(--surface);
          border-radius: 8px;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, background 0.3s;
        }
        .project-card.visible { opacity: 1; transform: translateY(0); }
        .project-card:hover { border-color: rgba(74,240,160,0.3); background: var(--surface2); }
        .project-index {
          font-family: var(--heading-font); font-size: 72px; line-height: 1;
          color: var(--border); align-self: start; padding-top: 4px;
        }
        .project-card:hover .project-index { color: rgba(74,240,160,0.2); }
        .project-title {
          font-family: var(--serif-font); font-weight: 600;
          font-size: clamp(20px, 2vw, 28px); color: var(--text);
          margin-bottom: 6px; transition: color 0.3s;
        }
        .project-card:hover .project-title { color: var(--accent); }
        .project-stack { font-size: 11px; color: var(--accent2); letter-spacing: 1px; margin-bottom: 24px; }
        .star-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px; }
        .star-item p { font-size: 13px; color: var(--muted); line-height: 1.6; }
        .star-label {
          display: block; font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--muted); margin-bottom: 6px; opacity: 0.6;
        }
        .star-label.accent { color: var(--accent); opacity: 1; }
        .star-item p.accent { color: var(--text); font-weight: 500; }
        .tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag {
          font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
          padding: 4px 10px; border-radius: 3px;
          border: 1px solid var(--border); color: var(--muted);
          transition: border-color 0.2s, color 0.2s;
        }
        .project-card:hover .tag { border-color: rgba(74,240,160,0.2); }

        /* ── SKILLS ── */
        .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .skill-group {
          padding: 32px; border: 1px solid var(--border); border-radius: 8px;
          background: var(--surface);
          transition: border-color 0.3s;
        }
        .skill-group:hover { border-color: rgba(74,159,255,0.3); }
        .skill-group-title {
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--accent2); margin-bottom: 16px;
        }
        .skill-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .skill-list li {
          font-size: 13px; color: var(--text);
          display: flex; align-items: center; gap: 8px;
        }
        .skill-list li::before {
          content: '▸'; color: var(--accent); font-size: 10px; flex-shrink: 0;
        }

        /* ── EXPERIENCE TIMELINE ── */
        .timeline { position: relative; padding-left: 32px; }
        .timeline::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 1px; background: linear-gradient(to bottom, var(--accent), transparent);
        }
        .timeline-item {
          position: relative; padding: 0 0 56px 40px;
        }
        .timeline-item::before {
          content: ''; position: absolute; left: -5px; top: 6px;
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--accent); border: 2px solid var(--bg);
          box-shadow: 0 0 12px rgba(74,240,160,0.5);
        }
        .timeline-period { font-size: 10px; letter-spacing: 2px; color: var(--accent); text-transform: uppercase; margin-bottom: 6px; }
        .timeline-role { font-family: var(--serif-font); font-size: 22px; color: var(--text); margin-bottom: 2px; }
        .timeline-company { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
        .timeline-points { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .timeline-points li {
          font-size: 13px; color: var(--muted); padding-left: 16px; position: relative;
        }
        .timeline-points li::before { content: '—'; position: absolute; left: 0; color: var(--border); }

        /* ── CTA / FOOTER ── */
        .cta-section {
          padding: 160px 60px;
          text-align: center;
          background: var(--surface);
          border-top: 1px solid var(--border);
          position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 50% at 50% 100%, rgba(74,240,160,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-eyebrow { font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: var(--accent); margin-bottom: 24px; }
        .cta-headline {
          font-family: var(--heading-font);
          font-size: clamp(60px, 8vw, 120px);
          line-height: 0.9; color: var(--text); margin-bottom: 32px;
        }
        .cta-headline span { color: var(--accent); }
        .cta-sub { font-family: var(--serif-font); font-style: italic; font-size: 20px; color: var(--muted); margin-bottom: 48px; }
        .cta-actions { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }

        .footer-bar {
          padding: 32px 60px;
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid var(--border);
          font-size: 11px; color: var(--muted); letter-spacing: 1px;
        }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--accent); }

        /* ── OPEN TO WORK BANNER ── */
        .otw-banner {
          background: linear-gradient(135deg, rgba(74,240,160,0.08), rgba(74,159,255,0.08));
          border: 1px solid rgba(74,240,160,0.2);
          border-radius: 8px;
          padding: 20px 32px;
          display: flex; align-items: center; gap: 16px;
          margin: 0 60px 0;
          max-width: 1400px;
          margin-left: auto; margin-right: auto;
        }
        .otw-text { font-size: 13px; color: var(--text); }
        .otw-text strong { color: var(--accent); }
        .otw-chips { display: flex; gap: 8px; margin-left: auto; flex-wrap: wrap; }
        .otw-chip {
          font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
          padding: 4px 12px; border-radius: 20px;
          background: rgba(74,240,160,0.1); color: var(--accent);
          border: 1px solid rgba(74,240,160,0.2);
        }

        @media (max-width: 900px) {
          .nav { padding: 16px 24px; }
          .hero, .section, .cta-section { padding-left: 24px; padding-right: 24px; }
          .hero { padding-bottom: 60px; }
          .stats-inner { grid-template-columns: repeat(2, 1fr); padding: 0 24px; }
          .skills-grid { grid-template-columns: 1fr 1fr; }
          .star-grid { grid-template-columns: 1fr; }
          .project-card { grid-template-columns: 1fr; }
          .project-index { font-size: 40px; }
          .hero-scroll { display: none; }
          .footer-bar { flex-direction: column; gap: 16px; }
          .otw-banner { margin: 0 24px; flex-direction: column; align-items: flex-start; }
          .otw-chips { margin-left: 0; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">RAJESH<span>.</span>MK</div>
        <div className="nav-links">
          <a href="#projects">Work</a>
          <a href="#skills">Stack</a>
          <a href="#experience">Experience</a>
          <a href="mailto:rajesh759.dell@gmail.com" className="nav-cta">Hire Me</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-badge">
          <div className="badge-dot" />
          Available for EU/Germany Opportunities · Senior DevOps Engineer
        </div>
        <h1 className="hero-name">
          RAJESH<br />
          <span className="accent-word">MUKKUDIPALLI</span>
        </h1>
        <p className="hero-sub">
          I build <strong>production-grade cloud systems</strong> that scale to millions of users —
          and the pipelines that make shipping them feel effortless.
        </p>
        <div className="hero-meta">
          <div className="hero-meta-item">
            <span className="hero-meta-label">Experience</span>
            <span className="hero-meta-value">4+ Years</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Specialization</span>
            <span className="hero-meta-value">Kubernetes · IaC · GitOps</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Based in</span>
            <span className="hero-meta-value">India → EU Relocation Ready</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Focus</span>
            <span className="hero-meta-value">FinOps · SRE · Platform Eng.</span>
          </div>
        </div>
        <div className="hero-actions">
          <a href="mailto:rajesh759.dell@gmail.com" className="btn-primary">Let's Talk →</a>
          <a href="/resume.pdf" download className="btn-secondary">Download CV</a>
          <a href="https://github.com/RajeshMukkudipalli" target="_blank" rel="noopener" className="btn-secondary">GitHub ↗</a>
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      {/* OPEN TO WORK */}
      <div style={{ padding: "40px 0", background: "var(--bg)" }}>
        <div className="otw-banner">
          <div className="badge-dot" style={{ flexShrink: 0 }} />
          <div className="otw-text">
            <strong>Open to Work</strong> — Actively seeking Senior DevOps / Platform Engineer / SRE roles in EU & Germany. Visa sponsorship welcome.
          </div>
          <div className="otw-chips">
            <span className="otw-chip">Full-time</span>
            <span className="otw-chip">Remote / Hybrid</span>
            <span className="otw-chip">EU · Germany</span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-strip">
        <div className="stats-inner">
          <StatCard value={99} suffix="%" label="Uptime SLA Achieved" delay={0} />
          <StatCard value={80} suffix="%" label="Faster Provisioning" delay={100} />
          <StatCard value={92} suffix="%" label="MTTR Reduction" delay={200} />
          <StatCard value={4} suffix="+" label="Years in Production" delay={300} />
        </div>
      </div>

      {/* PROJECTS */}
      <div id="projects" style={{ background: "var(--bg)" }}>
        <div className="section">
          <div className="section-label">Selected Work</div>
          <h2 className="section-title">HIGH-IMPACT<br />ENGINEERING</h2>
          <div className="projects-list">
            {projects.map((p, i) => (
              <ProjectCard key={i} index={i + 1} delay={i * 100} {...p} />
            ))}
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div id="skills" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="section">
          <div className="section-label">Technical Stack</div>
          <h2 className="section-title">TOOLS I<br />TRUST</h2>
          <div className="skills-grid">
            {skills.map((s) => (
              <div key={s.group} className="skill-group">
                <div className="skill-group-title">{s.group}</div>
                <ul className="skill-list">
                  {s.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EXPERIENCE */}
      <div id="experience" style={{ background: "var(--bg)" }}>
        <div className="section">
          <div className="section-label">Career</div>
          <h2 className="section-title">EXPERIENCE</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-period">2024 — Present</div>
              <div className="timeline-role">Senior DevOps Engineer</div>
              <div className="timeline-company">TCS · Hyderabad, India</div>
              <ul className="timeline-points">
                <li>Architected and migrated production workloads to EKS with zero downtime using blue-green strategy</li>
                <li>Implemented GitOps with ArgoCD, reducing deployment time from 45 mins to under 4 mins</li>
                <li>Built GDPR-compliant AWS infrastructure for EU data residency using Terraform modules</li>
                <li>Established full observability stack (Prometheus + ELK), cutting MTTR by 92%</li>
              </ul>
            </div>
            <div className="timeline-item">
              <div className="timeline-period">2022 — 2024</div>
              <div className="timeline-role">DevOps Engineer</div>
              <div className="timeline-company">TCS · Hyderabad, India</div>
              <ul className="timeline-points">
                <li>Designed Terraform infrastructure for VPC, subnets, ALB, and IAM — 80% faster provisioning</li>
                <li>Built CI/CD pipelines with GitHub Actions for 12+ microservices</li>
                <li>Containerized legacy monolith into 8 independent services with Docker & Kubernetes</li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-eyebrow">// Ready to scale your infrastructure?</div>
        <div className="cta-headline">LET'S<br /><span>BUILD.</span></div>
        <div className="cta-sub">Senior DevOps Engineers don't grow on trees — but here I am.</div>
        <div className="cta-actions">
          <a href="mailto:rajesh759.dell@gmail.com" className="btn-primary" style={{ fontSize: "13px" }}>
            rajesh759.dell@gmail.com →
          </a>
          <a href="https://www.linkedin.com/in/rajeshmukkudipalli" target="_blank" rel="noopener" className="btn-secondary">
            LinkedIn ↗
          </a>
          <a href="https://github.com/RajeshMukkudipalli" target="_blank" rel="noopener" className="btn-secondary">
            GitHub ↗
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer-bar">
        <span>© 2026 Rajesh Mukkudipalli · DevOps Engineer</span>
        <div className="footer-links">
          <a href="mailto:rajesh759.dell@gmail.com">Email</a>
          <a href="https://github.com/RajeshMukkudipalli" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/rajeshmukkudipalli" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </>
  );
}
