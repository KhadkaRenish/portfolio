import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const qaSkills = [
  "QA automation",
  "Manual testing",
  "Test case design",
  "Bug reporting",
  "Regression testing",
  "API testing",
  "End-to-end testing",
  "CI-ready checks",
];

const toolStack = [
  "Selenium",
  "Playwright",
  "Cypress",
  "Postman",
  "Jira",
  "GitHub",
  "JavaScript",
  "React",
];

const projects = [
  {
    number: "01",
    title: "UI Automation Test Suite",
    type: "QA Automation",
    description:
      "End-to-end browser automation structure for validating login flows, forms, navigation, and core user journeys with reusable test patterns.",
    stack: ["Playwright", "JavaScript", "E2E"],
  },
  {
    number: "02",
    title: "API Testing Collection",
    type: "API QA",
    description:
      "A clean API quality workflow focused on request validation, status checks, response assertions, and repeatable regression coverage.",
    stack: ["Postman", "Assertions", "Regression"],
  },
  {
    number: "03",
    title: "Bug Tracking Workflow",
    type: "QA Process",
    description:
      "A practical QA process showcase covering test scenarios, defect reports, severity notes, reproduction steps, and release confidence checks.",
    stack: ["Jira", "Test Cases", "Reports"],
  },
];

const experience = [
  {
    label: "Current Role",
    value: "QA Automation Engineer",
  },
  {
    label: "Internship",
    value: "Completed at Intuji",
  },
  {
    label: "Focus",
    value: "Reliable web quality",
  },
];

function App() {
  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Hero />

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="section__eyebrow">About Renish</div>
          <div className="about-grid">
            <h2 id="about-title">I test products like a user and automate them like an engineer.</h2>
            <div className="about-copy">
              <p>
                I'm Renish Khadka, a QA Automation Engineer with internship experience at Intuji. I focus on building confidence in web applications through clear test cases, useful bug reports, reliable automation, and thoughtful regression coverage.
              </p>
              <p>
                My goal is simple: help teams ship cleaner software by catching issues early, documenting them clearly, and turning repeated checks into maintainable automation.
              </p>
              <div className="service-list" aria-label="QA focus areas">
                {qaSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section experience-section" aria-labelledby="experience-title">
          <div>
            <div className="section__eyebrow">Experience</div>
            <h2 id="experience-title">Quality work with real team context.</h2>
          </div>
          <div className="experience-grid">
            {experience.map((item) => (
              <article className="experience-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section stack-section" aria-labelledby="stack-title">
          <div className="section-heading">
            <div>
              <div className="section__eyebrow">Toolbox</div>
              <h2 id="stack-title">Tools I use to test, track, and improve software.</h2>
            </div>
            <p>
              The stack below is shaped for QA automation work: browser checks, API validation, bug tracking, version control, and frontend understanding for better issue investigation.
            </p>
          </div>
          <div className="tool-marquee" aria-label="QA tools and technologies">
            {toolStack.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <div>
              <div className="section__eyebrow">Project Showcase</div>
              <h2 id="projects-title">GitHub-ready QA automation projects.</h2>
            </div>
            <p>
              These showcase cards are written for your QA Automation Engineer profile. Once you share your GitHub account, I can connect the cards to the best real repositories and adjust the titles to match them exactly.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-card__topline">
                  <span>{project.number}</span>
                  <span>{project.type}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-card__stack" aria-label={`${project.title} stack`}>
                  {project.stack.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div>
            <div className="section__eyebrow">Contact</div>
            <h2 id="contact-title">Looking for a QA engineer who cares about release confidence?</h2>
          </div>
          <a className="contact-link" href="mailto:renishkhadka7@gmail.com">
            renishkhadka7@gmail.com
          </a>
        </section>
      </main>
    </div>
  );
}

export default App;
