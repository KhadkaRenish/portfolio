import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Preload } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useGameStore } from "../../store/gameStore";
import MissionScene from "./MissionScene";
import MissionHUD from "./MissionHUD";
import MobileControls from "./MobileControls";
import MissionModal from "./MissionModal";
import MissionControlModal from "./MissionControlModal";
import ProjectEvidenceRoom from "./ProjectEvidenceRoom";
import SkillUnlockTower from "./SkillUnlockTower";
import ResumeVault from "./ResumeVault";
import ContactStation from "./ContactStation";
import AchievementToast from "./AchievementToast";
import PointerLockControlsManager from "./PointerLockControlsManager";

function WalkingPortfolioGame({ onRecruiterMode }) {
  const quality = useGameStore((state) => state.quality);
  const shellRef = useRef(null);
  const keyMap = useMemo(
    () => [
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "left", keys: ["ArrowLeft", "KeyA"] },
      { name: "right", keys: ["ArrowRight", "KeyD"] },
      { name: "boost", keys: ["ShiftLeft", "ShiftRight"] },
      { name: "interact", keys: ["KeyE", "Enter"] },
      { name: "respawn", keys: ["KeyR"] },
      { name: "map", keys: ["KeyM"] },
    ],
    [],
  );

  return (
    <div className="game-shell" ref={shellRef}>
      <PointerLockControlsManager targetRef={shellRef} />
      <KeyboardControls map={keyMap}>
        <Canvas
          shadows={quality !== "low"}
          dpr={quality === "high" ? [1, 1.75] : quality === "medium" ? [0.9, 1.25] : [0.65, 1]}
          camera={{ position: [9, 12, 14], fov: 42 }}
          gl={{ antialias: quality !== "low", powerPreference: "high-performance" }}
        >
          <color attach="background" args={["#07111f"]} />
          <Suspense fallback={null}>
            <MissionScene />
            <Preload all />
          </Suspense>
        </Canvas>
      </KeyboardControls>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(2,6,23,0.42))]" />
      <Suspense
        fallback={
          <div className="game-loader">
            <Loader2 className="animate-spin" />
            Loading QA mission
          </div>
        }
      >
        <MissionHUD onRecruiterMode={onRecruiterMode} />
        <MobileControls />
        <MissionModal />
        <MissionControlModal />
        <ProjectEvidenceRoom />
        <SkillUnlockTower />
        <ResumeVault />
        <ContactStation />
        <AchievementToast />
      </Suspense>
    </div>
  );
}

export default WalkingPortfolioGame;
