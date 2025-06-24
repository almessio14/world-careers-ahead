
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Globe from 'globe.gl';
import { universitiesByCountry } from '../data/universities';
import { University } from '../types';

interface GlobeMapProps {
  onUniversitySelect: (university: University) => void;
}

// Coordinate geografiche dei continenti
const continents = [
  {
    key: 'europa',
    name: 'Europa',
    lat: 54.5260,
    lng: 15.2551,
    countries: [
      { name: 'UK', code: 'UK', lat: 55.3781, lng: -3.4360 },
      { name: 'France', code: 'France', lat: 46.6034, lng: 1.8883 },
      { name: 'Germany', code: 'Germany', lat: 51.1657, lng: 10.4515 },
      { name: 'Switzerland', code: 'Switzerland', lat: 46.8182, lng: 8.2275 },
      { name: 'Italy', code: 'Italy', lat: 41.8719, lng: 12.5674 }
    ]
  },
  {
    key: 'nordamerica',
    name: 'Nord America',
    lat: 45.0,
    lng: -100.0,
    countries: [
      { name: 'USA', code: 'USA', lat: 37.0902, lng: -95.7129 }
    ]
  },
  {
    key: 'asia',
    name: 'Asia',
    lat: 35.0,
    lng: 100.0,
    countries: []
  }
];

const GlobeMap = ({ onUniversitySelect }: GlobeMapProps) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<any>(null);
  const [currentContinentIndex, setCurrentContinentIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!globeRef.current) return;

    // Inizializza Globe.gl
    const world = Globe()
      .width(globeRef.current.clientWidth)
      .height(400)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#3a228a')
      .atmosphereAltitude(0.25)
      .showGraticules(false)
      .pointsData([])
      .pointAltitude(0.01)
      .pointRadius(0.8)
      .pointColor(() => '#ff4444')
      .pointLabel((d: any) => d.name)
      .onPointClick((point: any) => {
        setSelectedCountry(point.code);
      });

    globeRef.current.appendChild(world());
    worldRef.current = world;

    // Carica i confini nazionali
    fetch('https://unpkg.com/world-atlas/countries-110m.json')
      .then(res => res.json())
      .then(countries => {
        // Nota: topojson non è disponibile, usiamo solo i punti
        updatePoints();
      })
      .catch(() => {
        // Fallback se non riesce a caricare i confini
        updatePoints();
      });

    const updatePoints = () => {
      const currentContinent = continents[currentContinentIndex];
      const points = currentContinent.countries.map(country => ({
        lat: country.lat,
        lng: country.lng,
        name: country.name,
        code: country.code
      }));
      world.pointsData(points);
    };

    // Cleanup
    return () => {
      if (globeRef.current && world) {
        globeRef.current.innerHTML = '';
      }
    };
  }, []);

  // Aggiorna i punti quando cambia il continente
  useEffect(() => {
    if (worldRef.current) {
      const currentContinent = continents[currentContinentIndex];
      const points = currentContinent.countries.map(country => ({
        lat: country.lat,
        lng: country.lng,
        name: country.name,
        code: country.code
      }));
      worldRef.current.pointsData(points);
      
      // Centra la vista sul continente
      worldRef.current.pointOfView({
        lat: currentContinent.lat,
        lng: currentContinent.lng,
        altitude: 2
      }, 1000);
    }
  }, [currentContinentIndex]);

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

  const currentContinent = continents[currentContinentIndex];

  return (
    <div className="bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 rounded-xl p-6 min-h-[700px] relative overflow-hidden">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        🌍 Globo Interattivo delle Università
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

      {/* Container del globo */}
      <div className="h-96 w-full relative bg-black/20 rounded-lg backdrop-blur-sm border border-white/10">
        <div ref={globeRef} className="w-full h-full" />

        {/* Frecce di navigazione */}
        <button
          onClick={() => handleContinentChange('prev')}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={() => handleContinentChange('next')}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Pannello laterale per le università */}
      {selectedCountry && universitiesByCountry[selectedCountry] && (
        <div className="absolute top-0 right-0 h-full w-80 bg-black/70 backdrop-blur-xl text-white p-6 transform transition-all duration-500 ease-out animate-slide-in-right border-l border-white/20">
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
        <p className="text-lg mb-2">🎯 Ruota il globo e clicca sui punti rossi</p>
        <p className="text-sm">Usa le frecce per navigare tra i continenti. Zoom con la rotella del mouse.</p>
      </div>

      {/* Loading overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-white text-lg font-semibold animate-pulse">
            Esplorando {continents[currentContinentIndex].name}...
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeMap;
