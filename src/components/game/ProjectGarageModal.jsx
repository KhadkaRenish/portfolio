import { Layers } from "lucide-react";
import { projects } from "../../data/portfolioData";
import ModalShell from "./ModalShell";

function ProjectGarageModal() {
  return (
    <ModalShell modalId="project-garage" kicker="Project Garage" title="Mission Boards">
      <div className="grid max-h-[58vh] gap-4 overflow-y-auto pr-2">
        {projects.map((project) => (
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-4" key={project.title}>
            <h4 className="text-xl font-black text-white">{project.title}</h4>
            <p className="mt-2 leading-7 text-slate-300">{project.mission}</p>
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

export default ProjectGarageModal;
