
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

// Componente principale del globo con texture Google Maps reale
const GoogleMapsStyleGlobe = ({ 
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
  
  // Crea una texture davvero come Google Maps
  const createRealGoogleMapsTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;

    // Sfondo oceano Google Maps (#A8D5FF)
    ctx.fillStyle = '#A8D5FF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Terre emerse Google Maps (#9FC164)
    ctx.fillStyle = '#9FC164';
    
    // Nord America (più dettagliato)
    ctx.beginPath();
    ctx.ellipse(300, 300, 200, 150, -0.2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Alaska
    ctx.beginPath();
    ctx.ellipse(150, 200, 40, 30, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Groenlandia
    ctx.beginPath();
    ctx.ellipse(400, 150, 50, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Sud America
    ctx.beginPath();
    ctx.ellipse(350, 600, 80, 200, 0.1, 0, 2 * Math.PI);
    ctx.fill();
    
    // Europa (più dettagliata)
    ctx.beginPath();
    ctx.ellipse(1024, 280, 120, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Scandinavia
    ctx.beginPath();
    ctx.ellipse(1050, 200, 60, 40, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Italia
    ctx.beginPath();
    ctx.ellipse(1040, 350, 20, 60, 0.3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Gran Bretagna
    ctx.beginPath();
    ctx.ellipse(980, 260, 25, 50, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Africa (più dettagliata)
    ctx.fillStyle = '#D4B896'; // Colore desertico per il nord Africa
    ctx.beginPath();
    ctx.ellipse(1050, 400, 100, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#9FC164'; // Verde per il resto dell'Africa
    ctx.beginPath();
    ctx.ellipse(1070, 500, 90, 150, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Asia (più dettagliata)
    ctx.fillStyle = '#9FC164';
    
    // Russia/Siberia
    ctx.beginPath();
    ctx.ellipse(1400, 250, 300, 100, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Cina
    ctx.beginPath();
    ctx.ellipse(1500, 350, 150, 100, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // India
    ctx.beginPath();
    ctx.ellipse(1350, 400, 80, 100, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Giappone
    ctx.beginPath();
    ctx.ellipse(1700, 350, 30, 80, 0.2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(1600, 700, 120, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Nuova Zelanda
    ctx.beginPath();
    ctx.ellipse(1750, 750, 25, 40, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Aggiungi confini nazionali sottili
    ctx.strokeStyle = '#7A7A7A';
    ctx.lineWidth = 1;
    
    // Confini Europa
    ctx.beginPath();
    ctx.moveTo(950, 250);
    ctx.lineTo(1150, 250);
    ctx.lineTo(1150, 350);
    ctx.lineTo(950, 350);
    ctx.closePath();
    ctx.stroke();
    
    // Altri confini principali
    ctx.beginPath();
    ctx.moveTo(1024, 200);
    ctx.lineTo(1024, 400);
    ctx.stroke();
    
    // Nomi dei continenti (più grandi e leggibili)
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    
    ctx.fillText('NORTH AMERICA', 300, 320);
    ctx.fillText('SOUTH AMERICA', 350, 620);
    ctx.fillText('EUROPE', 1024, 300);
    ctx.fillText('AFRICA', 1070, 480);
    ctx.fillText('ASIA', 1450, 320);
    ctx.fillText('AUSTRALIA', 1600, 720);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  const googleMapsTexture = createRealGoogleMapsTexture();
  
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
      {/* Globo con texture Google Maps realistica */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial 
          map={googleMapsTexture}
          transparent
          opacity={1}
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

      {/* Atmosfera leggera */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.05}
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
          <GoogleMapsStyleGlobe 
            currentContinentIndex={currentContinentIndex}
            onCountryClick={handleCountryClick}
            targetContinent={currentContinent}
          />
          
          {/* Illuminazione */}
          <ambientLight intensity={0.6} color="#ffffff" />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-5, -3, -5]} intensity={0.3} color="#ffffff" />
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
