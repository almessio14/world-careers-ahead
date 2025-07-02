
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
    <div className="career-card animate-fadeIn relative">
      {/* Cuore dorato in alto a destra */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${
          isFavorite(career.id)
            ? 'text-[#fbbf24] bg-[#fbbf24]/10 hover:bg-[#fbbf24]/20'
            : 'text-gray-400 hover:text-[#fbbf24] hover:bg-[#fbbf24]/10'
        }`}
      >
        <Heart className={`h-5 w-5 stroke-2 ${isFavorite(career.id) ? 'fill-current' : 'fill-none'}`} />
      </button>

      <div className="flex items-start justify-between mb-4 pr-12">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{career.icon}</span>
          <div>
            <h3 className="text-xl font-semibold text-[#14213d]">{career.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{career.description}</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-[#14213d] text-white py-2 px-4 rounded-lg hover:bg-[#14213d]/90 transition-colors text-sm font-medium"
      >
        {isExpanded ? 'Riduci' : 'Scopri di più'}
      </button>

      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-slideIn">
          <p className="text-gray-700 mb-4">{career.fullDescription}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-[#14213d] mb-2">Competenze richieste:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {career.skills.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-[#14213d] rounded-full mr-2"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#14213d] mb-2">Formazione:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {career.education.map((edu, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-[#fbbf24] rounded-full mr-2"></span>
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
