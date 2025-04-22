import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GitHubTokenInputProps {
  onTokenChange: (token: string) => void;
}

export const GitHubTokenInput: React.FC<GitHubTokenInputProps> = ({ onTokenChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTokenChange(token);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
        title={t('dashboard.githubToken')}
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('dashboard.githubToken')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {t('dashboard.githubTokenDescription')}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={t('dashboard.githubTokenPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                {t('common.save')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}; 