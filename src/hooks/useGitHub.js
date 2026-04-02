import { useState, useEffect } from 'react';

const useGitHub = (username) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch repos');
        }
        
        const data = await response.json();
        setRepos(data);
        setError(false);
      } catch (err) {
        console.error('GitHub API error:', err);
        setError(true);
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
