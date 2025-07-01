
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Globe from 'globe.gl';
import { universitiesByCountry } from '../data/universities';
import { University } from '../types';

interface GlobeMapProps {
  onUniversitySelect: (university: University) => void;
}

// Coordinate geografiche dei continenti - RIORDINATI: Nord America, Europa, Asia
const continents = [
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
  const [currentContinentIndex, setCurrentContinentIndex] = useState(1); // Inizia con Europa (centro)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  useEffect(() => {
    if (!globeRef.current) {
      console.log('Globe container not ready');
      return;
    }

    console.log('Initializing Globe.gl...');
    setIsLoading(true);

    try {
      // Configurazione del globo con texture migliore e controlli ottimizzati
      const world = new Globe(globeRef.current)
        .width(globeRef.current.clientWidth)
        .height(400)
        // Usa texture più luminosa e dettagliata
        .globeImageUrl('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/img/section/backgroundMapWorld.png')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundColor('rgba(0,0,0,0)')
        .showAtmosphere(true)
        .atmosphereColor('#4A90E2')
        .atmosphereAltitude(0.25)
        .showGraticules(false)
        // Configurazione punti per le università con effetti hover
        .pointsData([])
        .pointAltitude(0.015)
        .pointRadius((d: any) => hoveredPoint === d.code ? 1.2 : 0.8)
        .pointColor((d: any) => hoveredPoint === d.code ? '#fbbf24' : '#dc2626')
        .pointLabel((d: any) => `
          <div style="
            background: rgba(0,0,0,0.8); 
            color: white; 
            padding: 8px 12px; 
            border-radius: 6px; 
            font-size: 14px;
            border: 1px solid #4A90E2;
          ">
            🎓 ${d.name}<br/>
            <span style="font-size: 12px; color: #93C5FD;">
              Clicca per vedere le università
            </span>
          </div>
        `)
        .onPointClick((point: any) => {
          console.log('Point clicked:', point);
          setSelectedCountry(point.code);
        })
        .onPointHover((point: any) => {
          setHoveredPoint(point ? point.code : null);
        })
        // Configurazione controlli con zoom limitato e rotazione fluida
        .enablePointerInteraction(true)
        .pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 0);

      // Blocca il controllo zoom per mantenere la vista ottimale
      const controls = world.controls();
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      worldRef.current = world;

      // Imposta vista iniziale con zoom ottimizzato
      world.pointOfView({
        lat: continents[currentContinentIndex].lat,
        lng: continents[currentContinentIndex].lng,
        altitude: 2.5
      });

      // Aggiorna i punti iniziali
      const updatePoints = () => {
        if (!worldRef.current) return;
        
        const currentContinent = continents[currentContinentIndex];
        const points = currentContinent.countries.map(country => ({
          lat: country.lat,
          lng: country.lng,
          name: country.name,
          code: country.code
        }));
        
        console.log('Setting initial points:', points);
        worldRef.current.pointsData(points);
      };

      updatePoints();
      setIsLoading(false);
      console.log('Globe initialized successfully');

    } catch (error) {
      console.error('Error initializing Globe:', error);
      setIsLoading(false);
    }

    // Cleanup
    return () => {
      console.log('Cleaning up Globe');
      if (worldRef.current) {
        worldRef.current = null;
      }
    };
  }, [hoveredPoint]);

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
      
      console.log('Continent changed, updating points:', points);
      worldRef.current.pointsData(points);
      
      // Centra la vista sul continente con transizione fluida
      worldRef.current.pointOfView({
        lat: currentContinent.lat,
        lng: currentContinent.lng,
        altitude: 2.5
      }, 1500);
    }
  }, [currentContinentIndex]);

  const handleContinentChange = (direction: 'prev' | 'next') => {
    setIsTransitioning(true);
    setSelectedCountry(null);
    setHoveredPoint(null);
    
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
    <div className="bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 rounded-xl p-6 min-h-[700px] relative overflow-hidden shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        🌍 Globo Interattivo delle Università
      </h2>
      
      {/* Indicatore continente corrente migliorato */}
      <div className="text-center mb-4">
        <h3 className={`text-2xl font-bold text-white transition-all duration-300 ${
          isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        } bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent`}>
          ✨ {currentContinent.name} ✨
        </h3>
        <div className="flex justify-center space-x-3 mt-3">
          {continents.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
                index === currentContinentIndex 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 scale-125 shadow-yellow-400/50' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Container del globo migliorato */}
      <div className="h-96 w-full relative bg-gradient-to-b from-black/20 to-black/40 rounded-xl backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-white text-xl font-bold animate-pulse bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🌍 Caricamento globo magico...
            </div>
          </div>
        )}
        
        <div 
          ref={globeRef} 
          className="w-full h-full rounded-xl"
          style={{ minHeight: '400px' }}
        />

        {/* Frecce di navigazione migliorate */}
        {!isLoading && (
          <>
            <button
              onClick={() => handleContinentChange('prev')}
              disabled={isTransitioning}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 shadow-lg hover:shadow-blue-500/50"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={() => handleContinentChange('next')}
              disabled={isTransitioning}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 shadow-lg hover:shadow-purple-500/50"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}

        {/* Effetto di brillantezza sui bordi */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse pointer-events-none" />
      </div>

      {/* Pannello laterale migliorato */}
      {selectedCountry && universitiesByCountry[selectedCountry] && (
        <div className="absolute top-0 right-0 h-full w-80 bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-xl text-white p-6 transform transition-all duration-500 ease-out animate-slide-in-right border-l border-white/20 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🎓 {selectedCountry}
            </h3>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
            {universitiesByCountry[selectedCountry].map((university, index) => (
              <div
                key={university.id}
                onClick={() => onUniversitySelect(university)}
                className="bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/15 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-blue-500/20"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm leading-tight">{university.name}</h4>
                  <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full ml-2 flex-shrink-0 shadow-lg">
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

      {/* Istruzioni migliorate */}
      <div className="text-center text-white/90 mt-6 space-y-2">
        <p className="text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          🎯 Il globo ruota automaticamente per te!
        </p>
        <p className="text-sm text-white/70">
          Usa le frecce per cambiare continente. Passa il mouse sui punti rossi e clicca per le università.
        </p>
      </div>

      {/* Loading overlay migliorato */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
          <div className="text-white text-xl font-bold animate-pulse bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ✨ Esplorando {continents[currentContinentIndex].name}... ✨
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeMap;
