
import { Heart, Globe } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

interface HeaderProps {
  onFavoritesClick: () => void;
}

const Header = ({ onFavoritesClick }: HeaderProps) => {
  const { favorites } = useFavorites();
  
  return (
    <header className="gradient-bg text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Global Careers</h1>
              <p className="text-blue-100 text-sm">Il tuo futuro internazionale inizia qui</p>
            </div>
          </div>
          
          <button
            onClick={onFavoritesClick}
            className="relative p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <Heart className="h-6 w-6" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
