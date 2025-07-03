
import { Heart } from 'lucide-react';
import { universitiesByCountry } from '../../data/universities';
import { University } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';

interface UniversitySidebarProps {
  selectedCountry: string | null;
  onClose: () => void;
  onUniversitySelect: (university: University) => void;
}

const getCountryFlag = (countryCode: string): string => {
  const flagMap: Record<string, string> = {
    'USA': '🇺🇸',
    'Canada': '🇨🇦',
    'China': '🇨🇳',
    'Japan': '🇯🇵',
    'South Korea': '🇰🇷',
    'Singapore': '🇸🇬',
    'Italy': '🇮🇹',
    'Portugal': '🇵🇹',
    'Spain': '🇪🇸',
    'France': '🇫🇷',
    'Netherlands': '🇳🇱',
    'Belgium': '🇧🇪',
    'Switzerland': '🇨🇭',
    'Germany': '🇩🇪',
    'Austria': '🇦🇹',
    'Denmark': '🇩🇰',
    'Sweden': '🇸🇪',
    'Finland': '🇫🇮',
    'Norway': '🇳🇴',
    'UK': '🇬🇧',
    'Ireland': '🇮🇪'
  };
  
  return flagMap[countryCode] || '🌍';
};

const UniversitySidebar = ({ selectedCountry, onClose, onUniversitySelect }: UniversitySidebarProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!selectedCountry || !universitiesByCountry[selectedCountry]) {
    return null;
  }

  const handleFavoriteClick = (university: University, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({
      id: university.id,
      type: 'university',
      data: university
    });
  };

  return (
    <div className="absolute top-0 right-0 h-full w-96 bg-white/95 backdrop-blur-xl text-gray-800 p-6 transform transition-all duration-500 ease-out border-l border-gray-200 shadow-xl z-30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          {getCountryFlag(selectedCountry)} Università in {selectedCountry}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-4 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
        {universitiesByCountry[selectedCountry].map((university) => (
          <div
            key={university.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-sm text-gray-800 leading-tight pr-2">{university.name}</h4>
              <button
                onClick={(e) => handleFavoriteClick(university, e)}
                className={`p-1 rounded-full transition-all duration-200 ${
                  isFavorite(university.id) 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart 
                  size={18} 
                  fill={isFavorite(university.id) ? 'currentColor' : 'none'}
                />
              </button>
            </div>
            
            <div className="text-xs space-y-2 text-gray-600">
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <span>{university.city}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🗣️</span>
                <span>{university.language}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">💰</span>
                <span className="font-medium text-blue-600">{university.tuitionFee}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🏆</span>
                <span>Ranking: #{university.ranking}</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">📚</span>
                <span>{university.programs.join(', ')}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🎓</span>
                <span>{university.scholarships ? 'Borse di studio disponibili' : 'Nessuna borsa di studio'}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🌐</span>
                <a 
                  href={university.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline text-xs"
                >
                  Sito web
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversitySidebar;
