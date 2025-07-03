
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
  const [currentContinentIndex, setCurrentContinentIndex] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allCountries, setAllCountries] = useState<any[]>([]);

  // Funzione migliorata per il mapping dei paesi
  const getCountryCode = (countryName: string): string | null => {
    if (!countryName) return null;
    
    const countryMappings: Record<string, string> = {
      'United States of America': 'USA',
      'United States': 'USA',
      'Canada': 'Canada',
      'China': 'China',
      'Japan': 'Japan',
      'South Korea': 'South Korea',
      'Republic of Korea': 'South Korea',
      'Korea': 'South Korea',
      'Singapore': 'Singapore',
      'Italy': 'Italy',
      'Portugal': 'Portugal',
      'Spain': 'Spain',
      'France': 'France',
      'Netherlands': 'Netherlands',
      'Belgium': 'Belgium',
      'Switzerland': 'Switzerland',
      'Germany': 'Germany',
      'Austria': 'Austria',
      'Denmark': 'Denmark',
      'Sweden': 'Sweden',
      'Finland': 'Finland',
      'Norway': 'Norway',
      'United Kingdom': 'UK',
      'Ireland': 'Ireland'
    };

    if (countryMappings[countryName]) {
      return countryMappings[countryName];
    }

    for (const [key, value] of Object.entries(countryMappings)) {
      if (countryName.toLowerCase().includes(key.toLowerCase()) || 
          key.toLowerCase().includes(countryName.toLowerCase())) {
        return value;
      }
    }

    return null;
  };

  // Funzione per verificare se un paese ha università
  const hasUniversities = (countryName: string): boolean => {
    const countryCode = getCountryCode(countryName);
    const result = countryCode && universitiesByCountry[countryCode] && universitiesByCountry[countryCode].length > 0;
    return !!result;
  };

  useEffect(() => {
    if (!globeRef.current) return;

    setIsLoading(true);

    try {
      if (globeRef.current) {
        globeRef.current.innerHTML = '';
      }

      const world = new Globe(globeRef.current!)
        .width(globeRef.current!.clientWidth)
        .height(globeConfig.height)
        .backgroundColor(globeConfig.backgroundColor)
        // Usa una texture più chiara per il globo
        .globeImageUrl('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/img/earth-topology.png')
        .showAtmosphere(true)
        .atmosphereColor(globeConfig.atmosphereColor)
        .atmosphereAltitude(globeConfig.atmosphereAltitude)
        .enablePointerInteraction(true)
        .pointsData([])
        .polygonsData([])
        .polygonAltitude(0.01)
        .polygonCapColor((d: any) => {
          const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
          
          if (hasUniversities(countryName)) {
            return d.hovered ? '#1a73e8' : 'rgba(66, 133, 244, 0.7)';
          }
          return 'rgba(229, 231, 235, 0.6)';
        })
        .polygonSideColor((d: any) => {
          const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
          if (hasUniversities(countryName)) {
            return d.hovered ? '#4285f4' : 'rgba(66, 133, 244, 0.5)';
          }
          return 'rgba(209, 213, 219, 0.4)';
        })
        .polygonStrokeColor((d: any) => {
          const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
          if (hasUniversities(countryName)) {
            return d.hovered ? '#1a73e8' : 'rgba(66, 133, 244, 0.8)';
          }
          return 'rgba(156, 163, 175, 0.5)';
        })
        .polygonLabel((d: any) => {
          const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
          if (hasUniversities(countryName)) {
            return `
              <div style="
                background: rgba(255, 255, 255, 0.95); 
                color: #374151; 
                padding: 12px 16px; 
                border-radius: 8px; 
                font-size: 14px;
                font-family: system-ui, -apple-system, sans-serif;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border: 1px solid rgba(229, 231, 235, 0.8);
                font-weight: 500;
              ">
                🎓 <strong style="color: #1f2937;">${countryName}</strong><br/>
                <span style="color: #6b7280; font-size: 12px;">Clicca per le università</span>
              </div>
            `;
          }
          return '';
        })
        .onPolygonClick((polygon: any) => {
          const countryName = polygon.properties?.NAME || polygon.properties?.name || polygon.properties?.NAME_EN;
          const countryCode = getCountryCode(countryName);
          
          if (countryCode && universitiesByCountry[countryCode]) {
            setSelectedCountry(countryCode);
          }
        })
        .onPolygonHover((polygon: any, prevPolygon: any) => {
          if (prevPolygon) {
            prevPolygon.hovered = false;
          }
          
          if (polygon) {
            const countryName = polygon.properties?.NAME || polygon.properties?.name || polygon.properties?.NAME_EN;
            
            if (hasUniversities(countryName)) {
              polygon.hovered = true;
              if (globeRef.current) {
                globeRef.current.style.cursor = 'pointer';
              }
            } else {
              polygon.hovered = false;
              if (globeRef.current) {
                globeRef.current.style.cursor = 'grab';
              }
            }
          } else {
            if (globeRef.current) {
              globeRef.current.style.cursor = 'grab';
            }
          }
        });

      const controls = world.controls();
      if (controls) {
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = false;
        controls.enableRotate = true;
        controls.rotateSpeed = 0.3;
        controls.minDistance = 200;
        controls.maxDistance = 200;
      }

      worldRef.current = world;

      // Carica i dati dei paesi
      fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
        .then(res => res.json())
        .then(countries => {
          setAllCountries(countries.features);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error loading countries:', error);
          setIsLoading(false);
        });

    } catch (error) {
      console.error('Globe initialization error:', error);
      setIsLoading(false);
    }

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
  }, []);

  // Effetto per aggiornare i paesi quando cambia il continente
  useEffect(() => {
    if (!worldRef.current || !allCountries.length) return;

    const currentContinent = continents[currentContinentIndex];
    const continentCountries = allCountries.filter((d: any) => {
      const countryName = d.properties?.NAME;
      if (!countryName) return false;
      
      return currentContinent.countries.some(c => 
        countryName.toLowerCase().includes(c.name.toLowerCase()) ||
        c.name.toLowerCase().includes(countryName.toLowerCase()) ||
        getCountryCode(countryName) === c.code
      );
    });

    worldRef.current.polygonsData(continentCountries);
    
    worldRef.current.pointOfView({
      lat: currentContinent.lat,
      lng: currentContinent.lng,
      altitude: 2
    }, 1000);

  }, [currentContinentIndex, allCountries]);

  const handleContinentChange = (direction: 'prev' | 'next') => {
    if (isTransitioning || isLoading) return;
    
    setIsTransitioning(true);
    setSelectedCountry(null);
    
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
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 rounded-xl p-6 min-h-[600px] relative overflow-hidden shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🌍 Globo Interattivo delle Università
      </h2>
      
      <ContinentIndicator 
        continents={continents}
        currentIndex={currentContinentIndex}
        isTransitioning={isTransitioning}
      />

      <div className="h-[400px] w-full relative rounded-xl border border-gray-200 shadow-lg overflow-hidden bg-white">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-blue-50/80">
            <div className="text-gray-700 text-xl font-semibold animate-pulse">
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

      {/* Sidebar con stile Google Maps */}
      {selectedCountry && universitiesByCountry[selectedCountry] && (
        <div className="absolute top-0 right-0 h-full w-96 bg-white/95 backdrop-blur-xl text-gray-800 p-6 transform transition-all duration-500 ease-out border-l border-gray-200 shadow-xl z-30">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              🎓 Università in {selectedCountry}
            </h3>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
            {universitiesByCountry[selectedCountry].map((university) => (
              <div
                key={university.id}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-sm text-gray-800 leading-tight pr-2">{university.name}</h4>
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full flex-shrink-0 font-medium">
                    #{university.ranking}
                  </span>
                </div>
                
                <div className="text-xs space-y-2 text-gray-600">
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
                    <span className="font-medium text-blue-600">{university.tuitionFee}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📚</span>
                    <span>{university.programs.join(', ')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🌐</span>
                    <a href={university.website} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 underline text-xs">
                      {university.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center text-gray-600 mt-6 space-y-2">
        <p className="text-lg font-medium text-gray-700">
          🎯 Usa le frecce per cambiare continente
        </p>
        <p className="text-sm text-gray-500">
          Clicca sui paesi evidenziati in blu per vedere le università disponibili.
        </p>
      </div>

      {isTransitioning && (
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-40 rounded-xl">
          <div className="text-gray-700 text-xl font-semibold animate-pulse">
            ✨ Esplorando {continents[currentContinentIndex].name}... ✨
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeMap;
