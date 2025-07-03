
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
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50 shadow-lg"
        style={{ 
          backgroundColor: '#CDA434',
          color: '#2C1810'
        }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={onNext}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50 shadow-lg"
        style={{ 
          backgroundColor: '#CDA434',
          color: '#2C1810'
        }}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </>
  );
};

export default GlobeControls;
