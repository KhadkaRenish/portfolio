import { AnimatePresence, motion } from "framer-motion";
import { Bug, Medal, X } from "lucide-react";
import { bugTypes } from "../data/portfolioData";

function BugBattleArena({ caughtBugs, onCatchBug, activeBug, onCloseBug }) {
  const allCaught = caughtBugs.length === bugTypes.length;

  return (
    <section id="bug-arena" className="mission-section">
      <div className="section-header">
        <div>
          <p className="section-kicker">Zone 02</p>
          <h2>Bug Battle Arena</h2>
        </div>
        <div className="status-card">
          <span>Bugs Caught</span>
          <strong>
            {caughtBugs.length}/{bugTypes.length}
          </strong>
        </div>
      </div>

      <div className="bug-arena">
        {bugTypes.map((bug, index) => {
          const caught = caughtBugs.includes(bug.name);

          return (
            <motion.button
              type="button"
              className={`bug-card bug-card--${bug.color} ${caught ? "bug-card--caught" : ""}`}
              key={bug.name}
              onClick={() => onCatchBug(bug)}
              disabled={caught}
              initial={{ opacity: 0, scale: 0.86 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.04 }}
              whileHover={!caught ? { y: -8, rotate: index % 2 ? -1.5 : 1.5 } : undefined}
            >
              <Bug size={28} />
              <span>{bug.name}</span>
              <small>{caught ? "Caught" : "Click to catch"}</small>
            </motion.button>
          );
        })}
      </div>

      {allCaught && (
        <motion.div className="badge-unlocked" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <Medal size={28} />
          Release Guardian Badge Unlocked
        </motion.div>
      )}

      <AnimatePresence>
        {activeBug && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="modal-card"
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 18 }}
            >
              <button className="icon-button" type="button" onClick={onCloseBug} aria-label="Close bug details">
                <X size={20} />
              </button>
              <p className="section-kicker">Bug Caught</p>
              <h3>{activeBug.title}</h3>
              <p className="mt-3 text-slate-300">How Renish handles this:</p>
              <ul className="mt-5 space-y-3">
                {activeBug.solve.map((item) => (
                  <li className="flex gap-3 text-slate-200" key={item}>
                    <span className="mt-2 size-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default BugBattleArena;
