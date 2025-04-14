import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { ThemeProvider } from './components/ThemeProvider';
import { Dashboard } from './pages/Dashboard';
import { Hero } from './pages/Hero';
import { useSearchParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { SearchBar } from './components/SearchBar';
import { GithubCard } from './components/GithubCard';
import { DetailedStats } from './components/DetailedStats';
import { useGithub } from './hooks/useGithub';
import LoadingScreen from './components/LoadingScreen';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import './styles/language-selector.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const exportAsImage = async (element: HTMLElement, imageFileName: string) => {
    try {
      // Créer un clone de la carte GitHub pour l'export
      const clone = element.cloneNode(true) as HTMLElement;
      document.body.appendChild(clone);

      // Définir une taille fixe pour l'export
      const exportWidth = 1200;
      const exportHeight = 800;
      
      // Appliquer les styles nécessaires pour l'export
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '-9999px';
      clone.style.width = `${exportWidth}px`;
      clone.style.height = `${exportHeight}px`;
      clone.style.padding = '40px';
      clone.style.backgroundColor = '#1a1a1a';
      clone.style.borderRadius = '20px';
      clone.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
      
      // Supprimer les effets de flou et de transparence
      const elementsToModify = clone.querySelectorAll('*');
      elementsToModify.forEach((el: Element) => {
        if (el instanceof HTMLElement) {
          el.style.backdropFilter = 'none';
          el.style.filter = 'none';
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });

      // Attendre que le clone soit rendu
      await new Promise(resolve => setTimeout(resolve, 100));

      // Utiliser html2canvas avec des options améliorées
      const canvas = await html2canvas(clone, {
        width: exportWidth,
        height: exportHeight,
        scale: 2, // Augmenter la résolution
        backgroundColor: '#1a1a1a',
        logging: false,
        useCORS: true,
        allowTaint: true,
        imageTimeout: 0,
        removeContainer: true
      });

      // Supprimer le clone
      document.body.removeChild(clone);

      // Créer un lien de téléchargement
      const link = document.createElement('a');
      link.download = `${imageFileName}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Erreur lors de l\'export de l\'image:', error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/hero" element={<Hero />} />
              <Route path="/dashboard" element={<DashboardWithParams />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

function DashboardWithParams() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username');
  
  return <Dashboard initialUsername={username || ''} />;
}

export default App;
