import { useEffect, useState } from 'react';
import { useGithub } from '../hooks/useGithub';
import React from 'react';

interface Developer {
  login: string;
  avatar_url: string;
  html_url: string;
}

const DevelopersInMadagascar = () => {
  const { fetchDevelopersInMadagascar, loading, error } = useGithub();
  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const devs = await fetchDevelopersInMadagascar();
      setDevelopers(devs);
    };

    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Développeurs à Madagascar</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {developers.map((dev) => (
          <a
            key={dev.login}
            href={dev.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border rounded hover:shadow-md transition"
          >
            <img
              src={dev.avatar_url}
              alt={dev.login}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <p className="mt-2 text-center font-semibold">{dev.login}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DevelopersInMadagascar;
