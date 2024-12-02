import { ProjectRequirements } from '../types';

export function buildAnalysisPrompt(requirements: ProjectRequirements): string {
  return `As a technology advisor, analyze the following project requirements and provide detailed technology stack recommendations:

Project Details:
- Type: ${requirements.type}
- Scale: ${requirements.scale}
- Performance Requirements: ${requirements.performance}
- Budget: ${requirements.budget}
- Timeline: ${requirements.timeline}
- Team Size: ${requirements.team}

Project Description:
${requirements.description}

Please provide recommendations in the following JSON format:
{
  "recommendations": [
    {
      "name": "Technology Stack Name",
      "description": "Brief description",
      "pros": ["pro1", "pro2", ...],
      "cons": ["con1", "con2", ...],
      "useCase": "Best use case description",
      "score": 0.95,
      "aiInsights": "Detailed analysis of why this stack is recommended for this specific project",
      "learningResources": ["resource1", "resource2", ...]
    }
  ],
  "reasoning": "Overall analysis explanation considering the project description and requirements"
}

Focus on modern, production-ready technology stacks and consider factors like:
- Scalability requirements
- Team expertise level
- Budget constraints
- Timeline requirements
- Performance needs
- Specific project requirements from the description`

};