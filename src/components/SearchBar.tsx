import React from 'react';
import { Search, Github } from 'lucide-react';

interface SearchBarProps {
  username: string;
  setUsername: (username: string) => void;
  onSearch: () => void;
  loading: boolean;
  error: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  username,
  setUsername,
  onSearch,
  loading,
  error,
}) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Github className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Dash
        </h1>
      </div>

      <div className="text-center mb-8 max-w-2xl">
        <p className="text-xl text-gray-300 mb-4">
          Visualisez vos statistiques GitHub en un coup d'œil
        </p>
        <p className="text-gray-400">
          Entrez votre nom d'utilisateur GitHub pour découvrir vos contributions,
          langages de programmation favoris, et bien plus encore.
          Générez une belle carte de statistiques à partager !
        </p>
      </div>

      <div className="w-full max-w-md flex gap-2">
        <div className="relative flex-1 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez un nom d'utilisateur GitHub"
              className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
            />
            <Search className="absolute right-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
          </div>
        </div>
        <button
          onClick={onSearch}
          disabled={loading}
          className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-lg shadow-lg group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full group-hover:translate-x-0 ease">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
            {loading ? "Chargement..." : "Rechercher"}
          </span>
          <span className="relative invisible">{loading ? "Chargement..." : "Rechercher"}</span>
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}; 