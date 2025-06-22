
import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { universitiesByCountry } from '../data/universities';
import { University } from '../types';
import * as THREE from 'three';

interface WorldMapProps {
  onUniversitySelect: (university: University) => void;
}

const continents = {
  europa: {
    name: 'Europa',
    position: [0, 0.7, 0] as [number, number, number],
    countries: [
      { name: 'UK', code: 'UK', position: [-0.1, 0.8, 0.4] as [number, number, number] },
      { name: 'France', code: 'France', position: [0.1, 0.7, 0.5] as [number, number, number] },
      { name: 'Germany', code: 'Germany', position: [0.2, 0.75, 0.45] as [number, number, number] },
      { name: 'Switzerland', code: 'Switzerland', position: [0.15, 0.65, 0.48] as [number, number, number] },
      { name: 'Italy', code: 'Italy', position: [0.2, 0.5, 0.5] as [number, number, number] }
    ]
  },
  nordamerica: {
    name: 'Nord America',
    position: [-1.2, 0.5, 0] as [number, number, number],
    countries: [
      { name: 'USA', code: 'USA', position: [-1.0, 0.3, 0.3] as [number, number, number] }
    ]
  },
  asia: {
    name: 'Asia',
    position: [1.5, 0.3, 0] as [number, number, number],
    countries: []
  }
};

const CountryMarker = ({ 
  position, 
  name, 
  code, 
  onClick 
}: { 
  position: [number, number, number]; 
  name: string; 
  code: string; 
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <Sphere
        args={[0.03, 16, 16]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#f59e0b" : "#ef4444"} 
          emissive={hovered ? "#f59e0b" : "#ef4444"}
          emissiveIntensity={0.3}
        />
      </Sphere>
      {hovered && (
        <Text
          position={[0, 0.1, 0]}
          fontSize={0.08}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      )}
    </group>
  );
};

const Globe = ({ 
  selectedContinent, 
  onCountryClick 
}: { 
  selectedContinent: string | null;
  onCountryClick: (countryCode: string) => void;
}) => {
  const globeRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      {/* Globo principale */}
      <Sphere ref={globeRef} args={[1, 64, 64]}>
        <meshStandardMaterial 
          color="#1e40af" 
          transparent 
          opacity={0.8}
          wireframe={false}
        />
      </Sphere>

      {/* Markers dei paesi per ogni continente */}
      {Object.entries(continents).map(([key, continent]) => 
        continent.countries.map((country) => (
          <CountryMarker
            key={country.code}
            position={country.position}
            name={country.name}
            code={country.code}
            onClick={() => onCountryClick(country.code)}
          />
        ))
      )}

      {/* Luci */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </>
  );
};

const WorldMap = ({ onUniversitySelect }: WorldMapProps) => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 3]);
  const controlsRef = useRef<any>(null);

  const handleContinentSelect = (continentKey: string) => {
    setSelectedContinent(continentKey);
    const continent = continents[continentKey as keyof typeof continents];
    if (continent) {
      setCameraPosition([
        continent.position[0] + 1,
        continent.position[1] + 0.5,
        continent.position[2] + 2
      ]);
    }
  };

  const handleCountryClick = (countryCode: string) => {
    setSelectedCountry(countryCode);
  };

  const resetView = () => {
    setSelectedContinent(null);
    setSelectedCountry(null);
    setCameraPosition([0, 0, 3]);
  };

  return (
    <div className="bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 rounded-xl p-6 min-h-[700px] relative">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        🌍 Esplora le Università nel Mondo
      </h2>
      
      {/* Controlli dei continenti */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={resetView}
          className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
        >
          🌍 Vista Globale
        </button>
        {Object.entries(continents).map(([key, continent]) => (
          <button
            key={key}
            onClick={() => handleContinentSelect(key)}
            className={`px-4 py-2 rounded-lg transition-colors backdrop-blur-sm ${
              selectedContinent === key
                ? 'bg-yellow-500 text-black font-semibold'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {continent.name}
          </button>
        ))}
      </div>

      {/* Canvas 3D */}
      <div className="h-96 w-full relative">
        <Canvas camera={{ position: cameraPosition, fov: 50 }}>
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={1.5}
            maxDistance={10}
          />
          <Globe 
            selectedContinent={selectedContinent}
            onCountryClick={handleCountryClick}
          />
        </Canvas>
      </div>

      {/* Pannello informazioni paese */}
      {selectedCountry && universitiesByCountry[selectedCountry] && (
        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-2xl animate-fadeIn">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              🎓 Università in {selectedCountry}
            </h3>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          
          <div className="grid gap-4 max-h-60 overflow-y-auto">
            {universitiesByCountry[selectedCountry].map((university) => (
              <div
                key={university.id}
                onClick={() => onUniversitySelect(university)}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-blue-100"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{university.name}</h4>
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                    #{university.ranking}
                  </span>
                </div>
                
                <div className="text-xs text-gray-600 space-y-1">
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
      {!selectedCountry && (
        <div className="text-center text-white/80 mt-6">
          <p className="text-lg mb-2">Usa i pulsanti per esplorare i continenti 🎯</p>
          <p className="text-sm">Clicca sui punti rossi per scoprire le università!</p>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
