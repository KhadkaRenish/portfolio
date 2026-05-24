import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { missionCheckpoints, missionZones } from "../../data/portfolioData";

const seeded = (value) => {
  const x = Math.sin(value * 917) * 10000;
  return x - Math.floor(x);
};

function FloorGrid() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[52, 46]} />
        <meshStandardMaterial color="#08131f" roughness={0.72} metalness={0.18} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, -10]}>
        <ringGeometry args={[19, 20.2, 96]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.09} side={THREE.DoubleSide} />
      </mesh>
      <gridHelper args={[52, 26, "#164e63", "#0f766e"]} position={[0, 0.015, -10]} />
    </group>
  );
}

function NeonPath({ position, scale, rotation = 0, color = "#38bdf8" }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[scale[0], 0.035, scale[1]]} />
        <meshStandardMaterial color="#0f172a" roughness={0.52} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.026, 0]}>
        <boxGeometry args={[scale[0] * 0.94, 0.018, 0.08]} />
        <meshBasicMaterial color={color} transparent opacity={0.32} />
      </mesh>
      <mesh position={[scale[0] * 0.38, 0.03, 0]}>
        <boxGeometry args={[0.05, 0.018, scale[1] * 0.82]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
      <mesh position={[-scale[0] * 0.38, 0.03, 0]}>
        <boxGeometry args={[0.05, 0.018, scale[1] * 0.82]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function ServerRack({ position, color = "#38bdf8" }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, 1.05, 0]}>
        <boxGeometry args={[0.82, 2.1, 0.62]} />
        <meshStandardMaterial color="#111827" emissive={color} emissiveIntensity={0.08} roughness={0.42} />
      </mesh>
      {[0.35, 0.85, 1.35, 1.85].map((y) => (
        <mesh position={[0, y, -0.325]} key={y}>
          <boxGeometry args={[0.58, 0.06, 0.03]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function ZoneStructure({ zone }) {
  const isTower = zone.id === "skill-tower";
  const isVault = zone.id === "resume-vault";
  const [x, y, z] = zone.position;

  return (
    <group position={[x, y, z]}>
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.35, 48]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.14} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, isTower ? 2.8 : 1.18, 0]}>
        {isTower ? <cylinderGeometry args={[0.82, 1.08, 5.4, 8]} /> : <boxGeometry args={[2.8, isVault ? 2.3 : 2.1, 2.4]} />}
        <meshPhysicalMaterial color="#111827" emissive={zone.color} emissiveIntensity={0.16} metalness={0.35} roughness={0.22} transmission={0.08} transparent opacity={0.94} />
      </mesh>
      <mesh position={[0, isTower ? 5.65 : 2.45, 0]}>
        <torusGeometry args={[isTower ? 1.15 : 1.85, 0.045, 8, 48]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.68} />
      </mesh>
      {isVault && (
        <mesh position={[0, 1.2, -1.23]}>
          <boxGeometry args={[1.3, 1.1, 0.05]} />
          <meshBasicMaterial color={zone.color} transparent opacity={0.55} />
        </mesh>
      )}
      <pointLight color={zone.color} intensity={1.05} distance={9} position={[0, isTower ? 5.8 : 2.8, 0]} />
      <Text position={[0, isTower ? 6.25 : 3.25, 0]} fontSize={0.25} color="#ffffff" anchorX="center" anchorY="middle">
        {zone.title.toUpperCase()}
      </Text>
    </group>
  );
}

function DataStream({ from, to, color = "#38bdf8" }) {
  const streamRef = useRef(null);
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);

  useFrame((state) => {
    if (!streamRef.current) return;
    streamRef.current.material.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 3 + length) * 0.08;
  });

  return (
    <mesh ref={streamRef} position={[(from[0] + to[0]) / 2, 0.11, (from[2] + to[2]) / 2]} rotation={[0, angle, 0]}>
      <boxGeometry args={[0.1, 0.035, length]} />
      <meshBasicMaterial color={color} transparent opacity={0.16} />
    </mesh>
  );
}

