import { ProjectRequirements, TechnologyRecommendation, AIAnalysisResult } from '../types';
import { openai } from '../config/openai';
import { buildAnalysisPrompt } from './promptBuilder';

export async function analyzeTechStack(requirements: ProjectRequirements): Promise<TechnologyRecommendation[]> {
  try {
    // Get AI-powered recommendations
    const aiRecommendations = await getAIRecommendations(requirements);
    
    // Combine with static recommendations
    const staticRecommendations = getStaticRecommendations(requirements);
    
    // Merge and sort recommendations
    const allRecommendations = [...aiRecommendations.recommendations, ...staticRecommendations]
      .sort((a, b) => b.score - a.score);

    return allRecommendations;
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    // Fallback to static recommendations if AI fails
    return getStaticRecommendations(requirements);
  }
}

async function getAIRecommendations(requirements: ProjectRequirements): Promise<AIAnalysisResult> {
  const prompt = buildAnalysisPrompt(requirements);
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5",
      messages: [
        {
          role: "system",
          content: "You are a senior technology advisor specializing in modern software development stacks."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from OpenAI');

    try {
      return JSON.parse(response) as AIAnalysisResult;
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      throw new Error('Invalid response format from OpenAI');
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

function getStaticRecommendations(requirements: ProjectRequirements): TechnologyRecommendation[] {
  const recommendations: TechnologyRecommendation[] = [];

  if (requirements.type === 'web') {
    if (requirements.scale === 'large' && requirements.performance === 'high') {
      recommendations.push({
        name: 'Next.js + TypeScript',
        description: 'Enterprise-grade React framework with SSR capabilities',
        pros: ['Built-in SSR/SSG', 'Great TypeScript support', 'Excellent performance'],
        cons: ['Learning curve', 'More complex setup'],
        useCase: 'Large-scale web applications',
        score: 0.95,
        learningResources: [
          'https://nextjs.org/learn',
          'https://www.typescriptlang.org/docs/'
        ]
      });
    }
    
    if (requirements.timeline === 'short' && requirements.budget === 'limited') {
      recommendations.push({
        name: 'Create React App',
        description: 'Quick setup for React applications',
        pros: ['Fast setup', 'Good documentation', 'Large community'],
        cons: ['Limited configuration', 'No SSR by default'],
        useCase: 'Small to medium web applications',
        score: 0.85,
        learningResources: [
          'https://create-react-app.dev/docs/getting-started',
          'https://reactjs.org/tutorial/tutorial.html'
        ]
      });
    }
  }

  return recommendations;
}