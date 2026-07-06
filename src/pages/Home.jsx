import { projects } from "../data/projects.js";
import ProjectCard from "../components/ProjectCard.jsx";
import "./Home.css";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Product & UX/UI Designer</p>
          <h1>
            I design digital products people can actually use — and enjoy
            using.
          </h1>
          <p className="hero-sub">
            Placeholder intro: I'm Asier, a product designer focused on
            research-driven UX and clean, functional UI. This is a work-in-progress
            portfolio — replace this paragraph with your real positioning statement.
          </p>
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
        <div className="container about-inner">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="section-title">Who I am</h2>
          </div>
          <div className="about-copy">
            <p>
              Placeholder bio: a couple of paragraphs about your background,
              how you got into product/UX design, and what kind of problems
              you like solving. Mention the industries or product types
              you've worked in.
            </p>
            <p>
              Placeholder: a short list of things you value in your process —
              research rigor, accessibility, collaboration with engineers,
              whatever is true for you.
            </p>
            <div className="about-skills">
              <span>User Research</span>
              <span>Interaction Design</span>
              <span>Design Systems</span>
              <span>Prototyping</span>
              <span>Accessibility</span>
              <span>Figma</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container contact-inner">
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Let's work together</h2>
          <p className="contact-copy">
            Placeholder: a line inviting people to reach out — for freelance
            work, full-time roles, or just to talk shop.
          </p>
          <a href="mailto:hello@example.com" className="btn btn-primary contact-cta">
            hello@example.com
          </a>
        </div>
      </section>
    </>
  );
}

export default Home;
