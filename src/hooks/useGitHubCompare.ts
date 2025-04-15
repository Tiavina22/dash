import { useState } from 'react';

interface UserStats {
  username: string;
  avatar_url: string;
  contributions: number;
  repositories: number;
  stars: number;
  followers: number;
  following: number;
  languages: { [key: string]: number };
  created_at: string;
  bio: string;
  location: string;
  company: string;
}

interface GitHubError {
  message: string;
  status: number;
}

export const useGitHubCompare = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGitHubError = (err: any): GitHubError => {
    if (err.status === 404) {
      return { message: 'User not found', status: 404 };
    }
    if (err.status === 403) {
      return { message: 'API rate limit exceeded', status: 403 };
    }
    return { message: 'Failed to fetch data from GitHub', status: 500 };
  };

  const fetchUserStats = async (username: string): Promise<UserStats> => {
    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw { status: userResponse.status };
      }
      const userData = await userResponse.json();

      // Fetch user repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      if (!reposResponse.ok) {
        throw { status: reposResponse.status };
      }
      const reposData = await reposResponse.json();

      // Calculate total stars
      const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

      // Fetch user contributions
      const contributionsResponse = await fetch(`https://api.github.com/users/${username}/events`);
      if (!contributionsResponse.ok) {
        throw { status: contributionsResponse.status };
      }
      const contributionsData = await contributionsResponse.json();
      const contributions = contributionsData.length;

      // Calculate language usage
      const languages: { [key: string]: number } = {};
      for (const repo of reposData) {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      }

      return {
        username: userData.login,
        avatar_url: userData.avatar_url,
        contributions,
        repositories: userData.public_repos,
        stars: totalStars,
        followers: userData.followers,
        following: userData.following,
        languages,
        created_at: userData.created_at,
        bio: userData.bio || '',
        location: userData.location || '',
        company: userData.company || '',
      };
    } catch (err) {
      const githubError = handleGitHubError(err);
      throw githubError;
    }
  };

  const compareUsers = async (usernames: string[]): Promise<UserStats[]> => {
    setLoading(true);
    setError(null);
    try {
      const userStats = await Promise.all(
        usernames.map((username) => fetchUserStats(username))
      );
      return userStats;
    } catch (err) {
      const error = err as GitHubError;
      setError(error.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    compareUsers,
  };
}; 