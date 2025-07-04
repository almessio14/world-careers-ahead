
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Macrocategory, Microarea } from '../data/careerExploration';
import { cn } from '../lib/utils';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

interface CareerExplorationCardProps {
  category: Macrocategory;
  onMicroareaClick: (microarea: Microarea) => void;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function CareerExplorationCard({ 
  category, 
  onMicroareaClick, 
  isExpanded = false, 
  onToggle 
}: CareerExplorationCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Usa isExpanded se fornito, altrimenti usa lo stato interno
  const expanded = onToggle ? isExpanded : internalExpanded;

  useEffect(() => {
    if (expanded && cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const offset = window.innerHeight * 0.1;
      
      setTimeout(() => {
        window.scrollTo({
          top: window.scrollY + cardRect.top - offset,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [expanded]);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  return (
    <Card 
      ref={cardRef}
      className={cn(
        "group cursor-pointer transition-all duration-500 ease-out bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-[#fbbf24]/30 shadow-sm hover:shadow-2xl hover:shadow-[#fbbf24]/10",
        "transform hover:-translate-y-2 hover:scale-[1.02]",
        expanded ? "ring-2 ring-[#fbbf24]/20 shadow-2xl" : ""
      )}
      onClick={handleToggle}
    >
      <CardContent className="p-6 md:p-8">
        {/* Header sempre visibile */}
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl md:text-2xl font-light text-[#14213d] mb-2 md:mb-3 tracking-tight group-hover:text-[#fbbf24] transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light">
              {category.description}
            </p>
          </div>
          <div className={cn(
            "ml-3 md:ml-4 p-2 rounded-full bg-gray-100 transition-all duration-300 flex-shrink-0",
            "group-hover:bg-[#fbbf24] group-hover:text-white",
            expanded ? "rotate-90 bg-[#fbbf24] text-white" : ""
          )}>
            <ChevronRight size={18} className="md:w-5 md:h-5" />
          </div>
        </div>

        {/* Sezioni espandibili con animazione fluida */}
        <div className={cn(
          "overflow-hidden transition-all duration-700 ease-out",
          expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="pt-4 md:pt-6 border-t border-gray-100">
            <div className="mb-3 md:mb-4">
              <h4 className="text-xs md:text-sm font-semibold text-[#14213d] mb-3 md:mb-4 uppercase tracking-wider">
                Aree di Specializzazione
              </h4>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              {category.microareas.map((microarea, index) => (
                <button
                  key={microarea.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMicroareaClick(microarea);
                  }}
                  className={cn(
                    "w-full group/item p-3 md:p-4 text-left rounded-xl border border-gray-100 transition-all duration-300",
                    "hover:border-[#fbbf24]/30 hover:bg-gradient-to-r hover:from-[#fbbf24]/5 hover:to-transparent",
                    "hover:shadow-md hover:scale-[1.02] transform"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm md:text-base font-medium text-[#14213d] group-hover/item:text-[#fbbf24] transition-colors duration-200 pr-2">
                      {microarea.name}
                    </span>
                    <ArrowUpRight 
                      size={14} 
                      className="text-gray-400 group-hover/item:text-[#fbbf24] transition-all duration-200 transform group-hover/item:translate-x-1 group-hover/item:-translate-y-1 flex-shrink-0 md:w-4 md:h-4" 
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Indicatore visivo dello stato */}
        {!expanded && (
          <div className="mt-4 md:mt-6 flex justify-center">
            <div className="text-xs text-gray-400 font-medium tracking-wider uppercase">
              Tocca per esplorare
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
