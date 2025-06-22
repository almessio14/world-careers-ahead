
import { useState } from 'react';
import { universitiesByCountry } from '../data/universities';
import { University } from '../types';

interface WorldMapProps {
  onUniversitySelect: (university: University) => void;
}

const WorldMap = ({ onUniversitySelect }: WorldMapProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countries = [
    { name: 'UK', emoji: '🇬🇧', position: 'top-32 left-48' },
    { name: 'USA', emoji: '🇺🇸', position: 'top-40 left-20' },
    { name: 'France', emoji: '🇫🇷', position: 'top-36 left-52' },
    { name: 'Germany', emoji: '🇩🇪', position: 'top-28 left-54' },
    { name: 'Switzerland', emoji: '🇨🇭', position: 'top-40 left-54' },
    { name: 'Italy', emoji: '🇮🇹', position: 'top-44 left-56' }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl p-6 min-h-[600px]">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        🌍 Esplora le Università nel Mondo
      </h2>
      
      <div className="relative bg-blue-200 rounded-lg h-96 mb-6 overflow-hidden">
        {/* Simplified world map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-300 via-yellow-200 to-orange-300 opacity-30"></div>
        
        {/* Country markers */}
        {countries.map((country) => (
          <button
            key={country.name}
            onClick={() => setSelectedCountry(country.name)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${country.position} 
              text-4xl hover:scale-110 transition-transform animate-bounce-light
              ${selectedCountry === country.name ? 'scale-125' : ''}`}
            title={country.name}
          >
            {country.emoji}
          </button>
        ))}
        
        {/* Ocean waves effect */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-400 to-transparent opacity-50"></div>
      </div>

      {selectedCountry && universitiesByCountry[selectedCountry] && (
        <div className="animate-fadeIn">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            {countries.find(c => c.name === selectedCountry)?.emoji} 
            <span className="ml-2">Università in {selectedCountry}</span>
          </h3>
          
          <div className="grid gap-4">
            {universitiesByCountry[selectedCountry].map((university) => (
              <div
                key={university.id}
                onClick={() => onUniversitySelect(university)}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{university.name}</h4>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    #{university.ranking}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    {university.city}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🗣️</span>
                    {university.language}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">💰</span>
                    {university.tuitionFee}
                  </div>
                  {university.scholarships && (
                    <div className="flex items-center text-green-600">
                      <span className="mr-2">🎓</span>
                      Borse di studio disponibili
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!selectedCountry && (
        <div className="text-center text-gray-600">
          <p className="text-lg mb-2">Clicca su un paese per scoprire le università! 🎯</p>
          <p className="text-sm">Ogni università è stata selezionata per i suoi programmi di eccellenza in economia e relazioni internazionali.</p>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
