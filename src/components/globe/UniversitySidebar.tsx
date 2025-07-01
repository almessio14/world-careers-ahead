
import { X } from 'lucide-react';
import { universitiesByCountry } from '../../data/universities';
import { University } from '../../types';

interface UniversitySidebarProps {
  selectedCountry: string | null;
  onClose: () => void;
  onUniversitySelect: (university: University) => void;
}

const UniversitySidebar = ({ selectedCountry, onClose, onUniversitySelect }: UniversitySidebarProps) => {
  if (!selectedCountry || !universitiesByCountry[selectedCountry]) {
    return null;
  }

  return (
    <div className="absolute top-0 right-0 h-full w-80 bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-xl text-white p-6 transform transition-all duration-500 ease-out animate-slide-in-right border-l border-white/20 shadow-2xl z-30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🎓 {selectedCountry}
        </h3>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-4 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
        {universitiesByCountry[selectedCountry].map((university, index) => (
          <div
            key={university.id}
            onClick={() => onUniversitySelect(university)}
            className="bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/15 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-blue-500/20"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm leading-tight">{university.name}</h4>
              <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full ml-2 flex-shrink-0 shadow-lg">
                #{university.ranking}
              </span>
            </div>
            
            <div className="text-xs text-white/80 space-y-1">
              <div>📍 {university.city}</div>
              <div>🗣️ {university.language}</div>
              <div>💰 {university.tuitionFee}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversitySidebar;
