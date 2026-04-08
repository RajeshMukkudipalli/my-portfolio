import "./App.css";
import { useState, useEffect } from "react";

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
      <section className="hero fade-in">
        <h1>DevOps Engineer | Kubernetes | AWS</h1>
        <p>
          DevOps Engineer specializing in Kubernetes, CI/CD, and production-grade cloud architectures.
        </p>

        <div className="hero-buttons">
          <a href="/resume.pdf" className="btn" download>Download Resume</a>
          <a href="#projects" className="btn outline">View Projects</a>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="section architecture fade-in">
        <h2>Production-Grade DevOps Architecture</h2>
        <img src="/diagrams/final-architecture.png" className="arch-img" />

        <div className="arch-highlights">
          <span>GitOps (ArgoCD)</span>
          <span>Kubernetes (EKS + HPA)</span>
          <span>CI/CD Automation</span>
          <span>Prometheus + ELK</span>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <h2>Projects</h2>

        <div className="projects-grid">

          <div className="card hover">
            <h3>AWS Infrastructure (Terraform)</h3>
            <img src="/diagrams/terraform-eks.png" />
            <p>Secure VPC, subnets, IAM, scalable infra</p>
            <p className="impact">80% faster provisioning</p>
          </div>

          <div className="card hover">
            <h3>DevOps Platform (EKS + GitOps)</h3>
            <img src="/diagrams/final-architecture.png" />
            <p>CI/CD, Kubernetes, Observability</p>
            <p className="impact">70% faster deployments</p>
          </div>

        </div>
      </section>

      {/* SKILLS */}
      <div className="skills fade-in">
        {["AWS","Azure","Docker","Kubernetes","Terraform","GitHub Actions","ArgoCD","Linux"].map(skill => (
          <span className="badge" key={skill}>{skill}</span>
        ))}
      </div>

      {/* CONTACT */}
      <section className="section contact fade-in" id="contact">
        <h2>Contact</h2>
        <p>Email: rajesh759.dell@gmail.com</p>
        <p className="cta">Open to EU & Germany opportunities</p>
      </section>

    </div>
  );
}



