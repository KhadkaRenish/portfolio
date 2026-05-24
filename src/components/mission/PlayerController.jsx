import { Text, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { missionCheckpoints, missionZones } from "../../data/portfolioData";
import { useGameStore } from "../../store/gameStore";
import { cameraTelemetry, playerTelemetry } from "./playerTelemetry";

const moveVector = new THREE.Vector3();
const tempVector = new THREE.Vector3();

function QAAvatar() {
  const avatarRef = useRef(null);
  const leftLeg = useRef(null);
  const rightLeg = useRef(null);
  const leftArm = useRef(null);
  const rightArm = useRef(null);
  const head = useRef(null);
  const scanner = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const walking = playerTelemetry.moving;
    const swing = walking ? Math.sin(t * 10.5) * 0.34 : Math.sin(t * 2) * 0.035;
    const bob = Math.sin(t * (walking ? 10.5 : 2)) * (walking ? 0.035 : 0.014);
    if (avatarRef.current) {
      avatarRef.current.position.y = bob;
      avatarRef.current.rotation.z = walking ? Math.sin(t * 10.5) * 0.025 : 0;
    }
    if (leftLeg.current) leftLeg.current.rotation.x = swing;
    if (rightLeg.current) rightLeg.current.rotation.x = -swing;
    if (leftArm.current) leftArm.current.rotation.x = -swing * 0.72;
    if (rightArm.current) rightArm.current.rotation.x = swing * 0.72;
    if (head.current) head.current.position.y = 1.88 + bob * 0.45;
    if (scanner.current) scanner.current.material.opacity = 0.68 + Math.sin(t * 5) * 0.18;
  });

  return (
    <group ref={avatarRef}>
      <mesh position={[0, 2.38, 0]}>
        <boxGeometry args={[1.52, 0.26, 0.06]} />
        <meshBasicMaterial color="#020617" transparent opacity={0.72} />
      </mesh>
      <TextLabel />
      <mesh castShadow position={[0, 1.12, 0]}>
        <capsuleGeometry args={[0.32, 0.78, 8, 16]} />
        <meshStandardMaterial color="#0f172a" emissive="#38bdf8" emissiveIntensity={0.1} metalness={0.26} roughness={0.42} />
      </mesh>
      <mesh castShadow position={[0, 1.52, -0.08]}>
        <boxGeometry args={[0.78, 0.5, 0.3]} />
        <meshStandardMaterial color="#134e4a" emissive="#22d3ee" emissiveIntensity={0.15} roughness={0.36} />
      </mesh>
      <mesh castShadow position={[0, 1.4, 0.28]}>
        <boxGeometry args={[0.62, 0.72, 0.18]} />
        <meshStandardMaterial color="#020617" emissive="#a78bfa" emissiveIntensity={0.08} roughness={0.35} />
      </mesh>
      <mesh ref={head} castShadow position={[0, 1.88, 0]}>
        <sphereGeometry args={[0.24, 18, 18]} />
        <meshStandardMaterial color="#d7b899" roughness={0.55} />
      </mesh>
      <mesh position={[0, 1.91, -0.2]}>
        <boxGeometry args={[0.42, 0.07, 0.045]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.92} />
      </mesh>
      <mesh position={[-0.29, 1.93, 0]}>
        <torusGeometry args={[0.08, 0.012, 6, 18]} />
        <meshBasicMaterial color="#67e8f9" />
      </mesh>
      <mesh position={[0, 2.08, 0]}>
        <boxGeometry args={[0.52, 0.16, 0.42]} />
        <meshStandardMaterial color="#020617" roughness={0.45} />
      </mesh>
      <mesh position={[0, 1.52, -0.23]}>
        <boxGeometry args={[0.52, 0.18, 0.04]} />
        <meshBasicMaterial color="#bef264" transparent opacity={0.78} />
      </mesh>
      <mesh ref={leftArm} castShadow position={[-0.48, 1.22, 0]}>
        <capsuleGeometry args={[0.08, 0.58, 6, 12]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh ref={rightArm} castShadow position={[0.48, 1.22, 0]}>
        <capsuleGeometry args={[0.08, 0.58, 6, 12]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh ref={scanner} position={[0.6, 1.08, -0.18]} rotation={[0.2, -0.45, 0.1]}>
        <boxGeometry args={[0.32, 0.22, 0.035]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.84} />
      </mesh>
      <mesh ref={leftLeg} castShadow position={[-0.18, 0.58, 0]}>
        <capsuleGeometry args={[0.09, 0.72, 6, 12]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh ref={rightLeg} castShadow position={[0.18, 0.58, 0]}>
        <capsuleGeometry args={[0.09, 0.72, 6, 12]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.68, 40]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.42} />
      </mesh>
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 32]} />
        <meshBasicMaterial color="#020617" transparent opacity={0.34} />
      </mesh>
      <pointLight color="#67e8f9" intensity={0.38} distance={4} position={[0, 1.2, 0]} />
    </group>
  );
}

