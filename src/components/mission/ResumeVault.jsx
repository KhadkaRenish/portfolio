import { Download, GitBranch, LockKeyhole, Mail, ShieldCheck, SquareUserRound } from "lucide-react";
import { contactLinks } from "../../data/portfolioData";
import { selectResumeUnlocked, useGameStore } from "../../store/gameStore";
import ModalShell from "./ModalShell";

function ResumeVault() {
  const unlocked = useGameStore(selectResumeUnlocked);

  return (
    <ModalShell modalId="resume-vault" kicker="Resume Vault" title={unlocked ? "Production Release Approved" : "Release Approval Locked"}>
      {unlocked ? (
        <>
          <div className="vault-unlock-panel mb-5">
            <ShieldCheck />
            <div>
              <strong>Production Release Approved. Resume Vault Unlocked.</strong>
              <p>All critical production bugs have been fixed with QA evidence.</p>
            </div>
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
        </>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border border-red-300/20 bg-red-300/10 p-4 text-red-100">
          <LockKeyhole />
          Resume Vault Locked. Fix all critical production bugs to approve the release.
        </div>
      )}
    </ModalShell>
  );
}

export default ResumeVault;
