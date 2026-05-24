import { Layers } from "lucide-react";
import { projects } from "../../data/portfolioData";
import ModalShell from "./ModalShell";

function ProjectEvidenceRoom() {
  return (
    <ModalShell modalId="project-evidence" kicker="Project Evidence Room" title="QA Case Files">
      <div className="project-case-grid max-h-[60vh] overflow-y-auto pr-2">
        {projects.map((project) => (
          <article className="case-file-card" key={project.title}>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{project.caseType}</p>
            <h4 className="mt-2 text-xl font-black text-white">{project.title}</h4>
            <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-emerald-200">Problem solved</p>
            <p className="mt-1 leading-7 text-slate-300">{project.mission}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span className="tech-pill" key={item}>{item}</span>
              ))}
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
              {project.qaFocus.map((item) => (
                <li className="flex gap-2" key={item}>
                  <Layers className="mt-0.5 shrink-0 text-emerald-200" size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </ModalShell>
  );
}

export default ProjectEvidenceRoom;
