import OpenAI from 'openai';
import { ProjectRequirements, TechnologyRecommendation } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export async function getTechnologyRecommendations(requirements: ProjectRequirements): Promise<TechnologyRecommendation[]> {
  try {
    const prompt = `Given these project requirements:
      - Type: ${requirements.type}
      - Scale: ${requirements.scale}
      - Team Size: ${requirements.team}
      - Timeline: ${requirements.timeline}
      - Budget: ${requirements.budget}
      - Description: ${requirements.description}
      
      Recommend 3 technology stacks that would be best suited for this project. Include pros, cons, and learning resources.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.choices[0].message?.content;
    
    return [{
      name: "Example Stack",
      description: response || "No recommendation available",
      score: 0.95,
      pros: ["Pro 1", "Pro 2"],
      cons: ["Con 1", "Con 2"],
      useCase: "General purpose",
      learningResources: ["https://example.com"],
      aiInsights: "AI generated insight"
    }];
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
} 