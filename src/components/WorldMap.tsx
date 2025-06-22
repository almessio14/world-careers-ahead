
import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { universitiesByCountry } from '../data/universities';
import { University } from '../types';
import * as THREE from 'three';

interface WorldMapProps {
  onUniversitySelect: (university: University) => void;
}

const continents = [
  {
    key: 'europa',
    name: 'Europa',
    position: [0, 0.2, 0.8] as [number, number, number],
    countries: [
      { name: 'UK', code: 'UK', position: [-0.15, 0.45, 0.85] as [number, number, number] },
      { name: 'France', code: 'France', position: [0.05, 0.35, 0.9] as [number, number, number] },
      { name: 'Germany', code: 'Germany', position: [0.1, 0.4, 0.85] as [number, number, number] },
      { name: 'Switzerland', code: 'Switzerland', position: [0.08, 0.32, 0.88] as [number, number, number] },
      { name: 'Italy', code: 'Italy', position: [0.1, 0.2, 0.9] as [number, number, number] }
    ]
  },
  {
    key: 'nordamerica',
    name: 'Nord America',
    position: [-0.8, 0.3, 0.5] as [number, number, number],
    countries: [
      { name: 'USA', code: 'USA', position: [-0.6, 0.2, 0.7] as [number, number, number] }
    ]
  },
  {
    key: 'asia',
    name: 'Asia',
    position: [0.7, 0.1, 0.6] as [number, number, number],
    countries: []
  }
];

