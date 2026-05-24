import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { roverTelemetry } from "./roverTelemetry";

const desiredPosition = new THREE.Vector3();
const lookAtPosition = new THREE.Vector3();
const offset = new THREE.Vector3();

function FollowCamera() {
  const { camera } = useThree();

  useFrame((_, delta) => {
    offset.set(Math.sin(roverTelemetry.rotationY) * -8.2, 5.8, Math.cos(roverTelemetry.rotationY) * -8.2);
    desiredPosition.copy(roverTelemetry.position).add(offset);
    lookAtPosition.copy(roverTelemetry.position).add(new THREE.Vector3(0, 1.25, 0));

    camera.position.lerp(desiredPosition, 1 - Math.pow(0.004, delta));
    camera.lookAt(lookAtPosition);
  });

  return null;
}

export default FollowCamera;
