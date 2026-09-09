import { useState } from "react";

function PostForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !time) {
      alert("Please enter a title, date, and time.");
      return;
    }

    const scheduledAt = `${date}T${time}`;

    onCreate({
      title,
      caption,
      platform,
      scheduledAt,
    });

    setTitle("");
    setCaption("");
    setPlatform("Instagram");
    setDate("");
    setTime("");
  };

  return (
    <div className="post-form card">
      <h2>Schedule a Post</h2>
      <p>Create and schedule your social media content.</p>

      <form className="schedule-form" onSubmit={handleSubmit}>
        <div className="schedule-field">
          <label>Post Title</label>
          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="schedule-field">
          <label>Caption</label>
          <textarea
            placeholder="Write your caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <div className="schedule-field">
          <label>Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>

        <div className="schedule-date-time">
          <div className="schedule-field">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="schedule-field">
            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="schedule-btn">
          Schedule Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;