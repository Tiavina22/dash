import React, { useEffect, useState } from 'react';
import { Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const [contributors, setContributors] = useState<Array<{login: string, avatar_url: string, html_url: string}>>([]);
  const [loadingContrib, setLoadingContrib] = useState(true);
  const [errorContrib, setErrorContrib] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/Tiavina22/dash/contributors')
      .then(res => {
        if (!res.ok) throw new Error('Erreur API GitHub');
        return res.json();
      })
      .then(data => {
        setContributors(data);
        setLoadingContrib(false);
      })
      .catch(e => {
        setErrorContrib('Erreur lors du chargement des contributeurs');
        setLoadingContrib(false);
      });
  }, []);

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

          {/* Liste des contributeurs */}
          <div className="flex flex-col items-center mb-10">
            <div className="font-semibold text-lg mb-2">{t('landing.contributors', 'Contributeurs')}</div>
            {loadingContrib && <div className="text-gray-500">Loading...</div>}
            {errorContrib && <div className="text-red-500">{errorContrib}</div>}
            <div className="flex flex-wrap justify-center gap-4">
              {contributors.map(contrib => (
                <a
                  key={contrib.login}
                  href={contrib.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
                  title={contrib.login}
                >
                  <img
                    src={contrib.avatar_url}
                    alt={contrib.login}
                    className="w-14 h-14 rounded-full border-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-500 transition"
                  />
                  <span className="text-xs mt-1 text-gray-700 dark:text-gray-300 group-hover:text-blue-500">{contrib.login}</span>
                </a>
              ))}
            </div>
          </div>

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
}
