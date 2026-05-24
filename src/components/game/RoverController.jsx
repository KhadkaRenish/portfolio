import { useKeyboardControls } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { zones } from "../../data/portfolioData";
import { useGameStore } from "../../store/gameStore";
import { roverTelemetry } from "./roverTelemetry";

const forwardVector = new THREE.Vector3();
const zoneVector = new THREE.Vector3();

function RoverModel() {
  return (
    <group scale={[1, 1, 1.08]}>
      <mesh castShadow position={[0, 0.26, 0]}>
        <boxGeometry args={[1.74, 0.32, 2.45]} />
        <meshStandardMaterial color="#101827" emissive="#0ea5e9" emissiveIntensity={0.08} metalness={0.72} roughness={0.22} />
      </mesh>
      <mesh castShadow position={[0, 0.43, -0.35]} scale={[1, 0.8, 1]}>
        <boxGeometry args={[1.52, 0.25, 1.35]} />
        <meshStandardMaterial color="#172033" emissive="#2563eb" emissiveIntensity={0.08} metalness={0.68} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[0, 0.72, 0.1]}>
        <boxGeometry args={[1.05, 0.38, 1.02]} />
        <meshStandardMaterial color="#0b1220" emissive="#38bdf8" emissiveIntensity={0.08} metalness={0.45} roughness={0.12} transparent opacity={0.92} />
      </mesh>
      <mesh castShadow position={[0, 0.48, -1.28]}>
        <boxGeometry args={[1.45, 0.16, 0.36]} />
        <meshStandardMaterial color="#0f172a" metalness={0.72} roughness={0.24} />
      </mesh>
      <mesh position={[-0.36, 0.36, -1.36]}>
        <boxGeometry args={[0.32, 0.24, 0.055]} />
        <meshBasicMaterial color="#020617" />
      </mesh>
      <mesh position={[0.36, 0.36, -1.36]}>
        <boxGeometry args={[0.32, 0.24, 0.055]} />
        <meshBasicMaterial color="#020617" />
      </mesh>
      <mesh position={[-0.62, 0.42, -1.36]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[0.42, 0.09, 0.06]} />
        <meshBasicMaterial color="#e0f2fe" />
      </mesh>
      <mesh position={[0.62, 0.42, -1.36]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[0.42, 0.09, 0.06]} />
        <meshBasicMaterial color="#e0f2fe" />
      </mesh>
      <mesh position={[0, 0.36, 1.26]}>
        <boxGeometry args={[1.28, 0.08, 0.06]} />
        <meshBasicMaterial color="#fb7185" />
      </mesh>
      <mesh castShadow position={[0, 0.56, 1.1]}>
        <boxGeometry args={[1.52, 0.08, 0.18]} />
        <meshStandardMaterial color="#020617" metalness={0.55} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.16, -1.56]}>
        <boxGeometry args={[1.1, 0.04, 0.42]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.34} />
      </mesh>
      {[-0.98, 0.98].map((x) =>
        [-0.82, 0.86].map((z) => (
          <group position={[x, 0.11, z]} key={`${x}-${z}`}>
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.28, 28]} />
              <meshStandardMaterial color="#020617" roughness={0.35} metalness={0.32} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, x > 0 ? 0.145 : -0.145]}>
              <cylinderGeometry args={[0.17, 0.17, 0.025, 18]} />
              <meshBasicMaterial color="#94a3b8" />
            </mesh>
          </group>
        )),
      )}
      <mesh position={[0, 0.08, 1.62]}>
        <boxGeometry args={[1.35, 0.02, 0.62]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.18} />
      </mesh>
      <mesh position={[0, 0.08, 2.05]}>
        <boxGeometry args={[0.78, 0.018, 0.42]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.14} />
      </mesh>
      <pointLight color="#e0f2fe" intensity={1.2} distance={9} position={[-0.6, 0.46, -1.55]} />
      <pointLight color="#e0f2fe" intensity={1.2} distance={9} position={[0.6, 0.46, -1.55]} />
      <pointLight color="#fb7185" intensity={0.6} distance={5} position={[0, 0.36, 1.42]} />
    </group>
  );
}

function SpeedTrails() {
  return (
    <group position={[0, 0.05, 1.65]}>
      {[-0.42, 0, 0.42].map((x) => (
        <mesh position={[x, 0, 0]} key={x}>
          <boxGeometry args={[0.08, 0.016, 1.5]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.16} />
        </mesh>
      ))}
    </group>
  );
}

