
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
  const [currentContinentIndex, setCurrentContinentIndex] = useState(1); // Inizia con Europa
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    console.log('Initializing Globe with fixed configuration...');
    setIsLoading(true);

    try {
      // Pulisci completamente il container
      globeRef.current.innerHTML = '';

      const world = new Globe(globeRef.current)
        .width(globeRef.current.clientWidth)
        .height(globeConfig.height)
        .globeImageUrl(globeConfig.globeImageUrl)
        .bumpImageUrl(globeConfig.bumpImageUrl)
        .backgroundColor(globeConfig.backgroundColor)
        .showAtmosphere(globeConfig.showAtmosphere)
        .atmosphereColor(globeConfig.atmosphereColor)
        .atmosphereAltitude(globeConfig.atmosphereAltitude)
        .enablePointerInteraction(globeConfig.enablePointerInteraction)
        .pointsData([])
        .pointAltitude(globeConfig.pointAltitude)
        .pointRadius((d: any) => hoveredPoint === d.code ? globeConfig.pointRadius.hover : globeConfig.pointRadius.normal)
        .pointColor((d: any) => hoveredPoint === d.code ? globeConfig.pointColor.hover : globeConfig.pointColor.normal)
        .pointResolution(globeConfig.pointResolution)
        .pointLabel((d: any) => `
          <div style="
            background: rgba(0, 33, 71, 0.95); 
            color: #FAF3E0; 
            padding: 12px 16px; 
            border-radius: 8px; 
            font-size: 14px;
            border: 2px solid #CDA434;
            box-shadow: 0 4px 15px rgba(0, 33, 71, 0.4);
            font-family: Arial, sans-serif;
            font-weight: 500;
          ">
            🎓 <strong>${d.name}</strong><br/>
            <span style="font-size: 12px; color: #D3D3D3;">
              Clicca per vedere le università
            </span>
          </div>
        `)
        .onPointClick((point: any) => {
          console.log('Point clicked:', point);
          setSelectedCountry(point.code);
        })
        .onPointHover((point: any) => {
          console.log('Point hovered:', point);
          setHoveredPoint(point ? point.code : null);
          if (globeRef.current) {
            globeRef.current.style.cursor = point ? 'pointer' : 'grab';
          }
        });

      // Configurazione controlli - ZOOM COMPLETAMENTE FISSO
      const controls = world.controls();
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = false;
      controls.enableRotate = true;
      controls.rotateSpeed = 0.8;
      controls.minDistance = globeConfig.initialView.altitude;
      controls.maxDistance = globeConfig.initialView.altitude;

      // Imposta vista iniziale
      world.pointOfView({
        lat: continents[currentContinentIndex].lat,
        lng: continents[currentContinentIndex].lng,
        altitude: globeConfig.initialView.altitude
      });

      worldRef.current = world;

      // Imposta punti iniziali
      const updateInitialPoints = () => {
        if (!worldRef.current) return;
        
        const currentContinent = continents[currentContinentIndex];
        const points = currentContinent.countries.map(country => ({
          lat: country.lat,
          lng: country.lng,
          name: country.name,
          code: country.code
        }));
        
        console.log('Setting points for', currentContinent.name, ':', points);
        worldRef.current.pointsData(points);
      };

      // Aspetta che il globo sia caricato
      setTimeout(() => {
        updateInitialPoints();
        setIsLoading(false);
        console.log('Globe ready and visible');
      }, 1500);

    } catch (error) {
      console.error('Error initializing Globe:', error);
      setIsLoading(false);
    }

    return () => {
      if (worldRef.current) {
        worldRef.current._destructor?.();
        worldRef.current = null;
      }
    };
  }, []); // Rimuovo hoveredPoint per evitare re-render

  // Aggiorna colori punti quando cambia hover
  useEffect(() => {
    if (worldRef.current && !isLoading) {
      worldRef.current
        .pointRadius((d: any) => hoveredPoint === d.code ? globeConfig.pointRadius.hover : globeConfig.pointRadius.normal)
        .pointColor((d: any) => hoveredPoint === d.code ? globeConfig.pointColor.hover : globeConfig.pointColor.normal);
    }
  }, [hoveredPoint, isLoading]);

  // Aggiorna punti quando cambia continente
  useEffect(() => {
    if (worldRef.current && !isLoading) {
      const currentContinent = continents[currentContinentIndex];
      const points = currentContinent.countries.map(country => ({
        lat: country.lat,
        lng: country.lng,
        name: country.name,
        code: country.code
      }));
      
      console.log('Changing to continent:', currentContinent.name, 'with points:', points);
      worldRef.current.pointsData(points);
      
      // Transizione verso il nuovo continente
      worldRef.current.pointOfView({
        lat: currentContinent.lat,
        lng: currentContinent.lng,
        altitude: globeConfig.initialView.altitude
      }, 1500);
    }
  }, [currentContinentIndex, isLoading]);

  const handleContinentChange = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
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

  return (
    <div className="bg-gradient-to-b from-[#002147] via-[#003366] to-[#004080] rounded-xl p-6 min-h-[600px] relative overflow-hidden shadow-2xl">
      <h2 className="text-3xl font-bold text-[#FAF3E0] mb-6 text-center bg-gradient-to-r from-[#CDA434] to-[#7B1E3B] bg-clip-text text-transparent">
        🌍 Globo Interattivo delle Università
      </h2>
      
      <ContinentIndicator 
        continents={continents}
        currentIndex={currentContinentIndex}
        isTransitioning={isTransitioning}
      />

      {/* Container del globo */}
      <div className="h-[400px] w-full relative bg-[#002147] rounded-xl border border-[#CDA434]/20 shadow-2xl overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#002147]/50 backdrop-blur-sm rounded-xl">
            <div className="text-[#FAF3E0] text-xl font-bold animate-pulse bg-gradient-to-r from-[#CDA434] to-[#7B1E3B] bg-clip-text text-transparent">
              🌍 Caricamento globo...
            </div>
          </div>
        )}
        
        <div 
          ref={globeRef} 
          className="w-full h-full rounded-xl"
          style={{ 
            minHeight: '400px',
            cursor: 'grab',
            background: '#002147'
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

      {/* Istruzioni */}
      <div className="text-center text-[#FAF3E0]/90 mt-6 space-y-2">
        <p className="text-lg font-semibold bg-gradient-to-r from-[#CDA434] to-[#7B1E3B] bg-clip-text text-transparent">
          🎯 Usa le frecce per cambiare continente
        </p>
        <p className="text-sm text-[#D3D3D3]">
          Trascina per ruotare. Passa il mouse sui punti bordeaux e clicca per le università.
        </p>
      </div>

      {/* Loading overlay per transizioni */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-[#002147]/30 backdrop-blur-sm flex items-center justify-center z-40 rounded-xl">
          <div className="text-[#FAF3E0] text-xl font-bold animate-pulse bg-gradient-to-r from-[#CDA434] to-[#7B1E3B] bg-clip-text text-transparent">
            ✨ Esplorando {continents[currentContinentIndex].name}... ✨
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeMap;
