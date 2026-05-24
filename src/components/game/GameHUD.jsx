import { Gauge, Map, RotateCcw, UserRoundSearch } from "lucide-react";
import { bugTypes, zones } from "../../data/portfolioData";
import { selectResumeUnlocked, useGameStore } from "../../store/gameStore";
import { roverTelemetry } from "./roverTelemetry";

function GameHUD({ onRecruiterMode }) {
  const caughtBugs = useGameStore((state) => state.caughtBugs);
  const visitedZones = useGameStore((state) => state.visitedZones);
  const nearbyZone = useGameStore((state) => state.nearbyZone);
  const quality = useGameStore((state) => state.quality);
  const miniMapOpen = useGameStore((state) => state.miniMapOpen);
  const setQuality = useGameStore((state) => state.setQuality);
  const toggleMiniMap = useGameStore((state) => state.toggleMiniMap);
  const markRecruiterMode = useGameStore((state) => state.markRecruiterMode);
  const resumeUnlocked = useGameStore(selectResumeUnlocked);
  const nextQuality = quality === "high" ? "medium" : quality === "medium" ? "low" : "high";

  const missionSteps = caughtBugs.length + visitedZones.filter((zone) => ["qa-lab", "project-garage", "skill-tower", "contact-station"].includes(zone)).length + (resumeUnlocked ? 1 : 0);
  const progress = Math.min(100, Math.round((missionSteps / 13) * 100));
  const objective = resumeUnlocked
    ? "Open Resume Vault and contact Renish."
    : caughtBugs.length < 5
      ? "Catch 5 bugs or visit QA Lab, Project Garage, and Skill Tower."
      : "Resume Vault access is ready.";

  return (
    <div className="game-hud pointer-events-none">
      <div className="hud-top pointer-events-auto">
        <div className="hud-card">
          <p className="section-kicker">Bug Hunter</p>
          <h1>Renish Mission Control</h1>
          <p>{objective}</p>
        </div>
        <div className="hud-card hud-stats">
          <span>Bugs Caught: {caughtBugs.length}/{bugTypes.length}</span>
          <span>Mission Progress: {progress}%</span>
          <span>Resume Vault: {resumeUnlocked ? "Unlocked" : "Locked"}</span>
          <span>Nearby Zone: {nearbyZone?.title || "None"}</span>
        </div>
      </div>

      <div className="hud-actions pointer-events-auto">
        <button type="button" onClick={() => roverTelemetry.respawn?.()}>
          <RotateCcw size={17} />
          Respawn
        </button>
        <button type="button" onClick={toggleMiniMap}>
          <Map size={17} />
          Map
        </button>
        <button type="button" onClick={() => setQuality(nextQuality)}>
          <Gauge size={17} />
          {quality[0].toUpperCase() + quality.slice(1)}
        </button>
        <button
          type="button"
          onClick={() => {
            markRecruiterMode();
            onRecruiterMode();
          }}
        >
          <UserRoundSearch size={17} />
          Recruiter Mode
        </button>
      </div>

      <div className="controls-help pointer-events-none">
        <span>WASD / Arrows Drive</span>
        <span>Shift Boost</span>
        <span>Space Brake</span>
        <span>E Interact</span>
        <span>R Respawn</span>
        <span>M Map</span>
      </div>

      {nearbyZone && (
        <div className="interact-prompt pointer-events-none">
          Press <strong>E</strong> to interact with {nearbyZone.title}
        </div>
      )}

      {miniMapOpen && (
        <div className="mini-map pointer-events-none">
          {zones.map((zone) => (
            <span
              className={visitedZones.includes(zone.id) ? "mini-map__dot mini-map__dot--visited" : "mini-map__dot"}
              key={zone.id}
              style={{
                left: `${50 + zone.position[0] * 1.7}%`,
                top: `${50 + zone.position[2] * 1.3}%`,
                background: zone.color,
              }}
              title={zone.title}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GameHUD;
