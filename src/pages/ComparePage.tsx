import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProfileComparison from '../components/ProfileComparison';
import ComparisonStats from '../components/ComparisonStats';
import { useGitHubCompare } from '../hooks/useGitHubCompare';

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

const ComparePage: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<UserStats[]>([]);
  const { loading, error, compareUsers } = useGitHubCompare();

  const handleCompare = async (usernames: string[]) => {
    try {
      const userStats = await compareUsers(usernames);
      setStats(userStats);
    } catch (err) {
      // Error is already handled by the hook
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {t('compareProfiles')}
      </h1>
      <div className="space-y-8">
        <ProfileComparison onCompare={handleCompare} />
        {loading && (
          <div className="text-center text-gray-600 dark:text-gray-300">
            {t('loading')}...
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 dark:text-red-400">
            {error}
          </div>
        )}
        {stats.length > 0 && !loading && !error && (
          <ComparisonStats stats={stats} />
        )}
      </div>
    </div>
  );
};

export default ComparePage; 