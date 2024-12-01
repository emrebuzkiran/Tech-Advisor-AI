import React, { useState } from 'react';
import { ProjectRequirements } from '../types';
import { Settings, Code, Users, Clock, Coins, Scale } from 'lucide-react';

interface Props {
  onSubmit: (requirements: ProjectRequirements) => void;
  disabled?: boolean;
}

export default function RequirementsForm({ onSubmit, disabled }: Props) {
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    type: '',
    scale: '',
    performance: '',
    budget: '',
    timeline: '',
    team: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(requirements);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center p-4">
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Project Requirements</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-gray-600" />
              <span>Project Type</span>
            </label>
            <select
              className="w-full p-2 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={requirements.type}
              onChange={(e) => setRequirements({ ...requirements, type: e.target.value })}
              required
              disabled={disabled}
            >
              <option value="">Select type</option>
              <option value="web">Web Application</option>
              <option value="mobile">Mobile App</option>
              <option value="backend">Backend Service</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Scale className="w-4 h-4 text-gray-600" />
              <span>Project Scale</span>
            </label>
            <select
              className="w-full p-2 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={requirements.scale}
              onChange={(e) => setRequirements({ ...requirements, scale: e.target.value })}
              required
              disabled={disabled}
            >
              <option value="">Select scale</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-600" />
              <span>Team Size</span>
            </label>
            <select
              className="w-full p-2 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={requirements.team}
              onChange={(e) => setRequirements({ ...requirements, team: e.target.value })}
              required
              disabled={disabled}
            >
              <option value="">Select team size</option>
              <option value="small">Small (1-5)</option>
              <option value="medium">Medium (6-15)</option>
              <option value="large">Large (15+)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span>Timeline</span>
            </label>
            <select
              className="w-full p-2 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={requirements.timeline}
              onChange={(e) => setRequirements({ ...requirements, timeline: e.target.value })}
              required
              disabled={disabled}
            >
              <option value="">Select timeline</option>
              <option value="short">Short (1-3 months)</option>
              <option value="medium">Medium (3-6 months)</option>
              <option value="long">Long (6+ months)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Coins className="w-4 h-4 text-gray-600" />
              <span>Budget</span>
            </label>
            <select
              className="w-full p-2 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={requirements.budget}
              onChange={(e) => setRequirements({ ...requirements, budget: e.target.value })}
              required
              disabled={disabled}
            >
              <option value="">Select budget</option>
              <option value="limited">Limited</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 col-span-full">
          <label className="flex items-center space-x-2">
            <span className="text-lg font-medium">Project Description</span>
          </label>
          <textarea
            className="w-full p-3 border rounded-md h-32 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Please describe your application in detail. What are the main features? What problem does it solve? What are your specific requirements?"
            value={requirements.description}
            onChange={(e) => setRequirements({ ...requirements, description: e.target.value })}
            required
            disabled={disabled}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        disabled={disabled}
      >
        {disabled ? 'Getting Recommendations...' : 'Get Recommendations'}
      </button>
      </form>
    </div>
  );
}