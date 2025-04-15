import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ProfileComparisonProps {
  onCompare: (usernames: string[]) => void;
}

const ProfileComparison: React.FC<ProfileComparisonProps> = ({ onCompare }) => {
  const { t } = useTranslation();
  const [usernames, setUsernames] = useState<string[]>(['', '']);

  const handleUsernameChange = (index: number, value: string) => {
    const newUsernames = [...usernames];
    newUsernames[index] = value;
    setUsernames(newUsernames);
  };

  const handleCompare = () => {
    const validUsernames = usernames.filter(username => username.trim() !== '');
    if (validUsernames.length >= 2) {
      onCompare(validUsernames);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {t('compare.title')}
      </h2>
      <div className="space-y-4">
        {usernames.map((username, index) => (
          <div key={index} className="flex items-center space-x-4">
            <input
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(index, e.target.value)}
              placeholder={`${t('compare.username')} ${index + 1}`}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {index > 1 && (
              <button
                onClick={() => {
                  const newUsernames = usernames.filter((_, i) => i !== index);
                  setUsernames(newUsernames);
                }}
                className="text-red-500 hover:text-red-700"
              >
                {t('compare.remove')}
              </button>
            )}
          </div>
        ))}
        <div className="flex space-x-4">
          <button
            onClick={() => setUsernames([...usernames, ''])}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {t('compare.addProfile')}
          </button>
          <button
            onClick={handleCompare}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            {t('compare.compare')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileComparison; 