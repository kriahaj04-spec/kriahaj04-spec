import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AnalyzerForm } from './components/AnalyzerForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { AnalysisResult } from './types';

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = async (resume: string, jobDescription: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = analyzeJobFit(resume, jobDescription);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const analyzeJobFit = (resume: string, jobDescription: string): AnalysisResult => {
    // Extract skills from job description
    const jobSkills = extractSkills(jobDescription);
    const resumeSkills = extractSkills(resume);
    
    // Calculate matches
    const matchedSkills = jobSkills.filter(skill => 
      resumeSkills.some(rSkill => 
        rSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(rSkill.toLowerCase())
      )
    );
    
    const missingSkills = jobSkills.filter(skill => !matchedSkills.includes(skill));
    const matchPercentage = Math.round((matchedSkills.length / jobSkills.length) * 100);
    
    return {
      matchPercentage,
      matchedSkills,
      missingSkills,
      recommendations: generateRecommendations(missingSkills),
      analysis: {
        totalRequiredSkills: jobSkills.length,
        matchedCount: matchedSkills.length,
        experienceLevel: calculateExperienceLevel(resume),
        keyStrengths: identifyStrengths(resume, matchedSkills)
      }
    };
  };

  const extractSkills = (text: string): string[] => {
    const commonSkills = [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'HTML', 'CSS',
      'TypeScript', 'Angular', 'Vue.js', 'MongoDB', 'PostgreSQL', 'Git', 'AWS',
      'Docker', 'Kubernetes', 'Machine Learning', 'Data Analysis', 'Project Management',
      'Agile', 'Scrum', 'Communication', 'Leadership', 'Problem Solving',
      'Team Collaboration', 'Critical Thinking', 'Time Management', 'Excel',
      'PowerPoint', 'Tableau', 'Figma', 'Adobe Creative Suite', 'Marketing',
      'SEO', 'Content Writing', 'Social Media', 'Sales', 'Customer Service'
    ];
    
    return commonSkills.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    );
  };

  const calculateExperienceLevel = (resume: string): string => {
    const yearMatches = resume.match(/(\d+)\s*(year|yr)/gi);
    if (yearMatches && yearMatches.length > 0) {
      const years = Math.max(...yearMatches.map(match => parseInt(match)));
      if (years >= 5) return 'Senior';
      if (years >= 2) return 'Mid-Level';
    }
    return 'Entry-Level';
  };

  const identifyStrengths = (resume: string, matchedSkills: string[]): string[] => {
    const strengths = [];
    if (matchedSkills.length > 5) strengths.push('Strong technical skill set');
    if (resume.toLowerCase().includes('lead') || resume.toLowerCase().includes('manage')) {
      strengths.push('Leadership experience');
    }
    if (resume.toLowerCase().includes('project')) {
      strengths.push('Project management capabilities');
    }
    return strengths.length > 0 ? strengths : ['Relevant experience'];
  };

  const generateRecommendations = (missingSkills: string[]) => {
    const platforms = [
      { name: 'Coursera', url: 'https://coursera.org', type: 'Course' },
      { name: 'Udemy', url: 'https://udemy.com', type: 'Course' },
      { name: 'Pluralsight', url: 'https://pluralsight.com', type: 'Course' },
      { name: 'YouTube', url: 'https://youtube.com', type: 'Free' },
      { name: 'freeCodeCamp', url: 'https://freecodecamp.org', type: 'Free' },
      { name: 'Codecademy', url: 'https://codecademy.com', type: 'Interactive' }
    ];

    return missingSkills.slice(0, 8).map(skill => ({
      skill,
      resources: platforms.slice(0, 3).map(platform => ({
        platform: platform.name,
        url: `${platform.url}/search?q=${encodeURIComponent(skill)}`,
        type: platform.type
      }))
    }));
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {!analysisResult ? (
        <>
          <Hero />
          <AnalyzerForm onAnalyze={handleAnalysis} isAnalyzing={isAnalyzing} />
        </>
      ) : (
        <ResultsDisplay result={analysisResult} onReset={resetAnalysis} />
      )}
    </div>
  );
}

export default App;