
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { Career, University } from '../types';

interface FavoritesModalProps {
  onClose: () => void;
}

const FavoritesModal = ({ onClose }: FavoritesModalProps) => {
  const { favorites, removeFavorite } = useFavorites();

  const careerFavorites = favorites.filter(fav => fav.type === 'career');
  const universityFavorites = favorites.filter(fav => fav.type === 'university');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Heart className="h-6 w-6 text-red-500 mr-2 fill-current" />
            I tuoi Preferiti
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Nessun preferito ancora</h3>
            <p className="text-gray-500">Inizia ad esplorare carriere e università per salvarle qui!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {careerFavorites.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🎯 Carriere Salvate ({careerFavorites.length})
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {careerFavorites.map((fav) => {
                    const career = fav.data as Career;
                    return (
                      <div key={fav.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{career.icon}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{career.title}</h4>
                              <p className="text-sm text-gray-600">{career.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFavorite(fav.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </button>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          💰 {career.averageSalary}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {universityFavorites.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🎓 Università Salvate ({universityFavorites.length})
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {universityFavorites.map((fav) => {
                    const university = fav.data as University;
                    return (
                      <div key={fav.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{university.name}</h4>
                            <p className="text-sm text-gray-600">
                              📍 {university.city}, {university.country}
                            </p>
                            <p className="text-sm text-gray-600">
                              🗣️ {university.language}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFavorite(fav.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                          <span>Ranking #{university.ranking}</span>
                          <span>💰 {university.tuitionFee}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesModal;
