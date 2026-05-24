import { motion } from "framer-motion";
import { Activity, BadgeCheck, Bug, LockKeyhole, Radar, Sparkles } from "lucide-react";
import { zones } from "../data/portfolioData";

const icons = [Radar, Bug, Activity, Sparkles, LockKeyhole, BadgeCheck];

function GameDashboard({ exploredSections, bugsCaught, totalBugs, releaseReady }) {
  const progress = Math.min(100, Math.round(((exploredSections.length + bugsCaught) / (zones.length + totalBugs)) * 100));

  return (
    <section id="mission-map" className="mission-section">
      <div className="section-header">
        <div>
          <p className="section-kicker">Interactive Game Dashboard</p>
          <h2>Mission Map</h2>
        </div>
        <div className="status-card">
          <span>{releaseReady ? "Release Status: Ready" : "Release Status: Pending"}</span>
          <strong>{progress}%</strong>
        </div>
      </div>

      <div className="mission-progress" aria-label="Mission progress">
        <div style={{ width: `${progress}%` }} />
      </div>

      <div className="zone-grid">
        {zones.map((zone, index) => {
          const Icon = icons[index];
          const unlocked = zone.id !== "resume-vault" || exploredSections.length >= 3 || bugsCaught === totalBugs;

          return (
            <motion.a
              href={`#${zone.id}`}
              className={`zone-card ${unlocked ? "" : "zone-card--locked"}`}
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <span className="zone-card__code">{zone.code}</span>
              <Icon size={32} />
              <strong>{zone.label}</strong>
              <span>{unlocked ? "Enter zone" : "Explore 3 sections to unlock"}</span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

export default GameDashboard;
