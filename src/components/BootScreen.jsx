import { motion } from "framer-motion";

function BootScreen({ onSkip }) {
  const bootLines = [
    "Initializing Mission Control...",
    "Loading QA automation modules...",
    "Scanning production threat map...",
    "ReniBot online.",
    "System Scan Complete.",
  ];

  return (
    <motion.div className="boot-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="boot-card">
        <p className="section-kicker">Boot Sequence</p>
        <div className="mt-5 space-y-3 font-mono text-sm text-emerald-100 sm:text-base">
          {bootLines.map((line, index) => (
            <motion.p key={line} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.24 }}>
              &gt; {line}
            </motion.p>
          ))}
        </div>
        <div className="mt-7 h-2 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-violet-300"
            initial={{ width: "5%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.35 }}
          />
        </div>
        <button className="secondary-button mt-6 w-full" type="button" onClick={onSkip}>
          Skip Boot
        </button>
      </div>
    </motion.div>
  );
}

export default BootScreen;
