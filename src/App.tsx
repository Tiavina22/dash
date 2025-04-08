import React, { useState } from "react";
import axios from "axios";
import { graphql } from "@octokit/graphql";
import {
  Search,
  Download,
  Github,
  Star,
  GitFork,
  Calendar,
  Siren as Fire,
  Code,
  Users,
  GitCommit,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import html2canvas from "html2canvas";

interface GitHubUser {
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

interface LanguageData {
  name: string;
  value: number;
}

interface RepoStats {
  stars: number;
  forks: number;
}

interface ContributionStats {
  totalContributions: number;
  currentStreak: number;
  maxStreak: number;
  contributionsLastYear: number;
}

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const [repoStats, setRepoStats] = useState<RepoStats>({ stars: 0, forks: 0 });
  const [contributionStats, setContributionStats] = useState<ContributionStats>(
    {
      totalContributions: 0,
      currentStreak: 0,
      maxStreak: 0,
      contributionsLastYear: 0,
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

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
      console.error("Error fetching contribution data:", error);
    }
  };

  const fetchGitHubData = async () => {
    if (!username) return;

    setLoading(true);
    setError("");
    try {
      // Fetch user data
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(userResponse.data);

      // Fetch repositories
      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const repos = reposResponse.data;

      // Calculate languages
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

      // Fetch contribution data
      await fetchContributionData(username);
    } catch (err) {
      setError("Utilisateur non trouvé ou erreur de l'API GitHub");
    }
    setLoading(false);
  };

  const exportAsImage = async () => {
    const card = document.getElementById("github-card");
    if (card) {
      const canvas = await html2canvas(card, { useCORS: true });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${username}-github-stats.png`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-8 flex-col">
      <div className="flex-grow max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-4">
            <Github className="w-8 h-8 mr-2" />
            <h1 className="text-3xl font-bold">Dash</h1>
          </div>

          <div className="text-center mb-8 max-w-2xl">
            <p className="text-xl text-gray-300 mb-4">
              Visualisez vos statistiques GitHub en un coup d'œil
            </p>
            <p className="text-gray-400">
              Entrez votre nom d'utilisateur GitHub pour découvrir vos contributions,
              langages de programmation favoris, et bien plus encore.
              Générez une belle carte de statistiques à partager !
            </p>
          </div>

          <div className="w-full max-w-md flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez un nom d'utilisateur GitHub"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-700"
                onKeyPress={(e) => e.key === "Enter" && fetchGitHubData()}
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button
              onClick={fetchGitHubData}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              disabled={loading}
            >
              {loading ? "Chargement..." : "Rechercher"}
            </button>
          </div>

          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>

        {userData && (
          <div
            className="bg-gray-800 rounded-xl p-6 shadow-xl"
            id="github-card"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 text-center">
                <img
                  src={userData.avatar_url}
                  alt={`${userData.login}'s avatar`}
                  className="w-32 h-32 rounded-full border-4 border-blue-500 mx-auto"
                />
                <div className="mt-4 bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Membre depuis</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{calculateAccountAge(userData.created_at)}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold">
                  {userData.name || userData.login}
                </h2>
                <p className="text-gray-400 mb-4">
                  {userData.bio || "No bio available"}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-blue-400 mb-2">
                      <Code className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-center">
                      {userData.public_repos}
                    </div>
                    <div className="text-sm text-gray-400 text-center">
                      Repositories
                    </div>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
                      <Star className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-center">
                      {repoStats.stars}
                    </div>
                    <div className="text-sm text-gray-400 text-center">
                      Stars
                    </div>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                      <GitFork className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-center">
                      {repoStats.forks}
                    </div>
                    <div className="text-sm text-gray-400 text-center">
                      Forks
                    </div>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-center">
                      {userData.followers}
                    </div>
                    <div className="text-sm text-gray-400 text-center">
                      Followers
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-orange-400 mb-2">
                      <GitCommit className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-center">
                      {contributionStats.totalContributions}
                    </div>
                    <div className="text-sm text-gray-400 text-center">
                      Total Contributions
                    </div>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-red-400 mb-2">
                      <Fire className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-center">
                      {contributionStats.contributionsLastYear}
                    </div>
                    <div className="text-sm text-gray-400 text-center">
                      Contributions (Last Year)
                    </div>
                  </div>
                </div>

                {languages.length > 0 && (
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-4">
                      Top Languages
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={languages}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label={({ name, percent }) =>
                              `${name} (${(percent * 100).toFixed(0)}%)`
                            }
                          >
                            {languages.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {userData && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={exportAsImage}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              Exporter en PNG
            </button>
          </div>
        )}
      </div>
      <footer className="mt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Dash. Tiavina22.</p>
      </footer>
    </div>
  );
}

export default App;
