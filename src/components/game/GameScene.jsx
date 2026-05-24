import { Sky } from "@react-three/drei";
import { bugTypes, zones } from "../../data/portfolioData";
import BugEntity from "./BugEntity";
import FollowCamera from "./FollowCamera";
import InteractableZone from "./InteractableZone";
import RoverController from "./RoverController";
import WorldEnvironment from "./WorldEnvironment";

function GameScene() {
  return (
    <>
      <Sky sunPosition={[8, 9, 4]} turbidity={8} rayleigh={1.6} mieCoefficient={0.025} mieDirectionalG={0.75} />
      <hemisphereLight args={["#dbeafe", "#123524", 1.35]} />
      <ambientLight intensity={0.42} />
      <directionalLight
        castShadow
        position={[15, 24, 10]}
        intensity={1.75}
        shadow-mapSize={[1536, 1536]}
        shadow-camera-left={-34}
        shadow-camera-right={34}
        shadow-camera-top={28}
        shadow-camera-bottom={-34}
      />
      <pointLight color="#38bdf8" intensity={1.15} distance={30} position={[0, 8, 6]} />
      <pointLight color="#a78bfa" intensity={1.35} distance={32} position={[0, 8, -17]} />

      <WorldEnvironment />

      {zones.map((zone) => (
        <InteractableZone zone={zone} key={zone.id} />
      ))}

      {bugTypes.map((bug) => (
        <BugEntity bug={bug} key={bug.id} />
      ))}

      <RoverController />
      <FollowCamera />
    </>
  );
}

export default GameScene;
