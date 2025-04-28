import { useState, useEffect } from 'react';
import axios from 'axios';

interface Developer {
  username: string;
  name: string;
}

export const useMadagascarDevs = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchDevs = async (currentPage = 1) => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get('https://api.github.com/search/users', {
        params: {
          q: 'location:Madagascar',
          per_page: 100,  
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });

      const users = response.data.items;
      
      if (users.length === 0) {
        setHasMore(false);
        return;
      }

      const detailedUsers = await Promise.all(users.map(async (user: any) => {
        try {
          const userDetails = await axios.get(`https://api.github.com/users/${user.login}`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          });
          return {
            username: user.login,
            name: userDetails.data.name || user.login,
          };
        } catch {
          return {
            username: user.login,
            name: user.login,
          };
        }
      }));

      setDevelopers(prev => [...prev, ...detailedUsers]);
    } catch (err) {
      console.error('Erreur lors de la récupération des développeurs:', err);
      setError('Erreur lors de la récupération des développeurs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevs(page);
  }, [page]);

  const fetchMoreDevs = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return { developers, loading, error, fetchMoreDevs, hasMore };
};
