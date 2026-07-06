import { Link, Navigate, useParams } from "react-router-dom";
import { getProjectBySlug } from "../data/projects.js";
import "./CaseStudy.css";

function CaseStudyMedia({ project }) {
  if (project.prototypeUrl) {
    return (
      <>
        <div className="case-prototype-frame">
          <iframe
            src={project.prototypeUrl}
            title={`${project.title} — live prototype`}
            loading="lazy"
          />
        </div>
        <p className="case-prototype-caption">
          Live, working prototype — click around.{" "}
          <a href={project.prototypeUrl} target="_blank" rel="noreferrer">
            Open in a new tab →
          </a>
        </p>
      </>
    );
  }

  if (project.images) {
    return (
      <div className="case-gallery-grid">
        <figure className="case-gallery-item case-gallery-desktop">
          <img src={project.images.desktop} alt={`${project.title} — desktop view`} />
          <figcaption>Desktop</figcaption>
        </figure>
        <figure className="case-gallery-item case-gallery-mobile">
          <img src={project.images.mobile} alt={`${project.title} — mobile view`} />
          <figcaption>Mobile</figcaption>
        </figure>
      </div>
    );
  }

  return null;
}

function CaseStudy() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const hasMedia = Boolean(project.prototypeUrl || project.images);

  return (
    <article className="case-study">
      <header className="case-hero" style={{ background: project.accent }}>
        <div className="container">
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.8)" }}>
            Case study
          </p>
          <h1>{project.title}</h1>
          <p className="case-tagline">{project.tagline}</p>
        </div>
      </header>

      <div className={`container case-layout ${hasMedia ? "" : "case-layout-single"}`}>
        {hasMedia && (
          <div className="case-media">
            <CaseStudyMedia project={project} />
          </div>
        )}

        <div className="case-body">
          <dl className="case-meta">
            <div>
              <dt>Company</dt>
              <dd>{project.company}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>

          <section className="case-section">
            <h2>Summary</h2>
            <p>{project.summary}</p>
          </section>

          <section className="case-section">
            <h2>What I did</h2>
            <ul className="case-list">
              {project.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="case-section case-outcome">
            <h2>Impact</h2>
            <ul className="case-list">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <Link to="/" className="btn case-back">
            ← Back to all work
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CaseStudy;
