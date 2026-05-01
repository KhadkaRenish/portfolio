import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY.current;

      if (currentScrollY < 80) {
        setIsHidden(false);
      } else if (scrollDifference > 8) {
        setIsHidden(true);
      } else if (scrollDifference < -8) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header${isHidden ? " site-header--hidden" : ""}`}>
      <nav className="navbar" aria-label="Primary navigation">
        <a className="navbar__brand" href="#home" aria-label="Go to homepage">
          <span className="navbar__brand-mark" aria-hidden="true">R</span>
          <span className="navbar__brand-copy">
            <strong>Renish Khadka</strong>
            <small>QA Automation Engineer</small>
          </span>
        </a>

        <ul className="navbar__links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <a className="navbar__cta" href="#contact">
          Hire Me
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
