export interface GitHubUser {
  login: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  name: string;
  created_at: string;
  public_gists: number;
}

export interface LanguageData {
  name: string;
  value: number;
}

export interface RepoStats {
  stars: number;
  forks: number;
}

export interface ContributionStats {
  totalContributions: number;
  currentStreak: number;
  maxStreak: number;
  contributionsLastYear: number;
} 