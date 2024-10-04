import App from './App';
import { FavoritesProvider } from './context/FavoritesContext';

export function AppContainer() {
  return (
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  );
}
