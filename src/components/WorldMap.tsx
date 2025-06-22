
import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, useTexture } from '@react-three/drei';
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
    position: [0.5, 0.2, 0.8] as [number, number, number],
    rotation: [0, -0.3, 0] as [number, number, number],
    countries: [
      { name: 'UK', code: 'UK', position: [0.15, 0.55, 0.8] as [number, number, number] },
      { name: 'France', code: 'France', position: [0.1, 0.45, 0.85] as [number, number, number] },
      { name: 'Germany', code: 'Germany', position: [0.2, 0.5, 0.82] as [number, number, number] },
      { name: 'Switzerland', code: 'Switzerland', position: [0.15, 0.42, 0.84] as [number, number, number] },
      { name: 'Italy', code: 'Italy', position: [0.18, 0.35, 0.87] as [number, number, number] }
    ]
  },
  {
    key: 'nordamerica',
    name: 'Nord America',
    position: [-0.8, 0.3, 0.5] as [number, number, number],
    rotation: [0, 1.2, 0] as [number, number, number],
    countries: [
      { name: 'USA', code: 'USA', position: [-0.6, 0.2, 0.7] as [number, number, number] }
    ]
  },
  {
    key: 'asia',
    name: 'Asia',
    position: [0.7, 0.1, 0.6] as [number, number, number],
    rotation: [0, -1.5, 0] as [number, number, number],
    countries: []
  }
];

// Componente per i marker dei paesi
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
  const markerRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (markerRef.current && hovered) {
      markerRef.current.scale.setScalar(Math.sin(Date.now() * 0.01) * 0.1 + 1.1);
    } else if (markerRef.current) {
      markerRef.current.scale.setScalar(1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={markerRef}
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
      {/* Pin effetto */}
      <mesh position={[0, -0.01, 0]}>
        <coneGeometry args={[0.01, 0.04, 8]} />
        <meshPhongMaterial color={hovered ? "#fbbf24" : "#dc2626"} />
      </mesh>
    </group>
  );
};

// Componente principale del globo
const RealisticGlobe = ({ 
  currentContinentIndex,
  onCountryClick,
  targetRotation 
}: { 
  currentContinentIndex: number;
  onCountryClick: (countryCode: string) => void;
  targetRotation: [number, number, number];
}) => {
  const globeRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Carica texture della Terra (useremo colori per ora, ma potresti aggiungere una vera texture)
  useFrame((state, delta) => {
    // Rotazione automatica lenta
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1;
    }
    
    // Animazione verso il continente target
    if (earthRef.current && targetRotation) {
      earthRef.current.rotation.x = THREE.MathUtils.lerp(
        earthRef.current.rotation.x, 
        targetRotation[0], 
        delta * 2
      );
      earthRef.current.rotation.y = THREE.MathUtils.lerp(
        earthRef.current.rotation.y, 
        targetRotation[1], 
        delta * 2
      );
      earthRef.current.rotation.z = THREE.MathUtils.lerp(
        earthRef.current.rotation.z, 
        targetRotation[2], 
        delta * 2
      );
    }
  });

  return (
    <group ref={globeRef}>
      {/* Globo principale con texture realistica */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial 
          color="#2d5a3d"
          shininess={10}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Oceani con texture blu */}
      <mesh scale={[1.001, 1.001, 1.001]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial 
          color="#1e40af" 
          transparent 
          opacity={0.8}
          shininess={100}
        />
      </mesh>

      {/* Continenti con forme più realistiche */}
      <group>
        {/* Europa */}
        <mesh position={[0.1, 0.4, 0.9]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.25, 0.3, 0.02]} />
          <meshPhongMaterial 
            color={currentContinentIndex === 0 ? "#22c55e" : "#16a34a"}
            transparent 
            opacity={0.9}
          />
        </mesh>
        
        {/* Nord America */}
        <mesh position={[-0.6, 0.3, 0.7]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.4, 0.5, 0.02]} />
          <meshPhongMaterial 
            color={currentContinentIndex === 1 ? "#22c55e" : "#16a34a"}
            transparent 
            opacity={0.9}
          />
        </mesh>
        
        {/* Asia */}
        <mesh position={[0.7, 0.2, 0.6]} rotation={[0, -0.3, 0]}>
          <boxGeometry args={[0.6, 0.4, 0.02]} />
          <meshPhongMaterial 
            color={currentContinentIndex === 2 ? "#22c55e" : "#16a34a"}
            transparent 
            opacity={0.9}
          />
        </mesh>
      </group>

      {/* Marker dei paesi per il continente corrente */}
      {continents[currentContinentIndex]?.countries.map((country) => (
        <CountryMarker
          key={country.code}
          position={country.position}
          name={country.name}
          code={country.code}
          onClick={() => onCountryClick(country.code)}
        />
      ))}

      {/* Atmosfera */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.1}
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
  const controlsRef = useRef<any>(null);

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
  const targetRotation = currentContinent.rotation;

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

      {/* Canvas 3D con controlli migliorati */}
      <div className="h-96 w-full relative">
        <Canvas 
          camera={{ 
            position: [0, 0, 2.5], 
            fov: 45,
            near: 0.1,
            far: 1000
          }}
        >
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            rotateSpeed={0.5}
            zoomSpeed={0.5}
            minDistance={1.8}
            maxDistance={4}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={5 * Math.PI / 6}
          />
          <RealisticGlobe 
            currentContinentIndex={currentContinentIndex}
            onCountryClick={handleCountryClick}
            targetRotation={targetRotation}
          />
          
          {/* Illuminazione migliorata */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 3, 5]} intensity={1} castShadow />
          <pointLight position={[-5, -3, -5]} intensity={0.4} color="#60a5fa" />
          <spotLight 
            position={[0, 5, 0]} 
            intensity={0.5} 
            angle={Math.PI / 4}
            penumbra={0.1}
            castShadow
          />
        </Canvas>

        {/* Frecce di navigazione con effetti migliorati */}
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

      {/* Pannello laterale per le università con animazione migliorata */}
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

      {/* Istruzioni aggiornate */}
      <div className="text-center text-white/80 mt-6">
        <p className="text-lg mb-2">🎯 Usa le frecce per esplorare i continenti</p>
        <p className="text-sm">Clicca sui marker rossi per scoprire le università!</p>
      </div>

      {/* Loading overlay durante le transizioni */}
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
