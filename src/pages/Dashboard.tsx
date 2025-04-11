import React from 'react';
import html2canvas from 'html2canvas';
import { useGithub } from '../hooks/useGithub';
import { SearchBar } from '../components/SearchBar';
import { GithubCard } from '../components/GithubCard';
import { Download } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';

export const Dashboard: React.FC = () => {
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
          useCORS: true,
          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
          scale: 2,
          logging: false,
          allowTaint: true,
          removeContainer: true,
          onclone: (clonedDoc) => {
            const clonedCard = clonedDoc.getElementById('github-card');
            if (clonedCard) {
              const elements = clonedCard.querySelectorAll('*');
              elements.forEach((el) => {
                const element = el as HTMLElement;
                element.style.backdropFilter = 'none';
                element.style.filter = 'none';
                element.style.opacity = '1';
                element.style.transform = 'none';
                element.style.visibility = 'visible';
              });

              clonedCard.style.background = theme === 'dark' ? '#1F2937' : '#FFFFFF';
              clonedCard.style.boxShadow = 'none';
              
              const borders = clonedCard.querySelectorAll('[class*="border"]');
              borders.forEach((el) => {
                const element = el as HTMLElement;
                element.style.borderColor = theme === 'dark' ? '#374151' : '#E5E7EB';
              });
            }
          }
        });

        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.href = image;
        link.download = `${username}-github-stats.png`;
        link.click();
      } finally {
        document.body.removeChild(clone);
      }
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <SearchBar
          username={username}
          setUsername={setUsername}
          onSearch={fetchGitHubData}
          loading={loading}
          error={error}
        />

        {userData && (
          <>
            <GithubCard
              userData={userData}
              languages={languages}
              repoStats={repoStats}
              contributionStats={contributionStats}
              calculateAccountAge={calculateAccountAge}
            />
            <div className="mt-6 text-center">
              <button
                onClick={exportAsImage}
                className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-lg shadow-lg group bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full group-hover:translate-x-0 ease">
                  <Download className="w-6 h-6" />
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Exporter en PNG
                </span>
                <span className="relative invisible">Exporter en PNG</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 