import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Github } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { PayPalButton } from './PayPalButton';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';


export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false
  );
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleResize = () => setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);
    handleResize();
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  // Fermer le menu mobile si on passe en desktop
  useEffect(() => {
    if (isDesktop && isMenuOpen) setIsMenuOpen(false);
  }, [isDesktop, isMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              GitDash
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="items-center space-x-8"
            style={{ display: isDesktop ? 'flex' : 'none' }}
          >
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {t('navigation.home')}
            </Link>
            <Link
              to="/hero"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/hero')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {t('developers.title')}
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/dashboard')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {t('navigation.dashboard')}
            </Link>
            <div className="flex items-center">
              <LanguageSelector />
            </div>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Tiavina22/dash"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              title={t('common.viewSource')}
            >
              <Github className="h-5 w-5" />
            </a>
            <div className="p-2">
              <PayPalButton />
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              title={theme === 'dark' ? t('common.switchToLight') : t('common.switchToDark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && !isDesktop && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Drawer */}
            <div
              className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg z-50 flex flex-col p-6 transition-transform duration-300"
            >
              <button
                className="self-end mb-6 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Fermer le menu"
              >
                <X className="h-6 w-6" />
              </button>
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className={`text-base font-medium px-2 py-2 rounded transition-colors duration-200 ${
                    isActive('/')
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.home')}
                </Link>
                <Link
                  to="/hero"
                  className={`text-base font-medium px-2 py-2 rounded transition-colors duration-200 ${
                    isActive('/hero')
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('developers.title')}
                </Link>
                <Link
                  to="/dashboard"
                  className={`text-base font-medium px-2 py-2 rounded transition-colors duration-200 ${
                    isActive('/dashboard')
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.dashboard')}
                </Link>
                <div className="pt-2">
                  <LanguageSelector />
                </div>
                <div className="pt-4">
                  <PayPalButton />
                </div>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}; 
