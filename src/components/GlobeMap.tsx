import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Globe from 'globe.gl';
import { universitiesByCountry } from '../data/universities';
import { University } from '../types';

interface GlobeMapProps {
  onUniversitySelect: (university: University) => void;
}

// Coordinate geografiche dei continenti
const continents = [
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
    key: 'nordamerica',
    name: 'Nord America',
    lat: 45.0,
    lng: -100.0,
    countries: [
      { name: 'USA', code: 'USA', lat: 37.0902, lng: -95.7129 }
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
  const [currentContinentIndex, setCurrentContinentIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hoveredPolygonRef = useRef<any>(null);
  const geojsonDataRef = useRef<any[]>([]);

  useEffect(() => {
    if (!globeRef.current) {
      console.log('Globe ref not ready');
      return;
    }

    console.log('Initializing Globe.gl');

    // Inizializza Globe.gl with 'new' keyword
    const world = new Globe(globeRef.current)
      .width(globeRef.current.clientWidth)
      .height(400)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#3a228a')
      .atmosphereAltitude(0.25)
      .showGraticules(true)
      // Configurazione poligoni per i paesi con hover migliorato
      .polygonsData([])
      .polygonCapColor((d: any) => d === hoveredPolygonRef.current
        ? 'rgba(0, 255, 255, 0.5)'  // colore evidenziato
        : 'rgba(255, 255, 255, 0.05)'  // colore base
      )
      .polygonSideColor(() => 'rgba(255, 255, 255, 0.02)')
      .polygonStrokeColor(() => '#222')
      .polygonAltitude(() => 0.003)
      // Configurazione punti per le università
      .pointsData([])
      .pointAltitude(0.01)
      .pointRadius(0.8)
      .pointColor(() => '#ff4444')
      .pointLabel((d: any) => d.name)
      .onPointClick((point: any) => {
        console.log('Point clicked:', point);
        setSelectedCountry(point.code);
      })
      // Configurazione controlli per zoom fisso e movimento solo orizzontale
      .enablePointerInteraction(true)
      .onZoom(() => {
        // Forza il mantenimento della distanza fissa
        if (worldRef.current) {
          worldRef.current.pointOfView({ altitude: 1.5 });
        }
      });

    worldRef.current = world;

    // Imposta vista iniziale con zoom fisso
    world.pointOfView({
      lat: continents[currentContinentIndex].lat,
      lng: continents[currentContinentIndex].lng,
      altitude: 1.5 // Zoom fisso ravvicinato
    });

    // Carica i dati GeoJSON per i poligoni dei paesi
    const loadCountryPolygons = async () => {
      try {
        const response = await fetch('https://unpkg.com/world-atlas/countries-110m.json');
        const countries = await response.json();
        
        // Dinamicamente importa topojson se disponibile
        if (typeof window !== 'undefined' && (window as any).topojson) {
          const geojson = (window as any).topojson.feature(countries, countries.objects.countries).features;
          geojsonDataRef.current = geojson;
          world.polygonsData(geojson);
          
          // Configurazione hover sui poligoni con il nuovo metodo
          world.onPolygonHover((d: any) => {
            hoveredPolygonRef.current = d;
            world.polygonsData([...geojsonDataRef.current]); // forza il refresh dei colori
          });
        } else {
          console.warn('topojson library not available, loading via script');
          // Carica topojson dinamicamente
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/topojson@3';
          script.onload = () => {
            const geojson = (window as any).topojson.feature(countries, countries.objects.countries).features;
            geojsonDataRef.current = geojson;
            world.polygonsData(geojson);
            
            world.onPolygonHover((d: any) => {
              hoveredPolygonRef.current = d;
              world.polygonsData([...geojsonDataRef.current]); // forza il refresh dei colori
            });
          };
          document.head.appendChild(script);
        }
      } catch (error) {
        console.error('Error loading country data:', error);
      }
    };

    // Aggiorna i punti iniziali
    function updatePoints() {
      if (!worldRef.current) return;
      
      const currentContinent = continents[currentContinentIndex];
      const points = currentContinent.countries.map(country => ({
        lat: country.lat,
        lng: country.lng,
        name: country.name,
        code: country.code
      }));
      
      console.log('Updating points:', points);
      worldRef.current.pointsData(points);
    }

    updatePoints();
    loadCountryPolygons();

    // Gestione eventi per limitare il movimento
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault(); // Blocca lo zoom con la rotella
    };

    const handlePointerMove = () => {
      // Mantieni sempre l'altitudine fissa durante il movimento
      if (worldRef.current) {
        const currentView = worldRef.current.pointOfView();
        if (currentView.altitude !== 1.5) {
          worldRef.current.pointOfView({ 
            lat: currentView.lat,
            lng: currentView.lng,
            altitude: 1.5 
          });
        }
      }
    };

    // Aggiungi event listeners
    if (globeRef.current) {
      globeRef.current.addEventListener('wheel', handleWheel, { passive: false });
      globeRef.current.addEventListener('pointermove', handlePointerMove);
    }

    // Cleanup
    return () => {
      console.log('Cleaning up Globe');
      if (globeRef.current) {
        globeRef.current.removeEventListener('wheel', handleWheel);
        globeRef.current.removeEventListener('pointermove', handlePointerMove);
      }
      if (worldRef.current) {
        worldRef.current = null;
      }
    };
  }, []);

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
      
      // Centra la vista sul continente con zoom fisso
      worldRef.current.pointOfView({
        lat: currentContinent.lat,
        lng: currentContinent.lng,
        altitude: 1.5 // Mantieni zoom fisso
      }, 1000);
    }
  }, [currentContinentIndex]);

  const handleContinentChange = (direction: 'prev' | 'next') => {
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
      setIsTransitioning(false);
    }, 200);
  };

  const currentContinent = continents[currentContinentIndex];

  return (
    <div className="bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 rounded-xl p-6 min-h-[700px] relative overflow-hidden">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        🌍 Globo Interattivo delle Università
      </h2>
      
      {/* Indicatore continente corrente */}
      <div className="text-center mb-4">
        <h3 className={`text-xl font-semibold text-white transition-all duration-300 ${
          isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}>
          {currentContinent.name}
        </h3>
        <div className="flex justify-center space-x-2 mt-2">
          {continents.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentContinentIndex ? 'bg-yellow-400 scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Container del globo */}
      <div className="h-96 w-full relative bg-black/20 rounded-lg backdrop-blur-sm border border-white/10">
        <div ref={globeRef} className="w-full h-full" />

        {/* Frecce di navigazione */}
        <button
          onClick={() => handleContinentChange('prev')}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={() => handleContinentChange('next')}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Pannello laterale per le università */}
      {selectedCountry && universitiesByCountry[selectedCountry] && (
        <div className="absolute top-0 right-0 h-full w-80 bg-black/70 backdrop-blur-xl text-white p-6 transform transition-all duration-500 ease-out animate-slide-in-right border-l border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              🎓 {selectedCountry}
            </h3>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
            {universitiesByCountry[selectedCountry].map((university, index) => (
              <div
                key={university.id}
                onClick={() => onUniversitySelect(university)}
                className="bg-white/10 hover:bg-white/20 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm leading-tight">{university.name}</h4>
                  <span className="text-xs bg-blue-500/80 text-white px-2 py-1 rounded-full ml-2 flex-shrink-0">
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

      {/* Istruzioni */}
      <div className="text-center text-white/80 mt-6">
        <p className="text-lg mb-2">🎯 Trascina orizzontalmente per esplorare</p>
        <p className="text-sm">Usa le frecce per cambiare continente. Clicca sui punti rossi per le università.</p>
      </div>

      {/* Loading overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-white text-lg font-semibold animate-pulse">
            Esplorando {continents[currentContinentIndex].name}...
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeMap;
