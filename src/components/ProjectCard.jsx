import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ project }) {
  return (
    <Link to={`/work/${project.slug}`} className="project-card">
      {project.images?.desktop ? (
        <div className="project-cover project-cover-image">
          <img src={project.images.desktop} alt="" />
        </div>
      ) : (
        <div className="project-cover" style={{ background: project.accent }}>
          <span>{project.cover}</span>
        </div>
      )}
      <div className="project-body">
        <p className="project-meta">
          {project.company} · {project.year}
        </p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <h3>{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>
        <span className="project-link">View case study →</span>
      </div>
    </Link>
  );
}

export default ProjectCard;
