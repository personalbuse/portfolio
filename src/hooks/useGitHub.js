import { useState, useEffect } from 'react';
import axios from 'axios';

const useGitHub = (username) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        // Filter out forks and potentially pin some repos by name if needed
        const filteredRepos = response.data.filter(repo => !repo.fork);
        setRepos(filteredRepos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRepos();
    }
  }, [username]);

  return { repos, loading, error };
};

export default useGitHub;
