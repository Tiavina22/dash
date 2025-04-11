import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import {
  Star,
  GitFork,
  Calendar,
  Code,
  Users,
  GitCommit,
  Download,
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
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
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
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-gray-800 rounded-xl p-6 shadow-xl" id="github-card">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 text-center">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={userData.avatar_url}
                alt={`${userData.login}'s avatar`}
                className="relative w-32 h-32 rounded-full border-4 border-gray-800 mx-auto"
                crossOrigin="anonymous"
              />
            </div>
            <div className="mt-4 bg-gray-700 rounded-lg p-3 border border-gray-600">
              <p className="text-sm text-gray-400">Membre depuis</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{calculateAccountAge(userData.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative">
              <h2 className="text-2xl font-bold text-white bg-gray-800 px-4 py-2 rounded-lg inline-block">
                {userData.name || userData.login}
              </h2>
            </div>
            <p className="text-gray-400 mb-4">{userData.bio || 'No bio available'}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-gray-300">Dépôts publics</span>
                </div>
                <p className="text-2xl font-bold text-white">{userData.public_repos}</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-green-500 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-gray-300">Followers</span>
                </div>
                <p className="text-2xl font-bold text-white">{userData.followers}</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-yellow-500 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-gray-300">Total Stars</span>
                </div>
                <p className="text-2xl font-bold text-white">{repoStats.stars}</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-purple-500 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <GitFork className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold text-gray-300">Total Forks</span>
                </div>
                <p className="text-2xl font-bold text-white">{repoStats.forks}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <h3 className="text-lg font-semibold mb-4 text-gray-300">Langages utilisés</h3>
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
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '0.5rem',
                        }}
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
                      className="flex items-center gap-2 text-sm bg-gray-800 rounded-lg p-2"
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

              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <h3 className="text-lg font-semibold mb-4 text-gray-300">Contributions</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-3 border border-gray-600 hover:border-blue-500 transition-colors duration-200">
                    <div className="flex items-center gap-2">
                      <GitCommit className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">Total des contributions</span>
                    </div>
                    <p className="text-2xl font-bold mt-1 text-white">
                      {contributionStats.totalContributions}
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-3 border border-gray-600 hover:border-green-500 transition-colors duration-200">
                    <div className="flex items-center gap-2">
                      <GitCommit className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Contributions (12 derniers mois)</span>
                    </div>
                    <p className="text-2xl font-bold mt-1 text-white">
                      {contributionStats.contributionsLastYear}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 