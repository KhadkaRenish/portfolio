import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function InteractableZone({ zone }) {
  const ringRef = useRef(null);
  const [x, y, z] = zone.position;

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += 0.35 * state.clock.getDelta();
    ringRef.current.material.opacity = 0.32 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
  });

  return (
    <group position={[x, y + 0.05, z]}>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 2.75, 64]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.32} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 48]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.08} />
      </mesh>
      <Text position={[0, 2.2, 0]} fontSize={0.36} color="#ffffff" anchorX="center" anchorY="middle">
        {zone.title}
      </Text>
      <Text position={[0, 1.72, 0]} fontSize={0.18} color={zone.color} anchorX="center" anchorY="middle">
        PRESS E TO INTERACT
      </Text>
    </group>
  );
}

export default InteractableZone;
