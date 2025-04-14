import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useTranslation } from 'react-i18next';

const LoadingScreen: React.FC = () => {
  const bars = Array.from({ length: 5 }, (_, i) => i);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const isDark = theme === 'dark';

  return (
    <div className={`fixed inset-0 ${isDark ? 'bg-gray-900' : 'bg-white'} flex flex-col items-center justify-center`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <Activity className={`w-16 h-16 ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-8`} />
        <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-8`}>
          GitDash
        </h2>
        
        <div className="flex items-end space-x-2 h-32">
          {bars.map((_, index) => (
            <motion.div
              key={index}
              className={`w-8 ${isDark ? 'bg-blue-400' : 'bg-blue-600'} rounded-t-lg`}
              initial={{ height: 0 }}
              animate={{
                height: [20, 100, 20],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={`mt-8 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          {t('common.loadingApp')}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen; 