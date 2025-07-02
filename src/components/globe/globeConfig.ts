
// Coordinate geografiche dei continenti
export const continents = [
  {
    key: 'europa',
    name: 'Europa',
    lat: 54.0,
    lng: 15.0,
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

// Configurazione Globe.gl
export const globeConfig = {
  width: 800,
  height: 400,
  globeImageUrl: 'https://unpkg.com/three-globe/example/img/earth-day.jpg',
  bumpImageUrl: null,
  backgroundColor: '#001122',
  showAtmosphere: true,
  atmosphereColor: '#69b7d3',
  atmosphereAltitude: 0.15,
  enablePointerInteraction: true,
  pointAltitude: 0.05,
  pointRadius: { normal: 0.8, hover: 1.2 },
  pointColor: { normal: '#ff6b6b', hover: '#ffd93d' },
  pointResolution: 12,
  initialView: {
    altitude: 1.8 // Zoom fisso ravvicinato
  }
};
