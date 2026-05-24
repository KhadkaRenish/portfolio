import { skills } from "../../data/portfolioData";
import ModalShell from "./ModalShell";

function SkillTowerModal() {
  return (
    <ModalShell modalId="skill-tower" kicker="Skill Tower" title="QA Skill Tree">
      <div className="grid max-h-[58vh] gap-3 overflow-y-auto pr-2 sm:grid-cols-2">
        {skills.map((skill) => (
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-4" key={skill.name}>
            <div className="flex items-center justify-between gap-4">
              <strong className="text-white">{skill.name}</strong>
              <span className="text-cyan-100">Level {skill.level}</span>
            </div>
            <div className="skill-meter mt-3">
              <span style={{ width: `${skill.level}%` }} />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{skill.detail}</p>
          </article>
        ))}
      </div>
    </ModalShell>
  );
}

export default SkillTowerModal;
