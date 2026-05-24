import { Download, GitBranch, Mail, SquareUserRound } from "lucide-react";
import { profile, projects, skills } from "../data/portfolioData";

function RecruiterMode() {
  return (
    <section id="recruiter-mode" className="recruiter-mode">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="section-kicker">Recruiter Mode</p>
            <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">Renish Khadka</h2>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-300">{profile.role}. {profile.intro}</p>
          </div>
          <a className="primary-button" href={profile.resumeUrl}>
            <Download size={20} />
            Resume
          </a>
        </div>

        <div className="recruiter-grid">
          <article>
            <h3>About</h3>
            <p>
              QA Automation Engineer with internship experience at Intuji, focused on catching product risks early,
              documenting bugs clearly, and building maintainable automation for release confidence.
            </p>
          </article>

          <article>
            <h3>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span className="tech-pill" key={skill.name}>
                  {skill.name} {skill.level}
                </span>
              ))}
            </div>
          </article>

          <article>
            <h3>Projects</h3>
            <div className="space-y-5">
              {projects.map((project) => (
                <div key={project.title}>
                  <strong className="text-white">{project.title}</strong>
                  <p className="mt-1">{project.mission}</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h3>Experience</h3>
            <div className="space-y-5">
              {profile.experience.map((item) => (
                <div key={`${item.title}-${item.company}`}>
                  <strong className="text-white">{item.title}</strong>
                  <p className="mt-1 text-cyan-100">{item.company}</p>
                  <p className="mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h3>Resume</h3>
            <a className="secondary-button w-full" href={profile.resumeUrl}>
              <Download size={20} />
              Download Resume
            </a>
          </article>

          <article>
            <h3>Contact</h3>
            <div className="grid gap-3">
              <a href={`mailto:${profile.email}`}>
                <Mail size={18} />
                {profile.email}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <SquareUserRound size={18} />
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GitBranch size={18} />
                GitHub
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default RecruiterMode;
