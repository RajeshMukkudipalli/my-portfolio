import "./App.css";
import { useState, useEffect } from "react";

// IMPORT IMAGES (IMPORTANT)
import arch from "./assets/final-architecture.png";
import terraform from "./assets/terraform-eks.png";

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  return (
    <div className="container">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2>Rajesh M</h2>
        <div>
          <button onClick={() => setDark(!dark)} className="toggle">
            {dark ? "☀️" : "🌙"}
          </button>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/RajeshMukkudipalli" target="_blank">GitHub</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>DevOps Engineer | Kubernetes | AWS</h1>
        <p>
          Designing scalable, production-grade DevOps systems using Kubernetes,
          GitOps, and modern CI/CD pipelines.
        </p>

        <div className="hero-buttons">
          <a href="/resume.pdf" className="btn" download>Download Resume</a>
          <a href="#projects" className="btn outline">View Work</a>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="section architecture">
        <h2>Production-Grade DevOps Architecture</h2>

        <img src={arch} className="arch-img" />

        <div className="arch-highlights">
          <span>GitOps (ArgoCD)</span>
          <span>Kubernetes (EKS + HPA)</span>
          <span>CI/CD Automation</span>
          <span>Observability (Prometheus + ELK)</span>
        </div>

        {/* DECISIONS */}
        <div className="info-grid">
          <div>
            <h4>Architecture Decisions</h4>
            <ul>
              <li>Used EKS for managed Kubernetes scalability</li>
              <li>Redis introduced for caching to reduce DB load</li>
              <li>MongoDB used for flexible document storage</li>
              <li>ArgoCD for GitOps-based deployments</li>
            </ul>
          </div>

          <div>
            <h4>Scalability</h4>
            <ul>
              <li>Horizontal Pod Autoscaler (HPA)</li>
              <li>ALB distributes traffic across services</li>
              <li>Microservices enable independent scaling</li>
              <li>Stateless services improve resilience</li>
            </ul>
          </div>
        </div>

        {/* CHALLENGES */}
        <div className="challenge-box">
          <h4>Challenges & Solutions</h4>
          <ul>
            <li>Fixed GitHub Pages base path issue (Vite config)</li>
            <li>Resolved CI/CD failures in GitHub Actions</li>
            <li>Handled static asset loading in production</li>
            <li>Debugged deployment pipeline errors</li>
          </ul>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <h2>Projects</h2>

        <div className="projects-grid">

          <div className="card">
            <h3>AWS Infrastructure (Terraform)</h3>
            <img src={terraform} />
            <p>Designed VPC, subnets, security groups, and scalable infra</p>

            <ul>
              <li>Reusable Terraform modules</li>
              <li>Secure network isolation</li>
              <li>NAT Gateway for private access</li>
            </ul>

            <p className="impact">80% faster provisioning</p>
          </div>

          <div className="card">
            <h3>DevOps Platform (EKS + GitOps)</h3>
            <img src={arch} />
            <p>End-to-end CI/CD with Kubernetes and observability</p>

            <ul>
              <li>GitHub Actions CI/CD pipeline</li>
              <li>ArgoCD GitOps deployment</li>
              <li>Prometheus + ELK monitoring</li>
            </ul>

            <p className="impact">70% faster deployments</p>
          </div>

        </div>
      </section>

      {/* SKILLS */}
      <div className="skills">
        {["AWS","Azure","Docker","Kubernetes","Terraform","Jenkins","GitHub Actions","ArgoCD","Linux"].map(skill => (
          <span className="badge" key={skill}>{skill}</span>
        ))}
      </div>

      {/* CONTACT */}
      <section className="section contact" id="contact">
        <h2>Contact</h2>
        <p>Email: rajesh759.dell@gmail.com</p>
        <p className="cta">Open to EU & MAANG opportunities</p>
      </section>

    </div>
  );
}