import React from 'react';
import { Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden relative">
      {/* Background curved elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 dark:bg-purple-900 rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-100 dark:bg-green-900 rounded-full opacity-10 blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * 100 - 50],
              x: [null, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            GitDash
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t('landing.description')}
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              to="/dashboard"
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-medium transition-all duration-200 hover:opacity-90 flex items-center shadow-lg hover:shadow-xl"
            >
              {t('landing.getStarted')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="https://github.com/Tiavina22/dash"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Github className="w-5 h-5 mr-2" />
              {t('landing.viewCode')}
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
          <div className="relative w-full max-w-4xl mx-auto">
            <img
              src="/capture/Tiavina22-stats.png"
              alt={t('landing.interfaceAlt')}
              className="w-full h-auto rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 