function OptimizationPanel({
  optimizations = {
    reactMemo: { enabled: false, count: 0 },
    useMemo: { enabled: false, count: 0 },
    useCallback: { enabled: false, count: 0 }
  },
  onToggle = () => {}
}) {
  const totalToggles =
    optimizations.reactMemo.count +
    optimizations.useMemo.count +
    optimizations.useCallback.count;

  const activeOptimizations =
    Number(optimizations.reactMemo.enabled) +
    Number(optimizations.useMemo.enabled) +
    Number(optimizations.useCallback.enabled);

  return (
    <div className="optimization-panel card">

      <h2>Performance Optimization</h2>

      <p>
        Enable or disable optimization techniques and monitor their impact.
      </p>

      {/* React.memo */}

      <div className="optimization-item">

        <div>
          <strong>React.memo</strong>

          <span>
            Prevents unnecessary component re-renders.
          </span>
        </div>

        <div className="optimization-control">

          <button
            type="button"
            className={`toggle-btn ${
              optimizations.reactMemo.enabled ? "active" : ""
            }`}
            onClick={() => onToggle("reactMemo")}
          >
            {optimizations.reactMemo.enabled ? "ON" : "OFF"}
          </button>

          <small>
            Toggles: {optimizations.reactMemo.count}
          </small>

        </div>

      </div>

      {/* useMemo */}

      <div className="optimization-item">

        <div>
          <strong>useMemo</strong>

          <span>
            Caches expensive calculations between renders.
          </span>
        </div>

        <div className="optimization-control">

          <button
            type="button"
            className={`toggle-btn ${
              optimizations.useMemo.enabled ? "active" : ""
            }`}
            onClick={() => onToggle("useMemo")}
          >
            {optimizations.useMemo.enabled ? "ON" : "OFF"}
          </button>

          <small>
            Toggles: {optimizations.useMemo.count}
          </small>

        </div>

      </div>

      {/* useCallback */}

      <div className="optimization-item">

        <div>
          <strong>useCallback</strong>

          <span>
            Maintains stable function references.
          </span>
        </div>

        <div className="optimization-control">

          <button
            type="button"
            className={`toggle-btn ${
              optimizations.useCallback.enabled ? "active" : ""
            }`}
            onClick={() => onToggle("useCallback")}
          >
            {optimizations.useCallback.enabled ? "ON" : "OFF"}
          </button>

          <small>
            Toggles: {optimizations.useCallback.count}
          </small>

        </div>

      </div>

      {/* Summary */}

      <div className="optimization-summary">

        <div>
          <span>Total Toggles</span>
          <strong>{totalToggles}</strong>
        </div>

        <div>
          <span>Active</span>
          <strong>{activeOptimizations} / 3</strong>
        </div>

      </div>

    </div>
  );
}

export default OptimizationPanel;