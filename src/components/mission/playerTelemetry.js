import * as THREE from "three";

export const playerTelemetry = {
  position: new THREE.Vector3(0, 0.1, 6),
  facing: 0,
  moving: false,
  sprinting: false,
  reset: null,
};

export const cameraTelemetry = {
  yaw: -Math.PI / 4,
  pitch: 0.58,
  distance: 11.5,
};

export const controlTelemetry = {
  pointerLocked: false,
  scanPulse: 0,
};
