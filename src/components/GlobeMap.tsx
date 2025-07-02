
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
  const [currentContinentIndex, setCurrentContinentIndex] = useState(1); // Europa di default (indice 1)
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

    // Cerca prima una corrispondenza esatta
    if (countryMappings[countryName]) {
      return countryMappings[countryName];
    }

    // Cerca una corrispondenza parziale
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
    console.log(`Country: ${countryName} -> Code: ${countryCode} -> Has universities: ${result}`);
    return !!result;
  };

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
        .polygonCapColor((d: any) => {
          const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
          console.log('Polygon cap color for:', countryName);
          
          if (hasUniversities(countryName)) {
            console.log('Country has universities, applying gold color');
            return d.hovered ? '#FFD700' : 'rgba(205, 164, 52, 0.8)';
          }
          return 'rgba(100, 100, 100, 0.3)';
        })
        .polygonSideColor((d: any) => {
          const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
          if (hasUniversities(countryName)) {
            return d.hovered ? '#CDA434' : 'rgba(205, 164, 52, 0.6)';
          }
          return 'rgba(80, 80, 80, 0.2)';
        })
        .polygonStrokeColor((d: any) => {
          const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
          if (hasUniversities(countryName)) {
            return d.hovered ? '#FFFF00' : 'rgba(205, 164, 52, 0.9)';
          }
          return 'rgba(120, 120, 120, 0.4)';
        })
        .polygonLabel((d: any) => {
          const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
          if (hasUniversities(countryName)) {
            return `
              <div style="
                background: rgba(0, 0, 0, 0.9); 
                color: white; 
                padding: 8px 12px; 
                border-radius: 4px; 
                font-size: 12px;
                font-family: Arial, sans-serif;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
              ">
                🎓 <strong>${countryName}</strong><br/>
                Clicca per le università
              </div>
            `;
          }
          return '';
        })
        .onPolygonClick((polygon: any) => {
          const countryName = polygon.properties?.NAME || polygon.properties?.name || polygon.properties?.NAME_EN;
          console.log('Polygon clicked:', countryName);
          
          const countryCode = getCountryCode(countryName);
          console.log('Country code from click:', countryCode);
          
          if (countryCode && universitiesByCountry[countryCode]) {
            console.log('Opening universities for:', countryCode);
            setSelectedCountry(countryCode);
          } else {
            console.log('No universities found for:', countryName);
          }
        })
        .onPolygonHover((polygon: any, prevPolygon: any) => {
          // Reset previous polygon
          if (prevPolygon) {
            prevPolygon.hovered = false;
          }
          
          if (polygon) {
            const countryName = polygon.properties?.NAME || polygon.properties?.name || polygon.properties?.NAME_EN;
            console.log('Hovering over:', countryName);
            
            if (hasUniversities(countryName)) {
              console.log('Setting hover for country with universities:', countryName);
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
          console.log('Countries loaded:', countries.features.length);
          console.log('Sample country properties:', countries.features[0]?.properties);
          setAllCountries(countries.features);
          setIsLoading(false);
          console.log('Globe initialized successfully');
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

  // Effetto separato per aggiornare i paesi quando cambia il continente
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
    
    // Sposta semplicemente la vista senza reinizializzare
    worldRef.current.pointOfView({
      lat: currentContinent.lat,
      lng: currentContinent.lng,
      altitude: 2
    }, 1000);

  }, [currentContinentIndex, allCountries]);

  const handleContinentChange = (direction: 'prev' | 'next') => {
    if (isTransitioning || isLoading) return;
    
    console.log('Continent change requested:', direction);
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
          
          <div className="space-y-4 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
            {universitiesByCountry[selectedCountry].map((university) => (
              <div
                key={university.id}
                className="bg-gradient-to-r from-white/10 to-white/5 p-4 rounded-lg border border-white/20"
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
          Clicca sui paesi evidenziati in oro per vedere le università disponibili.
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
