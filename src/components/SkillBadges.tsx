import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Code, 
  Star, 
  GitBranch, 
  Zap, 
  Trophy, 
  Shield, 
  Rocket, 
  Award,
  BookOpen,
  GitPullRequest,
  GitCommit,
  Users,
  Clock
} from 'lucide-react';

interface SkillBadgesProps {
  languages: { name: string; value: number }[];
  stars: number;
  contributions: number;
  repositories: number;
  followers: number;
  pullRequests: { open: number; closed: number; merged: number };
  issues: { open: number; closed: number };
  accountAge: string;
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
  followers,
  pullRequests,
  issues,
  accountAge
}) => {
  const { t } = useTranslation();

  const getTopSkills = (): Skill[] => {
    const skills: Skill[] = [];
    const totalCode = languages.reduce((sum, lang) => sum + lang.value, 0);
    
    // Analyse des compétences en langages
    const languageStats = languages.reduce((acc, lang) => {
      const lowerName = lang.name.toLowerCase();
      if (lowerName === 'typescript' || lowerName === 'javascript') {
        acc.jsTsTotal += lang.value;
        if (lowerName === 'typescript') acc.isTypeScript = true;
      } else if (lowerName === 'python') {
        acc.pythonTotal += lang.value;
      } else if (lowerName === 'java') {
        acc.javaTotal += lang.value;
      } else if (lowerName === 'c++' || lowerName === 'cpp') {
        acc.cppTotal += lang.value;
      } else if (lowerName === 'rust') {
        acc.rustTotal += lang.value;
      } else if (lowerName === 'go') {
        acc.goTotal += lang.value;
      }
      return acc;
    }, { 
      jsTsTotal: 0, 
      pythonTotal: 0, 
      javaTotal: 0, 
      cppTotal: 0,
      rustTotal: 0,
      goTotal: 0,
      isTypeScript: false 
    });

    // Badges de langages (nécessite > 40% du code)
    const addLanguageBadge = (total: number, name: string, color: string) => {
      const percentage = (total / totalCode) * 100;
      if (percentage > 40) {
        skills.push({
          name: `${name} Expert`,
          icon: <Code className="w-5 h-5" />,
          color: color,
        });
      } else if (percentage > 20) {
        skills.push({
          name: `${name} Developer`,
          icon: <Code className="w-5 h-5" />,
          color: color,
        });
      }
    };

    if (languageStats.jsTsTotal > 0) {
      const isTypeScript = languageStats.isTypeScript;
      addLanguageBadge(
        languageStats.jsTsTotal,
        isTypeScript ? 'TypeScript' : 'JavaScript',
        isTypeScript ? 'bg-blue-500' : 'bg-yellow-500'
      );
    }

    addLanguageBadge(languageStats.pythonTotal, 'Python', 'bg-blue-400');
    addLanguageBadge(languageStats.javaTotal, 'Java', 'bg-red-500');
    addLanguageBadge(languageStats.cppTotal, 'C++', 'bg-purple-500');
    addLanguageBadge(languageStats.rustTotal, 'Rust', 'bg-orange-500');
    addLanguageBadge(languageStats.goTotal, 'Go', 'bg-blue-600');

    // Badges de contributions
    if (contributions > 10000) {
      skills.push({
        name: 'GitHub Legend',
        icon: <Trophy className="w-5 h-5" />,
        color: 'bg-yellow-500',
      });
    } else if (contributions > 5000) {
      skills.push({
        name: 'Top Contributor',
        icon: <GitBranch className="w-5 h-5" />,
        color: 'bg-green-500',
      });
    } else if (contributions > 1000) {
      skills.push({
        name: 'Active Contributor',
        icon: <GitCommit className="w-5 h-5" />,
        color: 'bg-green-400',
      });
    }

    // Badges de popularité
    if (stars > 5000) {
      skills.push({
        name: 'GitHub Superstar',
        icon: <Star className="w-5 h-5" />,
        color: 'bg-yellow-500',
      });
    } else if (stars > 1000) {
      skills.push({
        name: 'GitHub Star',
        icon: <Star className="w-5 h-5" />,
        color: 'bg-yellow-400',
      });
    } else if (stars > 100) {
      skills.push({
        name: 'Star Collector',
        icon: <Star className="w-5 h-5" />,
        color: 'bg-yellow-300',
      });
    }

    // Badges de followers
    if (followers > 1000) {
      skills.push({
        name: 'Community Leader',
        icon: <Users className="w-5 h-5" />,
        color: 'bg-purple-500',
      });
    } else if (followers > 100) {
      skills.push({
        name: 'Popular Developer',
        icon: <Users className="w-5 h-5" />,
        color: 'bg-purple-400',
      });
    }

    // Badges de repositories
    if (repositories > 200) {
      skills.push({
        name: 'Code Machine',
        icon: <Rocket className="w-5 h-5" />,
        color: 'bg-purple-500',
      });
    } else if (repositories > 100) {
      skills.push({
        name: 'Productive Developer',
        icon: <Zap className="w-5 h-5" />,
        color: 'bg-purple-400',
      });
    } else if (repositories > 50) {
      skills.push({
        name: 'Active Developer',
        icon: <Zap className="w-5 h-5" />,
        color: 'bg-purple-300',
      });
    }

    // Badges de pull requests
    const totalPRs = pullRequests.open + pullRequests.closed + pullRequests.merged;
    if (totalPRs > 500) {
      skills.push({
        name: 'PR Master',
        icon: <GitPullRequest className="w-5 h-5" />,
        color: 'bg-blue-500',
      });
    } else if (totalPRs > 100) {
      skills.push({
        name: 'PR Expert',
        icon: <GitPullRequest className="w-5 h-5" />,
        color: 'bg-blue-400',
      });
    }

    // Badges de diversité
    if (languages.length >= 10) {
      skills.push({
        name: 'Ultimate Polyglot',
        icon: <Shield className="w-5 h-5" />,
        color: 'bg-indigo-500',
      });
    } else if (languages.length >= 5) {
      skills.push({
        name: 'Polyglot Developer',
        icon: <Shield className="w-5 h-5" />,
        color: 'bg-indigo-400',
      });
    }

    // Badge d'ancienneté
    const years = parseInt(accountAge.split(' ')[0]);
    if (years >= 10) {
      skills.push({
        name: 'GitHub Veteran',
        icon: <Clock className="w-5 h-5" />,
        color: 'bg-gray-500',
      });
    } else if (years >= 5) {
      skills.push({
        name: 'Experienced Developer',
        icon: <Clock className="w-5 h-5" />,
        color: 'bg-gray-400',
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