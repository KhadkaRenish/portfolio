import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cameraTelemetry, playerTelemetry } from "./playerTelemetry";

const targetPosition = new THREE.Vector3();
const lookAt = new THREE.Vector3();
const cameraOffset = new THREE.Vector3();

function FollowCamera() {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const horizontalDistance = cameraTelemetry.distance * Math.cos(cameraTelemetry.pitch);
    cameraOffset.set(
      Math.sin(cameraTelemetry.yaw) * -horizontalDistance,
      cameraTelemetry.distance * Math.sin(cameraTelemetry.pitch),
      Math.cos(cameraTelemetry.yaw) * -horizontalDistance,
    );
    targetPosition.copy(playerTelemetry.position).add(cameraOffset);
    targetPosition.y = Math.max(targetPosition.y, 3.2);
    lookAt.copy(playerTelemetry.position).add(new THREE.Vector3(0, 1.05, 0));
    camera.position.lerp(targetPosition, 1 - Math.pow(0.007, delta));
    camera.lookAt(lookAt);
  });

  return null;
}

export default FollowCamera;
