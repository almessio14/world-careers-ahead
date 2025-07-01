
interface ContinentIndicatorProps {
  continents: Array<{ name: string }>;
  currentIndex: number;
  isTransitioning: boolean;
}

const ContinentIndicator = ({ continents, currentIndex, isTransitioning }: ContinentIndicatorProps) => {
  const currentContinent = continents[currentIndex];

  return (
    <div className="text-center mb-6">
      <h3 className={`text-2xl font-bold text-white transition-all duration-300 ${
        isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      } bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent`}>
        ✨ {currentContinent.name} ✨
      </h3>
      <div className="flex justify-center space-x-3 mt-3">
        {continents.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
              index === currentIndex 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 scale-125 shadow-yellow-400/50' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ContinentIndicator;
