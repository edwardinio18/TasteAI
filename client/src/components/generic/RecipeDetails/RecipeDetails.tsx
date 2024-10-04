import { FC, startTransition, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import heartEmpty from '/icons/heartEmpty.svg';
import heartFull from '/icons/heartFull.svg';
import leftArrow from '/icons/leftArrow.svg';

import { Recipe } from '../../../types';
import { FavoritesContext } from '../../../context/FavoritesContext';
import { getPath } from '../../../routes/routes';

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails: FC<RecipeDetailsProps> = ({ recipe }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.uniqueId === recipe.uniqueId);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col tablet:flex-row tablet:justify-center tablet:gap-10'>
      <div className='flex-shrink-0 px-4 pt-4 tablet:sticky tablet:top-0 tablet:h-screen tablet:w-[350px] desktop:w-[500px]'>
        <div className='mx-auto tablet:flex tablet:h-screen tablet:flex-col'>
          <button
            onClick={() => startTransition(() => navigate(getPath('home')))}
            className='mb-4 flex items-center text-[#65558F] hover:text-[#504173]'
          >
            <img
              src={leftArrow}
              alt='Back'
              className='mr-2 h-6 w-6'
            />
            Back to Home
          </button>
          <img
            src='/images/recipe.png'
            alt={recipe.title}
            className='w-full max-w-full bg-[#E3E3E3] tablet:w-[300px] desktop:w-[400px]'
          />
          <div className='mt-4 flex items-start justify-between tablet:w-[300px] desktop:w-[400px]'>
            <div>
              <h2 className='font-outfit-semibold text-2xl'>{recipe.title}</h2>
              <p className='mt-2 font-outfit-regular'>{recipe.time}</p>
            </div>
            <button
              onClick={() => toggleFavorite(recipe)}
              className='p-2 pr-0 pt-0.5'
            >
              <img
                src={isFavorite ? heartFull : heartEmpty}
                alt={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                className='h-8 w-8'
              />
            </button>
          </div>
        </div>
      </div>
      <div className='mb-4 mt-8 flex flex-col gap-6 px-4 tablet:mt-4 tablet:w-[500px]'>
        <div>
          <h3 className='font-outfit-regular text-xl'>Ingredients</h3>
          <ul className='mt-2 list-disc pl-5'>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className='font-outfit-regular text-xl'>Instructions</h3>
          <ol className='mt-2 list-decimal pl-5'>
            {recipe.instructions.map((instruction, index) => (
              <li
                key={index}
                className='mt-2'
              >
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
