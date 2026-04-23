function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      backgroundColor: "#0f172a",
      color: "white"
    }}>
      <h2>Renish</h2>

      <ul style={{
        display: "flex",
        gap: "20px",
        listStyle: "none",
        margin: 0,
        padding: 0
      }}>
        <li><a href="#home" style={{ color: "white", textDecoration: "none" }}>Home</a></li>
        <li><a href="#about" style={{ color: "white", textDecoration: "none" }}>About</a></li>
        <li><a href="#projects" style={{ color: "white", textDecoration: "none" }}>Projects</a></li>
        <li><a href="#contact" style={{ color: "white", textDecoration: "none" }}>Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;