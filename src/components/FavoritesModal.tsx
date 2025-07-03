
import { Heart, X } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { Career, University } from '../types';
import { Microarea } from '../data/careerExploration';

interface FavoritesModalProps {
  onClose: () => void;
}

const FavoritesModal = ({ onClose }: FavoritesModalProps) => {
  const { favorites, removeFavorite } = useFavorites();

  const careerFavorites = favorites.filter(fav => fav.type === 'career');
  const universityFavorites = favorites.filter(fav => fav.type === 'university');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scale-in custom-scrollbar">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-[#14213d] flex items-center tracking-tight">
            <Heart className="h-6 w-6 md:h-7 md:w-7 text-[#fbbf24] mr-3 fill-current" />
            I tuoi Preferiti
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <div className="text-6xl md:text-8xl mb-4 md:mb-6 opacity-50">💔</div>
            <h3 className="text-xl md:text-2xl font-light text-gray-600 mb-3">Nessun preferito ancora</h3>
            <p className="text-gray-500 font-light text-sm md:text-base">Inizia ad esplorare carriere e università per salvarle qui!</p>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-10">
            {careerFavorites.length > 0 && (
              <div>
                <h3 className="text-lg md:text-xl font-medium text-[#14213d] mb-4 md:mb-6 flex items-center">
                  <span className="w-3 h-4 md:h-6 bg-[#fbbf24] rounded-full mr-3"></span>
                  Specializzazioni Salvate ({careerFavorites.length})
                </h3>
                <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                  {careerFavorites.map((fav) => {
                    const microarea = fav.data as Microarea;
                    return (
                      <div key={fav.id} className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base md:text-lg font-semibold text-[#14213d] mb-2 truncate">{microarea.name}</h4>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{microarea.description}</p>
                          </div>
                          <button
                            onClick={() => removeFavorite(fav.id)}
                            className="text-[#fbbf24] hover:text-[#f59e0b] p-2 rounded-full hover:bg-[#fbbf24]/10 transition-all duration-200 ml-3 flex-shrink-0"
                          >
                            <Heart className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                          </button>
                        </div>
                        
                        {/* Sezioni aziende e compenso come strisce */}
                        <div className="space-y-2 md:space-y-3">
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 md:px-4 py-2 rounded-lg border border-blue-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-1 md:w-1.5 h-2 md:h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-blue-900 mb-1">Aziende Leader</p>
                                <p className="text-xs text-blue-800 font-medium truncate">{microarea.companies}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-3 md:px-4 py-2 rounded-lg border border-green-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-1 md:w-1.5 h-2 md:h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-green-900 mb-1">Compenso Medio</p>
                                <p className="text-sm text-green-800 font-bold">{microarea.salary}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {universityFavorites.length > 0 && (
              <div>
                <h3 className="text-lg md:text-xl font-medium text-[#14213d] mb-4 md:mb-6 flex items-center">
                  <span className="w-3 h-4 md:h-6 bg-[#fbbf24] rounded-full mr-3"></span>
                  Università Salvate ({universityFavorites.length})
                </h3>
                <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                  {universityFavorites.map((fav) => {
                    const university = fav.data as University;
                    return (
                      <div key={fav.id} className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base md:text-lg font-semibold text-[#14213d] mb-2 truncate">{university.name}</h4>
                            <div className="space-y-1 text-xs md:text-sm text-gray-600">
                              <p className="truncate">📍 {university.city}, {university.country}</p>
                              <p>🗣️ {university.language}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFavorite(fav.id)}
                            className="text-[#fbbf24] hover:text-[#f59e0b] p-2 rounded-full hover:bg-[#fbbf24]/10 transition-all duration-200 ml-3 flex-shrink-0"
                          >
                            <Heart className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 pt-3 border-t border-gray-100">
                          <span className="font-medium">Ranking #{university.ranking}</span>
                          <span className="font-bold text-green-600">{university.tuitionFee}</span>
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
