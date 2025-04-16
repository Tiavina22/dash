import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, X, Search, GitCompare } from 'lucide-react';

interface ProfileComparisonProps {
  onCompare: (usernames: string[]) => void;
}

const ProfileComparison: React.FC<ProfileComparisonProps> = ({ onCompare }) => {
  const { t } = useTranslation();
  const [usernames, setUsernames] = useState<string[]>(['', '']);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleUsernameChange = (index: number, value: string) => {
    const newUsernames = [...usernames];
    newUsernames[index] = value;
    setUsernames(newUsernames);
    
    // Vérifier si au moins 2 usernames sont valides
    const validUsernames = newUsernames.filter(username => username.trim() !== '');
    setIsValid(validUsernames.length >= 2);
  };

  const handleCompare = () => {
    const validUsernames = usernames.filter(username => username.trim() !== '');
    if (validUsernames.length >= 2) {
      onCompare(validUsernames);
    }
  };

  const addProfile = () => {
    if (usernames.length < 5) {
      setUsernames([...usernames, '']);
    }
  };

  const removeProfile = (index: number) => {
    const newUsernames = usernames.filter((_, i) => i !== index);
    setUsernames(newUsernames);
    setIsValid(newUsernames.filter(username => username.trim() !== '').length >= 2);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <GitCompare className="w-6 h-6 mr-2 text-blue-500" />
          {t('compare.title')}
        </h2>
        <button
          onClick={addProfile}
          disabled={usernames.length >= 5}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('compare.addProfile')}
        </button>
      </div>

      <div className="space-y-4">
        {usernames.map((username, index) => (
          <div key={index} className="flex items-center space-x-4 group">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => handleUsernameChange(index, e.target.value)}
                placeholder={`${t('compare.username')} ${index + 1}`}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            {index > 1 && (
              <button
                onClick={() => removeProfile(index)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                title={t('compare.remove')}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCompare}
          disabled={!isValid}
          className="flex items-center px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GitCompare className="w-5 h-5 mr-2" />
          {t('compare.compare')}
        </button>
      </div>

      {usernames.length >= 5 && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          {t('compare.maxProfiles')}
        </p>
      )}
    </div>
  );
};

export default ProfileComparison; 