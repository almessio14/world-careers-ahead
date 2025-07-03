import { Heart, Globe } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

interface HeaderProps {
  onFavoritesClick: () => void;
}

const Header = ({ onFavoritesClick }: HeaderProps) => {
  const { favorites } = useFavorites();
  
  return (
    <header className="text-white shadow-lg" style={{ backgroundColor: '#0A1D3A' }}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/0a10cf19-3500-400d-b171-36dc48fb95be.png" 
              alt="OrientMe Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">
                Orient<span className="text-[#fbbf24]">Me</span>
              </h1>
              <p className="text-blue-100 text-sm">La bussola per il tuo futuro</p>
            </div>
          </div>
          
          <button
            onClick={onFavoritesClick}
            className="relative p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <Heart className="h-6 w-6 text-[#fbbf24] fill-none stroke-2" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#fbbf24] text-[#14213d] text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white font-semibold">
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
