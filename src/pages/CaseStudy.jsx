import { Link, Navigate, useParams } from "react-router-dom";
import { getProjectBySlug } from "../data/projects.js";
import "./CaseStudy.css";

function CaseStudy() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="case-study">
      <header
        className="case-hero"
        style={{ background: project.accent }}
      >
        <div className="container">
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.8)" }}>
            Case study
          </p>
          <h1>{project.title}</h1>
          <p className="case-tagline">{project.tagline}</p>
        </div>
      </header>

      <div className="container case-body">
        <dl className="case-meta">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{project.timeline}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{project.tools.join(", ")}</dd>
          </div>
        </dl>

        <section className="case-section">
          <h2>Summary</h2>
          <p>{project.summary}</p>
        </section>

        <section className="case-section">
          <h2>The problem</h2>
          <p>{project.problem}</p>
        </section>

        <section className="case-section">
          <h2>Process</h2>
          <ol className="case-process">
            {project.process.map((step, i) => (
              <li key={step.title}>
                <span className="case-process-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="case-section case-outcome">
          <h2>Outcome</h2>
          <p>{project.outcome}</p>
        </section>

        <Link to="/" className="btn case-back">
          ← Back to all work
        </Link>
      </div>
    </article>
  );
}

export default CaseStudy;
