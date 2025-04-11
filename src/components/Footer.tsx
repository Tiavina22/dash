import React, { useState } from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Chat flottant */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
        <div 
          className="relative cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Chat animé */}
          <div className="relative w-16 h-16">
            {/* Corps du chat */}
            <div className="absolute w-12 h-8 bg-gray-300 dark:bg-gray-700 rounded-full bottom-0 left-1/2 -translate-x-1/2 animate-bounce" style={{ animationDuration: '2s' }}></div>
            
            {/* Tête du chat */}
            <div className="absolute w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full -top-2 left-1/2 -translate-x-1/2">
              {/* Oreilles */}
              <div className="absolute -top-2 -left-1 w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-tl-full transform -rotate-12"></div>
              <div className="absolute -top-2 -right-1 w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-tr-full transform rotate-12"></div>
              
              {/* Yeux */}
              <div className="absolute top-3 left-2 w-2 h-2 bg-black rounded-full animate-blink" style={{ animationDuration: '3s' }}></div>
              <div className="absolute top-3 right-2 w-2 h-2 bg-black rounded-full animate-blink" style={{ animationDuration: '3s' }}></div>
              
              {/* Nez */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full"></div>
              
              {/* Moustaches */}
              <div className="absolute top-5 left-1 w-6 h-0.5 bg-gray-400 transform -rotate-12"></div>
              <div className="absolute top-5 right-1 w-6 h-0.5 bg-gray-400 transform rotate-12"></div>
            </div>
            
            {/* Queue */}
            <div className="absolute w-6 h-1 bg-gray-300 dark:bg-gray-700 rounded-full -right-2 top-1/2 transform -rotate-45 animate-wag" style={{ animationDuration: '1s' }}></div>
          </div>

          {/* Bulle d'information avec les icônes sociales */}
          {isExpanded && (
            <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
              <div className="flex flex-col items-center space-y-3">
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://github.com/Tiavina22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 transform hover:scale-110"
                    title="GitHub Profile"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tiavina-ramilison/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 transform hover:scale-110"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Supportez-moi sur{' '}
                    <a
                      href="https://www.paypal.com/donate/?hosted_button_id=tiavinaramilison22@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      PayPal
                    </a>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer en bas de page */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
              <span>©</span>
              <span>{new Date().getFullYear()}</span>
              <span>Tiavina Ramilison</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}; 