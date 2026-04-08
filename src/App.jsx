// App.jsx
import "./App.css";
import { useEffect } from "react";

import arch from "./assets/final-architecture.png";
import terraform from "./assets/terraform-eks.png";

export default function App() {
  useEffect(() => {
    document.body.className = "dark";
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
        <h1>DevOps Engineer</h1>
        <p className="subtitle">
          Building scalable, production-grade systems with Kubernetes, GitOps, and modern CI/CD.
        </p>

        <div className="hero-buttons">
          <a href="/my-portfolio/public/resume/resume.pdf" className="btn">Download Resume</a>
          <a href="#projects" className="btn outline">View Work</a>
        </div>
      </section>s

      {/* ARCHITECTURE */}
      <section className="section">
        <h2 className="section-title">Architecture</h2>
        <img src={arch} className="arch-img" />

        <div className="pill-container">
          <span>GitOps (ArgoCD)</span>
          <span>Kubernetes (EKS + HPA)</span>
          <span>CI/CD (GitHub Actions)</span>
          <span>Observability (Prometheus + ELK)</span>
        </div>

        <div className="grid">
          <div>
            <h4>Decisions</h4>
            <ul>
              <li>EKS for managed scalability</li>
              <li>Redis for caching</li>
              <li>MongoDB for flexible schema</li>
              <li>ArgoCD for GitOps</li>
            </ul>
          </div>

          <div>
            <h4>Scalability</h4>
            <ul>
              <li>HPA auto scaling</li>
              <li>Load balancing via ALB</li>
              <li>Microservices architecture</li>
              <li>Stateless design</li>
            </ul>
          </div>
        </div>

        <div className="challenge">
          <h4>Challenges</h4>
          <ul>
            <li>Fixed GitHub Pages deployment issues</li>
            <li>Resolved CI/CD failures</li>
            <li>Handled asset path issues in Vite</li>
          </ul>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <h2 className="section-title">Projects</h2>

        <div className="projects">

          <div className="card">
            <img src={terraform} />
            <h3>Terraform Infrastructure</h3>
            <p>Secure AWS infra with VPC, subnets, IAM</p>
            <span className="impact">80% faster provisioning</span>
          </div>

          <div className="card">
            <img src={arch} />
            <h3>DevOps Platform</h3>
            <p>EKS + GitOps + Observability</p>
            <span className="impact">70% faster deployments</span>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <section className="footer" id="contact">
        <h3>Contact</h3>
        <p>Email: rajesh759.dell@gmail.com</p>
        <p className="cta">Open to EU & MAANG opportunities</p>
      </section>

    </div>
  );
}

