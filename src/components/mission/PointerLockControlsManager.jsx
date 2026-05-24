import { useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { cameraTelemetry, controlTelemetry } from "./playerTelemetry";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function PointerLockControlsManager({ targetRef }) {
  const activeModal = useGameStore((state) => state.activeModal);
  const openMission = useGameStore((state) => state.openMission);
  const openModal = useGameStore((state) => state.openModal);
  const visitZone = useGameStore((state) => state.visitZone);
  const triggerScanPulse = useGameStore((state) => state.triggerScanPulse);
  const setPointerLocked = useGameStore((state) => state.setPointerLocked);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return undefined;
    let dragLookActive = false;
    let lastTouch = null;
    let touchMoved = false;

    const unlockPointer = () => {
      if (document.pointerLockElement === element) {
        document.exitPointerLock();
      }
    };

    const interactOrScan = () => {
      const target = useGameStore.getState().nearbyTarget;
      if (target?.kind === "mission") {
        unlockPointer();
        openMission(target.id);
        return;
      }
      if (target?.kind === "zone") {
        unlockPointer();
        visitZone(target.id);
        openModal(target.id);
        return;
      }
      triggerScanPulse();
    };

    const requestPointer = () => {
      if (activeModal) return;
      if (document.pointerLockElement !== element && element.requestPointerLock) {
        element.requestPointerLock();
      }
    };

    const handleMouseDown = (event) => {
      if (event.target.closest?.("button, a, .modal-card, .hud-card")) {
        return;
      }

      if (event.button === 2) {
        event.preventDefault();
        triggerScanPulse();
        return;
      }

      if (event.button !== 0) return;
      if (document.pointerLockElement === element) {
        interactOrScan();
      } else if (element.requestPointerLock) {
        requestPointer();
      } else {
        dragLookActive = true;
      }
    };

    const handleMouseMove = (event) => {
      if (document.pointerLockElement !== element && !dragLookActive) return;
      cameraTelemetry.yaw -= event.movementX * 0.0022;
      cameraTelemetry.pitch = clamp(cameraTelemetry.pitch - event.movementY * 0.0015, 0.32, 0.88);
    };

    const handleMouseUp = () => {
      if (!dragLookActive) return;
      dragLookActive = false;
      interactOrScan();
    };

    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === element;
      controlTelemetry.pointerLocked = locked;
      setPointerLocked(locked);
    };

    const handleContextMenu = (event) => event.preventDefault();
    const handleTouchStart = (event) => {
      if (event.target.closest?.("button, a, .modal-card, .hud-card")) return;
      const touch = event.touches[0];
      lastTouch = touch ? { x: touch.clientX, y: touch.clientY } : null;
      touchMoved = false;
    };
    const handleTouchMove = (event) => {
      if (!lastTouch) return;
      const touch = event.touches[0];
      if (!touch) return;
      const dx = touch.clientX - lastTouch.x;
      const dy = touch.clientY - lastTouch.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) touchMoved = true;
      cameraTelemetry.yaw -= dx * 0.004;
      cameraTelemetry.pitch = clamp(cameraTelemetry.pitch - dy * 0.0028, 0.32, 0.88);
      lastTouch = { x: touch.clientX, y: touch.clientY };
    };
    const handleTouchEnd = () => {
      if (lastTouch && !touchMoved) {
        interactOrScan();
      }
      lastTouch = null;
      touchMoved = false;
    };

    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("contextmenu", handleContextMenu);
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: true });
    element.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("contextmenu", handleContextMenu);
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
    };
  }, [activeModal, openMission, openModal, setPointerLocked, targetRef, triggerScanPulse, visitZone]);

  useEffect(() => {
    if (!activeModal) return;
    const element = targetRef.current;
    if (document.pointerLockElement === element) {
      document.exitPointerLock();
    }
  }, [activeModal, targetRef]);

  return null;
}

export default PointerLockControlsManager;
