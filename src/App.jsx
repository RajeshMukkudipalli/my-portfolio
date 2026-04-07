import "./App.css";
import { useEffect } from "react";

export default function App() {

  // Visitor tracking (simple console + can integrate later)
  useEffect(() => {
    console.log("Portfolio visited at:", new Date().toLocaleString());
  }, []);

  return (
    <div className="container">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2>Rajesh Mukkudipalli</h2>
        <div>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/RajeshMukkudipalli" target="_blank">GitHub</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>DevOps Engineer | Kubernetes | AWS</h1>
        <p>
        DevOps Engineer specializing in Kubernetes, CI/CD, and production-grade cloud architectures.
        </p>

        <div className="hero-buttons">
          <a href="/resume/resume.pdf" className="btn" download>Download Resume</a>
          <a href="#projects" className="btn outline">View Projects</a>
        </div>
      </section>

      {/* SNAPSHOT */}
      <section className="section snapshot">
        <div className="snapshot-grid">
          <div><h3>4+ Years</h3><p>Experience</p></div>
          <div><h3>3+</h3><p>Production Systems</p></div>
          <div><h3>70%</h3><p>Faster Deployments</p></div>
          <div><h3>AWS + Azure</h3><p>Cloud</p></div>
        </div>
      </section>

      {/* MAIN ARCHITECTURE */}
      <section className="section architecture">
        <h2>Production-Grade DevOps Architecture</h2>
        <img src="/my-portfolio/diagrams/final-architecture.png" className="arch-img" />

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

          <div className="card">
            <h3>AWS Infrastructure (Terraform)</h3>
            <img src="/my-portfolio/diagrams/terraform-eks.png" />
            <p>VPC, Subnets, Security Groups, scalable infra</p>
            <p className="impact">80% faster provisioning</p>
          </div>

          <div className="card">
            <h3>DevOps Platform (EKS + GitOps)</h3>
            <img src="/diagrams/final-architecture.png" />
            <p>CI/CD, Kubernetes, Observability stack</p>
            <p className="impact">70% faster deployments</p>
          </div>

        </div>
      </section>

      {/* SKILLS */}
      <div className="skills">
        {["AWS","Azure","Docker","Kubernetes","Terraform","Jenkins","ArgoCD","Linux"].map(skill => (
          <span className="badge" key={skill}>{skill}</span>
        ))}
      </div>

      {/* CONTACT */}
      <section className="section contact" id="contact">
        <h2>Contact</h2>
        <p>Email: rajesh759.dell@gmail.com</p>
        <p className="cta">Open to EU & Germany opportunities</p>
      </section>

    </div>
  );
}
