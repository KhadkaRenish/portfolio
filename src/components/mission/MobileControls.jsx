import { CornerDownLeft, Radar, RotateCcw } from "lucide-react";
import { useGameStore } from "../../store/gameStore";
import { playerTelemetry } from "./playerTelemetry";

const buttons = [
  { label: "Up", key: "forward" },
  { label: "Down", key: "backward" },
  { label: "Left", key: "left" },
  { label: "Right", key: "right" },
];

function MobileControls() {
  const setControl = useGameStore((state) => state.setControl);
  const nearbyTarget = useGameStore((state) => state.nearbyTarget);
  const openMission = useGameStore((state) => state.openMission);
  const openModal = useGameStore((state) => state.openModal);
  const visitZone = useGameStore((state) => state.visitZone);
  const triggerScanPulse = useGameStore((state) => state.triggerScanPulse);

  const interact = () => {
    if (!nearbyTarget) return;
    if (nearbyTarget.kind === "mission") {
      openMission(nearbyTarget.id);
    } else {
      visitZone(nearbyTarget.id);
      openModal(nearbyTarget.id);
    }
  };

  return (
    <div className="mobile-controls pointer-events-auto">
      <div className="mobile-controls__drive">
        {buttons.map((button) => (
          <button
            type="button"
            key={button.key}
            onPointerDown={() => setControl(button.key, true)}
            onPointerUp={() => setControl(button.key, false)}
            onPointerCancel={() => setControl(button.key, false)}
            onPointerLeave={() => setControl(button.key, false)}
          >
            {button.label}
          </button>
        ))}
      </div>
      <div className="mobile-controls__actions">
        <button type="button" onClick={interact}>
          <CornerDownLeft size={18} />
          Interact
        </button>
        <button type="button" onClick={() => playerTelemetry.reset?.()}>
          <RotateCcw size={18} />
          Reset
        </button>
        <button type="button" onClick={triggerScanPulse}>
          <Radar size={18} />
          Scan
        </button>
      </div>
    </div>
  );
}

export default MobileControls;
