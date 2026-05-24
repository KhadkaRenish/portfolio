import { motion } from "framer-motion";
import { Download, GitBranch, LockKeyhole, Mail, ShieldCheck, SquareUserRound } from "lucide-react";
import { profile } from "../data/portfolioData";

function ResumeVault({ unlocked, onExplore }) {
  return (
    <section id="resume-vault" className="mission-section" onMouseEnter={() => onExplore("resume-vault")}>
      <div className="section-header">
        <div>
          <p className="section-kicker">Zone 05</p>
          <h2>Resume Vault</h2>
        </div>
        {unlocked ? <ShieldCheck className="text-emerald-200" size={42} /> : <LockKeyhole className="text-red-200" size={42} />}
      </div>

      <motion.div className={`vault ${unlocked ? "vault--open" : ""}`} animate={unlocked ? { scale: [1, 1.01, 1] } : {}}>
        <div className="vault-door">
          <span>{unlocked ? "Access Granted" : "Locked"}</span>
          <strong>{unlocked ? "Opening Resume Vault." : "Explore 3 sections or catch all bugs."}</strong>
        </div>

        {unlocked && (
          <div className="vault-actions">
            <a className="primary-button" href={profile.resumeUrl}>
              <Download size={20} />
              Download Resume
            </a>
            <a className="secondary-button" href={profile.linkedin} target="_blank" rel="noreferrer">
              <SquareUserRound size={20} />
              View LinkedIn
            </a>
            <a className="secondary-button" href={profile.github} target="_blank" rel="noreferrer">
              <GitBranch size={20} />
              View GitHub
            </a>
            <a className="secondary-button" href={`mailto:${profile.email}`}>
              <Mail size={20} />
              Contact Me
            </a>
          </div>
        )}
      </motion.div>
    </section>
  );
}

export default ResumeVault;
