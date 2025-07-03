import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { continents, globeConfig } from './globe/globeConfig';
import GlobeControls from './globe/GlobeControls';
import ContinentIndicator from './globe/ContinentIndicator';
import UniversitySidebar from './globe/UniversitySidebar';
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
  const [hoveredUniversity, setHoveredUniversity] = useState<University | null>(null);

  // Funzione per il mapping dei paesi
  const getCountryCode = (countryName: string): string | null => {
    if (!countryName) return null;
    
    const countryMappings: Record<string, string> = {
      'United States of America': 'USA',
      'United States': 'USA',
      'USA': 'USA',
      'US': 'USA',
      'Canada': 'Canada',
      'China': 'China',
      'People\'s Republic of China': 'China',
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
      'UK': 'UK',
      'Great Britain': 'UK',
      'England': 'UK',
      'Ireland': 'Ireland'
    };

    return countryMappings[countryName] || null;
  };

  // Funzione per verificare se un paese ha università
  const hasUniversities = (countryName: string): boolean => {
    const countryCode = getCountryCode(countryName);
    return !!(countryCode && universitiesByCountry[countryCode] && universitiesByCountry[countryCode].length > 0);
  };

  // Funzione per convertire coordinate lat/lng in posizione 3D
  const latLngToVector3 = (lat: number, lng: number, radius = 100) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    return {
      x: -radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta)
    };
  };

  // Aggiungi pin per università quando hover
  const addUniversityPin = (university: University) => {
    if (!worldRef.current) return;

    // Coordinate approssimative delle università (potresti avere coordinate più precise)
    const universityCoordinates: Record<string, { lat: number, lng: number }> = {
      'harvard': { lat: 42.3744, lng: -71.1169 },
      'stanford': { lat: 37.4275, lng: -122.1697 },
      'ucla': { lat: 34.0689, lng: -118.4452 },
      'berkeley': { lat: 37.8719, lng: -122.2585 },
      'columbia': { lat: 40.8075, lng: -73.9626 },
      'yale': { lat: 41.3163, lng: -72.9223 },
      'uchicago': { lat: 41.7886, lng: -87.5987 },
      'mit': { lat: 42.3601, lng: -71.0942 },
      'wharton': { lat: 39.9522, lng: -75.1932 },
      'princeton': { lat: 40.3430, lng: -74.6514 },
      'nyu': { lat: 40.7295, lng: -73.9965 },
      'bu': { lat: 42.3505, lng: -71.1054 },
      'toronto': { lat: 43.6629, lng: -79.3957 },
      'mcgill': { lat: 45.5048, lng: -73.5772 },
      'ubc': { lat: 49.2606, lng: -123.2460 },
      'bocconi': { lat: 45.4408, lng: 9.1900 },
      'padova': { lat: 45.4064, lng: 11.8768 },
      'cafoscari': { lat: 45.4408, lng: 12.3155 },
      'sapienza': { lat: 41.9028, lng: 12.4964 },
      'nova': { lat: 38.7223, lng: -9.1393 },
      'ulisboa': { lat: 38.7223, lng: -9.1393 },
      'lse': { lat: 51.5145, lng: -0.1167 },
      'oxford': { lat: 51.7548, lng: -1.2544 },
      'cambridge': { lat: 52.2043, lng: 0.1218 },
      'warwick': { lat: 52.3793, lng: -1.5616 },
      'kcl': { lat: 51.5118, lng: -0.1162 }
    };

    const coords = universityCoordinates[university.id];
    if (!coords) return;

    const position = latLngToVector3(coords.lat, coords.lng, 101);

    // Aggiungi il pin come punto sulla mappa
    worldRef.current
      .pointsData([{
        lat: coords.lat,
        lng: coords.lng,
        name: university.name,
        color: '#ff6b6b',
        size: 1
      }])
      .pointColor('color')
      .pointAltitude(0.02)
      .pointRadius('size')
      .pointLabel((d: any) => `
        <div style="
          background: rgba(0, 0, 0, 0.8); 
          color: white; 
          padding: 8px 12px; 
          border-radius: 6px; 
          font-size: 12px;
          font-weight: bold;
          max-width: 200px;
        ">
          📍 ${d.name}
        </div>
      `);
  };

  // Rimuovi pin università
  const removeUniversityPin = () => {
    if (!worldRef.current) return;
    worldRef.current.pointsData([]);
  };

  const handleUniversityHover = (university: University | null) => {
    setHoveredUniversity(university);
    
    if (university) {
      addUniversityPin(university);
    } else {
      removeUniversityPin();
    }
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
        .height(400)
        .backgroundColor('#0A1D3A')
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
        .bumpImageUrl(null)
        .showAtmosphere(true)
        .atmosphereColor('#8B4513')
        .atmosphereAltitude(0.12)
        .enablePointerInteraction(true);

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
      const loadCountriesData = async () => {
        try {
          console.log('Caricamento dati paesi...');
          const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Dati paesi caricati:', data.features.length, 'paesi');

          // Configura i colori e gli eventi per i paesi
          world
            .polygonsData(data.features)
            .polygonAltitude(0.01)
            .polygonCapColor((d: any) => {
              const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
              
              if (hasUniversities(countryName)) {
                return d.hovered ? '#FFFF00' : '#FFD700'; // Giallo brillante quando hover, oro quando normale
              }
              return 'rgba(100, 116, 139, 0.2)'; // Grigio per paesi senza università
            })
            .polygonSideColor((d: any) => {
              const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
              if (hasUniversities(countryName)) {
                return d.hovered ? '#FFFF00' : '#FFD700';
              }
              return 'rgba(71, 85, 105, 0.1)';
            })
            .polygonStrokeColor((d: any) => {
              const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
              if (hasUniversities(countryName)) {
                return d.hovered ? '#FFFFFF' : '#fbbf24';
              }
              return 'rgba(100, 116, 139, 0.3)';
            })
            .polygonLabel((d: any) => {
              const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
              if (hasUniversities(countryName)) {
                return `
                  <div style="
                    background: rgba(0, 0, 0, 0.8); 
                    color: #FFD700; 
                    padding: 8px 12px; 
                    border-radius: 6px; 
                    font-size: 14px;
                    font-weight: bold;
                    border: 2px solid #FFD700;
                  ">
                    🎓 ${countryName}<br/>
                    <span style="font-size: 12px;">Click per università</span>
                  </div>
                `;
              }
              return '';
            })
            .onPolygonClick((polygon: any) => {
              console.log('Click su paese:', polygon);
              const countryName = polygon.properties?.NAME || polygon.properties?.name || polygon.properties?.NAME_EN;
              console.log('Nome paese:', countryName);
              const countryCode = getCountryCode(countryName);
              console.log('Codice paese:', countryCode);
              
              if (countryCode && universitiesByCountry[countryCode]) {
                console.log('Università trovate per', countryCode, ':', universitiesByCountry[countryCode].length);
                setSelectedCountry(countryCode);
              } else {
                console.log('Nessuna università trovata per', countryName);
              }
            })
            .onPolygonHover((polygon: any, prevPolygon: any) => {
              // Reset previous polygon
              if (prevPolygon) {
                prevPolygon.hovered = false;
              }
              
              // Set current polygon
              if (polygon) {
                const countryName = polygon.properties?.NAME || polygon.properties?.name || polygon.properties?.NAME_EN;
                
                if (hasUniversities(countryName)) {
                  polygon.hovered = true;
                  if (globeRef.current) {
                    globeRef.current.style.cursor = 'pointer';
                  }
                  console.log('Hover su paese con università:', countryName);
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

              // Force re-render dei colori
              world.polygonsData(world.polygonsData());
            });

          setIsLoading(false);
          console.log('Setup completato');
          
        } catch (error) {
          console.error('Errore nel caricamento dati paesi:', error);
          setIsLoading(false);
        }
      };

      loadCountriesData();

    } catch (error) {
      console.error('Errore inizializzazione Globe:', error);
      setIsLoading(false);
    }

    return () => {
      if (worldRef.current) {
        try {
          worldRef.current._destructor?.();
        } catch (e) {
          console.log('Globe cleanup completato');
        }
        worldRef.current = null;
      }
    };
  }, []);

  // Effetto per cambiare continente
  useEffect(() => {
    if (!worldRef.current) return;

    const currentContinent = continents[currentContinentIndex];
    
    worldRef.current.pointOfView({
      lat: currentContinent.lat,
      lng: currentContinent.lng,
      altitude: 2
    }, 1000);

  }, [currentContinentIndex]);

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
    <div 
      className="rounded-xl p-6 min-h-[600px] relative overflow-hidden shadow-lg border border-gray-600"
      style={{ backgroundColor: '#0A1D3A' }}
    >
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        🌍 Globo Interattivo delle Università
      </h2>
      
      <ContinentIndicator 
        continents={continents}
        currentIndex={currentContinentIndex}
        isTransitioning={isTransitioning}
      />

      <div className="h-[400px] w-full relative rounded-xl border border-gray-600 shadow-lg overflow-hidden">
        {isLoading && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ backgroundColor: 'rgba(10, 29, 58, 0.8)' }}
          >
            <div 
              className="text-xl font-semibold animate-pulse"
              style={{ color: '#CDA434' }}
            >
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

      <UniversitySidebar
        selectedCountry={selectedCountry}
        onClose={() => setSelectedCountry(null)}
        onUniversitySelect={onUniversitySelect}
        onUniversityHover={handleUniversityHover}
        hoveredUniversity={hoveredUniversity}
      />

      <div className="text-center mt-6 space-y-2 text-white">
        <p className="text-lg font-medium">
          <span style={{ color: '#CDA434' }}>🎯 Usa le frecce per cambiare continente</span>
        </p>
        <p className="text-sm opacity-80">
          Clicca sui paesi evidenziati in oro per vedere le università disponibili.
        </p>
      </div>

      {isTransitioning && (
        <div 
          className="absolute inset-0 backdrop-blur-sm flex items-center justify-center z-40 rounded-xl"
          style={{ backgroundColor: 'rgba(10, 29, 58, 0.8)' }}
        >
          <div 
            className="text-xl font-semibold animate-pulse"
            style={{ color: '#CDA434' }}
          >
            ✨ Esplorando {continents[currentContinentIndex].name}... ✨
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeMap;
