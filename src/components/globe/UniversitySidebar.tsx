
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
    <div className="absolute top-0 right-0 h-full w-80 bg-gradient-to-b from-[#002147]/90 to-[#002147]/95 backdrop-blur-xl text-[#FAF3E0] p-6 transform transition-all duration-500 ease-out animate-slide-in-right border-l border-[#CDA434]/20 shadow-2xl z-30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-[#CDA434] to-[#7B1E3B] bg-clip-text text-transparent">
          🎓 {selectedCountry}
        </h3>
        <button
          onClick={onClose}
          className="text-[#D3D3D3] hover:text-[#FAF3E0] p-2 hover:bg-[#CDA434]/10 rounded-full transition-all duration-200 hover:scale-110"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-4 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
        {universitiesByCountry[selectedCountry].map((university, index) => (
          <div
            key={university.id}
            onClick={() => onUniversitySelect(university)}
            className="bg-gradient-to-r from-[#FAF3E0]/10 to-[#FAF3E0]/5 hover:from-[#CDA434]/20 hover:to-[#7B1E3B]/20 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 border border-[#D3D3D3]/20 hover:border-[#CDA434]/40 shadow-lg hover:shadow-[#CDA434]/20"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm leading-tight text-[#FAF3E0]">{university.name}</h4>
              <span className="text-xs bg-gradient-to-r from-[#7B1E3B] to-[#CDA434] text-[#FAF3E0] px-2 py-1 rounded-full ml-2 flex-shrink-0 shadow-lg">
                #{university.ranking}
              </span>
            </div>
            
            <div className="text-xs text-[#D3D3D3] space-y-1">
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
