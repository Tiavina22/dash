import React, { useEffect } from 'react';
import html2canvas from 'html2canvas';
import { useGithub } from '../hooks/useGithub';
import { SearchBar } from '../components/SearchBar';
import { GithubCard } from '../components/GithubCard';
import { DetailedStats } from '../components/DetailedStats';
import { Download, GitCompare } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  initialUsername?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ initialUsername = '' }) => {
  const {
    username,
    setUsername,
    userData,
    languages,
    repoStats,
    contributionStats,
    loading,
    error,
    calculateAccountAge,
    fetchGitHubData,
  } = useGithub();

  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialUsername) {
      setUsername(initialUsername);
      fetchGitHubData();
    }
  }, [initialUsername]);

  const exportAsImage = async () => {
    const card = document.getElementById('github-card');
    if (card) {
      const clone = card.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = card.offsetWidth + 'px';
      clone.style.height = card.offsetHeight + 'px';
      document.body.appendChild(clone);

      try {
        const canvas = await html2canvas(clone, {
          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          scale: 2,
        });

        document.body.removeChild(clone);

        const link = document.createElement('a');
        link.download = `${username || 'github-stats'}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      } catch (error) {
        console.error(t('dashboard.error'), error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8 px-2 sm:px-4 lg:px-8 mb-8 sm:mb-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {t('dashboard.title')}
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar
              username={username}
              setUsername={setUsername}
              onSearch={fetchGitHubData}
              loading={loading}
              error={error}
              placeholder={t('dashboard.searchPlaceholder')}
              buttonText={t('dashboard.searchButton')}
            />
          </div>
          <button
            onClick={() => navigate('/compare')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <GitCompare className="w-5 h-5" />
            <span>{t('navigation.compare')}</span>
          </button>
        </div>
        
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              {t('dashboard.loading')}
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 dark:text-red-400">
              {t('dashboard.error')}
            </p>
          </div>
        )}

        {userData && (
          <>
            <div className="mt-4 sm:mt-8">
              <GithubCard
                userData={userData}
                languages={languages}
                repoStats={repoStats}
                contributionStats={contributionStats}
                calculateAccountAge={calculateAccountAge}
                translations={{
                  stats: {
                    repositories: t('dashboard.stats.repositories'),
                    stars: t('dashboard.stats.stars'),
                    forks: t('dashboard.stats.forks'),
                    contributions: t('dashboard.stats.contributions'),
                    followers: t('dashboard.stats.followers'),
                    following: t('dashboard.stats.following'),
                    accountAge: t('dashboard.stats.accountAge')
                  },
                  languages: {
                    title: t('dashboard.languages.title'),
                    noData: t('dashboard.languages.noData')
                  },
                  contributions: {
                    title: t('dashboard.contributions.title'),
                    lastYear: t('dashboard.contributions.lastYear'),
                    lastMonth: t('dashboard.contributions.lastMonth'),
                    lastWeek: t('dashboard.contributions.lastWeek')
                  }
                }}
              />
            </div>
            <div className="mt-4 sm:mt-8">
              <DetailedStats
                repoStats={repoStats}
                contributionStats={contributionStats}
               
              />
            </div>
          </>
        )}

        {!userData && !loading && !error && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              {t('dashboard.noData')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 