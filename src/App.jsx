function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Hi, I’m Renish
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
          I build modern web applications.
        </p>
        <button
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "10px",
            background: "#38bdf8",
            color: "#0f172a",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          View My Projects
        </button>
      </div>
    </main>
  );
}

export default App;