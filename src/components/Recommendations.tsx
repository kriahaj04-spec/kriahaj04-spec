import React from 'react';
import { SkillRecommendation } from '../types';
import { BookOpen, ExternalLink, Star, Clock } from 'lucide-react';

interface RecommendationsProps {
  recommendations: SkillRecommendation[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'free':
        return <Star className="h-4 w-4 text-yellow-500" />;
      case 'course':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'interactive':
        return <Clock className="h-4 w-4 text-green-500" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'free':
        return 'bg-yellow-100 text-yellow-800';
      case 'course':
        return 'bg-blue-100 text-blue-800';
      case 'interactive':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (recommendations.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="text-center py-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellent Match!</h3>
          <p className="text-gray-600">You have all the required skills for this position.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="flex items-center mb-6">
        <div className="bg-purple-100 p-2 rounded-lg mr-3">
          <BookOpen className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Learning Recommendations</h2>
          <p className="text-gray-600">Curated resources to bridge your skill gaps</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{recommendation.skill}</h3>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Priority Skill
              </span>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-3">
              {recommendation.resources.map((resource, resourceIndex) => (
                <a
                  key={resourceIndex}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {resource.platform}
                    </span>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="flex items-center">
                    {getTypeIcon(resource.type)}
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};