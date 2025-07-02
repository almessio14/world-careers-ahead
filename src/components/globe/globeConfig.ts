
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

// Configurazione semplificata - SOLO COLORI SOLIDI
export const globeConfig = {
  width: 800,
  height: 400,
  // NESSUNA TEXTURE - solo colore solido
  globeImageUrl: null,
  bumpImageUrl: null,
  backgroundColor: '#001122', // Blu scuro per contrasto
  showAtmosphere: false, // Disabilitato per semplicità
  atmosphereColor: '#CDA434',
  atmosphereAltitude: 0.1,
  enablePointerInteraction: true,
  pointAltitude: 0.1,
  pointRadius: { normal: 4, hover: 6 },
  pointColor: { normal: '#FF0000', hover: '#FFFF00' }, // Rosso e giallo per visibilità
  pointResolution: 8,
  initialView: {
    altitude: 2.5 // Zoom fisso ravvicinato
  }
};
