import { generatePath } from 'react-router';

import { Route } from '../types';

const getRoutes = (): Record<string, Route> => ({
  home: {
    title: 'Home',
    path: '/',
  },
  recipe: {
    title: 'Recipe',
    path: '/recipe/:id',
  },
});

const getPath = (key: string, params?: Record<string, string>) => {
  const routes = getRoutes();
  return params ? generatePath(routes[key].path, params) : routes[key].path;
};

export { getRoutes, getPath };
