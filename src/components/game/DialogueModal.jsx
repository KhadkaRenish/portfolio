import { Bot, ServerCog } from "lucide-react";
import { profile, zones } from "../../data/portfolioData";
import ModalShell from "./ModalShell";

function DialogueModal() {
  const missionControl = zones.find((zone) => zone.id === "mission-control");

  return (
    <>
      <ModalShell modalId="mission-control" kicker="Mission Control Base" title="Welcome to Renish Mission Control">
        <p className="text-lg leading-8 text-slate-200">{missionControl?.prompt}</p>
      </ModalShell>

      <ModalShell modalId="qa-lab" kicker="ReniBot Dialogue" title="QA Lab">
        <div className="flex items-start gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-100">
            <Bot />
          </div>
          <p className="text-lg leading-8 text-slate-200">
            Hi, I&apos;m Renish, a QA Automation Engineer focused on backend quality, API testing, business logic
            validation, database testing, and automation frameworks.
          </p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {["QA mindset", "Testing focus", "Backend confidence"].map((item) => (
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4" key={item}>
              <ServerCog className="mb-3 text-emerald-200" />
              <strong className="text-white">{item}</strong>
              <p className="mt-2 text-sm leading-6 text-slate-300">{profile.mindset}</p>
            </div>
          ))}
        </div>
      </ModalShell>

      <ModalShell modalId="bug-arena" kicker="Bug Battle Arena" title="Drive Into Bugs To Catch Them">
        <p className="text-lg leading-8 text-slate-200">
          The arena contains eight production risks. Touch a floating bug with the rover to capture it and reveal how
          Renish handles that class of issue.
        </p>
      </ModalShell>
    </>
  );
}

export default DialogueModal;
