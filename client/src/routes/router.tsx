import { createBrowserRouter } from 'react-router-dom';

import { HomePage, RecipePage } from './lazyComponents';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    children: [
      {
        id: 'home',
        index: true,
        element: <HomePage />,
      },
      {
        id: 'recipe',
        path: 'recipe/:id',
        element: <RecipePage />,
      },
    ],
  },
]);

export default router;
