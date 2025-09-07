import React from 'react';
import { CheckCircle, XCircle, Users, Target } from 'lucide-react';

interface SkillsAnalysisProps {
  matchedSkills: string[];
  missingSkills: string[];
}

export const SkillsAnalysis: React.FC<SkillsAnalysisProps> = ({ 
  matchedSkills, 
  missingSkills 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills Analysis</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Matched Skills */}
        <div>
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Matched Skills</h3>
              <p className="text-sm text-gray-500">{matchedSkills.length} skills found</p>
            </div>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill, index) => (
                <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-green-800 font-medium">{skill}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No matching skills found</p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-2 rounded-lg mr-3">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Missing Skills</h3>
              <p className="text-sm text-gray-500">{missingSkills.length} skills to develop</p>
            </div>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill, index) => (
                <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg border border-red-100">
                  <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-red-800 font-medium">{skill}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
                <Target className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-green-800 font-medium">All required skills matched!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};