
import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { continents, globeConfig } from './globe/globeConfig';
import GlobeControls from './globe/GlobeControls';
import ContinentIndicator from './globe/ContinentIndicator';
import { universitiesByCountry } from '../data/universities';
import { University } from '../types';
import { X } from 'lucide-react';

interface GlobeMapProps {
  onUniversitySelect: (university: University) => void;
}

const GlobeMap = ({ onUniversitySelect }: GlobeMapProps) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<any>(null);
  const [currentContinentIndex, setCurrentContinentIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!globeRef.current) return;

    console.log('Initializing Globe...');
    setIsLoading(true);

    try {
      if (globeRef.current) {
        globeRef.current.innerHTML = '';
      }

      const world = new Globe(globeRef.current!)
        .width(globeRef.current!.clientWidth)
        .height(globeConfig.height)
        .backgroundColor(globeConfig.backgroundColor)
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
        .showAtmosphere(true)
        .atmosphereColor('#69b7d3')
        .atmosphereAltitude(0.15)
        .enablePointerInteraction(true)
        .pointsData([])
        .polygonsData([])
        .polygonAltitude(0.01)
        .polygonCapColor((d: any) => d.hovered ? '#CDA434' : 'rgba(255, 255, 255, 0.1)')
        .polygonSideColor((d: any) => d.hovered ? '#B8860B' : 'rgba(255, 255, 255, 0.05)')
        .polygonStrokeColor((d: any) => d.hovered ? '#CDA434' : 'rgba(255, 255, 255, 0.2)')
        .polygonLabel((d: any) => `
          <div style="
            background: rgba(0, 0, 0, 0.9); 
            color: white; 
            padding: 8px 12px; 
            border-radius: 4px; 
            font-size: 12px;
            font-family: Arial, sans-serif;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          ">
            🎓 <strong>${d.name}</strong><br/>
            Clicca per le università
          </div>
        `)
        .onPolygonClick((polygon: any) => {
          console.log('Country clicked:', polygon);
          setSelectedCountry(polygon.code);
        })
        .onPolygonHover((polygon: any) => {
          updatePolygons(polygon ? polygon.code : null);
          if (globeRef.current) {
            globeRef.current.style.cursor = polygon ? 'pointer' : 'grab';
          }
        });

      const controls = world.controls();
      if (controls) {
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = false;
        controls.enableRotate = true;
        controls.rotateSpeed = 0.2;
        controls.minDistance = globeConfig.initialView.altitude * 100;
        controls.maxDistance = globeConfig.initialView.altitude * 100;
      }

      worldRef.current = world;

      const initialContinent = continents[0];
      world.pointOfView({
        lat: initialContinent.lat,
        lng: initialContinent.lng,
        altitude: globeConfig.initialView.altitude
      }, 0);

      setTimeout(() => {
        updatePolygons();
        setIsLoading(false);
        console.log('Globe initialized successfully');
      }, 1000);

    } catch (error) {
      console.error('Globe initialization error:', error);
      setIsLoading(false);
    }

    const updatePolygons = (hoveredCountry?: string | null) => {
      if (!worldRef.current) return;
      
      const currentContinent = continents[currentContinentIndex];
      
      const polygons = currentContinent.countries.map(country => ({
        name: country.name,
        code: country.code,
        hovered: hoveredCountry === country.code,
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [country.lng - 3, country.lat - 3],
            [country.lng + 3, country.lat - 3],
            [country.lng + 3, country.lat + 3],
            [country.lng - 3, country.lat + 3],
            [country.lng - 3, country.lat - 3]
          ]]
        }
      }));
      
      worldRef.current.polygonsData(polygons);
    };

    return () => {
      if (worldRef.current) {
        try {
          worldRef.current._destructor?.();
        } catch (e) {
          console.log('Globe cleanup completed');
        }
        worldRef.current = null;
      }
    };
  }, [currentContinentIndex]);

  const handleContinentChange = (direction: 'prev' | 'next') => {
    if (isTransitioning || isLoading) return;
    
    console.log('Continent change requested:', direction);
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
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }, 100);
  };

  return (
    <div className="bg-gradient-to-b from-[#002147] via-[#003366] to-[#004080] rounded-xl p-6 min-h-[600px] relative overflow-hidden shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        🌍 Globo Interattivo delle Università
      </h2>
      
      <ContinentIndicator 
        continents={continents}
        currentIndex={currentContinentIndex}
        isTransitioning={isTransitioning}
      />

      <div className="h-[400px] w-full relative rounded-xl border border-[#CDA434]/20 shadow-2xl overflow-hidden" style={{ backgroundColor: globeConfig.backgroundColor }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#001122]/90">
            <div className="text-white text-xl font-bold animate-pulse">
              🌍 Caricamento globo terrestre...
            </div>
          </div>
        )}
        
        <div 
          ref={globeRef} 
          className="w-full h-full"
          style={{ 
            minHeight: '400px',
            cursor: 'grab'
          }}
        />

        {!isLoading && (
          <GlobeControls
            onPrevious={() => handleContinentChange('prev')}
            onNext={() => handleContinentChange('next')}
            isTransitioning={isTransitioning}
          />
        )}
      </div>

      {/* Sidebar semplificata con informazioni università */}
      {selectedCountry && universitiesByCountry[selectedCountry] && (
        <div className="absolute top-0 right-0 h-full w-96 bg-gradient-to-b from-[#002147]/95 to-[#002147]/98 backdrop-blur-xl text-white p-6 transform transition-all duration-500 ease-out border-l border-[#CDA434]/20 shadow-2xl z-30">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#CDA434] to-[#FFD700] bg-clip-text text-transparent">
              🎓 Università in {selectedCountry}
            </h3>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-white/70 hover:text-white p-2 hover:bg-[#CDA434]/10 rounded-full transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-3 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
            {universitiesByCountry[selectedCountry].map((university) => (
              <div
                key={university.id}
                className="bg-gradient-to-r from-white/10 to-white/5 p-4 rounded-lg border border-white/20 hover:border-[#CDA434]/40 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-sm text-white leading-tight pr-2">{university.name}</h4>
                  <span className="text-xs bg-gradient-to-r from-[#CDA434] to-[#FFD700] text-black px-2 py-1 rounded-full flex-shrink-0 font-bold">
                    #{university.ranking}
                  </span>
                </div>
                
                <div className="text-xs space-y-2 text-white/90">
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
                    <span className="font-semibold text-[#CDA434]">{university.tuitionFee}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📚</span>
                    <span>{university.programs.join(', ')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🌐</span>
                    <a href={university.website} target="_blank" rel="noopener noreferrer" 
                       className="text-[#CDA434] hover:text-[#FFD700] underline">
                      {university.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center text-white mt-6 space-y-2">
        <p className="text-lg font-semibold text-[#CDA434]">
          🎯 Usa le frecce per cambiare continente
        </p>
        <p className="text-sm text-gray-300">
          Trascina per ruotare il globo. I paesi si illuminano di oro al passaggio del mouse.
        </p>
      </div>

      {isTransitioning && (
        <div className="absolute inset-0 bg-[#001122]/30 backdrop-blur-sm flex items-center justify-center z-40 rounded-xl">
          <div className="text-white text-xl font-bold animate-pulse">
            ✨ Esplorando {continents[currentContinentIndex].name}... ✨
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeMap;
