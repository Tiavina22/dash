import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import {
  Star,
  GitFork,
  Calendar,
  Code,
  Users,
  GitCommit,
} from 'lucide-react';
import { GitHubUser, LanguageData, RepoStats, ContributionStats } from '../types/github';

interface GithubCardProps {
  userData: GitHubUser;
  languages: LanguageData[];
  repoStats: RepoStats;
  contributionStats: ContributionStats;
  calculateAccountAge: (createdAt: string) => string;
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
];

export const GithubCard: React.FC<GithubCardProps> = ({
  userData,
  languages,
  repoStats,
  contributionStats,
  calculateAccountAge,
}) => {
  // Calculer le total des langages pour les pourcentages
  const totalLanguages = languages.reduce((sum, lang) => sum + lang.value, 0);
  const languagesWithPercentage = languages.map(lang => ({
    ...lang,
    percentage: ((lang.value / totalLanguages) * 100).toFixed(1)
  }));

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl" id="github-card">
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
          <p className="text-gray-400 mb-4">{userData.bio || 'No bio available'}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">Dépôts publics</span>
              </div>
              <p className="text-2xl font-bold">{userData.public_repos}</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-400" />
                <span className="font-semibold">Followers</span>
              </div>
              <p className="text-2xl font-bold">{userData.followers}</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">Total Stars</span>
              </div>
              <p className="text-2xl font-bold">{repoStats.stars}</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <GitFork className="w-5 h-5 text-purple-400" />
                <span className="font-semibold">Total Forks</span>
              </div>
              <p className="text-2xl font-bold">{repoStats.forks}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Langages utilisés</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languagesWithPercentage}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percentage }) => `${name} (${percentage}%)`}
                      labelLine={false}
                    >
                      {languagesWithPercentage.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string, props: any) => [
                        `${props.payload.percentage}%`,
                        name
                      ]}
                    />
                    <Legend 
                      layout="vertical" 
                      align="right" 
                      verticalAlign="middle"
                      formatter={(value: string) => (
                        <span className="text-sm text-gray-300">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {languagesWithPercentage.map((lang, index) => (
                  <div 
                    key={lang.name} 
                    className="flex items-center gap-2 text-sm"
                  >
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-gray-300">{lang.name}</span>
                    <span className="text-gray-400">({lang.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contributions</h3>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <GitCommit className="w-4 h-4 text-blue-400" />
                    <span>Total des contributions</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">
                    {contributionStats.totalContributions}
                  </p>
                </div>

                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <GitCommit className="w-4 h-4 text-green-400" />
                    <span>Contributions (12 derniers mois)</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">
                    {contributionStats.contributionsLastYear}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 