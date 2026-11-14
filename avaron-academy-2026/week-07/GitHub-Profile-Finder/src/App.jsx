import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import ProfileCard from "./components/ProfileCard";
import RepositoryList from "./components/RepositoryList";
import Loading from "./components/Loading";
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVersion, setSearchVersion] = useState(0);

  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [repoError, setRepoError] = useState("");

  const [recentSearches, setRecentSearches] = useState([]);

  // Handle search form submission
  const handleSearch = (username) => {
    setSearchTerm(username);
    setSearchVersion((version) => version + 1);
  };

  // Fetch GitHub profile and repositories
  useEffect(() => {
    if (!searchVersion || !searchTerm) return;

    const controller = new AbortController();

    const fetchGitHubData = async () => {
      setLoading(true);
      setError("");
      setRepoError("");

      setProfile(null);
      setRepositories([]);

      const username = encodeURIComponent(searchTerm);

      try {
        const [profileResponse, repoResponse] =
          await Promise.all([
            fetch(
              `https://api.github.com/users/${username}`,
              { signal: controller.signal }
            ),
            fetch(
              `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
              { signal: controller.signal }
            ),
          ]);

        // Handle profile request errors
        if (!profileResponse.ok) {
          if (profileResponse.status === 404) {
            throw new Error(
              "GitHub username not found. Please check and try again."
            );
            
        
/*const [profileResponse, repoResult] = await Promise.all([
  fetch(
    `https://api.github.com/users/${username}`,
    { signal: controller.signal }
  ),

  fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { signal: controller.signal }
  )


    
    .then((response) => ({ response }))
    .catch((error) => ({ error }))
]);

if (controller.signal.aborted) return;

if (!profileResponse.ok) {
  if (profileResponse.status === 404) {
    throw new Error(
      "GitHub username not found. Please check and try again."
    );
  }



  

  // correction point ∆

  if (profileResponse.status === 403) {
    throw new Error(
      "GitHub API rate limit reached. Please try again later."
    );
  }

  throw new Error(
    `Unable to retrieve profile. HTTP error: ${profileResponse.status}`
  );
}
*/
const userData = await profileResponse.json();

if (controller.signal.aborted) return;

setProfile(userData);

// Handle repository errors independently
if (repoResult.error) {
  if (repoResult.error.name === "AbortError") {
    throw repoResult.error;
  }

  setRepoError(
    "Profile loaded, but repositories could not be retrieved."
  );

} else if (!repoResult.response.ok) {

  setRepoError(
    "Profile loaded, but repositories could not be retrieved."
  );

} else {

  const repoData = await repoResult.response.json();
  setRepositories(repoData);
}



        
          }

          if (profileResponse.status === 403) {
            throw new Error(
              "GitHub API rate limit reached. Please try again later."
            );
          }

          throw new Error(
            `Unable to retrieve profile. HTTP error: ${profileResponse.status}`
          );
        }

        const userData = await profileResponse.json();

        setProfile(userData);

        // Handle repository request separately
        if (repoResponse.ok) {
          const repoData = await repoResponse.json();

          setRepositories(repoData);
        } else {
          setRepoError(
            "Profile loaded, but repositories could not be retrieved."
          );
        }

        // Update recent searches
        setRecentSearches((previous) => [
          userData.login,
          ...previous.filter(
            (name) =>
              name.toLowerCase() !== userData.login.toLowerCase()
          ),
        ].slice(0, 5));

      } catch (err) {
        if (err.name === "AbortError") return;

        if (!controller.signal.aborted) {
          setError(
            err.message ||
            "Something went wrong. Please try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchGitHubData();

    // Cancel outdated requests when another search starts
    return () => {
      controller.abort();
    };

  }, [searchTerm, searchVersion]);

  return (
    <main className="app-container">

      <header className="app-header">
        <h1>
          <span>GitHub</span> Profile Finder
        </h1>

        <p>
          Discover GitHub developers and explore their
          public repositories.
        </p>
      </header>

      <SearchForm
        onSearch={handleSearch}
        loading={loading}
      />

      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <span>Recent searches:</span>

          {recentSearches.map((name) => (
            <button
              type="button"
              key={name}
              onClick={() => handleSearch(name)}
              disabled={loading}
            >
              @{name}
            </button>
          ))}
        </div>
      )}

      {/* Loading indicator */}
      {loading && <Loading />}

      {/* Error message */}
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {/* Profile information */}
      {!loading && !error && profile && (
        <>
          <ProfileCard user={profile} />

          {repoError && (
            <p className="repo-error" role="status">
              {repoError}
            </p>
          )}

          {!repoError && (
            <RepositoryList
              repositories={repositories}
            />
          )}
        </>
      )}

      <footer className="app-footer">
        <p>
          Built with React and the GitHub REST API.
        </p>
        <p>Powered by averon Academy</p> 
      </footer>

    </main>
  );
}

export default App;