function HologramPanel({ position, color = "#38bdf8", label = "TEST REPORT" }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[1.85, 1.05, 0.05]} />
        <meshPhysicalMaterial color="#0f172a" emissive={color} emissiveIntensity={0.18} transparent opacity={0.58} roughness={0.18} />
      </mesh>
      <Text position={[0, 1.38, -0.04]} fontSize={0.13} color="#ffffff" anchorX="center" anchorY="middle">
        {label}
      </Text>
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 1.3, 8]} />
        <meshStandardMaterial color="#111827" emissive={color} emissiveIntensity={0.1} />
      </mesh>
    </group>
  );
}

function SecurityGate({ position, color = "#a78bfa" }) {
  return (
    <group position={position}>
      {[-0.9, 0.9].map((x) => (
        <mesh castShadow position={[x, 1.1, 0]} key={x}>
          <boxGeometry args={[0.24, 2.2, 0.28]} />
          <meshStandardMaterial color="#111827" emissive={color} emissiveIntensity={0.16} />
        </mesh>
      ))}
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[2.08, 0.14, 0.2]} />
        <meshBasicMaterial color={color} transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[1.5, 1.55, 0.04]} />
        <meshBasicMaterial color={color} transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

function AmbientPanels() {
  const panels = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => {
        const side = index % 4;
        const x = side < 2 ? -23 + side * 46 : -18 + seeded(index) * 36;
        const z = side >= 2 ? 9 - (side - 2) * 38 : 7 - seeded(index) * 36;
        return [x, z, index % 2 ? "#a78bfa" : "#38bdf8"];
      }),
    [],
  );

  return (
    <group>
      {panels.map(([x, z, color]) => (
        <group position={[x, 0, z]} key={`${x}-${z}`}>
          <ServerRack position={[0, 0, 0]} color={color} />
          <pointLight color={color} intensity={0.25} distance={5} position={[0, 1.5, 0]} />
        </group>
      ))}
    </group>
  );
}

function MissionProps() {
  return (
    <group>
      <SecurityGate position={[7, 0, -5.4]} color="#a78bfa" />
      <SecurityGate position={[14, 0, -14.8]} color="#f472b6" />
      <HologramPanel position={[-10.8, 0, 1.4]} color="#38bdf8" label="API TRACE" />
      <HologramPanel position={[-5.5, 0, -10.8]} color="#34d399" label="SQL AUDIT" />
      <HologramPanel position={[1.9, 0, -22.1]} color="#facc15" label="RULE ENGINE" />
      <HologramPanel position={[12.4, 0, -20.5]} color="#f472b6" label="REGRESSION" />
      {missionCheckpoints.map((mission) => (
        <DataStream from={[0, 0, 7]} to={mission.position} color={mission.color} key={mission.id} />
      ))}
      {[-18, -12, -6, 6, 12, 18].map((x) => (
        <mesh castShadow position={[x, 0.22, 9.5]} key={x}>
          <boxGeometry args={[1.2, 0.44, 0.7]} />
          <meshStandardMaterial color="#111827" emissive="#38bdf8" emissiveIntensity={0.08} />
        </mesh>
      ))}
    </group>
  );
}

function ScannerBeam() {
  const beamRef = useRef(null);

  useFrame((state) => {
    if (!beamRef.current) return;
    beamRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.45) * 12;
    beamRef.current.material.opacity = 0.08 + Math.sin(state.clock.elapsedTime * 1.8) * 0.025;
  });

  return (
    <mesh ref={beamRef} position={[0, 0.08, -10]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2, 42]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.1} side={THREE.DoubleSide} />
    </mesh>
  );
}

function MissionWorld() {
  return (
    <>
      <FloorGrid />
      <NeonPath position={[0, 0.04, -8]} scale={[5.2, 34]} />
      <NeonPath position={[0, 0.05, -2]} scale={[34, 4.4]} rotation={Math.PI / 2} color="#a78bfa" />
      <NeonPath position={[4, 0.06, -20]} scale={[28, 4]} rotation={Math.PI / 2} color="#34d399" />
      <NeonPath position={[-15, 0.06, -8]} scale={[4, 26]} color="#22c55e" />
      <NeonPath position={[15, 0.06, -11]} scale={[4, 30]} color="#facc15" />
      <ScannerBeam />
      <AmbientPanels />
      <MissionProps />
      {missionZones.map((zone) => (
        <ZoneStructure zone={zone} key={zone.id} />
      ))}
    </>
  );
}

export default MissionWorld;
