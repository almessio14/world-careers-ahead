
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GlobeControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  isTransitioning: boolean;
}

const GlobeControls = ({ onPrevious, onNext, isTransitioning }: GlobeControlsProps) => {
  return (
    <>
      <button
        onClick={onPrevious}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 shadow-lg hover:shadow-blue-500/50 z-10"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={onNext}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 shadow-lg hover:shadow-purple-500/50 z-10"
      >
        <ChevronRight size={28} />
      </button>
    </>
  );
};

export default GlobeControls;
