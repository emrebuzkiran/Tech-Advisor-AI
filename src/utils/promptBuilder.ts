import { ProjectRequirements } from '../types';

export function buildAnalysisPrompt(requirements: ProjectRequirements): string {
  return `As a senior technology advisor, analyze these project requirements and provide detailed technology stack recommendations:

Project Details:
- Type: ${requirements.type}
- Scale: ${requirements.scale}
- Team Size: ${requirements.team}
- Timeline: ${requirements.timeline}
- Budget: ${requirements.budget}

Project Description:
${requirements.description}

Consider these factors:
- Scalability needs based on project scale
- Team size and potential learning curve
- Budget constraints and licensing costs
- Timeline requirements and development speed
- Long-term maintenance and support
- Community size and ecosystem maturity
- Available learning resources
- Industry best practices

Please provide recommendations in this JSON format:
{
  "recommendations": [
    {
      "name": "Technology Stack Name",
      "description": "Brief overview of the stack",
      "pros": ["advantage1", "advantage2", ...],
      "cons": ["limitation1", "limitation2", ...],
      "useCase": "Best use case description",
      "score": 0.95,
      "aiInsights": "Detailed analysis of why this stack fits the project",
      "learningResources": ["resource1", "resource2", ...]
    }
  ],
  "reasoning": "Overall analysis and justification"
}`};
