import { Gauge, Map, RotateCcw, UserRoundSearch } from "lucide-react";
import { missionCheckpoints, missionZones } from "../../data/portfolioData";
import { selectReleaseConfidence, selectResumeUnlocked, useGameStore } from "../../store/gameStore";
import { playerTelemetry } from "./playerTelemetry";

function MissionHUD({ onRecruiterMode }) {
  const completedMissions = useGameStore((state) => state.completedMissions);
  const unlockedSkills = useGameStore((state) => state.unlockedSkills);
  const nearbyTarget = useGameStore((state) => state.nearbyTarget);
  const miniMapOpen = useGameStore((state) => state.miniMapOpen);
  const pointerLocked = useGameStore((state) => state.pointerLocked);
  const quality = useGameStore((state) => state.quality);
  const toggleMiniMap = useGameStore((state) => state.toggleMiniMap);
  const setQuality = useGameStore((state) => state.setQuality);
  const markRecruiterMode = useGameStore((state) => state.markRecruiterMode);
  const confidence = useGameStore(selectReleaseConfidence);
  const vaultUnlocked = useGameStore(selectResumeUnlocked);
  const nextQuality = quality === "high" ? "medium" : quality === "medium" ? "low" : "high";
  const remaining = missionCheckpoints.length - completedMissions.length;
  const currentMission = missionCheckpoints.find((mission) => !completedMissions.includes(mission.id));

  const objective = vaultUnlocked
    ? "Release ready. Open the Resume Vault or Contact Station."
    : `Current mission: ${currentMission?.title || "Final approval"}. Investigate and choose the QA action with evidence.`;

  return (
    <div className="game-hud pointer-events-none">
      <div className="hud-top pointer-events-auto">
        <div className="hud-card">
          <p className="section-kicker">Bug Hunter: QA Mission Walkthrough</p>
          <h1>Walk the mission. Solve the bugs. Ship the release.</h1>
          <p>{objective}</p>
          <div className="hud-confidence">
            <span style={{ width: `${confidence}%` }} />
          </div>
        </div>
        <div className="hud-card hud-stats">
          <span>Release Confidence: {confidence}%</span>
          <span>Bugs Fixed: {completedMissions.length}/{missionCheckpoints.length}</span>
          <span>Critical Bugs Remaining: {remaining}</span>
          <span>Skills Unlocked: {unlockedSkills.length}</span>
          <span>Resume Vault: {vaultUnlocked ? "Unlocked" : "Locked"}</span>
          <span>Nearby: {nearbyTarget?.title || "None"}</span>
        </div>
      </div>

      <div className="hud-actions pointer-events-auto">
        <button type="button" onClick={() => playerTelemetry.reset?.()}>
          <RotateCcw size={17} />
          Reset
        </button>
        <button type="button" onClick={toggleMiniMap}>
          <Map size={17} />
          Mission Map
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

      <div className="pointer-lock-hint pointer-events-none">
        {pointerLocked ? "Mouse look active. Press Esc to release." : "Click inside the game to enter mission control mode."}
      </div>

      {pointerLocked && <div className="scanner-reticle pointer-events-none" />}

      <div className="controls-help pointer-events-none">
        <span>WASD Move</span>
        <span>Mouse Look</span>
        <span>Click Scan / Interact</span>
        <span>E Interact</span>
        <span>Shift Sprint</span>
        <span>Esc Release Mouse</span>
        <span>M Mission Map</span>
        <span>R Reset</span>
      </div>

      {nearbyTarget && (
        <div className="interact-prompt pointer-events-none">
          {nearbyTarget.kind === "mission" ? "Click or press E to investigate" : "Click or press E to open"} {nearbyTarget.title}
        </div>
      )}

      {miniMapOpen && (
        <div className="mini-map pointer-events-none">
          {[...missionCheckpoints.map((item) => ({ ...item, type: "mission" })), ...missionZones.map((item) => ({ ...item, type: "zone" }))].map((target) => (
            <span
              className={completedMissions.includes(target.id) ? "mini-map__dot mini-map__dot--visited" : "mini-map__dot"}
              key={target.id}
              style={{
                left: `${50 + target.position[0] * 1.8}%`,
                top: `${50 + target.position[2] * 1.35}%`,
                background: target.color,
              }}
              title={target.title}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MissionHUD;
