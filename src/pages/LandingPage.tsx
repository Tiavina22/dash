import React from 'react';
import { Github, Star, GitFork, Users, Code, Activity, GitBranch, TrendingUp, BarChart2, Zap, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();

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
            {t('landing.description')}
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link
              to="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
            >
              {t('landing.getStarted')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="https://github.com/Tiavina22/dash"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gray-800 dark:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Github className="w-5 h-5 mr-2" />
              {t('landing.viewCode')}
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('landing.noSignup')}
          </p>
        </motion.div>

        {/* Section Démonstration */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden mt-20"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('landing.interfacePreview')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('landing.interfaceDescription')}
            </p>
            <div className="w-full max-w-5xl mx-auto">
              <img
                src="/capture/Tiavina22-stats.png"
                alt={t('landing.interfaceAlt')}
                className="w-full h-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        </motion.div>

        {/* Section Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
              <Code className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('landing.features.languages.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('landing.features.languages.description')}
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4">
              <Activity className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('landing.features.stats.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('landing.features.stats.description')}
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-green-100 dark:bg-green-900 rounded-lg mb-4">
              <BarChart2 className="w-7 h-7 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('landing.features.contributions.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('landing.features.contributions.description')}
            </p>
          </motion.div>
        </div>

        {/* Section Why Choose */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">{t('landing.whyChoose.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-yellow-100 dark:bg-yellow-900 rounded-lg mb-4">
                <Zap className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('landing.whyChoose.performance.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('landing.whyChoose.performance.description')}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-red-100 dark:bg-red-900 rounded-lg mb-4">
                <Shield className="w-7 h-7 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('landing.whyChoose.security.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('landing.whyChoose.security.description')}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-lg mb-4">
                <BarChart2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('landing.whyChoose.analytics.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('landing.whyChoose.analytics.description')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Section FAQ */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">{t('landing.faq.title')}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-start">
                <HelpCircle className="w-6 h-6 text-blue-500 mt-1 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t('landing.faq.dataAccess.question')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('landing.faq.dataAccess.answer')}
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
                    {t('landing.faq.pricing.question')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('landing.faq.pricing.answer')}
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
                    {t('landing.faq.stats.question')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('landing.faq.stats.answer')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}; 