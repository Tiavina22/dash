import React from 'react';
import { Search } from 'lucide-react';

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
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-bold">Dash</h1>
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
        <div className="relative flex-1">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Entrez un nom d'utilisateur GitHub"
            className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-700"
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" />
        </div>
        <button
          onClick={onSearch}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Rechercher"}
        </button>
      </div>

      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
}; 