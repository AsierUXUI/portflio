import { projects } from "../data/projects.js";
import { profile, skillGroups, education, languages } from "../data/profile.js";
import ProjectCard from "../components/ProjectCard.jsx";
import "./Home.css";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">{profile.role}</p>
          <h1>
            I design digital products people can actually use — and enjoy
            using.
          </h1>
          <p className="hero-sub">{profile.bio[0]}</p>
          <p className="hero-location">📍 {profile.locationNote}</p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              See my work
            </a>
            <a href="#contact" className="btn">
              Get in touch
            </a>
          </div>
        </div>
      </section>

      <section id="work" className="work">
        <div className="container">
          <p className="eyebrow">Selected work</p>
          <h2 className="section-title">Case studies</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <p className="eyebrow">About</p>
          <h2 className="section-title">Who I am</h2>
          <div className="about-bio">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="about-subhead">Skills</h3>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <div key={group.title} className="skill-card">
                <h4>{group.title}</h4>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="about-columns">
            <div>
              <h3 className="about-subhead">Education</h3>
              <ul className="education-list">
                {education.map((edu) => (
                  <li key={edu.school}>
                    <p className="education-school">{edu.school}</p>
                    <p className="education-degree">{edu.degree}</p>
                    <p className="education-meta">
                      {edu.location} · {edu.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="about-subhead">Languages</h3>
              <ul className="language-list">
                {languages.map((lang) => (
                  <li key={lang.name}>
                    <span>{lang.name}</span>
                    <span className="language-level">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container contact-inner">
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Let's work together</h2>
          <p className="contact-copy">
            Based in Copenhagen, open to freelance work, full-time roles, or
            just a conversation about design.
          </p>
          <div className="contact-actions">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="btn">
              {profile.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
