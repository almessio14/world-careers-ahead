
import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { continents, globeConfig } from './globe/globeConfig';
import GlobeControls from './globe/GlobeControls';
import ContinentIndicator from './globe/ContinentIndicator';
import UniversitySidebar from './globe/UniversitySidebar';
import { University } from '../types';

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
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

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
        .globeImageUrl(globeConfig.globeImageUrl)
        .bumpImageUrl(globeConfig.bumpImageUrl)
        .showAtmosphere(globeConfig.showAtmosphere)
        .atmosphereColor(globeConfig.atmosphereColor)
        .atmosphereAltitude(globeConfig.atmosphereAltitude)
        .enablePointerInteraction(globeConfig.enablePointerInteraction)
        // Rimuovi completamente i punti
        .pointsData([])
        // Usa i poligoni per evidenziare i paesi
        .polygonsData([])
        .polygonAltitude(globeConfig.polygonAltitude)
        .polygonCapColor(globeConfig.polygonCapColor)
        .polygonSideColor(globeConfig.polygonSideColor)
        .polygonStrokeColor(globeConfig.polygonStrokeColor)
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
          console.log('Country hover:', polygon?.name || 'none');
          setHoveredCountry(polygon ? polygon.code : null);
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
        controls.rotateSpeed = 0.3;
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
      }, 1500);

    } catch (error) {
      console.error('Globe initialization error:', error);
      setIsLoading(false);
    }

    const updatePolygons = () => {
      if (!worldRef.current) return;
      
      const currentContinent = continents[currentContinentIndex];
      
      // Crea poligoni semplificati per ogni paese
      const polygons = currentContinent.countries.map(country => ({
        name: country.name,
        code: country.code,
        hovered: hoveredCountry === country.code,
        // Crea un poligono semplice intorno alle coordinate del paese
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [country.lng - 2, country.lat - 2],
            [country.lng + 2, country.lat - 2],
            [country.lng + 2, country.lat + 2],
            [country.lng - 2, country.lat + 2],
            [country.lng - 2, country.lat - 2]
          ]]
        }
      }));
      
      console.log('Updating polygons for:', currentContinent.name, polygons);
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
  }, []);

  // Aggiorna effetti hover
  useEffect(() => {
    if (worldRef.current && !isLoading) {
      const currentContinent = continents[currentContinentIndex];
      const polygons = currentContinent.countries.map(country => ({
        name: country.name,
        code: country.code,
        hovered: hoveredCountry === country.code,
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [country.lng - 2, country.lat - 2],
            [country.lng + 2, country.lat - 2],
            [country.lng + 2, country.lat + 2],
            [country.lng - 2, country.lat + 2],
            [country.lng - 2, country.lat - 2]
          ]]
        }
      }));
      
      worldRef.current.polygonsData(polygons);
    }
  }, [hoveredCountry, currentContinentIndex, isLoading]);

  // Cambio continente
  useEffect(() => {
    if (worldRef.current && !isLoading) {
      const currentContinent = continents[currentContinentIndex];
      const polygons = currentContinent.countries.map(country => ({
        name: country.name,
        code: country.code,
        hovered: hoveredCountry === country.code,
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [country.lng - 2, country.lat - 2],
            [country.lng + 2, country.lat - 2],
            [country.lng + 2, country.lat + 2],
            [country.lng - 2, country.lat + 2],
            [country.lng - 2, country.lat - 2]
          ]]
        }
      }));
      
      console.log('Changing to continent:', currentContinent.name);
      worldRef.current.polygonsData(polygons);
      
      worldRef.current.pointOfView({
        lat: currentContinent.lat,
        lng: currentContinent.lng,
        altitude: globeConfig.initialView.altitude
      }, 1500);
    }
  }, [currentContinentIndex, isLoading]);

  const handleContinentChange = (direction: 'prev' | 'next') => {
    if (isTransitioning || isLoading) return;
    
    console.log('Continent change requested:', direction);
    setIsTransitioning(true);
    setSelectedCountry(null);
    setHoveredCountry(null);
    
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
      }, 1500);
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

      <div className="h-[400px] w-full relative rounded-xl border border-[#fbbf24]/20 shadow-2xl overflow-hidden" style={{ backgroundColor: globeConfig.backgroundColor }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#001122]/90">
            <div className="text-[#FAF3E0] text-xl font-bold animate-pulse">
              🌍 Caricamento globo terrestre...
            </div>
          </div>
        )}
        
        <div 
          ref={globeRef} 
          className="w-full h-full"
          style={{ 
            minHeight: '400px',
            cursor: hoveredCountry ? 'pointer' : 'grab'
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
      />

      <div className="text-center text-white mt-6 space-y-2">
        <p className="text-lg font-semibold text-[#1e3a8a]">
          🎯 Usa le frecce per cambiare continente
        </p>
        <p className="text-sm text-gray-300">
          Trascina per ruotare il globo. I paesi si illuminano di oro al passaggio del mouse.
        </p>
      </div>

      {isTransitioning && (
        <div className="absolute inset-0 bg-[#001122]/30 backdrop-blur-sm flex items-center justify-center z-40 rounded-xl">
          <div className="text-[#FAF3E0] text-xl font-bold animate-pulse">
            ✨ Esplorando {continents[currentContinentIndex].name}... ✨
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeMap;
