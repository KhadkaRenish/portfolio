import { GitBranch, Mail, MapPin, RadioTower, SquareUserRound, UserRoundCheck } from "lucide-react";
import { profile } from "../data/portfolioData";

function ContactStation({ onExplore }) {
  return (
    <section id="contact-station" className="mission-section" onMouseEnter={() => onExplore("contact-station")}>
      <div className="section-header">
        <div>
          <p className="section-kicker">Zone 06</p>
          <h2>Contact Station</h2>
        </div>
        <RadioTower className="text-cyan-200" size={42} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="contact-console">
          <a href={`mailto:${profile.email}`}>
            <Mail size={20} />
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <SquareUserRound size={20} />
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <GitBranch size={20} />
            GitHub
          </a>
          <span>
            <MapPin size={20} />
            {profile.location}
          </span>
          <span>
            <UserRoundCheck size={20} />
            Role: {profile.role}
          </span>
        </div>

        <div className="hud-panel p-5">
          <p className="section-kicker">Open Channel</p>
          <h3 className="mt-3 text-3xl font-black text-white">Need QA automation firepower?</h3>
          <p className="mt-4 leading-7 text-slate-300">
            Send a signal for backend testing, API automation, regression coverage, business rule validation, or release
            confidence work.
          </p>
          <a className="primary-button mt-6 w-full" href={`mailto:${profile.email}?subject=QA%20Automation%20Opportunity`}>
            <Mail size={20} />
            Launch Email
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactStation;
