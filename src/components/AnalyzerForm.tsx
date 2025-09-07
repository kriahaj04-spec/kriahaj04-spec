import React, { useState } from 'react';
import { Upload, FileText, Briefcase, Loader2, Sparkles } from 'lucide-react';

interface AnalyzerFormProps {
  onAnalyze: (resume: string, jobDescription: string) => void;
  isAnalyzing: boolean;
}

export const AnalyzerForm: React.FC<AnalyzerFormProps> = ({ onAnalyze, isAnalyzing }) => {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('paste');

  const sampleJobDescription = `We are seeking a Senior Software Engineer to join our dynamic team. The ideal candidate will have:

Required Skills:
• 5+ years of experience in JavaScript and React
• Strong knowledge of Node.js and Express
• Experience with SQL databases (PostgreSQL preferred)
• Proficiency in Git version control
• Understanding of RESTful APIs and GraphQL
• Experience with AWS cloud services
• Knowledge of Docker and containerization

Preferred Skills:
• TypeScript experience
• Knowledge of microservices architecture
• Experience with CI/CD pipelines
• Understanding of Agile/Scrum methodologies
• Leadership and mentoring experience

Responsibilities:
• Design and develop scalable web applications
• Collaborate with cross-functional teams
• Code review and maintain code quality
• Mentor junior developers
• Participate in architectural decisions`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resume.trim() && jobDescription.trim()) {
      onAnalyze(resume.trim(), jobDescription.trim());
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResume(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Analyze Your Job Fit</h2>
            <p className="text-gray-600">Upload your resume and paste the job description to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Resume Section */}
              <div>
                <div className="flex items-center mb-6">
                  <FileText className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Your Resume</h3>
                </div>
                
                <div className="mb-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('paste')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'paste'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Paste Text
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('upload')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'upload'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Upload File
                    </button>
                  </div>
                </div>

                {activeTab === 'paste' ? (
                  <textarea
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    placeholder="Paste your resume content here..."
                    className="w-full h-64 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    required
                  />
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <span className="text-blue-600 font-medium hover:text-blue-500">
                        Click to upload
                      </span>
                      <span className="text-gray-500"> or drag and drop</span>
                      <p className="text-sm text-gray-400 mt-1">TXT files only</p>
                    </label>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {/* Job Description Section */}
              <div>
                <div className="flex items-center mb-6">
                  <Briefcase className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Job Description</h3>
                </div>
                
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => setJobDescription(sampleJobDescription)}
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors"
                  >
                    Use Sample Job Description
                  </button>
                </div>
                
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full h-64 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  required
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isAnalyzing || !resume.trim() || !jobDescription.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center mx-auto"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing Match...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Analyze Job Fit
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};