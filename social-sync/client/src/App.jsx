import { Profiler, useRef, useState } from "react";

import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import PostForm from "./components/PostForm";
import OptimizationPanel from "./components/OptimizationPanel";
import Calendar, {
  MemoizedCalendar,
} from "./components/Calendar";
import PerformanceMonitor from "./components/PerformanceMonitor";

function App() {
  // ================================
  // POSTS
  // ================================

  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("socialsync-posts");

    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  // ================================
  // OPTIMIZATION STATE
  // ================================

  const [optimizations, setOptimizations] = useState({
    reactMemo: {
      enabled: false,
      count: 0,
    },

    useMemo: {
      enabled: false,
      count: 0,
    },

    useCallback: {
      enabled: false,
      count: 0,
    },
  });

  // ================================
  // PERFORMANCE DATA
  // ================================

  const [performanceData, setPerformanceData] = useState({
    baseline: {
      duration: 0,
      renders: 0,
    },

    optimized: {
      duration: 0,
      renders: 0,
    },
  });

  // Prevent Profiler -> setState -> Profiler infinite loop
  const measurementRequested = useRef(true);

  // ================================
  // SELECTED POST
  // ================================

  const [selectedPost, setSelectedPost] = useState(null);

  // ================================
  // SAVE POSTS
  // ================================

  const savePosts = (updatedPosts) => {
    setPosts(updatedPosts);

    localStorage.setItem(
      "socialsync-posts",
      JSON.stringify(updatedPosts)
    );
  };

  // ================================
  // CREATE POST
  // ================================

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData,
    };

    savePosts([...posts, newPost]);

    // Request a new performance measurement
    measurementRequested.current = true;
  };

  // ================================
  // DRAG & DROP UPDATE
  // ================================

  const handlePostUpdate = (postId, newDate) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            scheduledAt: newDate,
          }
        : post
    );

    savePosts(updatedPosts);

    measurementRequested.current = true;
  };

  // ================================
  // SELECT POST
  // ================================

  const handlePostSelect = (post) => {
    setSelectedPost(post);
  };

  // ================================
  // EDIT POST
  // ================================

  const handleEditPost = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );

    savePosts(updatedPosts);

    setSelectedPost(null);

    measurementRequested.current = true;
  };

  // ================================
  // DELETE POST
  // ================================

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(
      (post) => post.id !== postId
    );

    savePosts(updatedPosts);

    setSelectedPost(null);

    measurementRequested.current = true;
  };

  // ================================
  // OPTIMIZATION TOGGLE
  // ================================

  const handleOptimizationToggle = (name) => {
    // Tell the Profiler that the next render should be measured
    measurementRequested.current = true;

    setOptimizations((prev) => ({
      ...prev,

      [name]: {
        ...prev[name],

        enabled: !prev[name].enabled,

        count: prev[name].count + 1,
      },
    }));
  };

  // ================================
  // ACTIVE OPTIMIZATIONS
  // ================================

  const activeOptimizations =
    Number(optimizations.reactMemo.enabled) +
    Number(optimizations.useMemo.enabled) +
    Number(optimizations.useCallback.enabled);

  // ================================
  // PROFILER
  // ================================

  const handleCalendarRender = (
    id,
    phase,
    actualDuration
  ) => {
    // Ignore extra Profiler calls after the measurement
    if (!measurementRequested.current) {
      return;
    }

    // Consume this measurement request
    measurementRequested.current = false;

    if (activeOptimizations === 0) {
      setPerformanceData((prev) => ({
        ...prev,

        baseline: {
          duration: actualDuration,
          renders: prev.baseline.renders + 1,
        },
      }));
    } else {
      setPerformanceData((prev) => ({
        ...prev,

        optimized: {
          duration: actualDuration,
          renders: prev.optimized.renders + 1,
        },
      }));
    }
  };

  // ================================
  // CALENDAR COMPONENT
  // ================================

  const CalendarComponent =
    optimizations.reactMemo.enabled
      ? MemoizedCalendar
      : Calendar;

  // ================================
  // PERFORMANCE IMPROVEMENT
  // ================================

  const performanceImprovement =
    performanceData.baseline.duration > 0 &&
    performanceData.optimized.duration > 0
      ? Math.max(
          0,
          ((performanceData.baseline.duration -
            performanceData.optimized.duration) /
            performanceData.baseline.duration) *
            100
        )
      : 0;

  // ================================
  // RENDER
  // ================================

  return (
    <div className="app">

      <Header
        optimized={activeOptimizations > 0}
      />

      <main className="dashboard">

        {/* DASHBOARD STATISTICS */}

        <section className="top-section">

          <DashboardStats
            posts={posts}
          />

        </section>

        {/* POST FORM + OPTIMIZATION */}

        <section className="content-grid">

          <PostForm
            onCreate={handleCreatePost}
          />

          <OptimizationPanel
            optimizations={optimizations}
            onToggle={handleOptimizationToggle}
          />

        </section>

        {/* CALENDAR */}

        <section className="calendar-section">

          <Profiler
            id="Calendar"
            onRender={handleCalendarRender}
          >

            <CalendarComponent
              posts={posts}
              onPostUpdate={handlePostUpdate}
              onPostSelect={handlePostSelect}
              optimizations={optimizations}
            />

          </Profiler>

        </section>

        {/* PERFORMANCE MONITOR */}

        <section className="performance-section">

          <PerformanceMonitor
            baseline={performanceData.baseline}
            optimized={performanceData.optimized}
            activeOptimizations={activeOptimizations}
            performanceImprovement={performanceImprovement}
          />

        </section>

      </main>

      {/* EDIT MODAL */}

      {selectedPost && (
        <EditPostModal
          post={selectedPost}
          onSave={handleEditPost}
          onDelete={handleDeletePost}
          onClose={() => setSelectedPost(null)}
        />
      )}

    </div>
  );
}

