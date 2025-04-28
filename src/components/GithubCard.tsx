import React, { useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import GitHubCalendar from 'react-github-calendar';
import html2canvas from 'html2canvas';
import {
  Star,
  GitFork,
  Calendar,
  Code,
  Users,
  GitCommit,
  Download,
  GitBranch,
} from 'lucide-react';
import { GitHubUser, LanguageData, RepoStats, ContributionStats } from '../types/github';
import { useTheme } from './ThemeProvider';
import './GithubCard.css';
import { useTranslation } from 'react-i18next';
import SkillBadges from './SkillBadges';

interface GithubCardProps {
  userData: GitHubUser;
  languages: LanguageData[];
  repoStats: RepoStats;
  contributionStats: ContributionStats;
  calculateAccountAge: (createdAt: string) => string;
  translations?: {
    stats: {
      repositories: string;
      stars: string;
      forks: string;
      contributions: string;
      followers: string;
      following: string;
      accountAge: string;
    };
    languages: {
      title: string;
      noData: string;
    };
    contributions: {
      title: string;
      lastYear: string;
      lastMonth: string;
      lastWeek: string;
    };
  };
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
  translations
}) => {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const defaultTranslations = {
    stats: {
      repositories: 'Repositories',
      stars: 'Stars',
      forks: 'Forks',
      contributions: 'Contributions',
      followers: 'Followers',
      following: 'Following',
      accountAge: 'Account created'
    },
    languages: {
      title: 'Languages used',
      noData: 'No languages available'
    },
    contributions: {
      title: 'Contributions',
      lastYear: 'Last year',
      lastMonth: 'Last month',
      lastWeek: 'Last week'
    }
  };

  const tTranslated = translations || defaultTranslations;

  const openGithubPage = () => {
    window.open(`https://github.com/${userData.login}`, '_blank');
  };

  const exportAsImage = async (element: HTMLElement, imageFileName: string) => {
    try {
      // Masquer le bouton d'export
      const exportButton = element.querySelector('.export-button');
      if (exportButton) {
        exportButton.classList.add('hidden');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#1a1a1a',
        logging: false,
        useCORS: true,
      });

      // Réafficher le bouton d'export
      if (exportButton) {
        exportButton.classList.remove('hidden');
      }

      const link = document.createElement('a');
      link.download = `${imageFileName}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Erreur lors de l\'export de l\'image:', error);
    }
  };

  const totalLanguages = languages.reduce((sum, lang) => sum + lang.value, 0);
  const languagesWithPercentage = languages.map(lang => ({
    ...lang,
    percentage: ((lang.value / totalLanguages) * 100).toFixed(1)
  }));

  return (
    <div className="relative">
      <div ref={cardRef} className="github-card">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-blue-500 dark:bg-blue-600 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl" id="github-card">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 text-center">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-blue-500 dark:bg-blue-600 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <img
                    src={userData.avatar_url}
                    alt={`${userData.login}'s avatar`}
                    className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Membre depuis</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    <span className="text-gray-700 dark:text-gray-300">{calculateAccountAge(userData.created_at)}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <div className="relative cursor-pointer" onClick={openGithubPage} title={t('developers.openGithubProfile')}>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
                      {userData.name || userData.login}
                    </h2>
                  </div>
                  <button
                    onClick={() => exportAsImage(cardRef.current!, `${userData?.login || 'github'}-stats`)}
                    className="export-button flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    title="Exporter la carte en image PNG"
                  >
                    <Download className="w-5 h-5" />
                    <span>Exporter en PNG</span>
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{userData.bio || 'No bio available'}</p>
                <div className="mb-4">
                  <SkillBadges
                    languages={languages}
                    stars={repoStats.stars}
                    contributions={contributionStats.totalContributions}
                    repositories={userData.public_repos}
                    followers={userData.followers}
                    pullRequests={{
                      open: repoStats.pullRequests?.open || 0,
                      closed: repoStats.pullRequests?.closed || 0,
                      merged: repoStats.pullRequests?.merged || 0
                    }}
                    issues={{
                      open: repoStats.issues?.open || 0,
                      closed: repoStats.issues?.closed || 0
                    }}
                    accountAge={calculateAccountAge(userData.created_at)}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{t('developers.publicRepos')}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.public_repos}</p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{t('developers.publicRepos')}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-green-500 dark:text-green-400" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{t('developers.followers')}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.followers}</p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{t('developers.followers')}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.following}</p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{t('developers.following')}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-400 transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{t('developers.totalStars')}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{repoStats.stars}</p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{t('developers.totalStars')}</span>
                    </div>
                  </div>

                  {/* <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-2 mb-2">
                      <GitFork className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Total Forks</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{repoStats.forks}</p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">forks</span>
                    </div>
                  </div> */}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Langages utilisés</h3>
                    <div className="h-[200px] sm:h-[250px] md:h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={languagesWithPercentage}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={false}
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
                              backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                              border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`,
                              borderRadius: '0.5rem',
                            }}
                          />
                          <Legend 
                            layout="vertical" 
                            align="right" 
                            verticalAlign="middle"
                            formatter={(value: string, entry: any) => (
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {value} ({entry.payload.percentage}%)
                              </span>
                            )}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 hidden sm:grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {languagesWithPercentage.map((lang, index) => (
                        <div 
                          key={lang.name} 
                          className="flex items-center gap-2 text-sm bg-white dark:bg-gray-800 rounded-lg p-2"
                        >
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-gray-700 dark:text-gray-300 truncate">{lang.name}</span>
                          <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">({lang.percentage}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Contributions</h3>
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex items-center gap-2">
                          <GitCommit className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                          <span className="text-gray-700 dark:text-gray-300">{t('developers.totalContributions')}</span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-1">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {contributionStats.totalContributions}
                          </p>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{t('developers.totalContributions')}</span>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex items-center gap-2">
                          <GitCommit className="w-4 h-4 text-green-500 dark:text-green-400" />
                          <span className="text-gray-700 dark:text-gray-300">{t('developers.contributionsLastYear')}</span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-1">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {contributionStats.contributionsLastYear}
                          </p>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{t('developers.contributionsLastYear')}</span>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-400 transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex items-center gap-2">
                          <GitCommit className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                          <span className="text-gray-700 dark:text-gray-300">Streak en cours</span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-1">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {contributionStats.currentStreak}
                          </p>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{t('developers.currentStreak')} ({contributionStats.currentStreak} {t('developers.days')})</span>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600 hover-border-red-500 dark:hover:border-red-400 transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex items-center gap-2">
                          <GitCommit className="w-4 h-4 text-red-500 dark:text-red-400" />
                          <span className="text-gray-700 dark:text-gray-300">Streak maximum</span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-1">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {contributionStats.maxStreak}
                          </p>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{t('developers.maxStreak')} ({contributionStats.maxStreak} {t('developers.days')})</span>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Calendrier des contributions</h4>
                        <div className="overflow-x-auto">
                          <GitHubCalendar
                            username={userData.login}
                            blockSize={12}
                            blockMargin={4}
                            fontSize={12}
                            colorScheme={theme === 'dark' ? 'dark' : 'light'}
                            theme={{
                              light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                              dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                            }}
                            style={{
                              width: '100%',
                              maxWidth: '100%',
                              margin: '0 auto'
                            }}
                          />
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{t('developers.less')}</span>
                          <span>{t('developers.more')}</span>
                        </div>
                      </div>
                    </div>
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

const styles = `
  .export-button {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .export-button:hover {
    background: linear-gradient(135deg, #3d4a5c 0%, #2a3441 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  .export-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .export-button svg {
    transition: transform 0.3s ease;
  }

  .export-button:hover svg {
    transform: translateY(-2px);
  }
`; 