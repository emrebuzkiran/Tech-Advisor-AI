import React from "react";
import { TechnologyRecommendation } from "../types/index";
import { CheckCircle, XCircle, BookOpen, Brain } from "lucide-react";

interface Props {
  recommendation: TechnologyRecommendation;
}

export default function RecommendationCard({ recommendation }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <header className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {recommendation.name}
          </h3>
          <p className="text-gray-600">{recommendation.description}</p>
        </div>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          Score: {(recommendation.score * 100).toFixed(0)}%
        </span>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: "Advantages",
            icon: <CheckCircle className="w-4 h-4 text-green-500 mr-2" />,
            items: recommendation.pros,
          },
          {
            title: "Limitations",
            icon: <XCircle className="w-4 h-4 text-red-500 mr-2" />,
            items: recommendation.cons,
          },
        ].map(({ title, icon, items }) => (
          <div key={title}>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              {icon}
              {title}
            </h4>
            <ul className="space-y-1">
              {items.map((item, idx) => (
                <li key={idx} className="text-gray-600 text-sm">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {recommendation.aiInsights && (
        <section className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
            <Brain className="w-4 h-4 text-purple-500 mr-2" />
            AI Insights
          </h4>
          <p className="text-gray-600 text-sm">{recommendation.aiInsights}</p>
        </section>
      )}

      {recommendation.learningResources && (
        <section className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
            <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
            Learning Resources
          </h4>
          <ul className="space-y-1">
            {recommendation.learningResources.map((resource, idx) => (
              <li key={idx}>
                <a
                  href={resource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-sm underline"
                >
                  {resource}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
