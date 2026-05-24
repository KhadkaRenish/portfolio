import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ShieldAlert, X } from "lucide-react";
import { useState } from "react";
import { missionCheckpoints } from "../../data/portfolioData";
import { useGameStore } from "../../store/gameStore";

function MissionModal() {
  const activeModal = useGameStore((state) => state.activeModal);
  const activeMissionId = useGameStore((state) => state.activeMissionId);
  const completedMissions = useGameStore((state) => state.completedMissions);
  const closeModal = useGameStore((state) => state.closeModal);
  const completeMission = useGameStore((state) => state.completeMission);
  const [answerState, setAnswerState] = useState({ missionId: null, selected: null, feedback: null });

  if (activeModal !== "mission-scenario") return null;

  const mission = missionCheckpoints.find((item) => item.id === activeMissionId);
  if (!mission) return null;

  const alreadyCompleted = completedMissions.includes(mission.id);
  const selected = answerState.missionId === mission.id ? answerState.selected : null;
  const feedback = answerState.missionId === mission.id ? answerState.feedback : null;

  const choose = (index) => {
    if (index === mission.correctAnswer) {
      setAnswerState({ missionId: mission.id, selected: index, feedback: "correct" });
      completeMission(mission);
    } else {
      setAnswerState({ missionId: mission.id, selected: index, feedback: "wrong" });
    }
  };

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal-card game-modal mission-modal-card" initial={{ y: 18, scale: 0.96 }} animate={{ y: 0, scale: 1 }}>
        <button className="icon-button" type="button" onClick={closeModal} aria-label="Close modal">
          <X size={20} />
        </button>
        <p className="section-kicker">Bug Investigation</p>
        <h3>{mission.title}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="mission-meta mission-meta--danger">
            <AlertTriangle size={17} />
            <span>Severity</span>
            <strong>{mission.severity}</strong>
          </div>
          <div className="mission-meta">
            <ShieldAlert size={17} />
            <span>System</span>
            <strong>{mission.system}</strong>
          </div>
          <div className="mission-meta">
            <span>Unlock</span>
            <strong>{mission.unlocks.join(" + ")}</strong>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-red-300/20 bg-red-500/10 p-4 text-red-100">
          <p className="text-xs font-black uppercase tracking-[0.18em]">Alert</p>
          <p className="mt-2 leading-7">{mission.alert}</p>
        </div>
        <p className="mt-4 text-lg font-black text-white">{mission.task}</p>
        <p className="mt-2 leading-7 text-slate-300">{mission.scenario}</p>

        <div className="mission-choice-grid">
          {mission.choices.map((choice, index) => {
            const isCorrect = index === mission.correctAnswer;
            const isSelected = selected === index;
            return (
              <button
                className={`mission-choice ${isSelected ? "mission-choice--selected" : ""} ${feedback && isCorrect ? "mission-choice--correct" : ""}`}
                type="button"
                key={choice}
                onClick={() => choose(index)}
                disabled={alreadyCompleted || feedback === "correct"}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {choice}
              </button>
            );
          })}
        </div>

        {alreadyCompleted || feedback === "correct" ? (
          <div className="mt-5 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-100">
            <div className="flex items-center gap-2 font-black">
              <CheckCircle2 size={20} />
              Bug Fixed: Correct QA Action
            </div>
            <p className="mt-2 leading-7">{mission.explanation}</p>
            <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-emerald-200">
              Release confidence increased. Skills unlocked:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {mission.unlocks.map((skill) => (
                <span className="tech-pill" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ) : feedback === "wrong" ? (
          <div className="mt-5 rounded-lg border border-red-300/20 bg-red-300/10 p-4 text-red-100">
            Investigation failed. Try again with the action that validates system behavior using evidence.
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

export default MissionModal;
