
import { Continent } from './globeConfig';

interface ContinentIndicatorProps {
  continents: Continent[];
  currentIndex: number;
  isTransitioning: boolean;
}

const ContinentIndicator = ({ continents, currentIndex, isTransitioning }: ContinentIndicatorProps) => {
  const currentContinent = continents[currentIndex];

  return (
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
              index === currentIndex ? 'scale-125' : ''
            }`}
            style={{ 
              backgroundColor: index === currentIndex ? '#CDA434' : 'rgba(205, 164, 52, 0.3)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ContinentIndicator;
