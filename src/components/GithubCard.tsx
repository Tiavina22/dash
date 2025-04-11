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
} from 'lucide-react';
import { GitHubUser, LanguageData, RepoStats, ContributionStats } from '../types/github';
import { useTheme } from './ThemeProvider';
import './GithubCard.css';

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
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

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
                  <div className="relative">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
                      {userData.name || userData.login}
                    </h2>
                  </div>
                  <button
                    onClick={() => exportAsImage(cardRef.current!, `${userData?.login || 'github'}-stats`)}
                    className="export-button"
                    title="Exporter la carte en image PNG"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Exporter en PNG
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{userData.bio || 'No bio available'}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Dépôts publics</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.public_repos}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-green-500 dark:text-green-400" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Followers</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.followers}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-400 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Total Stars</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{repoStats.stars}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <GitFork className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Total Forks</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{repoStats.forks}</p>
                  </div>
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
                              backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                              border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`,
                              borderRadius: '0.5rem',
                            }}
                          />
                          <Legend 
                            layout="vertical" 
                            align="right" 
                            verticalAlign="middle"
                            formatter={(value: string) => (
                              <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
                            )}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-2">
                          <GitCommit className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                          <span className="text-gray-700 dark:text-gray-300">Total des contributions</span>
                        </div>
                        <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                          {contributionStats.totalContributions}
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-2">
                          <GitCommit className="w-4 h-4 text-green-500 dark:text-green-400" />
                          <span className="text-gray-700 dark:text-gray-300">Contributions (12 derniers mois)</span>
                        </div>
                        <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                          {contributionStats.contributionsLastYear}
                        </p>
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