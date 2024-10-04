import { FC, useContext } from 'react';

import RecipeList from '../RecipeList';
import { FavoritesContext } from '../../../context/FavoritesContext';

const FavoritesList: FC = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className='m-auto mb-4 mt-[25px] items-center justify-center tablet:mt-[40px] desktop:mt-[64px]'>
      <p className='font-outfit-bold text-xl tablet:text-3xl desktop:text-4xl'>Favorites</p>
      {favorites.length > 0 ? (
        <RecipeList recipes={favorites} />
      ) : (
        <p className='mt-4 text-gray-600'>You have no favorite recipes yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;
