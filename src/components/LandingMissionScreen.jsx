import { motion } from "framer-motion";
import { Crosshair, Radio, ShieldCheck, Terminal } from "lucide-react";

function LandingMissionScreen({ onStartMission, onRecruiterMode }) {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="mission-grid absolute inset-0 opacity-60" />
      <div className="scan-line absolute inset-x-0 top-0 h-28" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col justify-between">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-cyan-300/20 bg-slate-950/55 px-4 py-3 shadow-[0_0_60px_rgba(34,211,238,0.12)] backdrop-blur-xl">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-cyan-200">
              <ShieldCheck size={22} />
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.24em] text-white">Bug Hunter</span>
              <span className="block text-xs text-cyan-200">QA Mission Walkthrough</span>
            </span>
          </a>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
            <span className="size-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            Release Status: Pending
          </div>
        </header>

        <div className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
              <Radio size={15} />
              Welcome to Mission Control
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              Bug Hunter: QA Mission Walkthrough
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-slate-300">
              <p>Production release is blocked. Critical bugs are hidden across the system.</p>
              <p>
                Walk the mission, investigate each bug scenario, choose the correct QA action, unlock skills, and ship
                the release.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <button className="primary-button" type="button" onClick={onStartMission}>
                <Crosshair size={20} />
                Start Mission
              </button>
              <button className="secondary-button" type="button" onClick={onRecruiterMode}>
                <Terminal size={20} />
                Recruiter Mode
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="hud-panel min-h-[480px] p-5"
          >
            <div className="mb-5 flex items-center justify-between border-b border-cyan-200/10 pb-4">
              <span className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">System Scan</span>
              <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-200">5 critical bugs</span>
            </div>
            <div className="space-y-4">
              {["API evidence", "Database integrity", "Auth expiry", "Regression risk"].map((item, index) => (
                <motion.div
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
                  key={item}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.1 }}
                >
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-bold text-white">{item}</span>
                    <span className="text-cyan-200">Scanning...</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-violet-300"
                      initial={{ width: "8%" }}
                      animate={{ width: `${58 + index * 10}%` }}
                      transition={{ duration: 1.5, delay: 0.3 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 font-mono text-sm leading-7 text-emerald-100">
              <p>&gt; Booting QA mission protocol...</p>
              <p>&gt; ReniBot online.</p>
              <p>&gt; Recruiter data preserved.</p>
              <p className="terminal-cursor">&gt; Awaiting mission start</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LandingMissionScreen;
