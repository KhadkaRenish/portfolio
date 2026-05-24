import { create } from "zustand";
import { persist } from "zustand/middleware";
import { missionCheckpoints } from "../data/portfolioData";

const unique = (items) => [...new Set(items)];
const missionConfidence = (completedCount) => (completedCount >= missionCheckpoints.length ? 100 : 35 + completedCount * 13);

export const useGameStore = create(
  persist(
    (set, get) => ({
      completedMissions: [],
      unlockedSkills: [],
      visitedZones: [],
      achievements: [],
      activeModal: null,
      activeMissionId: null,
      nearbyTarget: null,
      notification: null,
      quality: "high",
      miniMapOpen: true,
      pointerLocked: false,
      scanPulse: 0,
      controls: {
        forward: false,
        backward: false,
        left: false,
        right: false,
        boost: false,
        brake: false,
      },
      setControl: (key, value) =>
        set((state) => ({
          controls: { ...state.controls, [key]: value },
        })),
      toggleMiniMap: () => set((state) => ({ miniMapOpen: !state.miniMapOpen })),
      setQuality: (quality) => set({ quality }),
      setPointerLocked: (pointerLocked) => set({ pointerLocked }),
      triggerScanPulse: () => set((state) => ({ scanPulse: state.scanPulse + 1 })),
      setNearbyTarget: (target) => set({ nearbyTarget: target }),
      setNearbyZone: (target) => set({ nearbyTarget: target }),
      openModal: (modal) => set({ activeModal: modal }),
      closeModal: () => set({ activeModal: null, activeMissionId: null }),
      openMission: (missionId) => set({ activeModal: "mission-scenario", activeMissionId: missionId }),
      notify: (notification) => {
        set({ notification });
        window.setTimeout(() => {
          if (get().notification?.id === notification.id) {
            set({ notification: null });
          }
        }, 3400);
      },
      addAchievement: (achievement) =>
        set((state) => {
          if (state.achievements.includes(achievement.id)) return state;
          return {
            achievements: [...state.achievements, achievement.id],
            notification: {
              id: `achievement-${achievement.id}`,
              title: "Achievement Unlocked",
              detail: achievement.title,
              type: "achievement",
            },
          };
        }),
      visitZone: (zoneId) =>
        set((state) => ({
          visitedZones: unique([...state.visitedZones, zoneId]),
        })),
      completeMission: (mission) =>
        set((state) => {
          if (state.completedMissions.includes(mission.id)) return state;

          const completedMissions = [...state.completedMissions, mission.id];
          const unlockedSkills = unique([...state.unlockedSkills, ...mission.unlocks]);
          const achievements = [...state.achievements];

          if (!achievements.includes("first-bug-fixed")) achievements.push("first-bug-fixed");
          if (!achievements.includes(mission.achievement)) achievements.push(mission.achievement);
          if (completedMissions.length === missionCheckpoints.length) {
            if (!achievements.includes("release-ready")) achievements.push("release-ready");
            if (!achievements.includes("resume-vault")) achievements.push("resume-vault");
          }

          const confidence = missionConfidence(completedMissions.length);

          return {
            completedMissions,
            unlockedSkills,
            achievements,
            notification: {
              id: `mission-${mission.id}`,
              title: `${mission.shortLabel} Fixed`,
              detail: `Release confidence increased to ${confidence}%.`,
              type: "bug",
            },
          };
        }),
      catchBug: (bug) => get().completeMission(bug),
      markRecruiterMode: () =>
        set((state) => ({
          achievements: state.achievements.includes("recruiter-mode")
            ? state.achievements
            : [...state.achievements, "recruiter-mode"],
          notification: {
            id: "recruiter-mode",
            title: "Recruiter Mode Activated",
            detail: "Clean portfolio view is ready.",
            type: "achievement",
          },
        })),
      resetMission: () =>
        set({
          completedMissions: [],
          unlockedSkills: [],
          visitedZones: [],
          achievements: [],
          activeModal: null,
          activeMissionId: null,
          nearbyTarget: null,
          notification: null,
          pointerLocked: false,
          scanPulse: 0,
        }),
    }),
    {
      name: "renish-qa-mission-progress",
      partialize: (state) => ({
        completedMissions: state.completedMissions,
        unlockedSkills: state.unlockedSkills,
        visitedZones: state.visitedZones,
        achievements: state.achievements,
        quality: state.quality,
        miniMapOpen: state.miniMapOpen,
      }),
    },
  ),
);

export const selectReleaseConfidence = (state) => missionConfidence(state.completedMissions.length);
export const selectResumeUnlocked = (state) => state.completedMissions.length === missionCheckpoints.length;
