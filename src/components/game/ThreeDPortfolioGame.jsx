import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Preload } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense, useMemo } from "react";
import { Loader2 } from "lucide-react";
import GameHUD from "./GameHUD";
import GameScene from "./GameScene";
import MobileControls from "./MobileControls";
import DialogueModal from "./DialogueModal";
import ProjectGarageModal from "./ProjectGarageModal";
import SkillTowerModal from "./SkillTowerModal";
import ResumeVaultModal from "./ResumeVaultModal";
import ContactStationModal from "./ContactStationModal";
import AchievementSystem from "./AchievementSystem";
import { useGameStore } from "../../store/gameStore";

function ThreeDPortfolioGame({ onRecruiterMode }) {
  const quality = useGameStore((state) => state.quality);
  const keyMap = useMemo(
    () => [
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "left", keys: ["ArrowLeft", "KeyA"] },
      { name: "right", keys: ["ArrowRight", "KeyD"] },
      { name: "boost", keys: ["ShiftLeft", "ShiftRight"] },
      { name: "brake", keys: ["Space"] },
      { name: "interact", keys: ["KeyE", "Enter"] },
      { name: "respawn", keys: ["KeyR"] },
      { name: "map", keys: ["KeyM"] },
    ],
    [],
  );

  return (
    <div className="game-shell">
      <KeyboardControls map={keyMap}>
        <Canvas
          shadows={quality !== "low"}
          dpr={quality === "high" ? [1, 1.75] : quality === "medium" ? [0.9, 1.25] : [0.65, 1]}
          camera={{ position: [0, 7.2, 12], fov: 46 }}
          gl={{ antialias: quality !== "low", powerPreference: "high-performance" }}
        >
          <color attach="background" args={["#7dd3fc"]} />
          <fog attach="fog" args={["#8bd3f7", 42, 108]} />
          <Suspense fallback={null}>
            <Physics gravity={[0, -18, 0]} timeStep="vary">
              <GameScene />
            </Physics>
            <Preload all />
          </Suspense>
        </Canvas>
      </KeyboardControls>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(2,6,23,0.34))]" />
      <Suspense
        fallback={
          <div className="game-loader">
            <Loader2 className="animate-spin" />
            Loading 3D world
          </div>
        }
      >
        <GameHUD onRecruiterMode={onRecruiterMode} />
        <MobileControls />
        <DialogueModal />
        <ProjectGarageModal />
        <SkillTowerModal />
        <ResumeVaultModal />
        <ContactStationModal />
        <AchievementSystem />
      </Suspense>
    </div>
  );
}

export default ThreeDPortfolioGame;
