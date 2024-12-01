import React from 'react';
import { TechnologyRecommendation } from '../types';
import { CheckCircle, XCircle, BookOpen, Brain } from 'lucide-react';

interface Props {
  recommendation: TechnologyRecommendation;
}

export default function RecommendationCard({ recommendation }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{recommendation.name}</h3>
          <p className="text-gray-600">{recommendation.description}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          Score: {(recommendation.score * 100).toFixed(0)}%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            Advantages
          </h4>
          <ul className="space-y-1">
            {recommendation.pros.map((pro, index) => (
              <li key={index} className="text-gray-600 text-sm">
                • {pro}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
            <XCircle className="w-4 h-4 text-red-500 mr-2" />
            Limitations
          </h4>
          <ul className="space-y-1">
            {recommendation.cons.map((con, index) => (
              <li key={index} className="text-gray-600 text-sm">
                • {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {recommendation.aiInsights && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
            <Brain className="w-4 h-4 text-purple-500 mr-2" />
            AI Insights
          </h4>
          <p className="text-gray-600 text-sm">{recommendation.aiInsights}</p>
        </div>
      )}

      {recommendation.learningResources && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
            <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
            Learning Resources
          </h4>
          <ul className="space-y-1">
            {recommendation.learningResources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  {resource}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-2">
        <p className="text-sm text-gray-500">
          <span className="font-medium">Best suited for:</span> {recommendation.useCase}
        </p>
      </div>
    </div>
  );
}