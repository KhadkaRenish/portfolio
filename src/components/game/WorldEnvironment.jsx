import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { zones } from "../../data/portfolioData";

const seeded = (value) => {
  const x = Math.sin(value * 999) * 10000;
  return x - Math.floor(x);
};

function TerrainMesh() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(72, 66, 72, 66);
    geo.rotateX(-Math.PI / 2);
    const position = geo.attributes.position;

    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i);
      const z = position.getZ(i);
      const distance = Math.sqrt((x / 36) ** 2 + ((z + 8) / 33) ** 2);
      const coastDrop = THREE.MathUtils.smoothstep(distance, 0.72, 1.02) * -1.6;
      const hills =
        Math.sin(x * 0.18) * 0.26 +
        Math.cos(z * 0.16) * 0.2 +
        Math.sin((x + z) * 0.09) * 0.22;
      const roadFlatten =
        Math.abs(x) < 4.8 || Math.abs(z) < 3.5 || Math.abs(z + 20) < 3.4
          ? 0.22
          : 1;
      position.setY(i, (hills * roadFlatten + coastDrop) - 0.08);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial color="#1d4d35" roughness={0.95} metalness={0.02} />
    </mesh>
  );
}

function AnimatedWater() {
  const waterRef = useRef(null);

  useFrame((state) => {
    if (!waterRef.current) return;
    waterRef.current.position.y = -0.92 + Math.sin(state.clock.elapsedTime * 0.8) * 0.035;
    waterRef.current.material.opacity = 0.72 + Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
  });

  return (
    <mesh ref={waterRef} position={[0, -0.92, -8]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[72, 128]} />
      <meshStandardMaterial
        color="#075985"
        emissive="#0ea5e9"
        emissiveIntensity={0.14}
        roughness={0.18}
        metalness={0.28}
        transparent
        opacity={0.74}
      />
    </mesh>
  );
}

function RoadSegment({ position, scale, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[scale[0], 0.055, scale[1]]} />
        <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.035, scale[1] * 0.38]}>
        <boxGeometry args={[scale[0] * 0.92, 0.02, 0.055]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.36} />
      </mesh>
      <mesh position={[0, 0.035, -scale[1] * 0.38]}>
        <boxGeometry args={[scale[0] * 0.92, 0.02, 0.055]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function RoadCurve({ position, radius = 8, rotation = 0, start = 0, length = Math.PI / 2 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[radius - 2.3, radius + 2.3, 96, 1, start, length]} />
        <meshStandardMaterial color="#101827" roughness={0.52} metalness={0.06} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[radius + 1.95, radius + 2.08, 96, 1, start, length]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.38} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function RoadSystem() {
  return (
    <group position={[0, 0.09, 0]}>
      <RoadSegment position={[0, 0, -8]} scale={[6.2, 40]} />
      <RoadSegment position={[0, 0, 0]} scale={[43, 5.5]} rotation={Math.PI / 2} />
      <RoadSegment position={[0, 0, -20]} scale={[36, 5]} rotation={Math.PI / 2} />
      <RoadSegment position={[0, 0, -26]} scale={[5, 13]} />
      <RoadCurve position={[-14, 0, -8]} radius={8.5} start={Math.PI * 1.5} length={Math.PI / 2} />
      <RoadCurve position={[14, 0, -8]} radius={8.5} start={Math.PI} length={Math.PI / 2} />
      <RoadCurve position={[-9, 0, -20]} radius={5.4} start={0} length={Math.PI / 2} />
      <RoadCurve position={[9, 0, -20]} radius={5.4} start={Math.PI / 2} length={Math.PI / 2} />
    </group>
  );
}

function StylizedTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.13, 0.18, 1.1, 7]} />
        <meshStandardMaterial color="#7c4a25" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 1.22, 0]}>
        <coneGeometry args={[0.72, 1.35, 7]} />
        <meshStandardMaterial color="#2f8f5b" roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 1.82, 0]}>
        <coneGeometry args={[0.54, 1.05, 7]} />
        <meshStandardMaterial color="#34d399" roughness={0.85} />
      </mesh>
    </group>
  );
}

