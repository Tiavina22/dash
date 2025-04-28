import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../components/ThemeProvider';
import { useMadagascarDevs } from '../hooks/useMadagascarDevs';
import { useTranslation } from 'react-i18next';

export const MadagascarDevs: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { developers, loading, error, fetchMoreDevs, hasMore } = useMadagascarDevs();
  const [copiedUsername, setCopiedUsername] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  const handleProfileClick = (username: string) => {
    navigate(`/dashboard?username=${username}`, { state: { fromHero: true } });
  };

  const handleShareClick = async (username: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const profileUrl = `${window.location.origin}/dashboard?username=${username}`;
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopiedUsername(username);
      setTimeout(() => setCopiedUsername(null), 2000);
    } catch (err) {
      console.error(t('developers.copyError'), err);
    }
  };

  const filteredDevelopers = developers.filter(dev =>
    dev.username.toLowerCase().includes(search.toLowerCase()) ||
    dev.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && developers.length === 0) return <div className="text-center py-10">Chargement...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 mb-12 transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-gray-50 to-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Développeurs à Madagascar 🇲🇬
          </h1>
          <p className={`text-xl ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Découvrez les talents tech de Madagascar.
          </p>

          {/* Input de recherche */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Rechercher un développeur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/2 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDevelopers.map((dev, index) => (
            <motion.div
              key={dev.username}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 ${
                theme === 'dark' ? 'from-blue-500 to-purple-600' : 'from-blue-400 to-purple-500'
              }`}></div>
              <div 
                className={`relative rounded-lg p-6 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
                onClick={() => handleProfileClick(dev.username)}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={`https://github.com/${dev.username}.png`}
                    alt={`${dev.username}'s avatar`}
                    className="w-32 h-32 rounded-full border-4 border-white mb-4"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/128';
                    }}
                  />
                  <h2 className={`text-xl font-semibold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {dev.name}
                  </h2>
                  <p className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    @{dev.username}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-blue-400">
                      <span>Voir Profil</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => handleShareClick(dev.username, e)}
                        className="p-2 text-blue-400 hover:text-blue-500 transition-colors"
                        title="Partager le profil"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {copiedUsername === dev.username && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-md text-sm ${
                              theme === 'dark' 
                                ? 'bg-gray-700 text-white' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            Copié !
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bouton Charger Plus */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={fetchMoreDevs}
              className="px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Charger plus
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
