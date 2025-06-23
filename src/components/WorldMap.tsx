import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { universitiesByCountry } from '../data/universities';
import { University } from '../types';
import * as THREE from 'three';
import { TextureLoader } from 'three';

interface WorldMapProps {
  onUniversitySelect: (university: University) => void;
}

// Funzione per convertire lat/lon in coordinate xyz sulla sfera
const latLonToVector3 = (lat: number, lon: number, radius = 1) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// Coordinate geografiche precise dei continenti con angoli di rotazione orizzontale
const continents = [
  {
    key: 'europa',
    name: 'Europa',
    rotationY: 0, // Posizione frontale
    cameraDistance: 2.2,
    countries: [
      { name: 'UK', code: 'UK', lat: 55.3781, lon: -3.4360 },
      { name: 'France', code: 'France', lat: 46.6034, lon: 1.8883 },
      { name: 'Germany', code: 'Germany', lat: 51.1657, lon: 10.4515 },
      { name: 'Switzerland', code: 'Switzerland', lat: 46.8182, lon: 8.2275 },
      { name: 'Italy', code: 'Italy', lat: 41.8719, lon: 12.5674 }
    ]
  },
  {
    key: 'nordamerica',
    name: 'Nord America',
    rotationY: Math.PI * 0.6, // Ruota per mostrare Nord America
    cameraDistance: 2.2,
    countries: [
      { name: 'USA', code: 'USA', lat: 37.0902, lon: -95.7129 }
    ]
  },
  {
    key: 'asia',
    name: 'Asia',
    rotationY: -Math.PI * 0.7, // Ruota per mostrare Asia
    cameraDistance: 2.5,
    countries: []
  }
];

// Componente per i marker dei paesi
const CountryMarker = ({ 
  lat, 
  lon, 
  name, 
  code, 
  onClick 
}: { 
  lat: number;
  lon: number;
  name: string; 
  code: string; 
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const markerRef = useRef<THREE.Group>(null);
  
  const position = latLonToVector3(lat, lon, 1.02);

  useFrame(() => {
    if (markerRef.current && hovered) {
      markerRef.current.scale.setScalar(Math.sin(Date.now() * 0.01) * 0.1 + 1.1);
    } else if (markerRef.current) {
      markerRef.current.scale.setScalar(1);
    }
  });

  return (
    <group ref={markerRef} position={[position.x, position.y, position.z]}>
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshPhongMaterial 
          color={hovered ? "#fbbf24" : "#dc2626"} 
          transparent 
          opacity={0.9}
          emissive={hovered ? "#f59e0b" : "#b91c1c"}
          emissiveIntensity={0.3}
        />
      </mesh>
      {hovered && (
        <Text
          position={[0, 0.08, 0]}
          fontSize={0.03}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#000000"
        >
          {name}
        </Text>
      )}
      <mesh position={[0, -0.01, 0]}>
        <coneGeometry args={[0.01, 0.04, 8]} />
        <meshPhongMaterial color={hovered ? "#fbbf24" : "#dc2626"} />
      </mesh>
    </group>
  );
};

// Componente principale del globo con rotazione orizzontale
const RealisticGlobe = ({ 
  currentContinentIndex,
  onCountryClick,
  targetContinent
}: { 
  currentContinentIndex: number;
  onCountryClick: (countryCode: string) => void;
  targetContinent: typeof continents[0];
}) => {
  const globeRef = useRef<THREE.Group>(null);
  const targetRotationY = useRef(0);
  
  // Carica la texture della Terra
  const earthTexture = useLoader(TextureLoader, 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthmap1k.jpg');
  
  useFrame((state, delta) => {
    // Imposta la rotazione target basata sul continente selezionato
    if (targetContinent) {
      targetRotationY.current = targetContinent.rotationY;
    }
    
    // Animazione smooth solo sull'asse Y (rotazione orizzontale)
    if (globeRef.current) {
      globeRef.current.rotation.y = THREE.MathUtils.lerp(
        globeRef.current.rotation.y,
        targetRotationY.current,
        delta * 2 // Velocità di rotazione
      );
    }
  });

  return (
    <group ref={globeRef}>
      {/* Globo principale con texture della Terra */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial map={earthTexture} />
      </mesh>

      {/* Marker dei paesi per il continente corrente */}
      {continents[currentContinentIndex]?.countries.map((country) => (
        <CountryMarker
          key={country.code}
          lat={country.lat}
          lon={country.lon}
          name={country.name}
          code={country.code}
          onClick={() => onCountryClick(country.code)}
        />
      ))}

      {/* Atmosfera con effetto glow */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const WorldMap = ({ onUniversitySelect }: WorldMapProps) => {
  const [currentContinentIndex, setCurrentContinentIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    }, 300);
  };

  const handleCountryClick = (countryCode: string) => {
    setSelectedCountry(countryCode);
  };

  const currentContinent = continents[currentContinentIndex];

  return (
    <div className="bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 rounded-xl p-6 min-h-[700px] relative overflow-hidden">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        🌍 Esplora le Università nel Mondo
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

      {/* Canvas 3D con globo fisso */}
      <div className="h-96 w-full relative">
        <Canvas 
          camera={{ 
            position: [0, 0, 3], 
            fov: 45,
            near: 0.1,
            far: 1000
          }}
        >
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={false} // Disabilita rotazione manuale
            autoRotate={false}
            zoomSpeed={0.5}
            minDistance={1.8}
            maxDistance={4}
          />
          <RealisticGlobe 
            currentContinentIndex={currentContinentIndex}
            onCountryClick={handleCountryClick}
            targetContinent={currentContinent}
          />
          
          {/* Illuminazione migliorata */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 3, 5]} intensity={0.8} />
          <pointLight position={[-5, -3, -5]} intensity={0.3} />
        </Canvas>

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
        <p className="text-lg mb-2">🎯 Usa le frecce per esplorare i continenti</p>
        <p className="text-sm">Il globo ruota automaticamente! Puoi solo zoommare e cliccare sui marker rossi.</p>
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

export default WorldMap;
