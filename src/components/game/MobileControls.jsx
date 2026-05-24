import { CornerDownLeft, RotateCcw } from "lucide-react";
import { useGameStore } from "../../store/gameStore";
import { roverTelemetry } from "./roverTelemetry";

const controlButtons = [
  { label: "Forward", key: "forward" },
  { label: "Back", key: "backward" },
  { label: "Left", key: "left" },
  { label: "Right", key: "right" },
];

function MobileControls() {
  const setControl = useGameStore((state) => state.setControl);
  const nearbyZone = useGameStore((state) => state.nearbyZone);
  const openModal = useGameStore((state) => state.openModal);
  const visitZone = useGameStore((state) => state.visitZone);

  const interact = () => {
    if (!nearbyZone) return;
    visitZone(nearbyZone.id);
    openModal(nearbyZone.id);
  };

  return (
    <div className="mobile-controls pointer-events-auto">
      <div className="mobile-controls__drive">
        {controlButtons.map((button) => (
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
        <button type="button" onClick={() => roverTelemetry.respawn?.()}>
          <RotateCcw size={18} />
          Respawn
        </button>
      </div>
    </div>
  );
}

export default MobileControls;
