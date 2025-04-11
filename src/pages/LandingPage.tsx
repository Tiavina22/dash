import React from 'react';
import { Github, Star, GitFork, Users, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            GitDash
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Visualisez vos statistiques GitHub d'une manière élégante et moderne. 
            Obtenez des insights sur vos contributions, langages utilisés et bien plus encore.
          </p>
          
          <div className="flex justify-center space-x-4 mb-16">
            <Link
              to="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/Tiavina22/dash"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gray-800 dark:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <Github className="w-5 h-5 mr-2" />
              Voir le code
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Langages utilisés</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Découvrez quels langages de programmation vous utilisez le plus dans vos projets.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Statistiques des dépôts</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualisez le nombre total d'étoiles, de forks et de contributions.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Activité sociale</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Suivez votre croissance sur GitHub avec des statistiques détaillées.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 