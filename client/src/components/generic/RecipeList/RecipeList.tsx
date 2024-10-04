import { FC } from 'react';

import { Recipe } from '../../../types';
import RecipeItem from '../RecipeItem';

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div className='my-4 space-y-4'>
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.uniqueId}
          recipe={recipe}
        />
      ))}
    </div>
  );
};

export default RecipeList;
