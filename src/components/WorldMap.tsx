
import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { universitiesByCountry } from '../data/universities';
import { University } from '../types';
import * as THREE from 'three';

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

// Coordinate geografiche precise dei continenti con rotazioni corrette
const continents = [
  {
    key: 'europa',
    name: 'Europa',
    rotationY: -Math.PI * 0.15,
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
    rotationY: Math.PI * 0.5,
    cameraDistance: 2.2,
    countries: [
      { name: 'USA', code: 'USA', lat: 37.0902, lon: -95.7129 }
    ]
  },
  {
    key: 'asia',
    name: 'Asia',
    rotationY: -Math.PI * 0.6,
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
          color={hovered ? "#CDA434" : "#CDA434"} 
          transparent 
          opacity={0.9}
          emissive={hovered ? "#fbbf24" : "#CDA434"}
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
          outlineWidth={0.002}
          outlineColor="#000000"
        >
          {name}
        </Text>
      )}
      <mesh position={[0, -0.01, 0]}>
        <coneGeometry args={[0.01, 0.04, 8]} />
        <meshPhongMaterial color={hovered ? "#fbbf24" : "#CDA434"} />
      </mesh>
    </group>
  );
};

// Componente principale del globo con texture Google Earth
const GoogleEarthStyleGlobe = ({ 
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
  
  // Crea una texture semplice stile Google Earth
  const createSimpleEarthTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;

    // Sfondo oceano molto chiaro
    ctx.fillStyle = '#F0F8FF'; // Alice blue molto chiaro
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Terre emerse con colore beige molto chiaro
    ctx.fillStyle = '#F5F5DC'; // Beige
    
    // Nord America
    ctx.fillRect(150, 120, 200, 150);
    ctx.fillRect(120, 100, 100, 80); // Canada
    
    // Sud America
    ctx.fillRect(200, 280, 80, 200);
    
    // Europa
    ctx.fillRect(450, 110, 120, 100);
    
    // Africa
    ctx.fillRect(480, 200, 100, 180);
    
    // Asia
    ctx.fillRect(550, 80, 300, 200);
    
    // Australia
    ctx.fillRect(650, 350, 120, 80);

    // Confini molto sottili
    ctx.strokeStyle = '#D3D3D3';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    
    // Confini Nord America
    ctx.strokeRect(150, 120, 200, 150);
    ctx.strokeRect(120, 100, 100, 80);
    
    // Confini Sud America
    ctx.strokeRect(200, 280, 80, 200);
    
    // Confini Europa
    ctx.strokeRect(450, 110, 120, 100);
    
    // Confini Africa
    ctx.strokeRect(480, 200, 100, 180);
    
    // Confini Asia
    ctx.strokeRect(550, 80, 300, 200);
    
    // Confini Australia
    ctx.strokeRect(650, 350, 120, 80);

    // Nomi dei continenti
    ctx.fillStyle = '#666666';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    
    ctx.fillText('NORTH AMERICA', 250, 200);
    ctx.fillText('SOUTH AMERICA', 240, 380);
    ctx.fillText('EUROPE', 510, 160);
    ctx.fillText('AFRICA', 530, 290);
    ctx.fillText('ASIA', 700, 180);
    ctx.fillText('AUSTRALIA', 710, 390);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  const googleEarthTexture = createSimpleEarthTexture();
  
  // Forza l'aggiornamento della texture
  useFrame(() => {
    if (globeRef.current && googleEarthTexture) {
      const mesh = globeRef.current.children[0] as THREE.Mesh;
      if (mesh && mesh.material) {
        (mesh.material as THREE.MeshPhongMaterial).map = googleEarthTexture;
        (mesh.material as THREE.MeshPhongMaterial).needsUpdate = true;
      }
    }
  });
  
  useFrame((state, delta) => {
    if (targetContinent) {
      targetRotationY.current = targetContinent.rotationY;
    }
    
    if (globeRef.current) {
      globeRef.current.rotation.y = THREE.MathUtils.lerp(
        globeRef.current.rotation.y,
        targetRotationY.current,
        delta * 3
      );
      
      globeRef.current.rotation.x = -Math.PI * 0.1;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Globo con texture Google Earth realistica */}
      <mesh>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhongMaterial 
          map={googleEarthTexture}
          transparent
          opacity={1}
          shininess={30}
        />
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

      {/* Atmosfera molto leggera stile Google Earth */}
      <mesh scale={[1.01, 1.01, 1.01]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial 
          color="#E3F2FD" 
          transparent 
          opacity={0.03}
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
    }, 200);
  };

  const handleCountryClick = (countryCode: string) => {
    setSelectedCountry(countryCode);
  };

  const currentContinent = continents[currentContinentIndex];

  return (
    <div 
      className="rounded-xl p-6 min-h-[700px] relative overflow-hidden shadow-lg border border-gray-200"
      style={{ backgroundColor: '#2C1810' }}
    >
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        🌍 Esplora le Università nel Mondo
      </h2>
      
      {/* Indicatore continente corrente con colore oro */}
      <div className="text-center mb-4">
        <h3 className={`text-xl font-semibold transition-all duration-300 ${
          isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`} style={{ color: '#CDA434' }}>
          {currentContinent.name}
        </h3>
        <div className="flex justify-center space-x-2 mt-2">
          {continents.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentContinentIndex ? 'scale-125' : ''
              }`}
              style={{ 
                backgroundColor: index === currentContinentIndex ? '#CDA434' : 'rgba(205, 164, 52, 0.3)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Canvas 3D */}
      <div className="h-96 w-full relative rounded-lg shadow-inner border border-gray-600">
        <Canvas 
          camera={{ 
            position: [0, 0.5, 3],
            fov: 45,
            near: 0.1,
            far: 1000
          }}
          style={{ 
            backgroundColor: '#2C1810',
            borderRadius: '8px'
          }}
        >
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            zoomSpeed={0.5}
            minDistance={1.8}
            maxDistance={4}
          />
          <GoogleEarthStyleGlobe 
            currentContinentIndex={currentContinentIndex}
            onCountryClick={handleCountryClick}
            targetContinent={currentContinent}
          />
          
          {/* Illuminazione più morbida per Google Earth */}
          <ambientLight intensity={0.8} color="#ffffff" />
          <directionalLight position={[3, 3, 3]} intensity={0.6} color="#ffffff" />
          <pointLight position={[-3, -2, -3]} intensity={0.2} color="#ffffff" />
        </Canvas>

        {/* Frecce di navigazione dorate */}
        <button
          onClick={() => handleContinentChange('prev')}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 border"
          style={{ 
            backgroundColor: '#CDA434',
            borderColor: '#CDA434',
            color: '#2C1810'
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => handleContinentChange('next')}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 border"
          style={{ 
            backgroundColor: '#CDA434',
            borderColor: '#CDA434',
            color: '#2C1810'
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pannello laterale per le università */}
      {selectedCountry && universitiesByCountry[selectedCountry] && (
        <div className="absolute top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl text-gray-800 p-6 transform transition-all duration-500 ease-out animate-slide-in-right border-l border-gray-200 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              🎓 {selectedCountry}
            </h3>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
            {universitiesByCountry[selectedCountry].map((university, index) => (
              <div
                key={university.id}
                onClick={() => onUniversitySelect(university)}
                className="bg-white hover:bg-blue-50 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm leading-tight text-gray-800">{university.name}</h4>
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full ml-2 flex-shrink-0">
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

      {/* Istruzioni in bianco */}
      <div className="text-center mt-6 text-white">
        <p className="text-lg mb-2">🎯 Usa le frecce per esplorare i continenti</p>
        <p className="text-sm">Clicca sui marker dorati per vedere le università disponibili.</p>
      </div>

      {/* Loading overlay */}
      {isTransitioning && (
        <div 
          className="absolute inset-0 backdrop-blur-sm flex items-center justify-center z-10"
          style={{ backgroundColor: 'rgba(44, 24, 16, 0.8)' }}
        >
          <div 
            className="text-lg font-semibold animate-pulse"
            style={{ color: '#CDA434' }}
          >
            Esplorando {continents[currentContinentIndex].name}...
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
