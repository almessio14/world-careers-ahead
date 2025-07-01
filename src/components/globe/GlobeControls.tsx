
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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#002147] to-[#7B1E3B] hover:from-[#003366] hover:to-[#8B2E4B] text-[#FAF3E0] p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 shadow-lg hover:shadow-[#CDA434]/50 z-10"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={onNext}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#7B1E3B] to-[#CDA434] hover:from-[#8B2E4B] hover:to-[#DDB444] text-[#FAF3E0] p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 shadow-lg hover:shadow-[#7B1E3B]/50 z-10"
      >
        <ChevronRight size={28} />
      </button>
    </>
  );
};

export default GlobeControls;
