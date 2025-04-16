import React from 'react';
import { useTranslation } from 'react-i18next';
import { Code, Star, GitBranch, Zap } from 'lucide-react';

interface SkillBadgesProps {
  languages: { name: string; value: number }[];
  stars: number;
  contributions: number;
  repositories: number;
}

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const SkillBadges: React.FC<SkillBadgesProps> = ({
  languages,
  stars,
  contributions,
  repositories,
}) => {
  const { t } = useTranslation();

  const getTopSkills = (): Skill[] => {
    const sortedLanguages = [...languages].sort((a, b) => b.value - a.value);
    const topLanguages = sortedLanguages.slice(0, 3);
    
    const skills: Skill[] = [];
    
    // Analyse des compétences en TypeScript/JavaScript
    const jsTsTotal = languages.reduce((sum, lang) => {
      const lowerName = lang.name.toLowerCase();
      if (lowerName === 'typescript' || lowerName === 'javascript') {
        return sum + lang.value;
      }
      return sum;
    }, 0);
    
    if (jsTsTotal > 0) {
      const isTypeScript = languages.some(lang => 
        lang.name.toLowerCase() === 'typescript'
      );
      skills.push({
        name: isTypeScript ? 'TypeScript Expert' : 'JavaScript Expert',
        icon: <Code className="w-5 h-5" />,
        color: isTypeScript ? 'bg-blue-500' : 'bg-yellow-500',
      });
    }

    // Badge pour les contributions
    if (contributions > 1000) {
      skills.push({
        name: 'Top Contributor',
        icon: <GitBranch className="w-5 h-5" />,
        color: 'bg-green-500',
      });
    }

    // Badge pour les étoiles
    if (stars > 100) {
      skills.push({
        name: 'Star Collector',
        icon: <Star className="w-5 h-5" />,
        color: 'bg-yellow-500',
      });
    }

    // Badge pour les repositories
    if (repositories > 50) {
      skills.push({
        name: 'Productive Developer',
        icon: <Zap className="w-5 h-5" />,
        color: 'bg-purple-500',
      });
    }

    return skills;
  };

  const skills = getTopSkills();

  if (skills.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('dashboard.skills')}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-white ${skill.color}`}
          >
            {skill.icon}
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillBadges; 