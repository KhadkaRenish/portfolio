const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar">
        <a className="navbar__brand" href="#home" aria-label="Go to homepage">
          <span className="navbar__brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>

          <span className="navbar__brand-copy">
            <strong>Renish</strong>
            <small>Let's go</small>
          </span>
        </a>

        <div className="navbar__meta" aria-label="Current professional focus">
          <span className="navbar__status-dot" aria-hidden="true" />
          Infrastructure Ready
        </div>

        <ul className="navbar__links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <a className="navbar__cta" href="#contact">
          Book a Call
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