// Forme geometriche dei continenti
const EuropeShape = ({ position, isHighlighted }: { position: [number, number, number], isHighlighted: boolean }) => {
  const europePoints = [
    new THREE.Vector2(-0.1, 0.15),
    new THREE.Vector2(-0.08, 0.2),
    new THREE.Vector2(-0.05, 0.18),
    new THREE.Vector2(0, 0.22),
    new THREE.Vector2(0.05, 0.2),
    new THREE.Vector2(0.08, 0.15),
    new THREE.Vector2(0.06, 0.1),
    new THREE.Vector2(0.02, 0.05),
    new THREE.Vector2(-0.02, 0.08),
    new THREE.Vector2(-0.06, 0.12),
    new THREE.Vector2(-0.1, 0.15)
  ];
  
  const shape = new THREE.Shape(europePoints);
  
  return (
    <mesh position={position} rotation={[0, 0, 0]}>
      <extrudeGeometry args={[shape, { depth: 0.01, bevelEnabled: false }]} />
      <meshPhongMaterial 
        color={isHighlighted ? "#34d399" : "#22c55e"} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
};

const NorthAmericaShape = ({ position, isHighlighted }: { position: [number, number, number], isHighlighted: boolean }) => {
  const naPoints = [
    new THREE.Vector2(-0.15, 0.1),
    new THREE.Vector2(-0.1, 0.25),
    new THREE.Vector2(-0.05, 0.28),
    new THREE.Vector2(0, 0.25),
    new THREE.Vector2(0.05, 0.2),
    new THREE.Vector2(0.08, 0.15),
    new THREE.Vector2(0.06, 0.05),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(-0.05, -0.05),
    new THREE.Vector2(-0.1, 0),
    new THREE.Vector2(-0.15, 0.1)
  ];
  
  const shape = new THREE.Shape(naPoints);
  
  return (
    <mesh position={position} rotation={[0, 0, 0]}>
      <extrudeGeometry args={[shape, { depth: 0.01, bevelEnabled: false }]} />
      <meshPhongMaterial 
        color={isHighlighted ? "#34d399" : "#22c55e"} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
};

const AsiaShape = ({ position, isHighlighted }: { position: [number, number, number], isHighlighted: boolean }) => {
  const asiaPoints = [
    new THREE.Vector2(-0.2, 0.1),
    new THREE.Vector2(-0.15, 0.25),
    new THREE.Vector2(-0.05, 0.3),
    new THREE.Vector2(0.1, 0.28),
    new THREE.Vector2(0.2, 0.2),
    new THREE.Vector2(0.25, 0.1),
    new THREE.Vector2(0.2, 0),
    new THREE.Vector2(0.1, -0.1),
    new THREE.Vector2(0, -0.15),
    new THREE.Vector2(-0.1, -0.1),
    new THREE.Vector2(-0.2, 0.1)
  ];
  
  const shape = new THREE.Shape(asiaPoints);
  
  return (
    <mesh position={position} rotation={[0, 0, 0]}>
      <extrudeGeometry args={[shape, { depth: 0.01, bevelEnabled: false }]} />
      <meshPhongMaterial 
        color={isHighlighted ? "#34d399" : "#22c55e"} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
};

// Forme dei singoli paesi
const CountryShape = ({ 
  position, 
  name, 
  code, 
  onClick,
  countryType 
}: { 
  position: [number, number, number]; 
  name: string; 
  code: string; 
  onClick: () => void;
  countryType: string;
}) => {
  const [hovered, setHovered] = useState(false);
  
  // Definisci forme diverse per ogni paese
  const getCountryShape = (countryCode: string) => {
    switch(countryCode) {
      case 'UK':
        return [
          new THREE.Vector2(-0.02, 0.04),
          new THREE.Vector2(-0.01, 0.06),
          new THREE.Vector2(0.01, 0.05),
          new THREE.Vector2(0.02, 0.03),
          new THREE.Vector2(0.015, 0.01),
          new THREE.Vector2(-0.005, 0.005),
          new THREE.Vector2(-0.02, 0.04)
        ];
      case 'France':
        return [
          new THREE.Vector2(-0.025, 0.02),
          new THREE.Vector2(-0.015, 0.05),
          new THREE.Vector2(0.015, 0.045),
          new THREE.Vector2(0.025, 0.02),
          new THREE.Vector2(0.02, -0.01),
          new THREE.Vector2(-0.01, -0.015),
          new THREE.Vector2(-0.025, 0.02)
        ];
      case 'Germany':
        return [
          new THREE.Vector2(-0.02, 0.04),
          new THREE.Vector2(-0.01, 0.055),
          new THREE.Vector2(0.015, 0.05),
          new THREE.Vector2(0.025, 0.025),
          new THREE.Vector2(0.02, 0),
          new THREE.Vector2(-0.005, -0.01),
          new THREE.Vector2(-0.02, 0.04)
        ];
      case 'Italy':
        return [
          new THREE.Vector2(-0.008, 0.04),
          new THREE.Vector2(-0.005, 0.045),
          new THREE.Vector2(0.005, 0.043),
          new THREE.Vector2(0.008, 0.02),
          new THREE.Vector2(0.006, -0.02),
          new THREE.Vector2(0.003, -0.04),
          new THREE.Vector2(-0.003, -0.035),
          new THREE.Vector2(-0.008, 0.04)
        ];
      case 'USA':
        return [
          new THREE.Vector2(-0.06, 0.03),
          new THREE.Vector2(-0.03, 0.05),
          new THREE.Vector2(0.03, 0.045),
          new THREE.Vector2(0.06, 0.025),
          new THREE.Vector2(0.05, -0.02),
          new THREE.Vector2(-0.02, -0.025),
          new THREE.Vector2(-0.06, 0.03)
        ];
      default:
        return [
          new THREE.Vector2(-0.015, 0.015),
          new THREE.Vector2(0.015, 0.015),
          new THREE.Vector2(0.015, -0.015),
          new THREE.Vector2(-0.015, -0.015),
          new THREE.Vector2(-0.015, 0.015)
        ];
    }
  };
  
  const shape = new THREE.Shape(getCountryShape(code));
  
  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <extrudeGeometry args={[shape, { depth: 0.005, bevelEnabled: false }]} />
        <meshPhongMaterial 
          color={hovered ? "#fbbf24" : "#dc2626"} 
          transparent 
          opacity={0.9}
        />
      </mesh>
      {hovered && (
        <Text
          position={[0, 0.05, 0.01]}
          fontSize={0.02}
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
  currentContinentIndex,
  onCountryClick 
}: { 
  currentContinentIndex: number;
  onCountryClick: (countryCode: string) => void;
}) => {
  const globeRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.001;
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <>
      {/* Oceani - Base blu del globo */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial 
          color="#1e40af" 
          transparent 
          opacity={0.95}
          shininess={100}
          specular="#3b82f6"
        />
      </mesh>

      {/* Continenti con forme realistiche */}
      <group ref={globeRef}>
        {/* Europa */}
        <EuropeShape 
          position={[0.05, 0.35, 0.9]} 
          isHighlighted={currentContinentIndex === 0}
        />
        
        {/* Nord America */}
        <NorthAmericaShape 
          position={[-0.6, 0.2, 0.7]} 
          isHighlighted={currentContinentIndex === 1}
        />
        
        {/* Asia */}
        <AsiaShape 
          position={[0.7, 0.1, 0.6]} 
          isHighlighted={currentContinentIndex === 2}
        />
      </group>

      {/* Paesi del continente corrente */}
      <group ref={globeRef}>
        {continents[currentContinentIndex]?.countries.map((country) => (
          <CountryShape
            key={country.code}
            position={country.position}
            name={country.name}
            code={country.code}
            countryType={country.code}
            onClick={() => onCountryClick(country.code)}
          />
        ))}
      </group>

      {/* Illuminazione */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#60a5fa" />
    </>
  );
};

const WorldMap = ({ onUniversitySelect }: WorldMapProps) => {
  const [currentContinentIndex, setCurrentContinentIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handlePrevContinent = () => {
    setCurrentContinentIndex((prev) => 
      prev === 0 ? continents.length - 1 : prev - 1
    );
    setSelectedCountry(null);
  };

  const handleNextContinent = () => {
    setCurrentContinentIndex((prev) => 
      prev === continents.length - 1 ? 0 : prev + 1
    );
    setSelectedCountry(null);
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
        <h3 className="text-xl font-semibold text-white">
          {continents[currentContinentIndex].name}
        </h3>
        <div className="flex justify-center space-x-2 mt-2">
          {continents.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentContinentIndex ? 'bg-yellow-400' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Canvas 3D fisso */}
      <div className="h-96 w-full relative">
        <Canvas 
          camera={{ 
            position: [0, 0, 2], 
            fov: 50,
            near: 0.1,
            far: 1000
          }}
        >
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            rotateSpeed={0.3}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={3 * Math.PI / 4}
          />
          <Globe 
            currentContinentIndex={currentContinentIndex}
            onCountryClick={setSelectedCountry}
          />
        </Canvas>

        {/* Frecce di navigazione */}
        <button
          onClick={() => {
            setCurrentContinentIndex(prev => prev === 0 ? continents.length - 1 : prev - 1);
            setSelectedCountry(null);
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => {
            setCurrentContinentIndex(prev => prev === continents.length - 1 ? 0 : prev + 1);
            setSelectedCountry(null);
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pannello laterale per le università */}
      {selectedCountry && universitiesByCountry[selectedCountry] && (
        <div className="absolute top-0 right-0 h-full w-80 bg-black/60 backdrop-blur-lg text-white p-6 transform transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              🎓 {selectedCountry}
            </h3>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-white/70 hover:text-white p-1"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4 max-h-[calc(100%-100px)] overflow-y-auto">
            {universitiesByCountry[selectedCountry].map((university) => (
              <div
                key={university.id}
                onClick={() => onUniversitySelect(university)}
                className="bg-white/10 hover:bg-white/20 p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 border border-white/20"
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
        <p className="text-lg mb-2">Usa le frecce per esplorare i continenti 🎯</p>
        <p className="text-sm">Clicca sui paesi rossi per scoprire le università!</p>
      </div>
    </div>
  );
};

export default WorldMap;
