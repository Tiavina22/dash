import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeProvider';
import { developers } from '../data/developers';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleProfileClick = (username: string) => {
    navigate(`/dashboard?username=${username}`, { state: { fromHero: true } });
  };

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
            Découvrez les Développeurs Malgaches
          </h1>
          <p className={`text-xl ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Explorez les contributions et les projets de développeurs talentueux de Madagascar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {developers.map((dev, index) => (
            <motion.div
              key={dev.username}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  }`}>@{dev.username}</p>
                  <div className="flex items-center gap-2 text-blue-400">
                    <span>Voir le profil</span>
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Cliquez sur un profil pour voir les statistiques détaillées
          </p>
        </div>
      </div>
    </div>
  );
}; 