function NatureLayer() {
  const trees = useMemo(() => {
    const items = [];
    for (let i = 0; i < 68; i += 1) {
      const angle = seeded(i + 2) * Math.PI * 2;
      const radius = 17 + seeded(i + 9) * 15;
      const x = Math.cos(angle) * radius;
      const z = -8 + Math.sin(angle) * radius * 0.86;
      const nearRoad = Math.abs(x) < 6 || Math.abs(z) < 4 || Math.abs(z + 20) < 4;
      if (!nearRoad && z < 11 && z > -31) {
        items.push([x, 0.05, z, 0.75 + seeded(i + 14) * 0.75]);
      }
    }
    return items;
  }, []);

  const rocks = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => {
        const angle = seeded(i + 40) * Math.PI * 2;
        const radius = 25 + seeded(i + 41) * 8;
        return [Math.cos(angle) * radius, 0.05, -8 + Math.sin(angle) * radius * 0.8, 0.35 + seeded(i + 42) * 0.75];
      }),
    [],
  );

  return (
    <group>
      {trees.map((tree) => (
        <StylizedTree position={[tree[0], tree[1], tree[2]]} scale={tree[3]} key={tree.join("-")} />
      ))}
      {rocks.map((rock) => (
        <mesh castShadow receiveShadow position={[rock[0], rock[1] + 0.18, rock[2]]} scale={rock[3]} key={rock.join("-")}>
          <dodecahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#64748b" roughness={0.92} />
        </mesh>
      ))}
    </group>
  );
}

function LightPost({ position, color = "#67e8f9" }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 2.3, 10]} />
        <meshStandardMaterial color="#111827" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0, 2.45, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <pointLight color={color} intensity={0.75} distance={7} position={[0, 2.45, 0]} />
    </group>
  );
}

function ZoneLandmark({ zone }) {
  const [x, y, z] = zone.position;
  const isTower = zone.id === "skill-tower";
  const isVault = zone.id === "resume-vault";
  const isArena = zone.id === "bug-arena";

  return (
    <RigidBody type="fixed" colliders={false} position={[x, y, z]}>
      <group>
        <mesh castShadow receiveShadow position={[0, 0.12, 0]}>
          <cylinderGeometry args={[2.5, 2.8, 0.24, 32]} />
          <meshStandardMaterial color="#0f172a" emissive={zone.color} emissiveIntensity={0.1} roughness={0.5} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, isTower ? 3.2 : isVault ? 1.6 : 1.35, 0]}>
          {isArena ? <torusKnotGeometry args={[1.05, 0.17, 80, 8]} /> : <boxGeometry args={[isTower ? 1.6 : 3.2, isTower ? 6.2 : isVault ? 2.8 : 2.45, isTower ? 1.6 : 3.2]} />}
          <meshStandardMaterial color="#111827" emissive={zone.color} emissiveIntensity={0.18} metalness={0.28} roughness={0.38} />
        </mesh>
        {isVault && (
          <mesh position={[0, 1.52, -1.63]}>
            <boxGeometry args={[1.55, 1.25, 0.08]} />
            <meshBasicMaterial color={zone.color} transparent opacity={0.55} />
          </mesh>
        )}
        <CuboidCollider args={[1.9, isTower ? 3.1 : 1.4, 1.9]} position={[0, isTower ? 3.1 : 1.4, 0]} />
        <pointLight color={zone.color} intensity={1.15} distance={10} position={[0, isTower ? 6.9 : 3.6, 0]} />
        <Text position={[0, isTower ? 7.15 : 3.85, 0]} fontSize={0.34} color="#ffffff" anchorX="center" anchorY="middle">
          {zone.title.toUpperCase()}
        </Text>
      </group>
    </RigidBody>
  );
}

function PropsLayer() {
  const lightPositions = [
    [-4, 0, 7],
    [4, 0, 7],
    [-10, 0, 0],
    [10, 0, 0],
    [-4, 0, -14],
    [4, 0, -14],
    [-11, 0, -22],
    [11, 0, -22],
  ];

  return (
    <group>
      {lightPositions.map((position, index) => (
        <LightPost position={position} color={index % 2 ? "#a78bfa" : "#67e8f9"} key={position.join("-")} />
      ))}
      {zones.map((zone) => (
        <ZoneLandmark zone={zone} key={zone.id} />
      ))}
      {[-24, 24].map((x) => (
        <RigidBody type="fixed" colliders="cuboid" position={[x, 0.55, -9]} key={x}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.5, 1.1, 37]} />
            <meshStandardMaterial color="#164e63" emissive="#38bdf8" emissiveIntensity={0.08} />
          </mesh>
        </RigidBody>
      ))}
      {[12, -30].map((z) => (
        <RigidBody type="fixed" colliders="cuboid" position={[0, 0.55, z]} key={z}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[47, 1.1, 0.5]} />
            <meshStandardMaterial color="#164e63" emissive="#38bdf8" emissiveIntensity={0.08} />
          </mesh>
        </RigidBody>
      ))}
    </group>
  );
}

function WorldEnvironment() {
  return (
    <>
      <AnimatedWater />
      <RigidBody type="fixed" colliders="cuboid">
        <CuboidCollider args={[27, 0.08, 24]} position={[0, -0.02, -9]} />
      </RigidBody>
      <TerrainMesh />
      <RoadSystem />
      <NatureLayer />
      <PropsLayer />
    </>
  );
}

export default WorldEnvironment;
