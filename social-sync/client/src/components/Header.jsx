function Header({ optimized = false }) {
  return (
    <header className="header">
      <div>
        <h1>SocialSync</h1>
        <p>Interactive Post Scheduler & Performance Lab</p>
      </div>

      <div
        className={`status-badge ${
          optimized ? "optimized" : ""
        }`}
      >
        <span className="status-dot"></span>
        {optimized ? "Optimized Mode" : "Baseline Mode"}
      </div>
    </header>
  );
}

export default Header;