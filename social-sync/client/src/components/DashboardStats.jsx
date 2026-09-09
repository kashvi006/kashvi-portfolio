function DashboardStats({ posts }) {
  const totalPosts = posts.length;

  const instagramPosts = posts.filter(
    (post) => post.platform === "Instagram"
  ).length;

  const linkedInPosts = posts.filter(
    (post) => post.platform === "LinkedIn"
  ).length;

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <p>Total Scheduled Posts</p>
        <h2>{totalPosts}</h2>
      </div>

      <div className="stat-card">
        <p>Instagram Posts</p>
        <h2>{instagramPosts}</h2>
      </div>

      <div className="stat-card">
        <p>LinkedIn Posts</p>
        <h2>{linkedInPosts}</h2>
      </div>
    </div>
  );
}

export default DashboardStats;