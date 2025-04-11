import { useState } from 'react';
import axios from 'axios';
import { graphql } from '@octokit/graphql';
import { GitHubUser, LanguageData, RepoStats, ContributionStats } from '../types/github';

export const useGithub = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const [repoStats, setRepoStats] = useState<RepoStats>({ stars: 0, forks: 0 });
  const [contributionStats, setContributionStats] = useState<ContributionStats>({
    totalContributions: 0,
    currentStreak: 0,
    maxStreak: 0,
    contributionsLastYear: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateAccountAge = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const years = now.getFullYear() - created.getFullYear();
    const months = now.getMonth() - created.getMonth();
    if (months < 0) {
      return `${years - 1} ans ${12 + months} mois`;
    }
    return `${years} ans ${months} mois`;
  };

  const fetchContributionData = async (username: string) => {
    try {
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection(from: "${new Date(
              Date.now() - 365 * 24 * 60 * 60 * 1000
            ).toISOString()}", to: "${new Date().toISOString()}") {
              totalCommitContributions
              restrictedContributionsCount
            }
          }
        }
      `;

      const response = await graphql(query, {
        username,
        headers: {
          authorization: `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });

      const totalContributions =
        response.user.contributionsCollection.totalCommitContributions +
        response.user.contributionsCollection.restrictedContributionsCount;
      const contributionsLastYear =
        response.user.contributionsCollection.totalCommitContributions;

      setContributionStats((prev) => ({
        ...prev,
        totalContributions,
        contributionsLastYear,
      }));
    } catch (error) {
      console.error('Error fetching contribution data:', error);
    }
  };

  const fetchGitHubData = async () => {
    if (!username) return;

    setLoading(true);
    setError('');
    try {
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(userResponse.data);

      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const repos = reposResponse.data;

      const languageMap: { [key: string]: number } = {};
      let totalStars = 0;
      let totalForks = 0;

      await Promise.all(
        repos.map(async (repo: any) => {
          if (repo.language) {
            languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
          }
          totalStars += repo.stargazers_count;
          totalForks += repo.forks_count;
        })
      );

      const languageData = Object.entries(languageMap)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);

      setLanguages(languageData);
      setRepoStats({ stars: totalStars, forks: totalForks });

      await fetchContributionData(username);
    } catch (err) {
      setError('Utilisateur non trouvé ou erreur de l\'API GitHub');
    }
    setLoading(false);
  };

  return {
    username,
    setUsername,
    userData,
    languages,
    repoStats,
    contributionStats,
    loading,
    error,
    calculateAccountAge,
    fetchGitHubData,
  };
}; 