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
            scrolling="no"
          />
        </div>
        <p className="case-prototype-caption">Live, working prototype — click around.</p>
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

function buildMetaItems(project) {
  return [
    { label: "Client", value: project.client },
    { label: "Company", value: project.company },
    { label: "Role", value: project.role },
    { label: "Location", value: project.location },
    { label: "Year", value: project.year },
    { label: "Duration", value: project.duration },
    { label: "Team", value: project.team },
  ].filter((item) => item.value);
}

function SectionedCaseStudy({ project }) {
  const metaItems = buildMetaItems(project);

  return (
    <div className="container case-sectioned">
      <dl className="case-meta">
        {metaItems.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      {project.sections.map((section) => (
        <section key={section.key} className="case-block">
          <h2>{section.title}</h2>
          <p>{section.text}</p>
          {section.image && (
            <img
              className="case-block-image"
              src={section.image}
              alt={`${project.title} — ${section.title}`}
            />
          )}
        </section>
      ))}

      {project.conclusions?.length > 0 && (
        <section className="case-section">
          <h2>Conclusions, thoughts and learnings</h2>
          <div className="conclusions-grid">
            {project.conclusions.map((c) => (
              <div key={c.title} className="conclusion-card">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Link to="/" className="btn case-back">
        ← Back to all work
      </Link>
    </div>
  );
}

function StandardCaseStudy({ project }) {
  const hasMedia = Boolean(project.prototypeUrl || project.images);
  const metaItems = buildMetaItems(project);

  return (
    <div className={`container case-layout ${hasMedia ? "" : "case-layout-single"}`}>
      {hasMedia && (
        <div className="case-media">
          <CaseStudyMedia project={project} />
        </div>
      )}

      <div className="case-body">
        <dl className="case-meta">
          {metaItems.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
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
  );
}

function CaseStudy() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="case-study">
      <header className="case-hero" style={{ background: project.accent }}>
        <div className="container">
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.8)" }}>
            Case study
            {project.status && <span className="case-status">{project.status}</span>}
          </p>
          <h1>{project.title}</h1>
          <p className="case-tagline">{project.tagline}</p>
        </div>
      </header>

      {project.sections ? (
        <SectionedCaseStudy project={project} />
      ) : (
        <StandardCaseStudy project={project} />
      )}
    </article>
  );
}

export default CaseStudy;
