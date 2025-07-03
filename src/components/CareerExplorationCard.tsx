
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Macrocategory, Microarea } from '../data/careerExploration';
import { cn } from '../lib/utils';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

interface CareerExplorationCardProps {
  category: Macrocategory;
  onMicroareaClick: (microarea: Microarea) => void;
}

export default function CareerExplorationCard({ category, onMicroareaClick }: CareerExplorationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && cardRef.current) {
      cardRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card 
      ref={cardRef}
      className={cn(
        "group cursor-pointer transition-all duration-500 ease-out bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-[#fbbf24]/30 shadow-sm hover:shadow-2xl hover:shadow-[#fbbf24]/10",
        "transform hover:-translate-y-2 hover:scale-[1.02]",
        isExpanded ? "ring-2 ring-[#fbbf24]/20 shadow-2xl" : ""
      )}
      onClick={handleToggle}
    >
      <CardContent className="p-8">
        {/* Header sempre visibile */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-light text-[#14213d] mb-3 tracking-tight group-hover:text-[#fbbf24] transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-gray-600 leading-relaxed font-light">
              {category.description}
            </p>
          </div>
          <div className={cn(
            "ml-4 p-2 rounded-full bg-gray-100 transition-all duration-300",
            "group-hover:bg-[#fbbf24] group-hover:text-white",
            isExpanded ? "rotate-90 bg-[#fbbf24] text-white" : ""
          )}>
            <ChevronRight size={20} />
          </div>
        </div>

        {/* Sezioni espandibili con animazione fluida */}
        <div className={cn(
          "overflow-hidden transition-all duration-500 ease-out",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="pt-6 border-t border-gray-100">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-[#14213d] mb-4 uppercase tracking-wider">
                Aree di Specializzazione
              </h4>
            </div>
            
            <div className="space-y-3">
              {category.microareas.map((microarea, index) => (
                <button
                  key={microarea.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMicroareaClick(microarea);
                  }}
                  className={cn(
                    "w-full group/item p-4 text-left rounded-xl border border-gray-100 transition-all duration-300",
                    "hover:border-[#fbbf24]/30 hover:bg-gradient-to-r hover:from-[#fbbf24]/5 hover:to-transparent",
                    "hover:shadow-md hover:scale-[1.02] transform"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#14213d] group-hover/item:text-[#fbbf24] transition-colors duration-200">
                      {microarea.name}
                    </span>
                    <ArrowUpRight 
                      size={16} 
                      className="text-gray-400 group-hover/item:text-[#fbbf24] transition-all duration-200 transform group-hover/item:translate-x-1 group-hover/item:-translate-y-1" 
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Indicatore visivo dello stato */}
        {!isExpanded && (
          <div className="mt-6 flex justify-center">
            <div className="text-xs text-gray-400 font-medium tracking-wider uppercase">
              Tocca per esplorare
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
