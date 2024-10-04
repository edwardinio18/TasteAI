import { FC, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Recipe } from '../../../types';
import RecipeDetails from '../../generic/RecipeDetails';
import { FavoritesContext } from '../../../context/FavoritesContext';
import { getPath } from '../../../routes/routes';

const RecipePage: FC = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { favorites } = useContext(FavoritesContext);

  useEffect(() => {
    const stateRecipe = (
      location.state as {
        recipe: Recipe;
      }
    )?.recipe;

    if (stateRecipe) {
      setRecipe(stateRecipe);
    } else {
      const favoriteRecipe = favorites.find((fav) => fav.uniqueId === id);
      if (favoriteRecipe) {
        setRecipe(favoriteRecipe);
      } else {
        navigate(getPath('home'));
      }
    }
  }, [location.state, favorites, navigate, id]);

  if (!recipe) {
    return null;
  }

  return <RecipeDetails recipe={recipe} />;
};

export default RecipePage;
