
import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import { continents, globeConfig } from './globe/globeConfig';
import GlobeControls from './globe/GlobeControls';
import ContinentIndicator from './globe/ContinentIndicator';
import UniversitySidebar from './globe/UniversitySidebar';
import { University } from '../types';

// Rendi THREE disponibile globalmente per Globe.gl
(window as any).THREE = THREE;

interface GlobeMapProps {
  onUniversitySelect: (university: University) => void;
}

const GlobeMap = ({ onUniversitySelect }: GlobeMapProps) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<any>(null);
  const [currentContinentIndex, setCurrentContinentIndex] = useState(0); // Inizia con Europa
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    console.log('Initializing Globe with THREE.js...', !!THREE);
    setIsLoading(true);

    try {
      // Pulisci completamente il container
      globeRef.current.innerHTML = '';

      const world = new Globe(globeRef.current)
        .width(globeRef.current.clientWidth)
        .height(globeConfig.height)
        .backgroundColor(globeConfig.backgroundColor)
        .globeImageUrl(globeConfig.globeImageUrl)
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
        .onPointClick((point: any) => {
          console.log('Country clicked:', point);
          setSelectedCountry(point.code);
        })
        .onPointHover((point: any) => {
          console.log('Point hover:', point?.name || 'none');
          setHoveredPoint(point ? point.code : null);
          if (globeRef.current) {
            globeRef.current.style.cursor = point ? 'pointer' : 'grab';
          }
        });

      // Controlli: solo rotazione, zoom fisso
      const controls = world.controls();
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = false;
      controls.enableRotate = true;
      controls.rotateSpeed = 0.3;
      controls.minDistance = globeConfig.initialView.altitude;
      controls.maxDistance = globeConfig.initialView.altitude;

      worldRef.current = world;

      // Imposta vista iniziale
      const initialContinent = continents[currentContinentIndex];
      world.pointOfView({
        lat: initialContinent.lat,
        lng: initialContinent.lng,
        altitude: globeConfig.initialView.altitude
      });

      // Aggiungi punti dopo breve delay per dare tempo al globo di renderizzare
      setTimeout(() => {
        updatePoints();
        setIsLoading(false);
        console.log('Globe initialized successfully');
      }, 1000);

    } catch (error) {
      console.error('Globe initialization error:', error);
      setIsLoading(false);
    }

    const updatePoints = () => {
      if (!worldRef.current) return;
      
      const currentContinent = continents[currentContinentIndex];
      const points = currentContinent.countries.map(country => ({
        lat: country.lat,
        lng: country.lng,
        name: country.name,
        code: country.code
      }));
      
      console.log('Updating points for:', currentContinent.name, points);
      worldRef.current.pointsData(points);
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

  // Aggiorna colori hover
  useEffect(() => {
    if (worldRef.current && !isLoading) {
      worldRef.current
        .pointRadius((d: any) => hoveredPoint === d.code ? globeConfig.pointRadius.hover : globeConfig.pointRadius.normal)
        .pointColor((d: any) => hoveredPoint === d.code ? globeConfig.pointColor.hover : globeConfig.pointColor.normal);
    }
  }, [hoveredPoint, isLoading]);

  // Cambio continente con frecce
  useEffect(() => {
    if (worldRef.current && !isLoading) {
      const currentContinent = continents[currentContinentIndex];
      const points = currentContinent.countries.map(country => ({
        lat: country.lat,
        lng: country.lng,
        name: country.name,
        code: country.code
      }));
      
      console.log('Changing to continent:', currentContinent.name);
      worldRef.current.pointsData(points);
      
      // Animazione smooth per cambiare vista
      worldRef.current.pointOfView({
        lat: currentContinent.lat,
        lng: currentContinent.lng,
        altitude: globeConfig.initialView.altitude
      }, 1500); // 1.5 secondi di transizione
    }
  }, [currentContinentIndex, isLoading]);

  const handleContinentChange = (direction: 'prev' | 'next') => {
    if (isTransitioning || isLoading) return;
    
    console.log('Continent change requested:', direction);
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
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1500);
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

      {/* Container del globo */}
      <div className="h-[400px] w-full relative rounded-xl border border-[#CDA434]/20 shadow-2xl overflow-hidden" style={{ backgroundColor: globeConfig.backgroundColor }}>
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
            cursor: hoveredPoint ? 'pointer' : 'grab'
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
          Trascina per ruotare il globo. I punti rossi diventano gialli al passaggio del mouse.
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
