
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
      { name: 'Italy', code: 'Italy', lat: 41.8719, lng: 12.5674 },
      { name: 'Spain', code: 'Spain', lat: 40.4637, lng: -3.7492 },
      { name: 'Portugal', code: 'Portugal', lat: 39.3999, lng: -8.2245 },
      { name: 'Netherlands', code: 'Netherlands', lat: 52.1326, lng: 5.2913 },
      { name: 'Belgium', code: 'Belgium', lat: 50.5039, lng: 4.4699 },
      { name: 'Austria', code: 'Austria', lat: 47.5162, lng: 14.5501 },
      { name: 'Denmark', code: 'Denmark', lat: 56.2639, lng: 9.5018 },
      { name: 'Sweden', code: 'Sweden', lat: 60.1282, lng: 18.6435 },
      { name: 'Finland', code: 'Finland', lat: 61.9241, lng: 25.7482 },
      { name: 'Norway', code: 'Norway', lat: 60.4720, lng: 8.4689 },
      { name: 'Ireland', code: 'Ireland', lat: 53.4129, lng: -8.2439 }
    ]
  },
  {
    key: 'nordamerica',
    name: 'Nord America',
    lat: 45.0,
    lng: -100.0,
    countries: [
      { name: 'USA', code: 'USA', lat: 37.0902, lng: -95.7129 },
      { name: 'Canada', code: 'Canada', lat: 56.1304, lng: -106.3468 }
    ]
  },
  {
    key: 'asia',
    name: 'Asia',
    lat: 35.0,
    lng: 100.0,
    countries: [
      { name: 'China', code: 'China', lat: 35.8617, lng: 104.1954 },
      { name: 'Japan', code: 'Japan', lat: 36.2048, lng: 138.2529 },
      { name: 'South Korea', code: 'South Korea', lat: 35.9078, lng: 127.7669 },
      { name: 'Singapore', code: 'Singapore', lat: 1.3521, lng: 103.8198 }
    ]
  }
];

// Configurazione Globe.gl
export const globeConfig = {
  width: 800,
  height: 400,
  globeImageUrl: 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
  bumpImageUrl: 'https://unpkg.com/three-globe/example/img/earth-topology.png',
  backgroundColor: '#001122',
  showAtmosphere: true,
  atmosphereColor: '#69b7d3',
  atmosphereAltitude: 0.15,
  enablePointerInteraction: true,
  pointAltitude: 0.0,
  pointRadius: { normal: 0, hover: 0 },
  pointColor: { normal: 'transparent', hover: 'transparent' },
  pointResolution: 12,
  initialView: {
    altitude: 1.8
  },
  polygonAltitude: 0.01,
  polygonCapColor: (d: any) => d.hovered ? '#fbbf24' : 'rgba(255, 255, 255, 0.1)',
  polygonSideColor: (d: any) => d.hovered ? '#f59e0b' : 'rgba(255, 255, 255, 0.05)',
  polygonStrokeColor: (d: any) => d.hovered ? '#fbbf24' : 'rgba(255, 255, 255, 0.2)'
};
