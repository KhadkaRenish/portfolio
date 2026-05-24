import { motion } from "framer-motion";
import { Bot, Database, FlaskConical, ServerCog } from "lucide-react";

function QALab({ onExplore }) {
  const focusAreas = ["Backend quality", "API testing", "Business logic", "Database testing", "Automation frameworks"];

  return (
    <section id="qa-lab" className="mission-section" onMouseEnter={() => onExplore("qa-lab")}>
      <div className="section-header">
        <div>
          <p className="section-kicker">Zone 01</p>
          <h2>QA Lab</h2>
        </div>
        <FlaskConical className="text-cyan-200" size={40} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div className="renibot" whileHover={{ rotate: -1, y: -4 }}>
          <div className="renibot__head">
            <Bot size={46} />
          </div>
          <strong>ReniBot</strong>
          <span>QA assistant online</span>
        </motion.div>

        <div className="dialogue-box">
          <p className="dialogue-name">ReniBot transmission</p>
          <p className="typing-text">
            Hi, I&apos;m Renish, a QA Automation Engineer focused on backend quality, API testing, business logic
            validation, database testing, and automation frameworks.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {focusAreas.map((item, index) => (
              <div className="mini-chip" key={item}>
                {index % 2 === 0 ? <ServerCog size={17} /> : <Database size={17} />}
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default QALab;
