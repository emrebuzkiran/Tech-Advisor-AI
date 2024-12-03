import { ProjectRequirements, TechnologyRecommendation, AIAnalysisResult } from '../types/index';
import { openai } from '../config/openai';
import { buildAnalysisPrompt } from './promptBuilder';

export async function analyzeTechStack(requirements: ProjectRequirements): Promise<TechnologyRecommendation[]> {
  try {
    // Get AI-powered recommendations
    const aiRecommendations = await getAIRecommendations(requirements);
    return aiRecommendations.recommendations;
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
      model: "gpt-4o-mini",
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
      max_tokens: 2000
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
    recommendations.push({
      name: 'Modern Web Stack',
      description: 'A robust and scalable web development stack',
      pros: [
        'Strong ecosystem',
        'Great developer experience',
        'Excellent performance',
        'Strong typing support'
      ],
      cons: [
        'Learning curve for beginners',
        'Initial setup complexity'
      ],
      useCase: 'Modern web applications with scalability requirements',
      score: 0.95,
      aiInsights: 'This stack provides an excellent foundation for web development with modern best practices.',
      learningResources: [
        'https://react.dev',
        'https://www.typescriptlang.org/docs/',
        'https://tailwindcss.com/docs'
      ]
    });
  }

  if (requirements.type === 'mobile') {
    recommendations.push({
      name: 'Cross-platform Mobile Stack',
      description: 'Efficient mobile development with code sharing',
      pros: [
        'Single codebase for iOS and Android',
        'Native performance',
        'Large community',
        'Rich ecosystem'
      ],
      cons: [
        'Platform-specific code sometimes needed',
        'Native expertise still valuable'
      ],
      useCase: 'Cross-platform mobile applications',
      score: 0.9,
      aiInsights: 'Ideal for teams wanting to target both iOS and Android with a single codebase.',
      learningResources: [
        'https://reactnative.dev',
        'https://expo.dev/learn'
      ]
    });
  }

  return recommendations;
}