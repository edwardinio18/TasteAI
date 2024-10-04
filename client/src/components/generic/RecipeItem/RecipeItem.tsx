import { FC, useContext, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';

import heartFull from '/icons/heartFull.svg';
import heartEmpty from '/icons/heartEmpty.svg';

import { Recipe } from '../../../types';
import { FavoritesContext } from '../../../context/FavoritesContext';
import { getPath } from '../../../routes/routes';

interface RecipeItemProps {
  recipe: Recipe;
}

const RecipeItem: FC<RecipeItemProps> = ({ recipe }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.uniqueId === recipe.uniqueId);
  const navigate = useNavigate();

  return (
    <div
      className='flex h-[77px] cursor-pointer items-center rounded-2xl tablet:h-[88px] desktop:h-[88px]'
      style={{
        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.15)',
      }}
    >
      <img
        src='/images/recipe.png'
        className='h-full flex-shrink-0 rounded-bl-2xl rounded-tl-2xl bg-[#E3E3E3]'
        alt='Recipe'
      />
      <div
        className='ml-2 mt-2 flex h-full flex-1 flex-col'
        onClick={() =>
          startTransition(() => {
            navigate(
              getPath('recipe', {
                id: recipe.uniqueId as string,
              }),
              {
                state: {
                  recipe,
                },
              },
            );
          })
        }
      >
        <h3 className='line-clamp-1 font-outfit-semibold text-base tablet:text-lg desktop:text-xl'>{recipe.title}</h3>
        <p className='mt-2'>{recipe.time}</p>
      </div>
      <button onClick={() => toggleFavorite(recipe)}>
        <img
          src={isFavorite ? heartFull : heartEmpty}
          alt={isFavorite ? 'Full heart' : 'Empty heart'}
          className='pr-4'
        />
      </button>
    </div>
  );
};

export default RecipeItem;
