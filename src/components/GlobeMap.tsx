
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
  const [currentContinentIndex, setCurrentContinentIndex] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    console.log('Initializing simplified Globe...');
    setIsLoading(true);

    try {
      // Pulisci completamente
      globeRef.current.innerHTML = '';

      const world = new Globe(globeRef.current)
        .width(globeRef.current.clientWidth)
        .height(globeConfig.height)
        .backgroundColor(globeConfig.backgroundColor)
        .showGlobe(true)
        .globeMaterial(new (window as any).THREE.MeshBasicMaterial({ 
          color: 0x4A90E2, // Blu per il globo
          transparent: true,
          opacity: 0.8
        }))
        .showAtmosphere(globeConfig.showAtmosphere)
        .enablePointerInteraction(globeConfig.enablePointerInteraction)
        .pointsData([])
        .pointAltitude(globeConfig.pointAltitude)
        .pointRadius((d: any) => hoveredPoint === d.code ? globeConfig.pointRadius.hover : globeConfig.pointRadius.normal)
        .pointColor((d: any) => hoveredPoint === d.code ? globeConfig.pointColor.hover : globeConfig.pointColor.normal)
        .pointResolution(globeConfig.pointResolution)
        .pointLabel((d: any) => `
          <div style="
            background: rgba(0, 0, 0, 0.9); 
            color: white; 
            padding: 8px 12px; 
            border-radius: 4px; 
            font-size: 12px;
            font-family: Arial, sans-serif;
          ">
            🎓 <strong>${d.name}</strong><br/>
            Clicca per università
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

      // Controlli COMPLETAMENTE FISSI
      const controls = world.controls();
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = false;
      controls.enableRotate = true;
      controls.rotateSpeed = 0.5;
      controls.minDistance = globeConfig.initialView.altitude;
      controls.maxDistance = globeConfig.initialView.altitude;

      // Vista iniziale
      world.pointOfView({
        lat: continents[currentContinentIndex].lat,
        lng: continents[currentContinentIndex].lng,
        altitude: globeConfig.initialView.altitude
      });

      worldRef.current = world;

      // Aggiungi punti immediatamente
      const updatePoints = () => {
        if (!worldRef.current) return;
        
        const currentContinent = continents[currentContinentIndex];
        const points = currentContinent.countries.map(country => ({
          lat: country.lat,
          lng: country.lng,
          name: country.name,
          code: country.code
        }));
        
        console.log('Adding points:', points);
        worldRef.current.pointsData(points);
      };

      // Timeout breve per il rendering
      setTimeout(() => {
        updatePoints();
        setIsLoading(false);
        console.log('Globe should be visible now');
      }, 500);

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

  // Aggiorna colori hover
  useEffect(() => {
    if (worldRef.current && !isLoading) {
      worldRef.current
        .pointRadius((d: any) => hoveredPoint === d.code ? globeConfig.pointRadius.hover : globeConfig.pointRadius.normal)
        .pointColor((d: any) => hoveredPoint === d.code ? globeConfig.pointColor.hover : globeConfig.pointColor.normal);
    }
  }, [hoveredPoint, isLoading]);

  // Cambio continente
  useEffect(() => {
    if (worldRef.current && !isLoading) {
      const currentContinent = continents[currentContinentIndex];
      const points = currentContinent.countries.map(country => ({
        lat: country.lat,
        lng: country.lng,
        name: country.name,
        code: country.code
      }));
      
      console.log('Changing continent to:', currentContinent.name);
      worldRef.current.pointsData(points);
      
      worldRef.current.pointOfView({
        lat: currentContinent.lat,
        lng: currentContinent.lng,
        altitude: globeConfig.initialView.altitude
      }, 1000);
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
    }, 100);
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

      {/* Container del globo SEMPLIFICATO */}
      <div className="h-[400px] w-full relative rounded-xl border border-[#CDA434]/20 shadow-2xl overflow-hidden" style={{ backgroundColor: '#001122' }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#001122]/80">
            <div className="text-white text-xl font-bold animate-pulse">
              🌍 Caricamento globo semplificato...
            </div>
          </div>
        )}
        
        <div 
          ref={globeRef} 
          className="w-full h-full"
          style={{ 
            minHeight: '400px',
            cursor: 'grab',
            background: '#001122'
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
          Trascina per ruotare. I punti rossi diventano gialli al passaggio del mouse.
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
