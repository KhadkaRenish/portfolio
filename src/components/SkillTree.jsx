import { AnimatePresence, motion } from "framer-motion";
import { Network, X, Zap } from "lucide-react";
import { skills } from "../data/portfolioData";

function SkillTree({ selectedSkill, onSelectSkill, onCloseSkill, onExplore }) {
  return (
    <section id="skill-tree" className="mission-section" onMouseEnter={() => onExplore("skill-tree")}>
      <div className="section-header">
        <div>
          <p className="section-kicker">Zone 04</p>
          <h2>Skill Tree</h2>
        </div>
        <Network className="text-emerald-200" size={42} />
      </div>

      <div className="skill-tree">
        {skills.map((skill, index) => (
          <motion.button
            className="skill-node"
            type="button"
            key={skill.name}
            onClick={() => onSelectSkill(skill)}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.04 }}
          >
            <span className="flex items-center gap-2">
              <Zap size={17} />
              {skill.name}
            </span>
            <strong>Level {skill.level}</strong>
            <span className="skill-meter">
              <span style={{ width: `${skill.level}%` }} />
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedSkill && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-card" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 18, opacity: 0 }}>
              <button className="icon-button" type="button" onClick={onCloseSkill} aria-label="Close skill details">
                <X size={20} />
              </button>
              <p className="section-kicker">Skill Intel</p>
              <h3>{selectedSkill.name}</h3>
              <p className="mt-4 text-lg leading-8 text-slate-200">{selectedSkill.detail}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default SkillTree;
