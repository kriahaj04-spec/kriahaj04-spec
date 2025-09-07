import React, { useEffect, useState } from 'react';
import { TrendingUp, Award, AlertTriangle } from 'lucide-react';

interface MatchScoreProps {
  percentage: number;
}

export const MatchScore: React.FC<MatchScoreProps> = ({ percentage }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <Award className="h-8 w-8 text-green-600" />;
    if (score >= 60) return <TrendingUp className="h-8 w-8 text-yellow-600" />;
    return <AlertTriangle className="h-8 w-8 text-red-600" />;
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return { title: 'Excellent Match!', desc: 'You\'re a strong candidate for this position.' };
    if (score >= 60) return { title: 'Good Match', desc: 'You meet most requirements with some skill gaps.' };
    return { title: 'Needs Improvement', desc: 'Focus on developing key missing skills.' };
  };

  const message = getScoreMessage(percentage);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Match Score</h2>
          <p className="text-gray-600">How well your resume fits this job</p>
        </div>
        {getScoreIcon(percentage)}
      </div>
      
      <div className="relative mb-6">
        <div className="flex items-end space-x-2 mb-4">
          <span className={`text-6xl font-bold ${getScoreColor(percentage)}`}>
            {animatedPercentage}
          </span>
          <span className={`text-3xl font-bold ${getScoreColor(percentage)} mb-2`}>%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              percentage >= 80 ? 'bg-green-500' : 
              percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${animatedPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-2">{message.title}</h3>
        <p className="text-gray-600">{message.desc}</p>
      </div>
    </div>
  );
};