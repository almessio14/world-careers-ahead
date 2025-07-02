
import * as THREE from 'three';

// Coordinate geografiche dei continenti
export const continents = [
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
    key: 'asia',
    name: 'Asia',
    lat: 35.0,
    lng: 100.0,
    countries: []
  }
];

// Configurazione del globo ottimizzata per la visibilità
export const globeConfig = {
  width: 800,
  height: 400,
  // Texture semplici e affidabili
  globeImageUrl: 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
  bumpImageUrl: 'https://unpkg.com/three-globe/example/img/earth-topology.png',
  backgroundColor: '#002147', // Blu Oxford solido per sfondo visibile
  showAtmosphere: true,
  atmosphereColor: '#CDA434',
  atmosphereAltitude: 0.15,
  enablePointerInteraction: true,
  pointAltitude: 0.05,
  pointRadius: { normal: 3, hover: 4 }, // Punti più grandi
  pointColor: { normal: '#7B1E3B', hover: '#CDA434' },
  pointResolution: 12,
  initialView: {
    altitude: 1.8 // Zoom fisso ma non troppo vicino
  }
};
