import React from 'react';
import html2canvas from 'html2canvas';
import { useGithub } from './hooks/useGithub';
import { SearchBar } from './components/SearchBar';
import { GithubCard } from './components/GithubCard';

function App() {
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

  const exportAsImage = async () => {
    const card = document.getElementById('github-card');
    if (card) {
      const canvas = await html2canvas(card, { useCORS: true });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${username}-github-stats.png`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-8 flex-col">
      <div className="flex-grow max-w-4xl mx-auto">
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
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Exporter en PNG
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
