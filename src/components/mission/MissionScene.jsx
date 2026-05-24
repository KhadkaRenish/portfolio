import { Sky } from "@react-three/drei";
import { missionCheckpoints } from "../../data/portfolioData";
import BugCheckpoint from "./BugCheckpoint";
import FollowCamera from "./FollowCamera";
import MissionWorld from "./MissionWorld";
import PlayerController from "./PlayerController";
import ScanPulseEffect from "./ScanPulseEffect";

function MissionScene() {
  return (
    <>
      <Sky sunPosition={[5, 8, 4]} turbidity={10} rayleigh={1.2} mieCoefficient={0.02} />
      <fog attach="fog" args={["#091827", 30, 82]} />
      <hemisphereLight args={["#dbeafe", "#020617", 1.28]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[12, 18, 10]}
        intensity={1.55}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-28}
        shadow-camera-right={28}
        shadow-camera-top={18}
        shadow-camera-bottom={-32}
      />
      <pointLight color="#38bdf8" intensity={1.05} distance={34} position={[0, 7, -6]} />
      <pointLight color="#a78bfa" intensity={0.82} distance={28} position={[13, 6, -18]} />
      <pointLight color="#22c55e" intensity={0.55} distance={24} position={[-12, 5, -18]} />
      <MissionWorld />
      {missionCheckpoints.map((mission) => (
        <BugCheckpoint mission={mission} key={mission.id} />
      ))}
      <ScanPulseEffect />
      <PlayerController />
      <FollowCamera />
    </>
  );
}

export default MissionScene;
