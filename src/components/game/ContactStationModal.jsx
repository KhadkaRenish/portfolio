import { GitBranch, Mail, MapPin, SquareUserRound, UserRoundCheck } from "lucide-react";
import { contactLinks, profile } from "../../data/portfolioData";
import ModalShell from "./ModalShell";

function ContactStationModal() {
  return (
    <ModalShell modalId="contact-station" kicker="Contact Station" title="Open Channel">
      <div className="grid gap-3">
        <a className="contact-row" href={contactLinks.email}>
          <Mail size={20} />
          {profile.email}
        </a>
        <a className="contact-row" href={contactLinks.linkedin} target="_blank" rel="noreferrer">
          <SquareUserRound size={20} />
          LinkedIn
        </a>
        <a className="contact-row" href={contactLinks.github} target="_blank" rel="noreferrer">
          <GitBranch size={20} />
          GitHub
        </a>
        <span className="contact-row">
          <MapPin size={20} />
          {profile.location}
        </span>
        <span className="contact-row">
          <UserRoundCheck size={20} />
          Role: {profile.role}
        </span>
      </div>
      <a className="primary-button mt-5 w-full" href={`${contactLinks.email}?subject=QA%20Automation%20Opportunity`}>
        <Mail size={20} />
        Launch Email
      </a>
    </ModalShell>
  );
}

export default ContactStationModal;
