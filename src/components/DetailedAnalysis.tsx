import React from 'react';
import { BarChart3, User, Trophy, Zap } from 'lucide-react';

interface DetailedAnalysisProps {
  analysis: {
    totalRequiredSkills: number;
    matchedCount: number;
    experienceLevel: string;
    keyStrengths: string[];
  };
}

export const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({ analysis }) => {
  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'Senior':
        return 'bg-purple-100 text-purple-800';
      case 'Mid-Level':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getExperienceIcon = (level: string) => {
    switch (level) {
      case 'Senior':
        return <Trophy className="h-5 w-5 text-purple-600" />;
      case 'Mid-Level':
        return <BarChart3 className="h-5 w-5 text-blue-600" />;
      default:
        return <Zap className="h-5 w-5 text-green-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Experience Level */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 p-2 rounded-lg mr-3">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Experience Level</h3>
        </div>
        
        <div className="flex items-center space-x-3">
          {getExperienceIcon(analysis.experienceLevel)}
          <span className={`px-3 py-2 rounded-lg font-medium ${getExperienceColor(analysis.experienceLevel)}`}>
            {analysis.experienceLevel}
          </span>
        </div>
      </div>

      {/* Skills Overview */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 p-2 rounded-lg mr-3">
            <BarChart3 className="h-5 w-5 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Skills Overview</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Required Skills</span>
            <span className="font-semibold text-gray-900">{analysis.totalRequiredSkills}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Skills Matched</span>
            <span className="font-semibold text-green-600">{analysis.matchedCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Skills Gap</span>
            <span className="font-semibold text-red-600">
              {analysis.totalRequiredSkills - analysis.matchedCount}
            </span>
          </div>
        </div>
      </div>

      {/* Key Strengths */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 p-2 rounded-lg mr-3">
            <Trophy className="h-5 w-5 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Key Strengths</h3>
        </div>
        
        <div className="space-y-2">
          {analysis.keyStrengths.map((strength, index) => (
            <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
              <Trophy className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-green-800 text-sm font-medium">{strength}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};