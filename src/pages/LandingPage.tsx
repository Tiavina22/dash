import React from 'react';
import { Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            GitDash
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {t('landing.description')}
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link
              to="/dashboard"
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg font-medium transition-all duration-200 hover:opacity-90 flex items-center"
            >
              {t('landing.getStarted')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="https://github.com/Tiavina22/dash"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <Github className="w-5 h-5 mr-2" />
              {t('landing.viewCode')}
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="w-full max-w-4xl mx-auto">
            <img
              src="/capture/Tiavina22-stats.png"
              alt={t('landing.interfaceAlt')}
              className="w-full h-auto rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 