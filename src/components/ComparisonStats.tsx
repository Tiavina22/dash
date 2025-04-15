import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, GitBranch, Users, Code, Calendar } from 'lucide-react';

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

interface ComparisonStatsProps {
  stats: UserStats[];
}

const ComparisonStats: React.FC<ComparisonStatsProps> = ({ stats }) => {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateLanguagePercentages = (languages: { [key: string]: number }) => {
    const total = Object.values(languages).reduce((sum, count) => sum + count, 0);
    return Object.entries(languages).map(([language, count]) => ({
      language,
      percentage: ((count / total) * 100).toFixed(1)
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((user) => (
        <div
          key={user.username}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          {/* Header with avatar and basic info */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user.avatar_url}
              alt={`${user.username}'s avatar`}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {user.username}
              </h3>
              {user.bio && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {user.bio}
                </p>
              )}
            </div>
          </div>

          {/* Additional info */}
          <div className="space-y-2 mb-6">
            {user.location && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="mr-2">📍</span>
                {user.location}
              </div>
            )}
            {user.company && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="mr-2">🏢</span>
                {user.company}
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-2" />
              Joined {formatDate(user.created_at)}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Code className="w-4 h-4 mr-2" />
                <span className="text-sm">{t('repositories')}</span>
              </div>
              <div className="text-xl font-bold mt-1">{user.repositories}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Star className="w-4 h-4 mr-2" />
                <span className="text-sm">{t('stars')}</span>
              </div>
              <div className="text-xl font-bold mt-1">{user.stars}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">{t('followers')}</span>
              </div>
              <div className="text-xl font-bold mt-1">{user.followers}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <GitBranch className="w-4 h-4 mr-2" />
                <span className="text-sm">Following</span>
              </div>
              <div className="text-xl font-bold mt-1">{user.following}</div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
              {t('topLanguages')}
            </h4>
            <div className="space-y-2">
              {calculateLanguagePercentages(user.languages)
                .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage))
                .slice(0, 5)
                .map(({ language, percentage }) => (
                  <div
                    key={language}
                    className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded"
                  >
                    <span className="text-gray-600 dark:text-gray-300">
                      {language}
                    </span>
                    <span className="font-semibold">{percentage}%</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComparisonStats; 