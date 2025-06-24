
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { universitiesByCountry } from '../data/universities';
import { University } from '../types';

interface StarlinkMapProps {
  onUniversitySelect: (university: University) => void;
}

// Coordinate dei continenti per la vista piatta
const continents = [
  {
    key: 'europa',
    name: 'Europa',
    center: { x: 520, y: 200 },
    countries: [
      { name: 'UK', code: 'UK', x: 500, y: 180 },
      { name: 'France', code: 'France', x: 510, y: 200 },
      { name: 'Germany', code: 'Germany', x: 530, y: 190 },
      { name: 'Switzerland', code: 'Switzerland', x: 525, y: 210 },
      { name: 'Italy', code: 'Italy', x: 535, y: 230 }
    ]
  },
  {
    key: 'nordamerica',
    name: 'Nord America',
    center: { x: 200, y: 180 },
    countries: [
      { name: 'USA', code: 'USA', x: 200, y: 200 }
    ]
  },
  {
    key: 'asia',
    name: 'Asia',
    center: { x: 700, y: 180 },
    countries: []
  }
];

// Componente per i punti delle università
const UniversityPoint = ({ 
  x, 
  y, 
  name, 
  code, 
  isActive, 
  onClick,
  delay = 0
}: { 
  x: number;
  y: number;
  name: string; 
  code: string; 
  isActive: boolean;
  onClick: () => void;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Pulse effect */}
      <circle
        cx={x}
        cy={y}
        r="20"
        fill="none"
        stroke="rgba(59, 130, 246, 0.3)"
        strokeWidth="1"
        className={`animate-ping ${isActive ? 'opacity-75' : 'opacity-0'}`}
      />
      
      {/* Main point */}
      <circle
        cx={x}
        cy={y}
        r="6"
        fill={isHovered ? "#fbbf24" : "#3b82f6"}
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="2"
        className="cursor-pointer transition-all duration-200 hover:scale-110"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      
      {/* Label */}
      {isHovered && (
        <text
          x={x}
          y={y - 15}
          textAnchor="middle"
          className="fill-white text-sm font-medium pointer-events-none"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8))' }}
        >
          {name}
        </text>
      )}
    </g>
  );
};

// Componente per le connessioni tra punti
const ConnectionLine = ({ 
  from, 
  to, 
  isActive, 
  delay = 0 
}: { 
  from: { x: number; y: number };
  to: { x: number; y: number };
  isActive: boolean;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <g className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="rgba(59, 130, 246, 0.4)"
        strokeWidth="1"
        strokeDasharray="5,5"
        className={`transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-30'}`}
      >
        {isActive && (
          <animate
            attributeName="stroke-dashoffset"
            values="0;-10"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </line>
    </g>
  );
};

const StarlinkMap = ({ onUniversitySelect }: StarlinkMapProps) => {
  const [currentContinentIndex, setCurrentContinentIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mapRef = useRef<SVGSVGElement>(null);

  const handleContinentChange = (direction: 'prev' | 'next') => {
    setIsTransitioning(true);
    setSelectedCountry(null);
    
    setTimeout(() => {
      if (direction === 'prev') {
        setCurrentContinentIndex((prev) => 
          prev === 0 ? continents.length - 1 : prev - 1
        );
      } else {
        setCurrentContinentIndex((prev) => 
          prev === continents.length - 1 ? 0 : prev + 1
        );
      }
      setIsTransitioning(false);
    }, 200);
  };

  const handleCountryClick = (countryCode: string) => {
    setSelectedCountry(countryCode);
  };

  const currentContinent = continents[currentContinentIndex];
  const currentCountries = currentContinent.countries;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-xl p-6 min-h-[700px] relative overflow-hidden">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        🌍 Global University Network
      </h2>
      
      {/* Indicatore continente corrente */}
      <div className="text-center mb-4">
        <h3 className={`text-xl font-semibold text-white transition-all duration-300 ${
          isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}>
          {currentContinent.name}
        </h3>
        <div className="flex justify-center space-x-2 mt-2">
          {continents.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentContinentIndex ? 'bg-yellow-400 scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mappa SVG in stile Starlink */}
      <div className="h-96 w-full relative bg-black/20 rounded-lg backdrop-blur-sm border border-white/10">
        <svg
          ref={mapRef}
          viewBox="0 0 900 400"
          className="w-full h-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)' }}
        >
          {/* Grid pattern */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Linee di connessione tra i paesi */}
          {currentCountries.map((country, index) => (
            currentCountries.slice(index + 1).map((otherCountry, otherIndex) => (
              <ConnectionLine
                key={`${country.code}-${otherCountry.code}`}
                from={{ x: country.x, y: country.y }}
                to={{ x: otherCountry.x, y: otherCountry.y }}
                isActive={selectedCountry === country.code || selectedCountry === otherCountry.code}
                delay={index * 200 + otherIndex * 100}
              />
            ))
          )).flat()}
          
          {/* Connessione al centro del continente */}
          {currentCountries.map((country, index) => (
            <ConnectionLine
              key={`center-${country.code}`}
              from={currentContinent.center}
              to={{ x: country.x, y: country.y }}
              isActive={selectedCountry === country.code}
              delay={index * 150}
            />
          ))}
          
          {/* Centro del continente */}
          <circle
            cx={currentContinent.center.x}
            cy={currentContinent.center.y}
            r="8"
            fill="#fbbf24"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="2"
            className="animate-pulse"
          />
          
          {/* Punti delle università */}
          {currentCountries.map((country, index) => (
            <UniversityPoint
              key={country.code}
              x={country.x}
              y={country.y}
              name={country.name}
              code={country.code}
              isActive={selectedCountry === country.code}
              onClick={() => handleCountryClick(country.code)}
              delay={index * 200}
            />
          ))}
        </svg>

        {/* Frecce di navigazione */}
        <button
          onClick={() => handleContinentChange('prev')}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 border border-white/20"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => handleContinentChange('next')}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 border border-white/20"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Panel laterale per le università */}
      {selectedCountry && universitiesByCountry[selectedCountry] && (
        <div className="absolute top-0 right-0 h-full w-80 bg-black/80 backdrop-blur-xl text-white p-6 transform transition-all duration-500 ease-out animate-slide-in-right border-l border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              🎓 {selectedCountry}
            </h3>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
            {universitiesByCountry[selectedCountry].map((university, index) => (
              <div
                key={university.id}
                onClick={() => onUniversitySelect(university)}
                className="bg-white/10 hover:bg-white/20 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm leading-tight">{university.name}</h4>
                  <span className="text-xs bg-blue-500/80 text-white px-2 py-1 rounded-full ml-2 flex-shrink-0">
                    #{university.ranking}
                  </span>
                </div>
                
                <div className="text-xs text-white/80 space-y-1">
                  <div>📍 {university.city}</div>
                  <div>🗣️ {university.language}</div>
                  <div>💰 {university.tuitionFee}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Istruzioni */}
      <div className="text-center text-white/80 mt-6">
        <p className="text-lg mb-2">🎯 Esplora la rete globale delle università</p>
        <p className="text-sm">Usa le frecce per navigare tra i continenti e clicca sui punti per vedere le connessioni.</p>
      </div>

      {/* Loading overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-white text-lg font-semibold animate-pulse">
            Caricamento {continents[currentContinentIndex].name}...
          </div>
        </div>
      )}
    </div>
  );
};

export default StarlinkMap;
