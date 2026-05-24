import { motion } from "framer-motion";
import { Boxes, ExternalLink, GitBranch, Layers, PlayCircle } from "lucide-react";
import { projects } from "../data/portfolioData";

function ProjectRoom({ onExplore }) {
  return (
    <section id="project-room" className="mission-section" onMouseEnter={() => onExplore("project-room")}>
      <div className="section-header">
        <div>
          <p className="section-kicker">Zone 03</p>
          <h2>Project Room</h2>
        </div>
        <Boxes className="text-violet-200" size={42} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            className="level-card"
            key={project.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="level-card__label">{project.level}</span>
            <h3>{project.title}</h3>
            <p className="mt-3 text-slate-300">{project.mission}</p>

            <div className="mt-6">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span className="tech-pill" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-emerald-200">QA Focus</p>
              <ul className="space-y-2 text-sm text-slate-300">
                {project.qaFocus.map((item) => (
                  <li className="flex gap-2" key={item}>
                    <Layers className="mt-0.5 shrink-0 text-emerald-200" size={15} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              <a className="small-action" href={project.links.details}>
                <ExternalLink size={16} />
                View Details
              </a>
              <a className="small-action" href={project.links.github} target="_blank" rel="noreferrer">
                <GitBranch size={16} />
                View GitHub
              </a>
              <a className="small-action" href={project.links.demo}>
                <PlayCircle size={16} />
                View Demo
              </a>
              <a className="small-action" href={project.links.strategy}>
                <Layers size={16} />
                {index === 0 ? "View Test Strategy" : "View Framework Design"}
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default ProjectRoom;
