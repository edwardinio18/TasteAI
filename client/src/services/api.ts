import OpenAI from 'openai';

import { Recipe } from '../types';

const configuration = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const openai = configuration;

export const fetchRecipes = async (description: string, dislikedTitles: string[] = []): Promise<Recipe[]> => {
  const prompt = `
    You are a recipe suggestion bot. Provide a list of 5 recipes based on the following description: "${description}".

    Please do not include any recipes with the following titles: ${dislikedTitles.join(', ')}

    Each recipe should include:
    - id (a unique identifier)
    - title
    - time (e.g., "30 minutes")
    - ingredients (as an array)
    - instructions (as an array)

    Format the response as a JSON array.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content || '';

    const cleanedText = text.replace(/```json|```/g, '').trim();

    const recipes: Recipe[] = JSON.parse(cleanedText || '[]');

    return recipes
      .filter((recipe: Recipe) => !dislikedTitles.includes(recipe.title))
      .map((recipe) => ({
        ...recipe,
        uniqueId: `${description}-${recipe.id}`,
      }));
  } catch (error) {
    console.error('Failed to fetch or parse recipes:', error);
    return [];
  }
};
