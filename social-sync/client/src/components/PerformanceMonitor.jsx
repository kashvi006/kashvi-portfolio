import { useState } from "react";

function PerformanceMonitor({
  baseline,
  optimized,
  activeOptimizations,
}) {
  const [showDetails, setShowDetails] = useState(false);

  const baselineTime = baseline?.duration || 0;
  const optimizedTime = optimized?.duration || 0;

  let improvement = 0;

  if (baselineTime > 0 && optimizedTime > 0) {
    improvement =
      ((baselineTime - optimizedTime) / baselineTime) * 100;
  }

  if (improvement < 0) {
    improvement = 0;
  }

  return (
    <div className="performance-monitor">

      {/* HEADER */}

      <div className="performance-monitor-header">

        <div>
          <h2>Performance Monitor</h2>

          <p>
            Real-time React rendering measurements
            using the React Profiler.
          </p>
        </div>

        <div
          className={
            activeOptimizations > 0
              ? "mode-badge optimized"
              : "mode-badge baseline"
          }
        >
          {activeOptimizations > 0
            ? "Optimized Mode"
            : "Baseline Mode"}
        </div>

      </div>

      {/* SUMMARY */}

      <div className="performance-grid">

        <div className="performance-card">

          <span>Baseline Render</span>

          <strong>
            {baselineTime.toFixed(3)} ms
          </strong>

          <small>
            {baseline?.renders || 0} commits
          </small>

        </div>

        <div className="performance-card">

          <span>Optimized Render</span>

          <strong>
            {optimizedTime.toFixed(3)} ms
          </strong>

          <small>
            {optimized?.renders || 0} commits
          </small>

        </div>

        <div className="performance-card">

          <span>Performance Improvement</span>

          <strong className="improvement-value">
            {improvement.toFixed(1)}%
          </strong>

          <small>
            Lower render duration
          </small>

        </div>

      </div>

      {/* ACTIVE OPTIMIZATIONS */}

      <div className="optimization-summary">

        <span>
          Active Optimizations
        </span>

        <strong>
          {activeOptimizations} / 3
        </strong>

      </div>

      {/* DETAILS */}

      <button
        className="details-button"
        onClick={() =>
          setShowDetails((prev) => !prev)
        }
      >
        {showDetails
          ? "Hide Technical Details"
          : "Show Technical Details"}
      </button>

      {showDetails && (

        <div className="performance-details">

          <div>
            <strong>React.memo</strong>

            <p>
              Prevents a component from rendering again
              when its props have not changed.
            </p>
          </div>

          <div>
            <strong>useMemo</strong>

            <p>
              Caches expensive calculations and reuses
              the previous result when dependencies remain
              unchanged.
            </p>
          </div>

          <div>
            <strong>useCallback</strong>

            <p>
              Preserves function references between renders
              when dependencies remain unchanged.
            </p>
          </div>

          <div>
            <strong>React Profiler</strong>

            <p>
              Measures the actual time spent rendering
              React components during a commit.
            </p>
          </div>

        </div>

      )}

    </div>
  );
}

export default PerformanceMonitor;