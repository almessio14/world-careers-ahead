
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
  
  // Crea una texture stile Google Earth più chiara e dettagliata
  const createGoogleEarthTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 4096; // Risoluzione più alta per dettagli migliori
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;

    // Sfondo oceano molto chiaro stile Google Earth (#E3F2FD - azzurro molto tenue)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#E8F4FD'); // Azzurro ghiaccio molto chiaro
    gradient.addColorStop(0.5, '#E3F2FD'); // Azzurro tenue
    gradient.addColorStop(1, '#D1E7DD'); // Verde acqua tenue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Terre emerse con colori Google Earth più naturali
    const landColor = '#F5F3E7'; // Beige molto chiaro
    const mountainColor = '#E8E2D5'; // Beige più scuro per rilievi
    const forestColor = '#EAF4EA'; // Verde molto tenue
    
    ctx.shadowColor = 'rgba(0,0,0,0.1)';
    ctx.shadowBlur = 3;

    // Nord America con dettagli migliorati
    ctx.fillStyle = landColor;
    ctx.beginPath();
    // USA principale
    ctx.ellipse(600, 650, 320, 200, -0.1, 0, 2 * Math.PI);
    ctx.fill();
    
    // Canada
    ctx.beginPath();
    ctx.ellipse(550, 450, 400, 120, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Alaska più dettagliata
    ctx.beginPath();
    ctx.ellipse(300, 400, 60, 50, 0.2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Groenlandia
    ctx.fillStyle = '#F8F8F8'; // Ghiaccio
    ctx.beginPath();
    ctx.ellipse(800, 300, 70, 120, 0.1, 0, 2 * Math.PI);
    ctx.fill();
    
    // Sud America più dettagliato
    ctx.fillStyle = landColor;
    ctx.beginPath();
    ctx.ellipse(700, 1200, 120, 350, 0.1, 0, 2 * Math.PI);
    ctx.fill();
    
    // Brasile (parte più larga)
    ctx.beginPath();
    ctx.ellipse(750, 1100, 140, 200, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Europa molto dettagliata
    ctx.fillStyle = landColor;
    
    // Europa occidentale
    ctx.beginPath();
    ctx.ellipse(2048, 550, 150, 120, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Scandinavia
    ctx.beginPath();
    ctx.ellipse(2100, 400, 80, 60, 0.2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Penisola iberica
    ctx.beginPath();
    ctx.ellipse(1950, 650, 60, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Italia
    ctx.beginPath();
    ctx.ellipse(2080, 700, 25, 90, 0.3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Gran Bretagna e Irlanda
    ctx.beginPath();
    ctx.ellipse(1960, 520, 35, 70, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(1920, 540, 20, 40, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Africa più dettagliata
    // Nord Africa (Sahara)
    ctx.fillStyle = '#F0E6D2'; // Colore desertico
    ctx.beginPath();
    ctx.ellipse(2100, 800, 140, 120, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Africa subsahariana
    ctx.fillStyle = forestColor;
    ctx.beginPath();
    ctx.ellipse(2140, 1000, 130, 200, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Africa orientale
    ctx.fillStyle = landColor;
    ctx.beginPath();
    ctx.ellipse(2200, 950, 80, 180, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Asia molto dettagliata
    ctx.fillStyle = landColor;
    
    // Russia/Siberia
    ctx.beginPath();
    ctx.ellipse(2800, 500, 500, 150, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Cina
    ctx.beginPath();
    ctx.ellipse(3000, 700, 200, 150, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // India
    ctx.beginPath();
    ctx.ellipse(2700, 800, 100, 140, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Giappone
    ctx.beginPath();
    ctx.ellipse(3400, 700, 40, 120, 0.2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Penisola arabica
    ctx.fillStyle = '#F0E6D2';
    ctx.beginPath();
    ctx.ellipse(2400, 750, 80, 100, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Australia e Oceania
    ctx.fillStyle = landColor;
    ctx.beginPath();
    ctx.ellipse(3200, 1400, 180, 120, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Nuova Zelanda
    ctx.beginPath();
    ctx.ellipse(3500, 1500, 30, 60, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Confini nazionali molto sottili e chiari
    ctx.strokeStyle = 'rgba(180, 180, 180, 0.6)';
    ctx.lineWidth = 2;
    
    // Europa
    ctx.beginPath();
    ctx.moveTo(1900, 500);
    ctx.lineTo(2200, 500);
    ctx.lineTo(2200, 650);
    ctx.lineTo(1900, 650);
    ctx.closePath();
    ctx.stroke();
    
    // Divisioni interne Europa
    ctx.beginPath();
    ctx.moveTo(2000, 500);
    ctx.lineTo(2000, 650);
    ctx.moveTo(2100, 500);
    ctx.lineTo(2100, 650);
    ctx.stroke();
    
    // Altri confini principali
    ctx.beginPath();
    // USA-Canada
    ctx.moveTo(400, 550);
    ctx.lineTo(900, 550);
    // Confini asiatici
    ctx.moveTo(2500, 600);
    ctx.lineTo(3200, 600);
    ctx.stroke();

    // Nomi dei paesi/continenti con font più leggibile
    ctx.fillStyle = 'rgba(80, 80, 80, 0.8)'; // Grigio scuro ma non troppo
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 3;
    
    // Continenti
    ctx.strokeText('NORTH AMERICA', 600, 680);
    ctx.fillText('NORTH AMERICA', 600, 680);
    
    ctx.strokeText('SOUTH AMERICA', 700, 1240);
    ctx.fillText('SOUTH AMERICA', 700, 1240);
    
    ctx.strokeText('EUROPE', 2048, 580);
    ctx.fillText('EUROPE', 2048, 580);
    
    ctx.strokeText('AFRICA', 2140, 1020);
    ctx.fillText('AFRICA', 2140, 1020);
    
    ctx.strokeText('ASIA', 2900, 650);
    ctx.fillText('ASIA', 2900, 650);
    
    ctx.strokeText('AUSTRALIA', 3200, 1420);
    ctx.fillText('AUSTRALIA', 3200, 1420);

    // Paesi principali con font più piccolo
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = 'rgba(100, 100, 100, 0.9)';
    
    ctx.strokeText('USA', 600, 720);
    ctx.fillText('USA', 600, 720);
    
    ctx.strokeText('CANADA', 550, 480);
    ctx.fillText('CANADA', 550, 480);
    
    ctx.strokeText('BRAZIL', 750, 1140);
    ctx.fillText('BRAZIL', 750, 1140);
    
    ctx.strokeText('RUSSIA', 2800, 530);
    ctx.fillText('RUSSIA', 2800, 530);
    
    ctx.strokeText('CHINA', 3000, 730);
    ctx.fillText('CHINA', 3000, 730);
    
    ctx.strokeText('INDIA', 2700, 830);
    ctx.fillText('INDIA', 2700, 830);

    // Paesi europei
    ctx.font = 'bold 18px Arial';
    ctx.strokeText('UK', 1960, 540);
    ctx.fillText('UK', 1960, 540);
    
    ctx.strokeText('FRANCE', 2000, 600);
    ctx.fillText('FRANCE', 2000, 600);
    
    ctx.strokeText('GERMANY', 2080, 560);
    ctx.fillText('GERMANY', 2080, 560);
    
    ctx.strokeText('ITALY', 2080, 720);
    ctx.fillText('ITALY', 2080, 720);
    
    ctx.strokeText('SPAIN', 1970, 670);
    ctx.fillText('SPAIN', 1970, 670);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  };

  const googleEarthTexture = createGoogleEarthTexture();
  
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