// ============================================
// EDIT POST MODAL
// ============================================

function EditPostModal({
  post,
  onSave,
  onDelete,
  onClose,
}) {
  const [title, setTitle] = useState(
    post.title || ""
  );

  const [caption, setCaption] = useState(
    post.caption || ""
  );

  const [platform, setPlatform] = useState(
    post.platform || "Instagram"
  );

  const [scheduledAt, setScheduledAt] = useState(
    post.scheduledAt || ""
  );

  // ================================
  // SAVE EDIT
  // ================================

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      ...post,
      title,
      caption,
      platform,
      scheduledAt,
    });
  };

  // ================================
  // DELETE
  // ================================

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmed) {
      onDelete(post.id);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="edit-modal">

        <div className="modal-header">

          <div>

            <h2>
              Edit Scheduled Post
            </h2>

            <p>
              Update your scheduled content.
            </p>

          </div>

          <button
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          {/* TITLE */}

          <label>
            Post Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            required
          />

          {/* CAPTION */}

          <label>
            Caption
          </label>

          <textarea
            value={caption}
            onChange={(event) =>
              setCaption(event.target.value)
            }
            rows="4"
          />

          {/* PLATFORM */}

          <label>
            Platform
          </label>

          <select
            value={platform}
            onChange={(event) =>
              setPlatform(event.target.value)
            }
          >

            <option value="Instagram">
              Instagram
            </option>

            <option value="LinkedIn">
              LinkedIn
            </option>

          </select>

          {/* DATE & TIME */}

          <label>
            Scheduled Date & Time
          </label>

          <input
            type="datetime-local"
            value={formatDateTime(scheduledAt)}
            onChange={(event) => {

              if (event.target.value) {

                setScheduledAt(
                  new Date(
                    event.target.value
                  ).toISOString()
                );

              }

            }}
          />

          {/* ACTIONS */}

          <div className="modal-actions">

            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
            >
              Delete Post
            </button>

            <div className="right-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-button"
              >
                Save Changes
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}

// ============================================
// FORMAT DATE/TIME FOR INPUT
// ============================================

function formatDateTime(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset =
    date.getTimezoneOffset() * 60000;

  return new Date(
    date.getTime() - offset
  )
    .toISOString()
    .slice(0, 16);
}

export default App;