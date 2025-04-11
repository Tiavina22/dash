import React from 'react';
import { RepoStats, ContributionStats } from '../types/github';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DetailedStatsProps {
  repoStats: RepoStats;
  contributionStats: ContributionStats;
}

export const DetailedStats: React.FC<DetailedStatsProps> = ({
  repoStats,
  contributionStats,
}) => {
  const monthlyData = contributionStats.contributionsByMonth || [];
  const dailyData = Object.entries(contributionStats.contributionsByDay || {}).map(
    ([day, count]) => ({
      day,
      contributions: count,
    })
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Statistiques détaillées
      </h2>

      {/* Pull Requests et Issues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Pull Requests
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {repoStats.pullRequests?.open || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Ouvertes
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {repoStats.pullRequests?.merged || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Fusionnées
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-500">
                {repoStats.pullRequests?.closed || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Fermées
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Issues
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {repoStats.issues?.open || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Ouvertes
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-500">
                {repoStats.issues?.closed || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Fermées
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contributions par mois */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Contributions par mois
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis stroke="#6B7280" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6',
                }}
              />
              <Bar
                dataKey="count"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                name="Contributions"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Repos les plus étoilés */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Repositories les plus étoilés
        </h3>
        <div className="space-y-4">
          {repoStats.mostStarredRepos?.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 dark:text-white">
                  {repo.name}
                </span>
                <span className="flex items-center text-yellow-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  {repo.stars}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Statistiques supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Jour le plus productif
          </h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {contributionStats.mostProductiveDay?.day}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {contributionStats.mostProductiveDay?.contributions} contributions
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Moyenne quotidienne
          </h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {Math.round(contributionStats.averageContributionsPerDay || 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              contributions par jour
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 