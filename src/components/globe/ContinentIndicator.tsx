
interface ContinentIndicatorProps {
  continents: Array<{ name: string }>;
  currentIndex: number;
  isTransitioning: boolean;
}

const ContinentIndicator = ({ continents, currentIndex, isTransitioning }: ContinentIndicatorProps) => {
  const currentContinent = continents[currentIndex];

  return (
    <div className="text-center mb-6">
      <h3 className={`text-2xl font-bold transition-all duration-300 ${
        isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`} style={{ color: '#CDA434' }}>
        ✨ {currentContinent.name} ✨
      </h3>
      <div className="flex justify-center space-x-3 mt-3">
        {continents.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
              index === currentIndex 
                ? 'scale-125 shadow-lg' 
                : 'hover:scale-110'
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
