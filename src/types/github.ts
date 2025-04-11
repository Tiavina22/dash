export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

export interface LanguageData {
  name: string;
  value: number;
  color?: string;
}

export interface RepoStats {
  stars: number;
  forks: number;
  totalCommits?: number;
  pullRequests?: {
    open: number;
    closed: number;
    merged: number;
  };
  issues?: {
    open: number;
    closed: number;
  };
  mostStarredRepos?: Array<{
    name: string;
    stars: number;
    url: string;
  }>;
}

export interface ContributionStats {
  totalContributions: number;
  currentStreak: number;
  maxStreak: number;
  contributionsLastYear: number;
  contributionsByDay?: {
    [key: string]: number;
  };
  contributionsByMonth?: Array<{
    month: string;
    count: number;
  }>;
  averageContributionsPerDay?: number;
  mostProductiveDay?: {
    day: string;
    contributions: number;
  };
} 