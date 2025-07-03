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
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Coordinate complete di tutte le università
  const universityCoordinates: Record<string, { lat: number, lng: number }> = {
    // USA
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
    
    // Canada
    'toronto': { lat: 43.6629, lng: -79.3957 },
    'mcgill': { lat: 45.5048, lng: -73.5772 },
    'ubc': { lat: 49.2606, lng: -123.2460 },
    
    // Cina
    'peking': { lat: 39.9042, lng: 116.4074 },
    'tsinghua': { lat: 40.0007, lng: 116.3262 },
    'fudan': { lat: 31.2304, lng: 121.4737 },
    
    // Giappone
    'tokyo': { lat: 35.7128, lng: 139.7595 },
    'kyoto': { lat: 35.0116, lng: 135.7681 },
    'osaka': { lat: 34.6937, lng: 135.5023 },
    'hitotsubashi': { lat: 35.6762, lng: 139.6503 },
    
    // Corea del Sud
    'snu': { lat: 37.4601, lng: 126.9520 },
    'yonsei': { lat: 37.5665, lng: 126.9385 },
    
    // Singapore
    'nus': { lat: 1.2966, lng: 103.7764 },
    'cityu': { lat: 22.3364, lng: 114.2654 },
    
    // Italia
    'bocconi': { lat: 45.4408, lng: 9.1900 },
    'padova': { lat: 45.4064, lng: 11.8768 },
    'cafoscari': { lat: 45.4408, lng: 12.3155 },
    'sapienza': { lat: 41.9028, lng: 12.4964 },
    
    // Portogallo
    'nova': { lat: 38.7223, lng: -9.1393 },
    'ulisboa': { lat: 38.7223, lng: -9.1393 },
    
    // Spagna
    'esade': { lat: 41.3851, lng: 2.1734 },
    'ie': { lat: 40.4168, lng: -3.7038 },
    'uam': { lat: 40.5445, lng: -3.6906 },
    
    // Francia
    'sciencespo': { lat: 48.8566, lng: 2.3522 },
    'essec': { lat: 49.0370, lng: 2.0679 },
    'hec': { lat: 48.7593, lng: 2.1672 },
    'escp': { lat: 48.8566, lng: 2.3522 },
    
    // Paesi Bassi
    'erasmus': { lat: 51.9225, lng: 4.4792 },
    'uva': { lat: 52.3676, lng: 4.9041 },
    'maastricht': { lat: 50.8503, lng: 5.6909 },
    'groningen': { lat: 53.2194, lng: 6.5665 },
    
    // Belgio
    'kuleuven': { lat: 50.8798, lng: 4.7005 },
    'ghent': { lat: 51.0500, lng: 3.7303 },
    
    // Svizzera
    'stgallen': { lat: 47.4245, lng: 9.3767 },
    'uzh': { lat: 47.3769, lng: 8.5417 },
    'iheid': { lat: 46.2044, lng: 6.1432 },
    
    // Germania
    'mannheim': { lat: 49.4875, lng: 8.4660 },
    'lmu': { lat: 48.1351, lng: 11.5820 },
    'goethe': { lat: 50.1109, lng: 8.6821 },
    
    // Austria
    'wu': { lat: 48.2082, lng: 16.3738 },
    
    // Danimarca
    'cbs': { lat: 55.6761, lng: 12.5683 },
    
    // Svezia
    'sse': { lat: 59.3293, lng: 18.0686 },
    
    // Finlandia
    'helsinki': { lat: 60.1699, lng: 24.9384 },
    
    // Norvegia
    'bi': { lat: 59.9139, lng: 10.7522 },
    
    // Regno Unito
    'lse': { lat: 51.5145, lng: -0.1167 },
    'oxford': { lat: 51.7548, lng: -1.2544 },
    'cambridge': { lat: 52.2043, lng: 0.1218 },
    'warwick': { lat: 52.3793, lng: -1.5616 },
    'kcl': { lat: 51.5118, lng: -0.1162 },
    
    // Irlanda
    'tcd': { lat: 53.3438, lng: -6.2546 },
    'ucd': { lat: 53.3067, lng: -6.2297 }
  };

  // Crea pin solo per l'università in hover
  const createUniversityPins = () => {
    if (!worldRef.current) return;

    const universityPins: any[] = [];

    // Aggiungi pin solo se c'è un'università in hover
    if (hoveredUniversity) {
      const coords = universityCoordinates[hoveredUniversity.id];
      if (coords) {
        universityPins.push({
          lat: coords.lat,
          lng: coords.lng,
          name: hoveredUniversity.name,
          id: hoveredUniversity.id,
          color: '#FF0000',
          size: 0.6,
          altitude: 0.0
        });
      }
    }

    worldRef.current
      .pointsData(universityPins)
      .pointColor('color')
      .pointAltitude('altitude')
      .pointRadius('size')
      .pointLabel((d: any) => `
        <div style="
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.8)); 
          color: #DC2626; 
          padding: 12px 16px; 
          border-radius: 8px; 
          font-size: 15px;
          font-weight: bold;
          max-width: 250px;
          border: 2px solid #DC2626;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          z-index: 9999;
        ">
          📍 ${d.name}
        </div>
      `);
  };

  const handleUniversityHover = (university: University | null) => {
    setHoveredUniversity(university);
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
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
        .showAtmosphere(true)
        .atmosphereColor('#4A90E2')
        .atmosphereAltitude(0.15)
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

          // Configura i colori e gli eventi per i paesi - con altitudine aumentata
          world
            .polygonsData(data.features)
            .polygonAltitude(0.02) // Aumentata l'altitudine per coprire meglio i paesi
            .polygonCapColor((d: any) => {
              const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
              
              if (hasUniversities(countryName)) {
                return d.hovered ? 'rgba(6, 20, 40, 1.0)' : 'rgba(6, 20, 40, 0.8)';
              }
              return 'rgba(100, 116, 139, 0.1)';
            })
            .polygonSideColor((d: any) => {
              const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
              if (hasUniversities(countryName)) {
                return d.hovered ? 'rgba(6, 20, 40, 1.0)' : 'rgba(6, 20, 40, 0.8)';
              }
              return 'rgba(71, 85, 105, 0.05)';
            })
            .polygonStrokeColor((d: any) => {
              const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
              if (hasUniversities(countryName)) {
                return d.hovered ? '#061428' : '#061428';
              }
              return 'rgba(100, 116, 139, 0.2)';
            })
            .polygonLabel((d: any) => {
              const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_EN;
              if (hasUniversities(countryName)) {
                return `
                  <div style="
                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7)); 
                    color: #CDA434; 
                    padding: 10px 14px; 
                    border-radius: 8px; 
                    font-size: 14px;
                    font-weight: bold;
                    border: 2px solid #CDA434;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                  ">
                    ${countryName}<br/>
                    <span style="font-size: 12px; opacity: 0.9;">Click per università</span>
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

          // Crea i pin delle università iniziali
          createUniversityPins();

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

  useEffect(() => {
    if (!worldRef.current) return;

    const currentContinent = continents[currentContinentIndex];
    
    worldRef.current.pointOfView({
      lat: currentContinent.lat,
      lng: currentContinent.lng,
      altitude: 2
    }, 1000);

    // Riaggiorna i pin per il nuovo continente
    setTimeout(() => {
      createUniversityPins();
    }, 500);

  }, [currentContinentIndex]);

  // Riaggiorna i pin quando cambia l'università in hover
  useEffect(() => {
    createUniversityPins();
  }, [hoveredUniversity]);

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
      ref={containerRef}
      className="rounded-xl p-6 min-h-[600px] relative overflow-hidden shadow-lg border border-gray-600"
      style={{ backgroundColor: '#0A1D3A' }}
    >
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Globo Interattivo delle Università
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
              Caricamento globo terrestre...
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
        containerRef={containerRef}
      />

      <div className="text-center mt-6 space-y-2 text-white">
        <p className="text-lg font-medium">
          <span style={{ color: '#CDA434' }}>Usa le frecce per cambiare continente</span>
        </p>
        <p className="text-sm opacity-80">
          Clicca sui paesi evidenziati in blu per vedere le università disponibili.
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
            Esplorando {continents[currentContinentIndex].name}...
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeMap;
