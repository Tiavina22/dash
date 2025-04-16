import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, GitBranch, Users, Code, Calendar, Trophy, Award, Medal, Crown } from 'lucide-react';

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

interface ComparisonStatsProps {
  stats: UserStats[];
}

const ComparisonStats: React.FC<ComparisonStatsProps> = ({ stats }) => {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateLanguagePercentages = (languages: LanguageData[]) => {
    const total = languages.reduce((sum, lang) => sum + lang.value, 0);
    return languages.map(lang => ({
      ...lang,
      percentage: ((lang.value / total) * 100).toFixed(1)
    }));
  };

  const calculateUserScore = (user: UserStats) => {
    const contributionPoints = user.contributions * 0.5;
    const repositoryPoints = user.repositories * 10;
    const starPoints = user.stars * 2;
    const followerPoints = user.followers * 1;
    const languagePoints = user.languages.length * 5;
    return Math.round(contributionPoints + repositoryPoints + starPoints + followerPoints + languagePoints);
  };

  const usersWithScores = stats.map(user => ({
    ...user,
    score: calculateUserScore(user)
  })).sort((a, b) => b.score - a.score);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Award className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-amber-500" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{index + 1}</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Classement */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
          {t('compare.ranking')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {usersWithScores.map((user, index) => (
            <div
              key={user.username}
              className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                index === 0
                  ? 'bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900 dark:to-yellow-800'
                  : index === 1
                  ? 'bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600'
                  : index === 2
                  ? 'bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900 dark:to-amber-800'
                  : 'bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getRankIcon(index)}
                  <img
                    src={user.avatar_url}
                    alt={`${user.username}'s avatar`}
                    className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-gray-600"
                  />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {user.username}
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {user.score} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Détails des utilisateurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usersWithScores.map((user) => (
          <div
            key={user.username}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Header with avatar and basic info */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={user.avatar_url}
                alt={`${user.username}'s avatar`}
                className="w-16 h-16 rounded-full ring-2 ring-blue-500"
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
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Code className="w-4 h-4 mr-2" />
                  <span className="text-sm">{t('repositories')}</span>
                </div>
                <div className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                  {user.repositories}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Star className="w-4 h-4 mr-2" />
                  <span className="text-sm">{t('stars')}</span>
                </div>
                <div className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                  {user.stars}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{t('followers')}</span>
                </div>
                <div className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                  {user.followers}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <GitBranch className="w-4 h-4 mr-2" />
                  <span className="text-sm">Following</span>
                </div>
                <div className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                  {user.following}
                </div>
              </div>
            </div>

            {/* Languages */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                {t('topLanguages')}
              </h4>
              <div className="space-y-2">
                {calculateLanguagePercentages(user.languages)
                  .map(({ name, percentage, color }) => (
                    <div
                      key={name}
                      className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          {name}
                        </span>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {percentage}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonStats; 