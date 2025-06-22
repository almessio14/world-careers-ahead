
import { Heart } from 'lucide-react';
import { University } from '../types';
import { useFavorites } from '../hooks/useFavorites';

interface UniversityModalProps {
  university: University;
  onClose: () => void;
}

const UniversityModal = ({ university, onClose }: UniversityModalProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = () => {
    toggleFavorite({
      id: university.id,
      type: 'university',
      data: university
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{university.name}</h2>
            <div className="flex items-center text-gray-600 mb-2">
              <span className="mr-2">📍</span>
              {university.city}, {university.country}
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Ranking #{university.ranking}
              </span>
              <span className="text-gray-600 text-sm">🗣️ {university.language}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-colors ${
                isFavorite(university.id)
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`h-6 w-6 ${isFavorite(university.id) ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl p-2"
            >
              ×
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Programmi di Studio</h3>
            <div className="space-y-2">
              {university.programs.map((program, index) => (
                <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  <span className="text-gray-700">{program}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">💰 Costi Annuali</h4>
              <p className="text-green-700">{university.tuitionFee}</p>
            </div>

            {university.scholarships && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🎓 Borse di Studio</h4>
                <p className="text-blue-700">Borse di studio disponibili per studenti meritevoli</p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🌐 Sito Web</h4>
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Visita il sito ufficiale
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              Relazioni Internazionali
            </span>
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
              Economia
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              Carriere Globali
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityModal;