function TextLabel() {
  return (
    <group position={[0, 2.4, -0.04]}>
      <mesh>
        <boxGeometry args={[1.45, 0.24, 0.035]} />
        <meshBasicMaterial color="#020617" transparent opacity={0.62} />
      </mesh>
      <Text position={[0, 0.01, -0.03]} fontSize={0.105} color="#cffafe" anchorX="center" anchorY="middle">
        Renish QA Agent
      </Text>
    </group>
  );
}

function PlayerController() {
  const groupRef = useRef(null);
  const velocityRef = useRef(new THREE.Vector3());
  const [, getKeys] = useKeyboardControls();
  const controls = useGameStore((state) => state.controls);
  const setNearbyTarget = useGameStore((state) => state.setNearbyTarget);
  const openMission = useGameStore((state) => state.openMission);
  const openModal = useGameStore((state) => state.openModal);
  const visitZone = useGameStore((state) => state.visitZone);
  const toggleMiniMap = useGameStore((state) => state.toggleMiniMap);
  const triggerScanPulse = useGameStore((state) => state.triggerScanPulse);

  const reset = () => {
    if (!groupRef.current) return;
    groupRef.current.position.set(0, 0.1, 6);
    velocityRef.current.set(0, 0, 0);
    playerTelemetry.position.set(0, 0.1, 6);
  };

  useEffect(() => {
    playerTelemetry.reset = reset;
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (useGameStore.getState().pointerLocked && ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
        event.preventDefault();
      }
      if (event.code === "KeyR") reset();
      if (event.code === "KeyM") toggleMiniMap();
      if (event.code === "Space") triggerScanPulse();
      if (event.code === "KeyE" || event.code === "Enter") {
        const target = useGameStore.getState().nearbyTarget;
        if (!target) return;
        if (target.kind === "mission") {
          openMission(target.id);
        } else {
          visitZone(target.id);
          openModal(target.id);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openMission, openModal, toggleMiniMap, triggerScanPulse, visitZone]);

  useFrame((_, delta) => {
    const player = groupRef.current;
    if (!player) return;

    const keys = getKeys();
    moveVector.set(0, 0, 0);
    const forwardPressed = keys.forward || controls.forward;
    const backwardPressed = keys.backward || controls.backward;
    const leftPressed = keys.left || controls.left;
    const rightPressed = keys.right || controls.right;
    const sprinting = keys.boost || controls.boost;
    const forward = new THREE.Vector3(Math.sin(cameraTelemetry.yaw), 0, Math.cos(cameraTelemetry.yaw)).normalize();
    const right = new THREE.Vector3(Math.cos(cameraTelemetry.yaw), 0, -Math.sin(cameraTelemetry.yaw)).normalize();
    if (forwardPressed) moveVector.add(forward);
    if (backwardPressed) moveVector.sub(forward);
    if (rightPressed) moveVector.add(right);
    if (leftPressed) moveVector.sub(right);

    const moving = moveVector.lengthSq() > 0;
    playerTelemetry.moving = moving;
    playerTelemetry.sprinting = moving && sprinting;
    if (moving) {
      moveVector.normalize();
      playerTelemetry.facing = Math.atan2(moveVector.x, moveVector.z);
      player.rotation.y = THREE.MathUtils.lerp(player.rotation.y, playerTelemetry.facing, 1 - Math.pow(0.001, delta));
    }

    const targetVelocity = moveVector.multiplyScalar(sprinting ? 7.4 : 5.25);
    velocityRef.current.lerp(targetVelocity, 1 - Math.pow(moving ? 0.00038 : 0.00002, delta));
    player.position.addScaledVector(velocityRef.current, delta);
    player.position.x = THREE.MathUtils.clamp(player.position.x, -22, 22);
    player.position.z = THREE.MathUtils.clamp(player.position.z, -30, 10);
    player.position.y = 0.1;

    playerTelemetry.position.copy(player.position);

    let nearest = null;
    let distance = 999;
    [...missionCheckpoints.map((mission) => ({ ...mission, kind: "mission" })), ...missionZones.map((zone) => ({ ...zone, kind: "zone" }))].forEach((target) => {
      tempVector.set(target.position[0], 0.1, target.position[2]);
      const targetDistance = tempVector.distanceTo(player.position);
      if (targetDistance < distance) {
        nearest = target;
        distance = targetDistance;
      }
    });
    setNearbyTarget(distance < 4.15 ? nearest : null);
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 6]}>
      <QAAvatar />
    </group>
  );
}

export default PlayerController;
