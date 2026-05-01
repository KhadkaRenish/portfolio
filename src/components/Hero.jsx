import profilePhoto from "../assets/hero.JPG";

function Hero() {
  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="hero-section__content">
        <p className="hero-kicker">Renish Khadka / QA Automation Engineer</p>
        <h1 id="hero-title">I help teams ship cleaner software with smart testing and automation.</h1>
        <p className="hero-intro">
          I completed my internship at Intuji and currently work as a QA Automation Engineer, building reliable checks for web apps, APIs, regressions, and real user flows.
        </p>
        <div className="hero-actions">
          <a className="button button--primary" href="#projects">
            View QA Work
          </a>
          <a className="button button--ghost" href="#about">
            About Me
          </a>
        </div>
      </div>

      <aside className="hero-card" aria-label="QA profile status card">
        <div className="hero-card__photo">
          <img src={profilePhoto} alt="Renish Khadka" />
        </div>
        <span className="hero-card__label">Current Focus</span>
        <strong>Automation that catches bugs before users do.</strong>
        <div className="hero-card__meta">
          <span>QA Automation</span>
          <span>Intuji intern</span>
        </div>
      </aside>
    </section>
  );
}

export default Hero;
