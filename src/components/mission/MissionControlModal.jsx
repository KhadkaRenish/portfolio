import { profile } from "../../data/portfolioData";
import ModalShell from "./ModalShell";

function MissionControlModal() {
  return (
    <ModalShell modalId="mission-control" kicker="Mission Control" title="Production Release Is Blocked">
      <p className="text-lg leading-8 text-slate-200">
        Critical bugs are hidden across the system. Walk to each checkpoint, investigate the scenario, choose the QA
        action that proves the issue, and approve the release.
      </p>
      <p className="mt-4 leading-7 text-slate-300">
        You are exploring how {profile.name} thinks as a {profile.role}: validating APIs, databases, auth behavior,
        regressions, and business rules with evidence.
      </p>
    </ModalShell>
  );
}

export default MissionControlModal;
