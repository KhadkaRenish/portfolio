import { Download, GitBranch, LockKeyhole, Mail, ShieldCheck, SquareUserRound } from "lucide-react";
import { contactLinks } from "../../data/portfolioData";
import { selectResumeUnlocked, useGameStore } from "../../store/gameStore";
import ModalShell from "./ModalShell";

function ResumeVaultModal() {
  const unlocked = useGameStore(selectResumeUnlocked);

  return (
    <ModalShell modalId="resume-vault" kicker="Resume Vault" title={unlocked ? "Access Granted" : "Vault Locked"}>
      {unlocked ? (
        <div>
          <div className="mb-5 flex items-center gap-3 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-100">
            <ShieldCheck />
            Access Granted. Resume Vault Opened.
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a className="primary-button" href={contactLinks.resume}>
              <Download size={20} />
              Download Resume
            </a>
            <a className="secondary-button" href={contactLinks.linkedin} target="_blank" rel="noreferrer">
              <SquareUserRound size={20} />
              View LinkedIn
            </a>
            <a className="secondary-button" href={contactLinks.github} target="_blank" rel="noreferrer">
              <GitBranch size={20} />
              View GitHub
            </a>
            <a className="secondary-button" href={contactLinks.email}>
              <Mail size={20} />
              Contact Me
            </a>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border border-red-300/20 bg-red-300/10 p-4 text-red-100">
          <LockKeyhole />
          Resume Vault Locked. Complete mission objectives to unlock.
        </div>
      )}
    </ModalShell>
  );
}

export default ResumeVaultModal;
