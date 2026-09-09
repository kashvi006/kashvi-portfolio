import { memo, useMemo, useCallback } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar({
  posts = [],
  onPostUpdate,
  onPostSelect,
  optimizations = {},
}) {
  const useMemoEnabled =
    optimizations.useMemo?.enabled || false;

  const useCallbackEnabled =
    optimizations.useCallback?.enabled || false;

  // ========================================
  // EVENT DATA WITHOUT useMemo
  // ========================================

  const normalEvents = posts.map((post) => ({
    id: String(post.id),
    title: `${post.platform}: ${post.title}`,
    start: post.scheduledAt,
    allDay: false,
  }));

  // ========================================
  // EVENT DATA WITH useMemo
  // ========================================

  const memoizedEvents = useMemo(() => {
    return posts.map((post) => ({
      id: String(post.id),
      title: `${post.platform}: ${post.title}`,
      start: post.scheduledAt,
      allDay: false,
    }));
  }, [posts]);

  // Select which version is used
  const events = useMemoEnabled
    ? memoizedEvents
    : normalEvents;

  // ========================================
  // NORMAL DRAG/DROP FUNCTION
  // ========================================

  const normalEventDrop = (info) => {
    if (!info.event.start) {
      return;
    }

    onPostUpdate(
      Number(info.event.id),
      info.event.start.toISOString()
    );
  };

  // ========================================
  // useCallback OPTIMIZED FUNCTION
  // ========================================

  const optimizedEventDrop = useCallback(
    (info) => {
      if (!info.event.start) {
        return;
      }

      onPostUpdate(
        Number(info.event.id),
        info.event.start.toISOString()
      );
    },
    [onPostUpdate]
  );

  // Select which callback is used
  const eventDropHandler = useCallbackEnabled
    ? optimizedEventDrop
    : normalEventDrop;

  // ========================================
  // CLICK EVENT
  // ========================================

  const handleEventClick = (info) => {
    const selectedPost = posts.find(
      (post) =>
        String(post.id) === String(info.event.id)
    );

    if (selectedPost && onPostSelect) {
      onPostSelect(selectedPost);
    }
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="calendar-container">

      {/* CALENDAR HEADER */}

      <div className="calendar-header">

        <div>
          <h2>Content Calendar</h2>

          <p>
            Click a post to edit or delete it.
            Drag posts to reschedule them.
          </p>
        </div>

        {/* ACTIVE OPTIMIZATIONS */}

        <div className="calendar-optimization-status">

          {useMemoEnabled && (
            <span className="optimization-tag">
              useMemo
            </span>
          )}

          {useCallbackEnabled && (
            <span className="optimization-tag">
              useCallback
            </span>
          )}

        </div>

      </div>

      {/* FULL CALENDAR */}

      <FullCalendar
        plugins={[
          dayGridPlugin,
          interactionPlugin,
        ]}

        initialView="dayGridMonth"

        events={events}

        editable={true}

        selectable={true}

        eventDrop={eventDropHandler}

        eventClick={handleEventClick}

        height="auto"

        dayMaxEvents={3}

        headerToolbar={{
          left: "title",
          center: "",
          right: "today prev,next",
        }}

        buttonText={{
          today: "today",
        }}
      />

    </div>
  );
}

// ========================================
// REACT.MEMO VERSION
// ========================================

const MemoizedCalendar = memo(Calendar);

// ========================================
// EXPORTS
// ========================================

export {
  MemoizedCalendar,
};

export default Calendar;