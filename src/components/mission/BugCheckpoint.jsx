import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useGameStore } from "../../store/gameStore";

function BugCheckpoint({ mission }) {
  const groupRef = useRef(null);
  const completed = useGameStore((state) => state.completedMissions.includes(mission.id));
  const completedMissions = useGameStore((state) => state.completedMissions);
  const isCurrent = !completed && mission.id === ["api-bug", "database-bug", "auth-bug", "regression-bug", "logic-bug"].find((id) => !completedMissions.includes(id));

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += isCurrent ? 0.022 : 0.012;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.8 + mission.position[0]) * 0.08;
  });

  return (
    <group ref={groupRef} position={[mission.position[0], 0.1, mission.position[2]]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.55, isCurrent ? 2.1 : 1.85, 64]} />
        <meshBasicMaterial color={completed ? "#86efac" : isCurrent ? "#67e8f9" : mission.color} transparent opacity={completed ? 0.55 : isCurrent ? 0.62 : 0.36} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[1.45, 40]} />
        <meshBasicMaterial color={completed ? "#22c55e" : "#7f1d1d"} transparent opacity={completed ? 0.12 : 0.16} />
      </mesh>
      <mesh castShadow position={[0, 0.92, 0]}>
        <octahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial
          color={completed ? "#16a34a" : "#7f1d1d"}
          emissive={completed ? "#86efac" : mission.color}
          emissiveIntensity={completed ? 0.65 : 0.85}
          roughness={0.32}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[0, 1.72, 0]}>
        <boxGeometry args={[1.9, 0.34, 0.06]} />
        <meshBasicMaterial color={completed ? "#86efac" : isCurrent ? "#67e8f9" : "#fecaca"} transparent opacity={0.82} />
      </mesh>
      {!completed && (
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      )}
      {isCurrent && (
        <mesh position={[0, 3.05, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.34, 0.7, 4]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.9} />
        </mesh>
      )}
      <pointLight color={completed ? "#86efac" : isCurrent ? "#67e8f9" : mission.color} intensity={completed ? 0.9 : isCurrent ? 2 : 1.25} distance={isCurrent ? 11 : 8} position={[0, 1.3, 0]} />
      <Text position={[0, 2.24, 0]} fontSize={0.26} color="#ffffff" anchorX="center" anchorY="middle">
        {mission.shortLabel.toUpperCase()}
      </Text>
      <Text position={[0, 1.98, 0]} fontSize={0.17} color={completed ? "#bbf7d0" : "#fecaca"} anchorX="center" anchorY="middle">
        {completed ? "FIXED" : isCurrent ? "CURRENT CASE" : mission.severity.toUpperCase()}
      </Text>
    </group>
  );
}

export default BugCheckpoint;
