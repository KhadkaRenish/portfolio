import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../../store/gameStore";
import { roverTelemetry } from "./roverTelemetry";

const bugPosition = new THREE.Vector3();

function BugEntity({ bug }) {
  const groupRef = useRef(null);
  const caughtBugs = useGameStore((state) => state.caughtBugs);
  const catchBug = useGameStore((state) => state.catchBug);
  const caught = caughtBugs.includes(bug.id);

  useFrame((state) => {
    if (!groupRef.current || caught) return;
    const elapsed = state.clock.elapsedTime;
    groupRef.current.position.y = bug.position[1] + Math.sin(elapsed * 2.4 + bug.position[0]) * 0.22;
    groupRef.current.rotation.y += 0.03;
    bugPosition.set(groupRef.current.position.x, groupRef.current.position.y, groupRef.current.position.z);
    if (bugPosition.distanceTo(roverTelemetry.position) < 1.65) {
      catchBug(bug);
    }
  });

  if (caught) return null;

  return (
    <group ref={groupRef} position={bug.position}>
      <mesh castShadow>
        <octahedronGeometry args={[0.58, 0]} />
        <meshStandardMaterial color="#fb7185" emissive="#ef4444" emissiveIntensity={0.55} roughness={0.32} />
      </mesh>
      <mesh position={[-0.36, 0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color="#fecaca" />
      </mesh>
      <mesh position={[0.36, 0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color="#fecaca" />
      </mesh>
      <pointLight color="#fb7185" intensity={0.8} distance={5} />
      <Text position={[0, 1.05, 0]} fontSize={0.22} color="#fecaca" anchorX="center" anchorY="middle">
        {bug.name}
      </Text>
    </group>
  );
}

export default BugEntity;
