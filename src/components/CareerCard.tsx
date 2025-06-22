
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Career } from '../types';
import { useFavorites } from '../hooks/useFavorites';

interface CareerCardProps {
  career: Career;
}

const CareerCard = ({ career }: CareerCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({
      id: career.id,
      type: 'career',
      data: career
    });
  };

  return (
    <div className="career-card animate-fadeIn">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{career.icon}</span>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{career.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{career.description}</p>
          </div>
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`p-2 rounded-full transition-colors ${
            isFavorite(career.id)
              ? 'text-red-500 bg-red-50 hover:bg-red-100'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite(career.id) ? 'fill-current' : ''}`} />
        </button>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
      >
        {isExpanded ? 'Riduci' : 'Scopri di più'}
      </button>

      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-slideIn">
          <p className="text-gray-700 mb-4">{career.fullDescription}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Competenze richieste:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {career.skills.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Formazione:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {career.education.map((edu, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    {edu}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              💰 {career.averageSalary}
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              🏢 {career.workEnvironment}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerCard;