function RoverVisual() {
  return (
    <group>
      <RoverModel />
      <SpeedTrails />
    </group>
  );
}

function RoverController() {
  const bodyRef = useRef(null);
  const speedRef = useRef(0);
  const rotationRef = useRef(0);
  const [, getKeys] = useKeyboardControls();
  const storeControls = useGameStore((state) => state.controls);
  const setNearbyZone = useGameStore((state) => state.setNearbyZone);
  const visitZone = useGameStore((state) => state.visitZone);
  const openModal = useGameStore((state) => state.openModal);
  const toggleMiniMap = useGameStore((state) => state.toggleMiniMap);

  const respawn = () => {
    speedRef.current = 0;
    rotationRef.current = 0;
    bodyRef.current?.setTranslation({ x: 0, y: 1.2, z: 5 }, true);
    bodyRef.current?.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    bodyRef.current?.setLinvel({ x: 0, y: 0, z: 0 }, true);
    bodyRef.current?.setAngvel({ x: 0, y: 0, z: 0 }, true);
  };

  useEffect(() => {
    roverTelemetry.respawn = respawn;
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "KeyR") respawn();
      if (event.code === "KeyM") toggleMiniMap();
      if (event.code === "KeyE" || event.code === "Enter") {
        const nearbyZone = useGameStore.getState().nearbyZone;
        if (nearbyZone) {
          visitZone(nearbyZone.id);
          openModal(nearbyZone.id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openModal, toggleMiniMap, visitZone]);

  useFrame((_, delta) => {
    const body = bodyRef.current;
    if (!body) return;

    const keys = getKeys();
    const forward = keys.forward || storeControls.forward;
    const backward = keys.backward || storeControls.backward;
    const left = keys.left || storeControls.left;
    const right = keys.right || storeControls.right;
    const boost = keys.boost || storeControls.boost;
    const brake = keys.brake || storeControls.brake;

    const maxSpeed = boost ? 15.5 : 9.4;
    const acceleration = boost ? 21 : 12.5;
    const friction = brake ? 22 : 5.8;

    if (forward) speedRef.current += acceleration * delta;
    if (backward) speedRef.current -= acceleration * 0.72 * delta;
    if (!forward && !backward) {
      const decay = Math.sign(speedRef.current) * friction * delta;
      speedRef.current = Math.abs(decay) > Math.abs(speedRef.current) ? 0 : speedRef.current - decay;
    }
    if (brake) speedRef.current *= 0.9;

    speedRef.current = THREE.MathUtils.clamp(speedRef.current, -5.3, maxSpeed);

    const turnPower = THREE.MathUtils.clamp(Math.abs(speedRef.current) / 5.4, 0.22, 1);
    if (left) rotationRef.current += 2.05 * turnPower * delta;
    if (right) rotationRef.current -= 2.05 * turnPower * delta;

    forwardVector.set(Math.sin(rotationRef.current), 0, Math.cos(rotationRef.current)).multiplyScalar(-speedRef.current);
    body.setLinvel({ x: forwardVector.x, y: body.linvel().y, z: forwardVector.z }, true);
    body.setRotation(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rotationRef.current, 0)), true);

    const pos = body.translation();
    if (pos.y < -4 || Math.abs(pos.x) > 28 || pos.z > 14 || pos.z < -32) respawn();

    roverTelemetry.position.set(pos.x, pos.y, pos.z);
    roverTelemetry.rotationY = rotationRef.current;

    let nearest = null;
    let nearestDistance = 999;
    zones.forEach((zone) => {
      zoneVector.set(zone.position[0], 0, zone.position[2]);
      const distance = zoneVector.distanceTo(new THREE.Vector3(pos.x, 0, pos.z));
      if (distance < nearestDistance) {
        nearest = zone;
        nearestDistance = distance;
      }
    });
    setNearbyZone(nearestDistance < 4.8 ? nearest : null);
  });

  return (
    <RigidBody
      ref={bodyRef}
      position={[0, 1, 5]}
      colliders={false}
      mass={1.45}
      linearDamping={1.35}
      angularDamping={5}
      enabledRotations={[false, true, false]}
      canSleep={false}
    >
      <RoverVisual />
      <CuboidCollider args={[0.94, 0.36, 1.33]} position={[0, 0.34, 0]} />
    </RigidBody>
  );
}

export default RoverController;
