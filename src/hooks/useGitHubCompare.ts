import { useState } from 'react';
import { graphql } from '@octokit/graphql';

interface LanguageData {
  name: string;
  value: number;
  color: string;
}

interface UserStats {
  username: string;
  avatar_url: string;
  contributions: number;
  repositories: number;
  stars: number;
  followers: number;
  following: number;
  languages: LanguageData[];
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
      const query = `
        query($username: String!) {
          user(login: $username) {
            login
            avatarUrl
            bio
            company
            location
            createdAt
            followers {
              totalCount
            }
            following {
              totalCount
            }
            repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
              totalCount
              nodes {
                stargazerCount
                languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                  edges {
                    size
                    node {
                      name
                      color
                    }
                  }
                }
              }
            }
            contributionsCollection {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `;

      const response: any = await graphql(query, {
        username,
        headers: {
          authorization: `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });

      const user = response.user;
      const totalStars = user.repositories.nodes.reduce(
        (acc: number, repo: any) => acc + repo.stargazerCount,
        0
      );

      // Calculate language usage with colors
      const languagesWithColors = user.repositories.nodes
        .flatMap((repo: any) => repo.languages.edges)
        .reduce((acc: any, { node, size }: any) => {
          if (!acc[node.name]) {
            acc[node.name] = { value: 0, color: node.color };
          }
          acc[node.name].value += size;
          return acc;
        }, {});

      const languages = Object.entries(languagesWithColors)
        .map(([name, data]: [string, any]) => ({
          name,
          value: data.value,
          color: data.color
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);

      return {
        username: user.login,
        avatar_url: user.avatarUrl,
        contributions: user.contributionsCollection.contributionCalendar.totalContributions,
        repositories: user.repositories.totalCount,
        stars: totalStars,
        followers: user.followers.totalCount,
        following: user.following.totalCount,
        languages,
        created_at: user.createdAt,
        bio: user.bio || '',
        location: user.location || '',
        company: user.company || '',
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