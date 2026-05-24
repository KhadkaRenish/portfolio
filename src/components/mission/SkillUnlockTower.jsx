import { LockKeyhole, Sparkles } from "lucide-react";
import { qaMissionSkills } from "../../data/portfolioData";
import { useGameStore } from "../../store/gameStore";
import ModalShell from "./ModalShell";

function SkillUnlockTower() {
  const unlockedSkills = useGameStore((state) => state.unlockedSkills);

  return (
    <ModalShell modalId="skill-tower" kicker="Skill Unlock Tower" title="Skills Proven By Missions">
      <div className="grid gap-3 sm:grid-cols-2">
        {qaMissionSkills.map((skill) => {
          const unlocked = unlockedSkills.includes(skill);
          return (
            <article className={`skill-unlock-card ${unlocked ? "skill-unlock-card--active" : ""}`} key={skill}>
              {unlocked ? <Sparkles className="text-emerald-200" /> : <LockKeyhole className="text-slate-500" />}
              <strong>{skill}</strong>
              <span>{unlocked ? "Unlocked through QA evidence" : "Locked until matching mission is solved"}</span>
            </article>
          );
        })}
      </div>
    </ModalShell>
  );
}

export default SkillUnlockTower;
