
import { useEffect, useState } from "react";

function RepositoryList({ repositories }) {
  const [sortBy, setSortBy] = useState("updated");
  const [currentPage, setCurrentPage] = useState(1);

  const reposPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, repositories]);

  const sortedRepos = [...repositories].sort((a, b) => {
    if (sortBy === "stars") {
      return b.stargazers_count - a.stargazers_count;
    }

    return (
      new Date(b.updated_at) - new Date(a.updated_at)
    );
  });

  const totalPages = Math.ceil(
    sortedRepos.length / reposPerPage
  );

  const startIndex = (currentPage - 1) * reposPerPage;

  const currentRepos = sortedRepos.slice(
    startIndex,
    startIndex + reposPerPage
  );

  if (!repositories.length) {
    return (
      <section className="repositories">
        <h2>Public Repositories</h2>
        <p>No public repositories found.</p>
      </section>
    );
  }

  return (
    <section className="repositories">
      <div className="repository-heading">
        <h2>Public Repositories</h2>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort repositories"
        >
          <option value="updated">Recently Updated</option>
          <option value="stars">Most Stars</option>
        </select>
      </div>

      <div className="repository-grid">
        {currentRepos.map((repo) => (
          <article className="repo-card" key={repo.id}>
            <h3>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </h3>

            <p>
              {repo.description || "No description available."}
            </p>

            <div className="repo-meta">
              <span>
                {repo.language || "Not specified"}
              </span>

              <span>
                ★ {repo.stargazers_count}
              </span>
            </div>

            <small>
              Updated:{" "}
              {new Date(repo.updated_at).toLocaleDateString()}
            </small>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default RepositoryList;
