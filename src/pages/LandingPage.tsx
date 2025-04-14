import React from 'react';
import { Github, Star, GitFork, Users, Code, Activity, GitBranch, TrendingUp, BarChart2, Zap, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            GitDash
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Visualisez vos statistiques GitHub d'une manière élégante et moderne. 
            Obtenez des insights sur vos contributions, langages utilisés et bien plus encore.
          </p>
          
          <div className="flex flex-col items-center space-y-4 mb-16">
            <div className="flex justify-center space-x-4">
              <Link
                to="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="https://github.com/Tiavina22/dash"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-gray-800 dark:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Github className="w-5 h-5 mr-2" />
                Voir le code
              </a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Aucune inscription requise • Utilisez simplement votre compte username GitHub
            </p>
          </div>

          {/* Section Démonstration */}
          <div className="mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Aperçu de l'interface</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Découvrez une interface intuitive et moderne pour visualiser vos statistiques GitHub.
                </p>
                <div className="w-full max-w-5xl mx-auto">
                  <img
                    src="/capture/Tiavina22-stats.png"
                    alt="Interface GitDash"
                    className="w-full h-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <Code className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Langages utilisés</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Découvrez quels langages de programmation vous utilisez le plus dans vos projets.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4">
                <Activity className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Statistiques des dépôts</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualisez le nombre total d'étoiles, de forks et de contributions.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-green-100 dark:bg-green-900 rounded-lg mb-4">
                <TrendingUp className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Activité sociale</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Suivez votre croissance sur GitHub avec des statistiques détaillées.
              </p>
            </motion.div>
          </div>

          <div className="mt-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Pourquoi choisir GitDash ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-yellow-100 dark:bg-yellow-900 rounded-lg mb-4">
                  <Zap className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Performance</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Interface rapide et réactive pour une expérience utilisateur optimale.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-red-100 dark:bg-red-900 rounded-lg mb-4">
                  <Shield className="w-7 h-7 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Sécurité</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  GitDash ne stocke aucune donnée. Nous utilisons uniquement l'API GitHub pour afficher vos statistiques en temps réel.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-lg mb-4">
                  <BarChart2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Analyses avancées</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Des graphiques et statistiques détaillés pour suivre votre progression.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Section FAQ */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Questions fréquentes</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-start">
                  <HelpCircle className="w-6 h-6 text-blue-500 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Comment GitDash accède-t-il à mes données GitHub ?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      GitDash utilise l'API GitHub officielle pour accéder à vos données publiques. Aucune donnée n'est stockée sur nos serveurs.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-start">
                  <HelpCircle className="w-6 h-6 text-blue-500 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Est-ce que GitDash est gratuit ?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Oui, GitDash est entièrement gratuit et open-source. Vous pouvez l'utiliser sans aucune limitation.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-start">
                  <HelpCircle className="w-6 h-6 text-blue-500 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Quelles statistiques puis-je voir ?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Vous pouvez voir vos contributions, les langages utilisés, les statistiques des dépôts, et bien plus encore.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 