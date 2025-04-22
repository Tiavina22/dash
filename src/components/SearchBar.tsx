import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { GitHubTokenInput } from './GitHubTokenInput';

interface SearchBarProps {
  username: string;
  setUsername: (username: string) => void;
  onSearch: () => void;
  loading: boolean;
  error: string;
  placeholder?: string;
  buttonText?: string;
  autoSearch?: boolean;
  onTokenChange?: (token: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  username,
  setUsername,
  onSearch,
  loading,
  error,
  placeholder = 'Enter a GitHub username...',
  buttonText = 'Search',
  autoSearch = false,
  onTokenChange
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialRender = useRef(true);
  const [debouncedUsername, setDebouncedUsername] = useState(username);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    const urlUsername = searchParams.get('username');
    if (urlUsername) {
      setUsername(urlUsername);
      setDebouncedUsername(urlUsername);
      onSearch();
    }
  }, [searchParams]);

  useEffect(() => {
    if (autoSearch && username && initialRender.current) {
      onSearch();
      initialRender.current = false;
    }
  }, [username, autoSearch]);

  useEffect(() => {
    if (!autoSearch && !searchParams.get('username')) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setDebouncedUsername(username);
      }, 500);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [username, autoSearch, searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && username.length >= 3) {
      onSearch();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 pl-12 pr-32 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            disabled={loading}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <div className="absolute right-0 inset-y-0 flex items-center pr-2">
            {onTokenChange && <GitHubTokenInput onTokenChange={onTokenChange} />}
            <button
              type="submit"
              disabled={loading || !username.trim() || username.length < 3}
              className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Chargement...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  <span>{buttonText}</span>
                </div>
              )}
            </button>
          </div>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </form>
    </div>
  );
}; 