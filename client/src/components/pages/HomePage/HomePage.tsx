import { FC, useState } from 'react';

import { Recipe } from '../../../types';
import { fetchRecipes } from '../../../services/api';
import SearchBar from '../../generic/SearchBar';
import LoadingIndicator from '../../generic/LoadingIndicator';
import RecipeList from '../../generic/RecipeList';
import FavoritesList from '../../generic/FavoritesList';

const HomePage: FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [dislikedRecipesByQuery, setDislikedRecipesByQuery] = useState<{
    [key: string]: string[];
  }>(() => {
    const storedDisliked = localStorage.getItem('dislikedRecipesByQuery');
    return storedDisliked ? JSON.parse(storedDisliked) : {};
  });
  const [query, setQuery] = useState<string>(localStorage.getItem('search') || '');

  const fetchAndSetRecipes = async (searchQuery: string) => {
    setLoading(true);

    const storedDislikedTitles = dislikedRecipesByQuery[searchQuery] || [];

    const dislikedTitles =
      storedDislikedTitles.length > 0 ? storedDislikedTitles : recipes.map((recipe) => recipe.title);

    const fetchedRecipes = await fetchRecipes(searchQuery, dislikedTitles);

    setRecipes(fetchedRecipes);

    setLoading(false);
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    localStorage.setItem('search', searchQuery);
    fetchAndSetRecipes(searchQuery);
  };

  const handleDislike = async () => {
    const currentDisliked = dislikedRecipesByQuery[query] || [];
    const newDislikedTitles = recipes.map((recipe) => recipe.title);
    const updatedDisliked = [...currentDisliked, ...newDislikedTitles];

    const updatedDislikedRecipes = {
      ...dislikedRecipesByQuery,
      [query]: updatedDisliked,
    };

    setDislikedRecipesByQuery(updatedDislikedRecipes);
    localStorage.setItem('dislikedRecipesByQuery', JSON.stringify(updatedDislikedRecipes));

    fetchAndSetRecipes(query);
  };

  return (
    <div className='m-auto w-full px-4 tablet:w-[500px] desktop:w-[500px]'>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />
      {loading ? (
        <LoadingIndicator />
      ) : recipes.length > 0 ? (
        <>
          <h1 className='mt-10 font-outfit-bold text-4xl'>Suggested Recipes</h1>
          <RecipeList recipes={recipes} />
          <div className='my-4 flex justify-center py-5'>
            <button
              onClick={handleDislike}
              className='rounded bg-[#65558F] px-4 py-2 text-white'
            >
              I don&#39;t like these
            </button>
          </div>
        </>
      ) : (
        <FavoritesList />
      )}
    </div>
  );
};

export default HomePage;
