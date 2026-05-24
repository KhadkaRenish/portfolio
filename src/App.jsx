import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useMemo, useState } from "react";
import BootScreen from "./components/BootScreen";
import LandingMissionScreen from "./components/LandingMissionScreen";
import RecruiterMode from "./components/RecruiterMode";
import WebGLFallback from "./components/game/WebGLFallback";

const WalkingPortfolioGame = lazy(() => import("./components/mission/WalkingPortfolioGame"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

function App() {
  const [missionStarted, setMissionStarted] = useState(false);
  const [booting, setBooting] = useState(false);
  const [forceRecruiterMode, setForceRecruiterMode] = useState(false);
  const webglSupported = useMemo(() => supportsWebGL(), []);

  const openRecruiterMode = () => {
    setForceRecruiterMode(true);
    window.setTimeout(() => document.getElementById("recruiter-mode")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const enterMission = () => {
    setMissionStarted(true);
    setBooting(false);
    window.setTimeout(() => document.getElementById("game-world")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const startMission = () => {
    if (!webglSupported) {
      openRecruiterMode();
      return;
    }
    setBooting(true);
    window.setTimeout(enterMission, 2600);
  };

  if (!webglSupported) {
    return <WebGLFallback />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <AnimatePresence>{booting && <BootScreen onSkip={enterMission} />}</AnimatePresence>

      {!missionStarted && (
        <LandingMissionScreen onStartMission={startMission} onRecruiterMode={openRecruiterMode} />
      )}

      {missionStarted && webglSupported && (
        <section id="game-world" className="relative h-screen min-h-[620px] overflow-hidden">
          <Suspense
            fallback={
              <div className="game-loader">
                Loading QA Mission Walkthrough...
              </div>
            }
          >
            <WalkingPortfolioGame onRecruiterMode={openRecruiterMode} />
          </Suspense>
        </section>
      )}

      {(forceRecruiterMode || !missionStarted) && <RecruiterMode />}
    </div>
  );
}

export default App;
