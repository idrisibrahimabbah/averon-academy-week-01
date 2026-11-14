
function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <section className="profile-card">
      <div className="profile-header">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s GitHub avatar`}
          className="avatar"
        />

        <div className="profile-heading">
          <h2>{user.name || user.login}</h2>
          <p className="username">@{user.login}</p>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub Profile ↗
          </a>
        </div>
      </div>

      <p className="bio">
        {user.bio || "No bio available."}
      </p>

      <div className="profile-details">
        <p>
          <strong>Location:</strong>{" "}
          {user.location || "Not provided"}
        </p>

        <p>
          <strong>Company:</strong>{" "}
          {user.company || "Not provided"}
        </p>
      </div>

      <div className="stats">
        <div>
          <h3>{user.public_repos}</h3>
          <span>Repositories</span>
        </div>

        <div>
          <h3>{user.followers}</h3>
          <span>Followers</span>
        </div>

        <div>
          <h3>{user.following}</h3>
          <span>Following</span>
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;
