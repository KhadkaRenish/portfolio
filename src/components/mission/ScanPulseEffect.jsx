import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useGameStore } from "../../store/gameStore";
import { playerTelemetry } from "./playerTelemetry";

function ScanPulseEffect() {
  const pulseRef = useRef(null);
  const scanPulse = useGameStore((state) => state.scanPulse);
  const notify = useGameStore((state) => state.notify);
  const startTimeRef = useRef(-10);

  useEffect(() => {
    if (scanPulse === 0) return;
    startTimeRef.current = performance.now() / 1000;
    notify({
      id: `scan-${scanPulse}`,
      title: "Scanner Pulse",
      detail: "Bug signal detected. Follow the active checkpoint marker.",
      type: "achievement",
    });
  }, [notify, scanPulse]);

  useFrame((state) => {
    if (!pulseRef.current) return;
    pulseRef.current.position.copy(playerTelemetry.position);
    pulseRef.current.position.y = 0.08;
    const elapsed = state.clock.elapsedTime - startTimeRef.current;
    const active = elapsed >= 0 && elapsed < 1.15;
    pulseRef.current.visible = active;
    if (!active) return;
    const scale = 0.6 + elapsed * 7.5;
    pulseRef.current.scale.setScalar(scale);
    pulseRef.current.material.opacity = Math.max(0, 0.42 - elapsed * 0.34);
  });

  return (
    <mesh ref={pulseRef} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
      <ringGeometry args={[0.45, 0.55, 64]} />
      <meshBasicMaterial color="#67e8f9" transparent opacity={0.35} />
    </mesh>
  );
}

export default ScanPulseEffect;
