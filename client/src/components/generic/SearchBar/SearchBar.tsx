import { FC, FormEvent } from 'react';

import searchIcon from '/icons/search.svg';
import closeIcon from '/icons/close.svg';

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    localStorage.removeItem('search');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='m-auto mt-[32px] tablet:mt-[64px] desktop:mt-[64px]'
    >
      <div className='relative m-auto'>
        <input
          type='text'
          placeholder='What do you feel like eating?'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full rounded-full border border-[#65558F] py-3 pl-4 pr-16 shadow-sm'
        />
        {query && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute bottom-0 right-11 top-0 flex items-center justify-center'
          >
            <img
              src={closeIcon}
              className='h-6 w-6 text-gray-500'
              alt='Clear'
            />
          </button>
        )}
        <button
          type='submit'
          className='absolute bottom-0 right-4 top-0 flex items-center justify-center py-3'
        >
          <img
            src={searchIcon}
            className='h-5 w-5 text-gray-500'
            alt='Search'
          />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
